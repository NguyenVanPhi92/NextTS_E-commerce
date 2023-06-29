/* eslint-disable @next/next/no-img-element */
import { InputImage } from "@/components/inputs/inputImage";
import { ratingProductSchema } from "@/core/schema";
import { isObjectHasValue } from "@/helper";
import {
	DeleteRatingProps,
	ForwaredResetForm,
	PurchasedProduct,
	TagRating,
	UpdateRatingProps,
} from "@/models";
import { setOpenModalConfirm } from "@/modules";
import ratingApi from "@/services/ratingApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Spinner, Tag } from "../../common";
import { Star } from "../../common/star";
import { ModalConfirm } from "../../modal/modalConfirm";
import { RatingFormImagePicker } from "./ratingFormImagePicker";

interface RatingFormProps {
	onAddRating: (props: UpdateRatingProps) => void;
	initialValue: PurchasedProduct;
	showFooter?: boolean;
	onDeleteRating?: (props: DeleteRatingProps) => void;
}

export const RatingForm = forwardRef(function RatingFormChild(
	{ onAddRating, initialValue, showFooter = true, onDeleteRating }: RatingFormProps,
	ref: ForwaredResetForm
) {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
		setValue,
		control,
		watch,
	} = useForm<UpdateRatingProps>({
		resolver: yupResolver(ratingProductSchema),
		defaultValues: undefined,
	});

	useImperativeHandle(ref, () => ({
		onReset: reset,
	}));

	console.log(errors);

	const { data: ratingTags, isValidating: isRatingTagsLoading } = useSWR<TagRating[] | undefined>(
		initialValue?.product?.product_id ? `get_rating_tags` : null,
		() =>
			ratingApi
				.getRatingTags({ product_id: initialValue?.product?.product_id })
				.then((res: any) => res?.result || [])
	);

	const onSubmitHandler = handleSubmit((data) => {
		console.log({
			...data,
			tag_ids: data?.tag_ids?.length ? data.tag_ids.map((item) => Number(item)) : [],
		});
	});

	const handleDeleteCommentRating = () => {
		initialValue?.history_line_id &&
			initialValue?.product &&
			onDeleteRating &&
			onDeleteRating({
				history_line_id: initialValue.history_line_id,
				product_id: initialValue.product.product_id,
			});
	};

	const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !initialValue?.product?.product_id) return;
	};

	const handleToggleTag = (tagId: number) => {
		const tags = getValues("tag_ids") || [];

		if (tags?.includes(tagId)) {
			setValue(
				"tag_ids",
				[...tags].filter((id) => id != tagId)
			);
		} else {
			setValue("tag_ids", [...tags, tagId]);
		}
	};

	const handleShowConfirmDeleteRating = () => {
		dispatch(
			setOpenModalConfirm({
				isOpen: true,
				title: "Nếu đồng ý, bạn sẽ xóa đi đánh giá này",
			})
		);
	};

	return (
		<>
			<form onSubmit={onSubmitHandler} className="rating__form-form">
				<div className="rating__form-container">
					{/* body */}
					<div className="rating__form">
						<div className="rating__form-star">
							<Controller
								control={control}
								name="star_rating"
								render={({ field: { onBlur, name, onChange } }) => (
									<Star
										initialValue={getValues("star_rating")}
										allowHover={false}
										onClick={(val: number) => {
											onChange(val / 20);
										}}
										ratingValue={0}
										size={35}
										iconsCount={5}
									/>
								)}
							/>
						</div>

						<div className="rating__form-wrapper">
							{isRatingTagsLoading ? (
								<Spinner />
							) : (
								<div className="rating__form-tags">
									{ratingTags?.map((item: TagRating) => (
										<Tag
											key={item.tag_id}
											id={item.tag_id}
											name={item.tag_content}
											onChange={() => handleToggleTag(item.tag_id)}
											isActive={getValues("tag_ids")?.includes(item.tag_id)}
										/>
									))}
								</div>
							)}

							<textarea
								placeholder="Nhập nội dung đánh giá..."
								rows={4}
								{...register("content")}
							></textarea>

							{!showFooter ? (
								<button
									type="submit"
									className={`btn-primary ${isObjectHasValue(errors) ? "btn-disabled" : ""}`}
								>
									Thêm đánh giá
								</button>
							) : null}

							<InputImage productId={initialValue?.product?.product_id} />

							<RatingFormImagePicker
								productId={initialValue?.product?.product_tmpl_id}
								onChange={(val) => {
									setValue("image_ids", val);
								}}
							/>
						</div>
					</div>
				</div>
			</form>

			{showFooter ? (
				<footer className="rating__form-footer">
					<button
						onClick={() => {
							// handleClearRatingForm()
							// onCloseModal && onCloseModal()
						}}
						className="btn-primary"
					>
						Trở lại
					</button>

					{initialValue?.comment_rating?.comment_id ? (
						<button
							onClick={handleShowConfirmDeleteRating}
							className="btn-primary rating__form-footer-danger-btn"
						>
							Xóa đánh giá
						</button>
					) : null}

					<button
						onClick={onSubmitHandler}
						className={`btn-primary ${isObjectHasValue(errors) ? "btn-disabled" : ""}`}
					>
						Hoàn thành
					</button>
				</footer>
			) : null}

			<ModalConfirm onConfirm={handleDeleteCommentRating} />
		</>
	);
});
