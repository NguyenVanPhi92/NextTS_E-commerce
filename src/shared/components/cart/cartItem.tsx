import { formatMoneyVND } from "@/helper";
import { CartItem as ICartItem } from "@/models";
import { API_URL } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { ImTerminal } from "react-icons/im";
import { MdOutlineClose } from "react-icons/md";

interface InterfaceCartItem {
	data: ICartItem;
	handleClose?: Function;
	onDelete: (props: ICartItem) => void;
	className?: string;
}

export const CartItem = ({
	data,
	handleClose,
	onDelete,
	className = "",
}: InterfaceCartItem) => {
	const path = data?.type === "combo" ? "/productCombo" : "/product";

	return (
		<div className={`cart__item ${className}`}>
			<div className="cart__item-image">
				<Link passHref href={`/${path}/${data.product_templ_id}`}>
					<div
						onClick={() => {
							handleClose && handleClose();
						}}
						className="image-container cart__item-image-wrapper cursor-pointer"
					>
						<Image
							src={`${API_URL}${data?.image_url?.[0] || ""}`}
							alt={data.product_name}
							className="image"
							layout="fill"
							quality={30}
						/>
					</div>
				</Link>
			</div>

			<div className="cart__item-info">
				<Link href={`/${path}/${data.product_templ_id}`} passHref>
					<a
						onClick={() => {
							handleClose && handleClose();
						}}
						className="cart__item-info-name"
					>
						{data.product_name}
					</a>
				</Link>

				{(data?.variant?.length || 0) > 0 ? (
					<span className="cart__item-info-type">
						{data?.variant.map((item) => ` ${item.parentName}: ${item.name}`)}
					</span>
				) : null}

				<div className="cart__item-info-bottom">
					<div className="cart__item-info-bottom-content">
						<p className="cart__item-info-bottom-quantity">
							{data.product_qty}
						</p>
						<MdOutlineClose />
						<p className="cart__item-info-bottom-price">
							{formatMoneyVND(data.price)}
						</p>
					</div>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onDelete && onDelete(data);
						}}
						className="btn-reset cart__item-btn-delete"
					>
						<BiTrash />
					</button>
				</div>
			</div>
		</div>
	);
};
