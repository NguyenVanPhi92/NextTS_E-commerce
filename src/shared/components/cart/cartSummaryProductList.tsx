import { formatMoneyVND } from "@/helper";
import { CartItem, PromotionLine } from "@/models";
import React from "react";
import { RiCloseLine } from "react-icons/ri";

interface Props {
	productList?: CartItem[] | undefined;
	promotionLineList?: PromotionLine[] | undefined;
}

export const CartSummaryProductList = (props: Props) => {
	const { productList, promotionLineList } = props;

	return (
		<>
			{productList ? (
				// <ul className="cart__total-product-list">
				//   {productList &&
				//     productList.map((item) => (
				//       <li key={item.product_id} className="cart__total-product-list-item">
				//         <p className="cart__total-product-list-item-title">{item?.product_name || ""}</p>

				//         {(item?.variant.length || 0) > 0 ? (
				//           <span className="cart__total-product-list-variant">
				//             {item?.variant.map((variant) => ` ${variant.parentName} ${variant.name}`)}
				//           </span>
				//         ) : null}

				//         <ul className="cart__total-price-list">
				//           <li className="cart__total-price-list-item">
				//             {formatMoneyVND(item.price)} <RiCloseLine /> {item.product_qty}
				//           </li>

				//           <li className="cart__total-price-list-item-total cart__total-price-list-item">
				//             Thành tiền: {formatMoneyVND(item.price * item.product_qty)}
				//           </li>
				//         </ul>
				//       </li>
				//     ))}
				// </ul>

				<div className="">
					{productList?.map((item) => (
						<div key={item.product_id} className="flex items-start justify-between mb-12">
							<div className="">
								<p className="text-xs text-[13px] text-gray-color-4 flex items-center">
									<RiCloseLine /> {item.product_qty}
								</p>
							</div>

							<div className="flex-1 mx-8">
								<p className="text-xs text-[13px] text-gray-color-4">{item?.product_name || ""}</p>

								{(item?.variant.length || 0) > 0 ? (
									<span className="text-xs text-[13px] text-gray-color-4">
										{item?.variant.map((variant) => ` ${variant.parentName} ${variant.name}`)}
									</span>
								) : null}
							</div>

							<p className="text-xs text-[13px] text-gray-color-4 font-semibold">
								{formatMoneyVND(item.price)}
							</p>
						</div>
					))}
				</div>
			) : null}

			{promotionLineList ? (
				<ul className="cart__total-product-list">
					{promotionLineList &&
						promotionLineList.map((item, index) => {
							const {
								discount_line,
								id,
								is_line_promotion,
								is_promotion,
								name,
								price_unit,
								product_uom,
								qty,
							} = item;

							return (
								<li key={index} className="cart__total-product-list-item">
									<p className="cart__total-product-list-item-title">{item?.name || ""}</p>

									<ul className="cart__total-price-list">
										<li className=" cart__total-price-list-item">
											{formatMoneyVND(item.price_unit)} <RiCloseLine /> {qty}
										</li>

										{discount_line.type === "percentage" && discount_line.value ? (
											<li className="cart__total-price-list-item cart__total-price-list-item-deal">
												Giảm: {item.discount_line.value}%
											</li>
										) : null}

										{item.discount_line.type === "fixed" && item.discount_line.value ? (
											<li className=" cart__total-price-list-item cart__total-price-list-item-deal">
												Giảm: {formatMoneyVND(item.discount_line.value)}
											</li>
										) : null}

										<li className="cart__total-price-list-item-total cart__total-price-list-item">
											Thành tiền:{" "}
											{item.is_promotion
												? `0đ`
												: formatMoneyVND(
														discount_line.type === "percentage"
															? price_unit * qty * (1 - discount_line.value / 100)
															: price_unit * qty - discount_line.value
												  )}
										</li>

										{item.is_promotion ? (
											<li className=" cart__total-price-list-item">Hàng được tặng</li>
										) : null}
									</ul>
								</li>
							);
						})}
				</ul>
			) : null}
		</>
	);
};
