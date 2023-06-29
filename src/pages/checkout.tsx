/* eslint-disable react-hooks/exhaustive-deps */
import { OrderItem, Payment } from '@/components'
import { AddressOrder } from '@/components/address/addressOrder'
import { OrderContainer } from '@/container'
import { getOrderIdsQueryString, isArrayHasValue } from '@/helper'
import { MainAuthLayoutNoFooter } from '@/layout'
import { selectOrderLineListHasOrderDraft, setOpenScreenLoading } from '@/modules'
import orderApi from '@/services/orderApi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOrder } from 'shared/hook'

const Checkout = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const orderLineList = useSelector(selectOrderLineListHasOrderDraft)

    console.log({ orderLineList })

    const { createOrderDone } = useOrder()

    useEffect(() => {
        if (isArrayHasValue(orderLineList)) {
            dispatch(setOpenScreenLoading(true))
            orderApi
                .getVNPAYStatusPayment({
                    sale_order_id: Number(orderLineList[0].orderDraft.order_id)
                })
                .then((res: any) => {
                    dispatch(setOpenScreenLoading(false))
                    // const acquirer_id = res?.result?.data?.acquirer_data?.acquirer_id
                    if (res?.result?.data && res?.result?.success) {
                        createOrderDone((data) => {
                            router.push(`/order-confirmed?${getOrderIdsQueryString(data)}`)
                        })
                    } else {
                        // dispatch(notify(res?.result?.message || "Thanh toán không thành công", "error"))
                    }
                })
                .catch(() => {
                    dispatch(setOpenScreenLoading(false))
                })

            // e slint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [])

    if (!orderLineList?.length) return null
    return (
        <OrderContainer showPromotion={false} headerTitle='Thanh toán'>
            <section className='checkout-container'>
                <div className='mb-24'>
                    <AddressOrder />
                </div>

                <div className='mb-24'>
                    <h3 className='text-base text-[18px] leading-[26px] bg-white p-16 pb-12'>
                        Sản phẩm
                    </h3>

                    {orderLineList.map((item) => (
                        <div key={item.company_id} className='mb-16 last:mb-0 bg-white p-16'>
                            <OrderItem data={item} />
                        </div>
                    ))}
                </div>

                <div className=''>
                    <Payment />
                </div>
            </section>
        </OrderContainer>
    )
}

Checkout.Layout = MainAuthLayoutNoFooter
export default Checkout
