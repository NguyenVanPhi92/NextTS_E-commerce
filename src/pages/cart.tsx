import { cartEmptyIcon } from '@/assets'
import { CartPageCompanyItem, InputCheckbox } from '@/components'
import { OrderContainer } from '@/container'
import { isAllProductListChecked } from '@/helper'
import { MainNoFooter } from '@/layout'
import { selectOrderLineList, selectOrderProductList, toggleCheckAllProductList } from '@/modules'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../core'

const CartPage = () => {
    const dispatch = useDispatch()
    const productList = useSelector(selectOrderProductList)
    const orderLineList = useSelector(selectOrderLineList)
    const token = useSelector((state: RootState) => state.user.token)

    const handleToggleCheckAllProductList = () => {
        dispatch(toggleCheckAllProductList())
    }

    if (!token) {
        return (
            <div className='cart__page-empty'>
                {cartEmptyIcon}
                <p className='cart__page-empty-title'>Vui lòng đăng nhập để tiếp tục mua hàng</p>

                <Link href='/login' passHref>
                    <p className='btn-primary'>Đăng nhập</p>
                </Link>
            </div>
        )
    }

    return (
        <OrderContainer showPromotion={true} headerTitle={`Giỏ hàng (${productList?.length || 0})`}>
            <section className='cart__container'>
                <div className='cart__wrapper'>
                    {productList.length === 0 ? (
                        <div className='cart__page-empty'>
                            {cartEmptyIcon}
                            <p className='cart__page-empty-title'>Giỏ hàng của bạn đang trống</p>

                            <Link href='/' passHref>
                                <p className='btn-primary'>Tiếp tục mua sắm</p>
                            </Link>
                        </div>
                    ) : (
                        <div className='cart__body'>
                            <div className='cart__body-cart'>
                                <div className='cart__body-cart-header sticky top-0 bg-white z-[100]'>
                                    <div className='cart__body-cart-header-check'>
                                        <InputCheckbox
                                            isChecked={isAllProductListChecked(orderLineList)}
                                            onCheck={() => handleToggleCheckAllProductList()}
                                        />
                                    </div>
                                    <p className='cart__body-cart-header-space'></p>
                                    <div className='cart__body-cart-header-wrapper'>
                                        <p className='cart-title-product'>Sản phẩm</p>
                                        <p className='cart-title-price'>Giá</p>
                                        <p className='cart-title-quantity'>Số lượng</p>
                                        <p className='cart-title-subtotal'>Tổng phụ</p>
                                        <p></p>
                                    </div>
                                </div>

                                <div className='cart__body-cart-header-sm sticky top-[45px] bg-white z-[100]'>
                                    <p>Chọn Tất cả ({productList?.length || 0})</p>
                                    <InputCheckbox
                                        isChecked={isAllProductListChecked(orderLineList)}
                                        onCheck={handleToggleCheckAllProductList}
                                    />
                                </div>

                                <ul className='cart__body-cart-list'>
                                    {orderLineList.map((cart) => (
                                        <CartPageCompanyItem
                                            data={cart}
                                            className='mb-12'
                                            key={cart?.company_id}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </OrderContainer>
    )
}

CartPage.Layout = MainNoFooter
export default CartPage
