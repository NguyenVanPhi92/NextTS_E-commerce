import { PasswordFormProps, Spinner } from "@/components";
import { PasswordForm } from "@/components/form/passwordForm";
import { AccountContainer } from "@/container";
import { RootState } from "@/core/store";
import { MainAuthLayout } from "@/layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { usePassword } from "shared/hook";

const Password = () => {
	const {
		data: hasPassword,
		createPassword,
		isValidating,
		mutate,
		changePassword,
	} = usePassword(true);
	const { userInfo: { phone = "" } = { userInfo: undefined }, token } = useSelector(
		(state: RootState) => state.user
	);
	const route = useRouter();

	const handleChangePassword = (data: PasswordFormProps) => {
		const { password, newPassword, reNewPassword } = data;

		if (hasPassword) {
			changePassword({
				old_password: password,
				password: newPassword,
				re_password: reNewPassword,
				handleSuccess: () => {
					route.push("/account/info");
				},
			});
		} else {
			createPassword({
				phone,
				password: newPassword,
				re_password: reNewPassword,
				handleSuccess: () => {
					mutate();
				},
			});
		}
	};

	return (
		<AccountContainer
			headerMobileTitle="Đổi mật khẩu"
			heading={hasPassword ? "Đổi mật khẩu" : "Tạo mật khẩu"}
			breadcrumbList={[
				{ path: "/account", name: "Tài khoản" },
				{ name: hasPassword ? "Đổi mật khẩu" : "Tạo mật khẩu", path: "" },
			]}
		>
			<div className="account__password-container">
				<div className="container">
					{isValidating ? (
						<Spinner />
					) : (
						<div className="account__password">
							<PasswordForm
								onSubmit={(data) => handleChangePassword(data)}
								type={hasPassword ? "changePassword" : "createPassword"}
							/>
						</div>
					)}
				</div>
			</div>
		</AccountContainer>
	);
};

Password.Layout = MainAuthLayout;

export default Password;
