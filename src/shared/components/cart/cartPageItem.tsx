import {
    changeReactSelectTypeToUomType,
    changeUomCateTypeToReactSelectType,
    changeUomTypeToReactSelectType,
    formatMoneyVND,
    generateProductSlug
} from '@/helper'
import { CartItem, ComboProductItem, PromotionLine, Unit, Variant } from '@/models'
import { API_URL } from '@/services'
import productApi from '@/services/productApi'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { RiArrowDownSLine, RiArrowRightSLine, RiArrowUpSLine } from 'react-icons/ri'
import Select from 'react-select'
import { useCart, useClickOutside } from 'shared/hook'
import { InputCheckbox, InputQuantity } from '../inputs'
import { ProductVariants } from '../product'
import { CartPageItemCoupon } from './cartPageItemCoupon'

interface ICartPageItem {
    data: CartItem
    isChecked?: boolean
    disabled?: boolean
    productGift?: PromotionLine | undefined
    onCheck?: (cart: CartItem) => void
    onDeleteItem?: (cart: CartItem) => void
    onUpdateQuantity?: (cart: CartItem) => void
    onChangeVariant?: () => void
    onChangeUom?: () => void
}

export const CartPageItem = ({
    data,
    isChecked,
    disabled,
    productGift,
    onCheck,
    onDeleteItem,
    onUpdateQuantity,
    onChangeUom,
    onChangeVariant
}: ICartPageItem) => {
    const variantRef = useRef<HTMLDivElement>(null)
    const path = data.type === 'combo' ? 'productCombo' : ''
    const { changeCartItemVariant } = useCart()
    useClickOutside([variantRef], () => setVariantModal(false))

    const [openComboDetail, setOpenComboDetail] = useState(false)
    const [variantModal, setVariantModal] = useState(false)
    const [variants, setVariants] = useState<Variant[]>(data?.variant)
    const [productUom, setProductUom] = useState<Unit>(data?.uom)

    const handleUpdateQuantity = (quantity: number) => {
        onUpdateQuantity && onUpdateQuantity({ ...data, product_qty: quantity })
    }

    const handleToggleVariantModal = () => {
        setVariantModal(!variantModal)
    }

    const updateCartItem = async (newUom: Unit) => {
        const res = await productApi.getProductDetail({
            product_id: data.product_id,
            list_products: [
                {
                    id: data.product_templ_id || 0,
                    lst_attributes_id: variants.map((item) => item.id)
                }
            ],
            uom_id: newUom?.id || 0
        })

        const newProductVariant = res?.result?.data?.detail

        if (!newProductVariant) {
            return
        }

        const newVariant: CartItem = {
            ...newProductVariant,
            attributes: data.attributes,
            variant: variants,
            product_id: newProductVariant.id,
            product_templ_id: newProductVariant.product_tmpl_id,
            company_id: data.company_id,
            company_name: data.company_name,
            product_qty: data.product_qty,
            product_name: newProductVariant.name,
            uom: newUom
        }
        changeCartItemVariant(data, newVariant)
    }

    const handleConfirmVariant = async () => {
        setVariantModal(false)
        updateCartItem(productUom)
        onChangeVariant?.()
    }

    const handleChangeUom = (uom: Unit) => {
        if (uom.id === productUom.id) return
        updateCartItem(uom)
        setProductUom(uom)
        onChangeUom?.()
    }

    return (
        <li className='cart__page_item'>
            <div className='cart__page_item-main__info'>
                <div className='cart__page_item-check'>
                    <InputCheckbox
                        onCheck={() => onCheck && onCheck(data)}
                        isChecked={isChecked || false}
                    />
                </div>

                <div className='cart__page_item-img cursor-pointer'>
                    <Link
                        passHref
                        href={`${path}${generateProductSlug(
                            data.product_name,
                            data.product_templ_id
                        )}`}
                    >
                        <div className='image-container'>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDeleteItem && onDeleteItem(data)
                                }}
                                className='btn-reset cart__item-delete-btn'
                            >
                                <HiOutlineTrash />
                            </button>
                            <Image
                                quality={40}
                                layout='fill'
                                className='image'
                                src={`${API_URL}${data.image_url?.[0] || ''}`}
                                alt={data.product_name}
                            />
                        </div>
                    </Link>
                </div>

                <div className='cart__page_item-info'>
                    <div className='cart__page_item-info-name'>
                        <div className='cart__page_item-info-name-wrapper'>
                            <Link
                                href={`${path}${generateProductSlug(
                                    data.product_name,
                                    data.product_templ_id
                                )}`}
                            >
                                <a className='cart__page_item-info-name-title'>
                                    {data.product_name}
                                </a>
                            </Link>

                            {/* variant */}
                            {data?.variant.length > 0 ? (
                                <div ref={variantRef} className='cart__page_item-info-variant'>
                                    <div
                                        onClick={handleToggleVariantModal}
                                        className='cart__page_item-info-variant-label'
                                    >
                                        <p className='flex items-center'>
                                            <span className='cart__page_item-info-variant-label-title'>
                                                Phân loại hàng:
                                            </span>
                                            <span className='cart__page_item-info-variant-label-icon'>
                                                {!variantModal ? (
                                                    <RiArrowDownSLine />
                                                ) : (
                                                    <RiArrowUpSLine />
                                                )}
                                            </span>
                                        </p>

                                        <span className='cart__page_item-info-variant-label-item'>
                                            {data?.variant?.map(
                                                (item) => ` ${item.parentName}: ${item.name}`
                                            )}
                                        </span>
                                    </div>

                                    {variantModal ? (
                                        <div className='cart__page_item-info-variant-modal'>
                                            <ProductVariants
                                                data={data.attributes}
                                                activeVariants={variants}
                                                onChange={(val) => {
                                                    setVariants(val)
                                                }}
                                            />
                                            <div className='cart__page_item-info-variant-modal-bottom'>
                                                <button
                                                    onClick={handleToggleVariantModal}
                                                    className='cart__page_item-info-variant-modal-button button-back'
                                                >
                                                    Trở lại
                                                </button>
                                                <button
                                                    onClick={handleConfirmVariant}
                                                    className='cart__page_item-info-variant-modal-button button-confirm'
                                                >
                                                    Xác nhận
                                                </button>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}

                            {/* uom */}
                            {data?.uom_categ?.length > 0 ? (
                                <div className='cart__page_item-info-uom'>
                                    <p className='cart__page_item-info-uom-title'>Đơn vị:</p>
                                    <Select
                                        isSearchable={false}
                                        classNamePrefix='cart__page_item-info-uom-select'
                                        components={{ IndicatorSeparator: () => null }}
                                        defaultValue={changeUomTypeToReactSelectType(productUom)}
                                        options={changeUomCateTypeToReactSelectType(data.uom_categ)}
                                        onChange={(val) =>
                                            handleChangeUom(changeReactSelectTypeToUomType(val))
                                        }
                                    />
                                </div>
                            ) : null}
                        </div>
                        <InputCheckbox
                            onCheck={() => onCheck && onCheck(data)}
                            isChecked={isChecked || false}
                        />
                    </div>
                    <div className='cart__page_item-info-element cart__page_item-info-price'>
                        <p className='cart__page_item-info-element-title'>Giá: </p>

                        <p className='info-price-price'>{`${formatMoneyVND(data.price)}`}</p>

                        <p className='info-price-price-mobile'>
                            {formatMoneyVND(
                                data.product_qty === 0 ? data.price : data.product_qty * data.price
                            )}
                        </p>
                    </div>

                    <div className='cart__page_item-info-element cart__page_item-info-quantity'>
                        <p className='cart__page_item-info-element-title'>Số lượng</p>
                        <InputQuantity
                            disabled={disabled}
                            onChangeQuantity={(q: number) => handleUpdateQuantity(q)}
                            quantity={data.product_qty}
                        />
                    </div>

                    <div className='cart__page_item-info-element cart__page_item-info-subtotal'>
                        <p className='cart__page_item-info-element-title'>Tổng phụ: </p>
                        <p className='info-subtotal-price'>
                            {formatMoneyVND(
                                data.product_qty === 0 ? data.price : data.product_qty * data.price
                            )}
                        </p>
                    </div>

                    <div className='cart__page_item-info-element cart__page_item-info-btn'>
                        <button
                            onClick={() => {
                                onDeleteItem && onDeleteItem(data)
                            }}
                            className='btn-reset'
                        >
                            <HiOutlineTrash />
                        </button>
                    </div>
                </div>
            </div>

            {data.type === 'combo' && data?.list_products.length > 0 ? (
                <details className='ml-24'>
                    <summary
                        onClick={() => setOpenComboDetail(!openComboDetail)}
                        className='cart__page_item-combo-summary text-xs mb-12 flex items-center gap-5 cursor-pointer'
                    >
                        {openComboDetail ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
                        Chi tiết combo
                    </summary>
                    <ul>
                        {data?.list_products?.map((pro: ComboProductItem) => (
                            // eslint-disable-next-line @next/next/link-passhref
                            <Link
                                href={generateProductSlug(pro.name, pro.product_tmpl_id)}
                                key={pro.id}
                            >
                                <li
                                    key={pro.id}
                                    className='cursor-pointer p-4 flex gap-5 items-center mb-12 hover:shadow-sm'
                                >
                                    <div className='relative w-[50px] h-[50px]'>
                                        <Image
                                            quality={40}
                                            layout='fill'
                                            src={`${API_URL}${
                                                pro.image_url[0] || data.image_url[0] || ''
                                            }`}
                                            alt={pro.name}
                                        />
                                    </div>
                                    <div className='text-xs'>
                                        <p className='hover:text-primary'>{pro.name}</p>
                                        <p>{`x ${pro.quantity_is} ${pro.qty_uom}`}</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </details>
            ) : null}

            {productGift && productGift?.discount_line?.type === 'bogo_sale' ? (
                <div className='ml-40'>
                    <CartPageItemCoupon data={productGift} />
                </div>
            ) : null}
        </li>
    )
}
