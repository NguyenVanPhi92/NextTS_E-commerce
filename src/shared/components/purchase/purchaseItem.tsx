import { formatMoneyVND, generateProductSlug } from "@/helper"
import { PurchasedProduct } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"

interface PurchaseItemProps {
  data: PurchasedProduct
  onChange?: (_: PurchasedProduct) => void
  onRebuy?: (_: PurchasedProduct) => void
}

export const PurchaseItem = ({ data, onChange, onRebuy }: PurchaseItemProps) => {
  return (
    <div className="purchase__list-item">
      <div className="purchase__item">
        <div className="purchase__item-top">
          <Link
            passHref
            href={generateProductSlug(data?.product?.product_name, data?.product?.product_tmpl_id)}
          >
            <div className="relative purchase__item-avatar">
              <Image
                height={100}
                width={100}
                className="cursor-pointer"
                src={`${API_URL}${data?.product.image_url?.[0] || ""}`}
                alt=""
              />
            </div>
          </Link>

          <div className="purchase__item-content">
            <Link
              href={generateProductSlug(
                data?.product?.product_name,
                data?.product?.product_tmpl_id
              )}
            >
              <a className="purchase__item-content-name">{data.product.product_name}</a>
            </Link>
            <div className="purchase__item-content-qty">
              Số lượng: <span>{data.product.qty_product}</span>
              <p>x {formatMoneyVND(data.product.price_unit)}</p>
            </div>
          </div>

          <div className="purchase__item-price">
            <p>{formatMoneyVND(data.product.price_unit)}</p>
          </div>
        </div>

        <div className="purchase__item-middle">
          <p className="purchase__item-total-price">
            Tổng tiền:
            <span>{formatMoneyVND(data.product?.amount_total || 0)}</span>
          </p>
        </div>

        <div className="purchase__item-actions">
          <button onClick={() => onRebuy?.(data)} className="btn-primary">
            Mua lại
          </button>
          <button onClick={() => onChange?.(data)} className="btn-primary-outline">
            {data?.comment_rating?.editable ? "Xem đánh giá của bạn" : "Đánh giá"}{" "}
          </button>
        </div>
      </div>
    </div>
  )
}
