import { Attribute, AttributeWithParentIdAndName, ProductAttribute } from "@/models"
import { useState } from "react"
import { BsCheck } from "react-icons/bs"

export interface IProductVariation {
  attribute: ProductAttribute
  onChangeAttribute: (params: AttributeWithParentIdAndName) => void
}

export const ProductVariation = ({ attribute, onChangeAttribute }: IProductVariation) => {
  const [id, setId] = useState<number>(attribute.values[0].id)

  const handleClick = (item: Attribute) => {
    if (item.id === id) return
    onChangeAttribute && onChangeAttribute({ parentId: attribute.id, parentName: attribute.name, ...item })
    setId(item.id)
  }

  return (
    <div className="product__variation">
      <p className="product__variation-heading">{attribute.name}</p>
      <ul className="product__variation-list">
        {attribute.values?.length > 0 &&
          attribute.values.map((item) => (
            <li
              onClick={() => handleClick(item)}
              key={item.id}
              className={`product__variation-list-item ${id === item.id ? "active" : ""}`}
            >
              {item.id === id ? (
                <span className="product__variation-list-item-icon">
                  <BsCheck />
                </span>
              ) : null}
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  )
}
