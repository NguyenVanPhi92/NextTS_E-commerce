import { HeaderLogin, HeaderMobile, OTP } from "@/components";
import { PasswordForm } from "@/components/form/passwordForm";
import { LoginLayout } from "@/layout/login";
import { setValidateCreatePasswordOTP } from "@/modules";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePassword } from "shared/hook";
import { RootState } from "../core";

const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { createPassword } = usePassword();
	const { isValidateCreatePasswordOTP, phoneNumber, currentToken } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		return () => {
			dispatch(setValidateCreatePasswordOTP(undefined));
		};
	}, []);

	const handleCreateNewPassword = ({
		newPassword,
		reNewPassword,
	}: {
		newPassword: string;
		reNewPassword: string;
	}) => {
		if (!phoneNumber || !currentToken) return;

		createPassword({
			password: newPassword,
			re_password: reNewPassword,
			phone: phoneNumber,
			handleSuccess: () => {
				router.push("/login");
			},
		});
	};

	return (
		<>
			<HeaderLogin title="Cập nhật số điện thoại" />
			<HeaderMobile centerChild={<p>Cập nhật số điện thoại</p>} />
			<div className="reset__password-container">
				<div className="container">
					<div className="reset__password">
						{isValidateCreatePasswordOTP ? (
							<div className="account__password">
								<PasswordForm
									type="createPassword"
									onSubmit={(data) => handleCreateNewPassword(data)}
								/>
							</div>
						) : (
							<OTP view="page" type="updatePhoneNumber" />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

ResetPasswordPage.Layout = LoginLayout;

export default ResetPasswordPage;
