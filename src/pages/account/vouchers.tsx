import { cartEmptyIcon } from "@/assets";
import { PromotionItem, Spinner } from "@/components";
import { AccountContainer } from "@/container";
import { MainAuthLayout } from "@/layout";
import { useRouter } from "next/router";
import { usePromotion } from "shared/hook";

const AccountGeneral = () => {
	const router = useRouter();
	const { data: promotionList, isValidating } = usePromotion();

	return (
		<AccountContainer
			headerMobileTitle="Kho voucher"
			breadcrumbList={[{ path: "/account", name: "kho voucher" }]}
			heading="Kho voucher"
		>
			<div className="">
				{isValidating && promotionList?.length === 0 ? <Spinner /> : null}

				{!isValidating && !promotionList?.length ? (
					<div className="flex flex-col items-center gap-24">
						{cartEmptyIcon}

						<p className="text-sm">Danh sách voucher của bạn hiện đang trống </p>
					</div>
				) : null}

				<ul className="grid grid-cols-1 md:grid-cols-2 gap-24">
					{promotionList?.length > 0
						? promotionList.map(
								(promo) =>
									promo.promotion_id && (
										<div key={promo.promotion_id} onClick={() => router.push("/category")}>
											<PromotionItem promotion={promo} />
										</div>
									)
						  )
						: null}
				</ul>
			</div>
		</AccountContainer>
	);
};

AccountGeneral.Layout = MainAuthLayout;

export default AccountGeneral;
