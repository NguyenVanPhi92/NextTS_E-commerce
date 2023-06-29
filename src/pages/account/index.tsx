import { AccountContainer } from "@/container";
import { MainAuthLayout } from "@/layout";
import Link from "next/link";
import { BsFillHeartFill } from "react-icons/bs";
import { CgCalculator } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { useCart, useOrderHistory, useWishlist } from "shared/hook";

const AccountGeneral = () => {
	const { data: wishlists } = useWishlist(true);
	const { data: orderHistoryList } = useOrderHistory();
	const { cartLength } = useCart();

	return (
		<AccountContainer
			headerMobileTitle="Tài khoản"
			breadcrumbList={[{ path: "/account", name: "Tài khoản" }]}
			heading="Tổng quan"
		>
			<div className="account__general">
				<ul className="account__general-list">
					<li className="account__general-list-item">
						<Link href="/cart" passHref>
							<div>
								<span>
									<FaShoppingCart />
								</span>
								<h3>{cartLength || 0} Sản Phẩm</h3>
								<p>Trong giỏ hàng của bạn</p>
							</div>
						</Link>
					</li>

					<li className="account__general-list-item">
						<Link href="/account/wishlist" passHref>
							<div>
								<span>
									<BsFillHeartFill />
								</span>
								<h3>{wishlists?.length || 0} Sản Phẩm</h3>
								<p>Trong danh sách yêu thích</p>
							</div>
						</Link>
					</li>

					<li className="account__general-list-item">
						<Link href="/account/order-history" passHref>
							<div>
								<span>
									<CgCalculator />
								</span>
								<h3>{orderHistoryList?.list_booking?.length || 0} Đơn hàng</h3>
								<p>Bạn đã đặt hàng</p>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</AccountContainer>
	);
};

AccountGeneral.Layout = MainAuthLayout;

export default AccountGeneral;
