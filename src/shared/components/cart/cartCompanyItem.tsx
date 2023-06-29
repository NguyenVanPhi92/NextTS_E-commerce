import { CartItem as ICartItem } from "@/models"
import { CartItem } from "./cartItem"

interface CartCompanyItemProps {
  data: ICartItem[]
  handleClose?: Function
  onDelete: (props: ICartItem) => void
  className?: string
}

export const CartCompanyItem = ({
  data,
  onDelete,
  handleClose,
  className = "",
}: CartCompanyItemProps) => {
  return (
    <div className={className}>
      {/* <div className="p-12 pt-8 border-b border-solid border-border-color-2">
        <div className="flex items-center">
          <BiStore className="fill-gray-color-3 text-lg mr-8" />
          <Link href={`/company/${data?.company_id || 1}`}>
            <a className="text-16 font-semibold line-clamp-1">
              {data?.company_name || "Công ty Mặc Định"}
            </a>
          </Link>
        </div>
      </div> */}

      {data?.map((item) => (
        <CartItem
          className="border-b border-solid border-border-color-4"
          key={item.product_id}
          data={item}
          onDelete={onDelete}
          handleClose={handleClose}
        />
      ))}
    </div>
  )
}
