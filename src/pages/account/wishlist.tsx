/* eslint-disable @next/next/no-img-element */
import { Purchase, WishlistTable } from "@/components";
import { AccountContainer } from "@/container";
import { MainAuthLayout } from "@/layout";

const WishlistPage = () => {
	return (
		<AccountContainer
			headerMobileTitle=""
			breadcrumbList={[
				{ path: "/account", name: "Tài khoản" },
				{ name: "Danh sách yêu thích", path: "" },
			]}
			heading="Danh sách yêu thích"
		>
			<WishlistTable />
		</AccountContainer>
	);
};

WishlistPage.Layout = MainAuthLayout;

export default WishlistPage;
