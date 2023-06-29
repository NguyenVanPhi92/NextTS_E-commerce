import { authentication, fbProvider, googleProvider } from "@/core"
import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import { GetUserInfo, ILogin } from "@/models"
import { setCurrentToken, setOpenOtpLoginModal, setOpenScreenLoading } from "@/modules"
import userApi from "@/services/userApi"
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

interface otpProps {
  otpInput: string
  handleSuccess: (token: string) => void
  handleError?: Function
}

interface UseAuthRes {
  loginWithFacebook: (handleSuccess: (token: string) => void, handleError?: Function) => void
  loginWithGoogle: (handleSuccess: (token: string) => void) => void
  loginWithPhoneNumber: (props: otpProps) => void
  updatePhoneNumber: (props: otpProps) => void
  getUserInfo: (_: GetUserInfo) => void
  loginWithPassword: (loginForm: ILogin, handleSuccess: (token: string) => void) => void
  OTPVerifier: (props: otpProps) => void
}

export const useAuth = (): UseAuthRes => {
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.user?.token)
  const { currentToken, phoneNumber } = useSelector((state: RootState) => state.auth)

  const loginWithFacebook = async (
    handleSuccess: (token: string) => void,
    handleError?: Function
  ) => {
    try {
      const result: any = await signInWithPopup(authentication, fbProvider)
      const credential: any = FacebookAuthProvider.credentialFromResult(result)
      const facebook_access_token = credential.accessToken
      dispatch(setOpenScreenLoading(true))

      const res: any = await userApi.firebaseAuth({
        type: "facebook",
        facebook_access_token,
      })
      dispatch(setOpenScreenLoading(false))

      const token = res?.result?.data?.token
      if (res?.result?.success) {
        dispatch(setCurrentToken(token))
        handleSuccess(token)
      } else {
        handleError && handleError()

        dispatch(notify(res?.result?.message || "Có lỗi khi xảy ra", "error"))
      }
    } catch (error: any) {
      handleError && handleError()
      dispatch(setOpenScreenLoading(false))
    }
  }

  const loginWithGoogle = async (handleSuccess: (token: string) => void) => {
    try {
      const response: any = await signInWithPopup(authentication, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(response)
      const firebase_access_token = credential?.idToken
      if (!googleProvider || !firebase_access_token || !response?.user) return
      dispatch(setOpenScreenLoading(true))

      const res: any = await userApi.firebaseAuth({
        type: "data_google",
        data_in_token: response.user,
        firebase_access_token,
      })

      dispatch(setOpenScreenLoading(false))
      const token = res?.result?.data?.token

      if (res?.result?.success) {
        dispatch(setCurrentToken(token))
        handleSuccess(token)
      } else {
        dispatch(notify(res?.result?.message || "Có lỗi khi xảy ra", "error"))
      }
    } catch (error) {
      console.log(error)
      dispatch(setOpenScreenLoading(false))
    }
  }

  const OTPVerifier = async (props: otpProps) => {
    const { otpInput, handleSuccess, handleError } = props
    const confirmationResult = window.confirmationResult
    dispatch(setOpenScreenLoading(true))

    try {
      const responseToken = await confirmationResult.confirm(otpInput)
      const firebaseToken = responseToken?._tokenResponse?.idToken
      dispatch(setOpenScreenLoading(false))

      if (firebaseToken) {
        handleSuccess(firebaseToken)
      } else {
        handleError && handleError()
        dispatch(notify("Vui lòng nhập đúng mã OTP", "error"))
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
      dispatch(notify("Vui lòng nhập đúng mã OTP", "error"))
    }
  }

  const updatePhoneNumber = async (props: otpProps) => {
    const { handleSuccess, handleError, otpInput } = props
    dispatch(setOpenScreenLoading(true))

    try {
      OTPVerifier({
        otpInput,
        handleSuccess: async (firebase_access_token) => {
          if (!currentToken || !firebase_access_token || !phoneNumber) {
            dispatch(notify("Thiếu field cho update phone number", "warning"))
            return
          }

          try {
            const res: any = await userApi.updatePhoneNumber({
              firebase_access_token,
              phone: phoneNumber,
            })
            dispatch(setOpenScreenLoading(false))

            if (res?.result?.success) {
              handleSuccess("")
            } else {
              // const res: any = await userApi.firebaseAuth({
              //   firebase_access_token,
              // })

              // if (res?.result?.success) {
              //   const token = res?.result?.data?.token
              //   if (token) handleSuccess(token)
              // }

              const message = res?.result?.message
              dispatch(notify(message || "Số điện thoại đã tồn tại", "warning"))
              if (message === "Tài khoản chưa được kích hoạt!") {
                dispatch(setOpenOtpLoginModal(false))
              } else {
                handleError && handleError()
              }
            }
          } catch (error) {
            handleError && handleError()
          }
        },
        handleError: () => {
          dispatch(setOpenScreenLoading(false))
        },
      })
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  // const generateChatToken = async (
  //   user_id: string,
  //   onSuccess?: (_: TokenRes) => void,
  //   onError?: Function
  // ) => {
  //   dispatch(setOpenScreenLoading(true))
  //   try {
  //     const res = await chatApi.generateToken({ user_id })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const loginWithPhoneNumber = async (props: otpProps) => {
    const { handleSuccess, handleError, otpInput } = props
    dispatch(setOpenScreenLoading(true))
    try {
      OTPVerifier({
        otpInput,
        handleSuccess: async (firebaseToken) => {
          const res: any = await userApi.firebaseAuth({
            firebase_access_token: firebaseToken,
          })

          const token = res?.result?.data?.token

          if (res?.result?.success) {
            token && handleSuccess(token)
          } else {
            handleError && handleError(res)
          }
        },
        handleError: () => handleError && handleError(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const loginWithPassword = async (loginForm: ILogin, handleSuccess: (token: string) => void) => {
    try {
      dispatch(setOpenScreenLoading(true))
      const res: any = await userApi.login(loginForm)
      dispatch(setOpenScreenLoading(false))
      if (res?.result?.success) {
        handleSuccess(res.result.data.token)
      } else {
        dispatch(notify(res?.result?.message || "Đăng nhập không thành công", "error"))
      }
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
    }
  }

  const getUserInfo = async ({ onError, onSuccess, token: _token }: GetUserInfo) => {
    if (!_token && !token) return

    try {
      const res: any = await userApi.getUserInfo(_token || token || currentToken)
      if (res?.result?.success) {
        if (isObjectHasValue(res?.result?.data)) {
          onSuccess?.(res.result.data)
        }
      } else {
        onError?.()
      }
    } catch (error) {
      console.log(error)
      onError?.()
    }
  }

  return {
    loginWithFacebook,
    loginWithGoogle,
    getUserInfo,
    loginWithPhoneNumber,
    updatePhoneNumber,
    loginWithPassword,
    OTPVerifier,
  }
}
