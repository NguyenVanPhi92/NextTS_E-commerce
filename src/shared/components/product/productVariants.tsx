import { ProductAttribute, Variant } from "@/models";
import produce from "immer";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";

interface ProductVariantProps {
	data: ProductAttribute[];
	activeVariants?: Variant[];
	onChange?: (_: Variant[]) => void;
}

export const ProductVariants = ({
	data,
	activeVariants: activeVariantProps = [],
	onChange,
}: ProductVariantProps) => {
	const [activeVariants, setActiveVariants] =
		useState<Variant[]>(activeVariantProps);


	const handleSelectVariant = (params: Variant) => {

		if (activeVariants?.some((item) => params?.parentId === item.parentId && item.id === params.id)) return
	  
		  const newVariants = produce(activeVariants, (draft) => {
			const index = draft?.findIndex((item) => item.parentId === params.parentId)
	  
			if (index !== -1) {
			  draft.splice(index, 1)
			}
	  
			draft.push(params)
		  })
	  
		  setActiveVariants(newVariants)
	  
		  if (newVariants?.length === data?.length) {
			onChange?.(newVariants)
		}
		
	};

	return (
		<>
			{data.map((item) => (
				<div key={item.id} className="product__variation">
					<p className="product__variation-heading">{item.name}</p>
					<ul className="product__variation-list">
						{item.values?.length > 0 &&
							item.values.map((child) => {
								const isActive = activeVariants?.some(
									(variant) =>
										variant.parentId === item.id && variant.id === child.id
								);

								return (
									<li
										onClick={() =>
											handleSelectVariant({
												id: child.id,
												name: child.name,
												parentId: item.id,
												parentName: item.name,
												price: child.price,
											})
										}
										key={child.id}
										className={`product__variation-list-item ${
											isActive ? "active" : ""
										}`}
									>
										{isActive ? (
											<span className="product__variation-list-item-icon">
												<BsCheck />
											</span>
										) : null}
										{child.name}
									</li>
								);
							})}
					</ul>
				</div>
			))}
		</>
	);
};
