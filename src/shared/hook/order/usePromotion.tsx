import { RootState } from '@/core/store'
import { ApplyPromotionRes, Promotion, PromotionReq, TokenAndSaleOrderId } from '@/models'
import { selectOrderLineByCompany, setOrderLinePromotion } from '@/modules'
import promotionApi from '@/services/promotionApi'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from 'reapop'
import useSWR from 'swr'
import { useAsync } from '../async'

interface CouponSWR {
  data: Promotion[]
  error: any
  isValidating: boolean
  applyPromotion: (params: PromotionReq, handleSuccess?: (_: Promotion) => void) => void
  cancelPromotion: (_: TokenAndSaleOrderId, handleSuccess?: Function) => void
}

interface UsePromotionProps {
  company_id?: number
}

const usePromotion = (props?: UsePromotionProps | undefined): CouponSWR => {
  const { company_id = 1 } = props || {}
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.user.token)
  const orderLine = useSelector((state: RootState) =>
    selectOrderLineByCompany(state, company_id || 1)
  )
  const { asyncHandler } = useAsync()

  const { data, error, isValidating } = useSWR<Promotion[] | undefined>(
    token && orderLine?.orderDraft?.order_id ? `get_promotion_list_${company_id}` : null,
    () =>
      promotionApi
        .getPromotionList({ sale_order_id: orderLine?.orderDraft?.order_id })
        .then((res: any) => {
          if (res.result) {
            if (res.result.success) {
              return res.result.data
            } else {
              dispatch(notify(res.result.message, 'error'))
            }
          } else {
            dispatch(notify(res.error?.message, 'error'))
          }
        }),
    {
      revalidateOnFocus: false
    }
  )

  const applyPromotion = async (params: PromotionReq, handleSuccess?: Function) => {
    asyncHandler<ApplyPromotionRes, PromotionReq>({
      fetcher: promotionApi.applyPromotion(params),
      onSuccess: (res) => {
        handleSuccess?.(res?.promotion_line)
        dispatch(
          setOrderLinePromotion({
            company_id: params.company_id,
            promotion: {
              ...res,
              promotion_line: res?.promotion_line?.filter((item) => item.is_promotion)
            }
          })
        )
      },
      config: {
        successMsg: 'Đã áp dụng voucher'
      }
    })
  }

  const cancelPromotion = async (params: TokenAndSaleOrderId, onSuccess?: Function) => {
    asyncHandler({
      fetcher: promotionApi.cancelApplyPromotion(params),
      onSuccess: () => {
        onSuccess?.()
        dispatch(setOrderLinePromotion({ company_id, promotion: undefined }))
      },
      config: {
        showSuccessMsg: false,
        showErrorMessage: false
      }
    })
  }

  return {
    data,
    error,
    isValidating,
    applyPromotion,
    cancelPromotion
  }
}

export { usePromotion }
