import { OptionType } from "@/models";

export const notifications = [{}];

interface PasswordFormDataProps {
	label: string;
	name: "password" | "newPassword" | "reNewPassword";
}

export const passwordFormData: PasswordFormDataProps[] = [
	{
		label: "Mật khẩu cũ",
		name: "password",
	},
	{
		label: "Mật khẩu mới",
		name: "newPassword",
	},
	{
		label: "Xác nhận mật khẩu",
		name: "reNewPassword",
	},
];

export const createPasswordFormData: PasswordFormDataProps[] = [
	{
		label: "Mật khẩu mới",
		name: "newPassword",
	},
	{
		label: "Xác nhận mật khẩu",
		name: "reNewPassword",
	},
];

export const dataGender: OptionType<string>[] = [
	{ label: "Nam", value: "male" },
	{ label: "Nữ", value: "female" },
];
