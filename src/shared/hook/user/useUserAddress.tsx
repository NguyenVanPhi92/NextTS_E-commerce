import { RootState } from "@/core/store"
import { AddressAdd, AddressDelete, ShippingAddress, UserDetail } from "@/models"
import { setOrderAddress, setAddressDefault } from "@/modules"
import userApi from "@/services/userApi"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface AddAddressHook {
  address: AddressAdd
  addressForm: ShippingAddress
}

interface AccountSWR {
  data: UserDetail
  error: any
  isValidating: boolean
  addAddress: ({ address, addressForm }: AddAddressHook) => Promise<any>
  deleteAddress: (address: AddressDelete) => Promise<any>
}

export const useUserAddress = (shouldFetch = true): AccountSWR => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    addressDefault,
    token,
    userInfo: { id: partner_id = 0 } = { userInfo: undefined },
  } = useSelector((state: RootState) => state.user)
  const orderAddress = useSelector((state: RootState) => state.order.address)

  const { data, error, isValidating, mutate } = useSWR(
    "user_detail",
    token && shouldFetch
      ? () => userApi.getDetailUser().then((res: any) => res.result.data?.info_customer || {})
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const addAddress = async ({ address, addressForm }: AddAddressHook) => {
    if (!token) {
      router.push("/login")
    }

    try {
      const res: any = await userApi.addAddress(address)

      if (res?.result?.success) {
        if (address.adress_id) {
          mutate(
            {
              ...data,
              shipping_adress: [...data.shipping_adress].map((item: ShippingAddress) =>
                item.id === address.adress_id ? addressForm : item
              ),
            },
            false
          )

          if (addressDefault?.id === addressForm.id) {
            dispatch(setAddressDefault(addressForm))
          }

          if (orderAddress?.id === addressForm.id) {
            dispatch(setOrderAddress(addressForm))
          }
          dispatch(notify("Chỉnh sửa địa chỉ thành công", "success"))
        } else {
          mutate(
            {
              ...data,
              shipping_adress: [
                ...data.shipping_adress,
                {
                  ...addressForm,
                  id: res.result.data?.[0]?.partner_shipping_id,
                },
              ],
            },
            false
          )

          if (router.pathname === "/checkout") {
            dispatch(
              setOrderAddress({
                ...addressForm,
                id: res.result.data?.[0]?.partner_shipping_id,
              })
            )
          }

          dispatch(notify("Thêm địa chỉ thành công", "success"))
        }
      } else {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra", "error"))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAddress = async (address: AddressDelete) => {
    try {
      const res: any = await userApi.deleteAddress({
        adress_id: address.adress_id,
        partner_id,
      })
      if (res?.result?.success) {
        mutate(
          {
            ...(data as UserDetail),
            shipping_adress: [...data.shipping_adress].filter(
              (item) => item.id !== address.adress_id
            ),
          },
          false
        )

        if (addressDefault?.id === address.adress_id) {
          dispatch(setAddressDefault(undefined))
        }

        if (orderAddress?.id === address.adress_id) {
          dispatch(setOrderAddress(undefined))
          if (addressDefault?.id !== orderAddress.id) {
            dispatch(setOrderAddress(addressDefault))
          }
        }
      } else {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra", "error"))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data,
    error,
    isValidating,
    addAddress,
    deleteAddress,
  }
}
