import { Breadcrumb, HeaderMobile } from "@/components";
import { MainLayout } from "@/layout";
import React from "react";

const ChinhSachThanhToan = () => {
	const renderEmail = () => {
		return (
			<a className="forward-link" href="mailto:info@satavan.com">
				info@satavan.com
			</a>
		);
	};

	const renderWebSiteLink = () => {
		return (
			<a className="forward-link" href="https://satavan.com" target="_blank">
				https://satavan.com
			</a>
		);
	};
	return (
		<>
			<HeaderMobile centerChild={<p>Chính sách thanh toán</p>} />
			<div className="static__page-container">
				<div className="container">
					<Breadcrumb breadcrumbList={[{ name: "Chính sách thanh toán", path: "/" }]} />
					<div className="static__page">
						<div>
							<h1>Chính sách thanh toán</h1>
							<h3>
								Quý khách hàng đang sử dụng các Phần mềm quản lý bán hàng trong doanh nghiệp được
								phát hành bởi Công ty TNHH Tin học & Công nghệ thông tin Địa lý ITGIS vui lòng tuân
								thủ theo các điều khoản, quy định dưới đây để chúng tôi đảm bảo cung cấp những dịch
								vụ và chất lượng tốt nhất.
							</h3>
						</div>
						<div>
							<h3>
								Hình thức thanh toán: Quý khách hàng có 2 lựa chọn hình thức thanh toán:{" "}
								<strong>Chuyển khoản </strong> và
								<strong> Tiền mặt</strong>
							</h3>
						</div>
						<div>
							<h3>Quý khách hàng thanh toán phí thuê sử dụng phần mềm thông qua tài khoản: </h3>
							<p>
								<strong>CÔNG TY TNHH TIN HỌC & CÔNG NGHỆ THÔNG TIN ĐỊA LÝ</strong>
							</p>
							<p>
								<strong>
									Tài khoản số : 0441000675109 <br /> Ngân hàng: Vietcombank - Phòng giao dịch Tân
									Sơn Nhì, Thành phố Hồ Chí Minh.
								</strong>
							</p>
						</div>

						<div>
							<p>
								Đối với Quý khách hàng thanh toán bằng hình thức chuyển khoản, sau khi chuyển, vui
								lòng chụp ảnh màn hình đã chuyển thành công gửi cho nhân viên hỗ trợ của Satavan,
								ngay lập tức tài khoản sử dụng phần mềm của Quý khách hàng sẽ được kích hoạt (hoặc
								gia hạn).
							</p>
						</div>

						<div>
							<p>
								Quý khách hàng có thể thanh toán bằng tiền mặt ngay khi ký hợp đồng. Ngoài ra, với
								những khách hàng chưa ký kết hợp đồng, đang trong trạng thái đặt cọc để Satavan thực
								hiện thiết lập cấu hình hệ thống, thì có thể chuyển sang tài khoản cá nhân của công
								ty:
							</p>
							<p>
								<strong>
									TRẦN VĂN CƠ <br /> Tài khoản số: 060166675289 <br /> Ngân hàng: Saccombank - Chi
									nhánh Bình Tân, Thành phố Hồ Chí Minh.
								</strong>
							</p>
						</div>

						<p>Chi tiết, Quý khách hàng vui lòng liên hệ Hotline hỗ trợ: 093 6794 557</p>
						<p>Trân trọng!</p>
					</div>
				</div>
			</div>
		</>
	);
};

ChinhSachThanhToan.Layout = MainLayout;
export default ChinhSachThanhToan;
