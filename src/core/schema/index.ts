import { PHONE_SCHEMA } from "@/helper";
import * as Yup from "yup";

export const UserAddressSchema = Yup.object().shape({
	phone: Yup.string()
		.matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
		.required("Vui lòng nhập số điện thoại"),
	state: Yup.object()
		.shape({
			value: Yup.number().required(),
			label: Yup.string().required(),
		})
		.required("Vui lòng chọn điạ tỉnh thành phố"),
	district: Yup.object()
		.shape({
			value: Yup.number().required(),
			label: Yup.string().required(),
		})
		.required("Vui lòng chọn điạ chỉ quận huyện"),
	ward: Yup.object()
		.shape({
			value: Yup.number().required(),
			label: Yup.string().required(),
		})
		.required("Vui lòng chọn điạ chỉ phường xã"),
	name: Yup.string().min(2, "Tên không hợp lệ").required("Vui lòng nhập Họ Tên"),
	street: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
});

export const ratingProductSchema = Yup.object().shape({
	star_rating: Yup.number().oneOf([1, 2, 3, 4, 5]).required(),
	content: Yup.string().required(),
	tag_ids: Yup.array().of(Yup.string()).optional(),
	image_ids: Yup.array()
		.of(
			Yup.object({
				url: Yup.string().required(),
				id: Yup.number().required(),
			})
		)
		.optional(),
	attachment_ids: Yup.array()
		.of(
			Yup.object({
				url: Yup.string().required(),
				id: Yup.number().required(),
			})
		)
		.optional(),
});

export const phoneNumberSchema = Yup.object().shape({
	phoneNumber: Yup.string()
		.matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
		.required("Vui lòng nhập số điện thoại"),
});

export const createPasswordSchema = Yup.object().shape({
	newPassword: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.required("Vui lòng nhập mật khẩu"),
	reNewPassword: Yup.string().oneOf([Yup.ref("newPassword")]),
});

export const productReviewSchema = Yup.object().shape({
	message: Yup.string().required("Vui lòng nhập bình luận"),
});

export const changePasswordSchema = Yup.object().shape({
	password: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.required("Vui lòng nhập mật khẩu"),
	newPassword: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.required("Vui lòng nhập mật khẩu"),
	reNewPassword: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận phải trùng với mật khẩu mới")
		.required("Vui lòng nhập mật khẩu xác nhận"),
});

export const passwordSchema = Yup.object().shape({
	password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const loginSchema = Yup.object().shape({
	phone: Yup.string()
		.matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
		.required("Vui lòng nhập số điện thoại"),
	password: Yup.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.required("Vui lòng nhập mật khẩu"),
});

export const userInfoSchema = Yup.object().shape({
	phone: Yup.string()
		.matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
		.required("Vui lòng nhập số điện thoại"),
	email: Yup.string().matches(
		/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
		"Vui lòng nhập đúng định dạng email"
	),
	name: Yup.string()
		.min(2, "Tên phải có tối thiểu 2 ký tự")
		.max(30, "Tên không vượt quá 30 ký tự")
		.required("Vui lòng nhập tên"),
	sex: Yup.string().oneOf(["male", "female"]).required("Vui lòng chọn giới tính"),
});

export const messageSchema = Yup.object().shape({
	message: Yup.string().required("Vui lòng nhập bình luận"),
});
