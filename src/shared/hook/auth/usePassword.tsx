import { RootState } from "@/core/store";
import { ResetPassword } from "@/models";
import { setOpenScreenLoading } from "@/modules";
import userApi from "@/services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "reapop";
import useSWR, { KeyedMutator } from "swr";

interface ChangePasswordProps {
	handleSuccess: Function;
	password: string;
	re_password: string;
	old_password: string;
}

interface CreatePasswordProps extends ResetPassword {
	handleSuccess: Function;
}

interface UsePasswordRes {
	data: boolean;
	isValidating: boolean;
	createPassword: (props: CreatePasswordProps) => void;
	changePassword: (props: ChangePasswordProps) => void;
	mutate: KeyedMutator<any>;
}

export const usePassword = (shouldFetch = false): UsePasswordRes => {
	const dispatch = useDispatch();
	const { currentToken } = useSelector((state: RootState) => state.auth);
	const { token, userInfo: { phone = "" } = { userInfo: undefined } } =
		useSelector((state: RootState) => state.user);

	const { data, isValidating, mutate } = useSWR(
		"check_password",
		shouldFetch && token
			? () =>
					userApi.checkPassword().then((res: any) => {
						if (res?.result?.success) {
							return res.result.data.has_pass;
						}
						return false;
					})
			: null,
		{
			revalidateOnFocus: false,
			shouldRetryOnError: false,
		}
	);

	const createPassword = async (props: CreatePasswordProps) => {
		const { password, handleSuccess, re_password, phone } = props;
		if ((!token && !currentToken) || !password || !re_password || !phone)
			return;
		dispatch(setOpenScreenLoading(true));

		try {
			const res: any = await userApi.resetPassword({
				password,
				re_password,
				phone,
			});
			dispatch(setOpenScreenLoading(false));

			if (res?.result?.success) {
				handleSuccess();
				dispatch(notify("Tạo mật khẩu thành công!", "success"));
			} else {
				dispatch(
					notify(
						res?.result?.message || "Tạo mật khẩu không thành công",
						"error"
					)
				);
			}
		} catch (error) {
			dispatch(setOpenScreenLoading(false));
		}
	};

	const changePassword = async (props: ChangePasswordProps) => {
		const { password, handleSuccess, re_password, old_password } = props;
		if (!token || !password || !re_password || !phone) return;
		dispatch(setOpenScreenLoading(true));

		try {
			const res: any = await userApi.changePassword({
				password,
				re_password,
				old_password,
			});
			dispatch(setOpenScreenLoading(false));

			if (res?.result?.success) {
				handleSuccess();
				dispatch(notify("Đổi mật khẩu thành công", "success"));
			} else {
				dispatch(
					notify(
						res?.result?.message || "Đổi mật khẩu không thành công",
						"error"
					)
				);
			}
		} catch (error) {
			dispatch(setOpenScreenLoading(false));
		}
	};

	return {
		createPassword,
		data,
		isValidating,
		mutate,
		changePassword,
	};
};
