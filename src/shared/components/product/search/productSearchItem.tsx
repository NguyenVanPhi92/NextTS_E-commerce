import { Product } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"

interface ProductSearchItemProps {
  onChange?: (_: Product) => void
  data: Product
}

export const ProductSearchItem = ({ data, onChange }: ProductSearchItemProps) => {
  return (
    <div className="search__result-list-item">
      <div
        className="search__result-list-item-link cursor-pointer"
        onClick={() => {
          onChange?.(data)
        }}
      >
        <p className="search__result-list-item-name">{data.name}</p>
        {data?.image_url?.[0] ? (
          <div className="search__result-list-item-img image-container">
            <Image
              src={`${API_URL}${data.image_url?.[0]}`}
              layout="fill"
              alt=""
              className="image"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
