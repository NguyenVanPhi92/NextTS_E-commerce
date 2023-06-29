import { avatar as avatarBlank } from "@/assets";
import { RootState } from "@/core/store";
import { selectOrderProductList, setOpenCartModal } from "@/modules";
import { API_URL } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "shared/hook";
import { HeaderMobile } from "../header";

export const HomeHeaderMobile = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { cartLength } = useCart();
	const token = useSelector((state: RootState) => state.user.token);
	const avatar = useSelector((state: RootState) => state.user.userInfo?.avatar);

	return (
		<HeaderMobile
			showSearchInput
			rightChild={
				<>
					{token ? (
						<Link passHref href="/account">
							<div className="image-container">
								<Image
									src={avatar ? `${API_URL}${avatar}` : avatarBlank}
									alt=""
									layout="fill"
									className="image"
									objectFit="cover"
								/>
							</div>
						</Link>
					) : (
						<button
							onClick={() => router.push(`/${token ? "account" : "login"}`)}
							className="btn-reset header__main-top-actions-icon-mobile"
						>
							<AiOutlineUser />
						</button>
					)}

					<button
						onClick={() => dispatch(setOpenCartModal(true))}
						className="btn-reset header__main-top-actions-icon-mobile"
					>
						<BiCart />
						<span className="cart__quantity-absolute">{cartLength || 0}</span>
					</button>
				</>
			}
		/>
	);
};
