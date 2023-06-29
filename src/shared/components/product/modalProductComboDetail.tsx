import { RootState } from "@/core/store";
import { isObjectHasValue } from "@/helper";
import { setOpenModalProductCombo, setProductCombo } from "@/modules";
import { memo, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useProductComboDetail } from "shared/hook";
import { ProductDetailLoading } from "../common/loader";
import { Modal } from "../modal";
import { ProductComboDetail } from "./productComboDetail";

export const ModalProductComboDetail = memo(
	function ModalProductComboDetailChild() {
		const dispatch = useDispatch();
		const isOpenModalProductCombo = useSelector(
			(state: RootState) => state.common.isOpenModalProductCombo
		);
		const productComboProps = useSelector(
			(state: RootState) => state.combo.combo
		);
		const {
			data: productComboDetail,
			isValidating,
			clearProductCombo,
		} = useProductComboDetail({
			type: "modal",
			initialValue: productComboProps,
		});

		useEffect(() => {
			return () => {
				handleClose();
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const handleClose = () => {
			clearProductCombo();
			dispatch(setProductCombo(undefined));
			dispatch(setOpenModalProductCombo(false));
		};

		return (
			<>
				<Modal
					direction="center"
					isShowModal={isOpenModalProductCombo}
					handleClickModal={() => handleClose()}
				>
					{isValidating ? (
						<div className="container">
							<ProductDetailLoading />
						</div>
					) : productComboDetail && isObjectHasValue(productComboDetail) ? (
						<div className="modal__product ">
							<button
								onClick={() => handleClose()}
								className="btn-reset modal__product-btn-close"
							>
								<RiCloseCircleFill />
							</button>

							<ProductComboDetail productComboDetail={productComboDetail} />
						</div>
					) : null}
				</Modal>
			</>
		);
	}
);
