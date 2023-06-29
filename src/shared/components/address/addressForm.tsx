import { UserAddressSchema } from "@/core/schema";
import { RootState } from "@/core/store";
import { isObjectHasValue } from "@/helper";
import { AddressAdd, ShippingAddress, WardAddress } from "@/models";
import { setAddressForm, setOpenModalAddressForm } from "@/modules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "reapop";
import { useAddress, useUserAddress } from "shared/hook";
import { OptionType } from "../../../models/common";
import { InputField, SelectField, TextareaField } from "../form";

interface AddForm {
	street: string;
	phone: string;
	name: string;
}

export const AddressForm = () => {
	const dispatch = useDispatch();
	const { addAddress } = useUserAddress(false);
	const { addressForm } = useSelector((state: RootState) => state.common);
	const { userInfo: { id: partner_id = 0 } = { userInfo: undefined }, token } = useSelector(
		(state: RootState) => state.user
	);

	// useForm
	const {
		control,
		handleSubmit,
		getValues,
		resetField,
		formState: { isValid },
	} = useForm({
		resolver: yupResolver(UserAddressSchema),
		mode: "all",
	});

	// Get Address from custom hook
	const { districts, getDistricts, getWards, states, wards, clearAddressList } = useAddress();

	// khu vực
	const [ward, setWard] = useState<WardAddress | undefined>(() =>
		addressForm
			? ({
					country_id: addressForm.country_name_id,
					country_name: addressForm.country_id,
					district_id: addressForm.district_name_id,
					district_name: addressForm.district_id,
					state_id: addressForm.state_name_id,
					state_name: addressForm.state_id,
					id: addressForm.ward_name_id,
					name: addressForm.ward_id,
			  } as WardAddress)
			: undefined
	);

	useEffect(() => {
		if (addressForm) {
			if (typeof addressForm.state_name_id === "number") {
				getDistricts(addressForm.state_name_id);
			}
			if (typeof addressForm.district_name_id === "number") {
				getWards(addressForm.district_name_id);
			}
		}

		return () => {
			if (addressForm) dispatch(setAddressForm(undefined));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSelectState = (val: OptionType<number>) => {
		getDistricts(val.value);

		if (getValues("district") || getValues("ward")) {
			resetField("district");
			resetField("ward");
		}
	};

	const handleSelectDistrict = (district: OptionType<number>) => {
		getWards(district.value);

		if (ward) {
			if (ward?.district_id === district.value) {
				dispatch(notify("Vui lòng chọn lại Phường / Xã", "warning"));
				setWard(undefined);
			}
		}
	};

	const handleAddAddress = (info: any) => {
		if (!ward) {
			dispatch(dispatch(notify("Vui lòng chọn lại địa chỉ", "warning")));
			return;
		}

		const newAddress: AddressAdd = {
			partner_id,
			adress_id: addressForm?.id || false,
			address_new: {
				name: info.name,
				phone: info.phone,
				street: info.street,
				state_id: info.state.value,
				district_id: info.district.value,
				ward_id: info.ward.value,
				country_id: info.country_id,
			},
		};

		const addressRes: ShippingAddress = {
			...info,
			full_adress: `${info.street}, ${info.ward.value}, ${info.district.value},
               ${info.state.value}, ${ward.country_name || "Việt Nam"}`,
			country_name_id: ward.country_id,
			id: addressForm?.id || 0,
			country_id: ward.country_name,
			district_name_id: info?.district.label,
			district_id: info?.district.value,
			state_name_id: info?.state.label,
			state_id: info?.state.value,
			ward_id: info?.ward.value,
			ward_name_id: info?.ward.label,
		};

		addAddress({ address: newAddress, addressForm: addressRes }).then(() => {
			dispatch(setOpenModalAddressForm(false));
			clearAddressList();
			setAddressForm(undefined);
		});
	};

	return (
		<section className="address__form">
			<div className="address__form-body">
				<form className="address__form-body-form" onSubmit={handleSubmit(handleAddAddress)}>
					<div className="address__form-body-form-two">
						<InputField control={control} placeholder="Họ & Tên" type="text" name="name" />
						<InputField control={control} placeholder="Số điện thoại" type="text" name="phone" />
					</div>

					<div className="form-item-inline form-item-inline-dropdown">
						<SelectField
							control={control}
							onChange={(val) => handleSelectState(val)}
							placeholder="Tỉnh thành phố"
							name="state"
							options={states?.map((item) => ({
								label: item.name,
								value: item.id,
							}))}
						/>
					</div>

					<div className="form-item-inline form-item-inline-dropdown dropdown-40">
						<SelectField
							value={getValues("district") || null}
							control={control}
							onChange={(val) => {
								handleSelectDistrict(val);
								if (getValues("ward")) resetField("ward");
							}}
							placeholder={"Quận / Huyện"}
							name="district"
							options={districts?.map((item) => ({
								label: item.name,
								value: item.id,
							}))}
						/>
					</div>

					<div className="form-item-inline form-item-inline-dropdown dropdown-30">
						<SelectField
							value={getValues("ward") || null}
							control={control}
							onChange={(val) => {
								setWard(val.value);
							}}
							placeholder="Phường / Xã"
							name="ward"
							options={wards?.map((item) => ({
								label: item.name,
								value: item.id,
							}))}
						/>
					</div>

					<TextareaField
						control={control}
						placeholder={"Ví dụ: 52, đường Trần Hưng Đạo"}
						name="street"
						id="detailAddress"
					/>

					<button
						type="submit"
						className={`btn-primary btn-save ${!isValid || !ward ? "btn-disabled" : ""}`}
					>
						{`${isObjectHasValue(addressForm) ? "Lưu" : "Thêm"}`}
					</button>
				</form>
			</div>
		</section>
	);
};
