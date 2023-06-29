import { RootState } from "@/core/store";
import { isObjectHasValue } from "@/helper";
import { setOpenModalProduct, setProduct as setProductStore } from "@/modules";
import { memo, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useProductDetail } from "shared/hook";
import { ProductDetailLoading } from "../common/loader";
import { Modal } from "../modal";
import { ProductDetail } from "./productDetail";

export const ModalProductDetail = memo(function ModalProductDetailChild() {
	const dispatch = useDispatch();
	const isOpenModalProduct = useSelector(
		(state: RootState) => state.common.isOpenModalProduct
	);
	const productProps = useSelector((state: RootState) => state.product.product);
	const {
		data: product,
		isValidating,
		clearProduct,
	} = useProductDetail({ type: "modal", initialValue: productProps });

	useEffect(() => {
		return () => {
			handleClose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClose = () => {
		clearProduct();
		dispatch(setProductStore(undefined));
		dispatch(setOpenModalProduct(false));
	};

	return (
		<>
			<Modal
				direction="center"
				isShowModal={isOpenModalProduct}
				handleClickModal={() => handleClose()}
			>
				{isValidating ? (
					<div className="container">
						<ProductDetailLoading />
					</div>
				) : product && isObjectHasValue(product) ? (
					<div className="modal__product ">
						<button
							onClick={() => handleClose()}
							className="btn-reset modal__product-btn-close"
						>
							<RiCloseCircleFill />
						</button>

						<ProductDetail type="modal" product={product} />
					</div>
				) : null}
			</Modal>
		</>
	);
});
