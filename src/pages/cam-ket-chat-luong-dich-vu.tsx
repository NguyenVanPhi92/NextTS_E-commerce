import { Breadcrumb, HeaderMobile } from "@/components";
import { MainLayout } from "@/layout";
import React from "react";

const CamKetChatLuongDichVu = () => {
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
			<HeaderMobile centerChild={<p>Cam kết chất lượng dịch vụ</p>} />
			<div className="static__page-container">
				<div className="container">
					<Breadcrumb breadcrumbList={[{ name: "Cam kết chất lượng dịch vụ", path: "/" }]} />
					<div className="static__page">
						<div>
							<h1>Cam kết chất lượng dịch vụ</h1>
						</div>
						<div>
							<h2>1. Cam kết</h2>
							<p>
								Chất lượng dịch vụ quyết định sự thành công của doanh nghiệp, để doanh nghiệp phát
								triển thì lãnh đạo doanh nghiệp phải cam kết chất lượng tuyệt đối của sản phẩm khi
								đi đến tay người dùng. Đối với hệ thống phần mềm quản lý bán hàng theo quy trình:
								Marketing tiếp thị - Kinh doanh – Triển khai – Đào tạo – Hỗ trợ bảo hành bảo trì hệ
								thống phần mềm.
							</p>
							<h1>ĐỒNG HÀNH CÙNG PHÁT TRIỂN VỚI KHÁCH HÀNG!</h1>
						</div>

						<div>
							<h2>2. Cam kết Marketing tiếp thị - Kinh doanh</h2>
							<p>
								Marketing tiếp thị: Cung cấp các thông điệp truyền thông chính xác cho khách hàng,
								hỗ trợ nghiên cứu các nguồn kiến thức mới để cho khách hàng cập nhật mỗi ngày. Kinh
								doanh: Không có khách hàng bằng mọi giá, thuyết phục dựa trên mục tiêu khách hàng và
								Satavan cùng mục tiêu chung, dựa trên kết quả hoạt động kinh doanh của khách hàng.
							</p>
						</div>

						<div>
							<h2>3. Cam kết dịch vụ triển khai</h2>
							<p>
								Phân tích: Phân tích yêu cầu của khách hàng, đưa ra mô hình phù hợp với doanh
								nghiệp.
							</p>
							<br />
							<p>
								Phát triển: Phát triển các phân hệ - chức năng – tiện ích theo yêu cầu đặt thù của
								từng khách hàng.
							</p>
							<br />
							<p>
								Hỗ trợ: Ghi nhận & hướng dẫn khách hàng làm dữ liệu Masterdata để import lên hệ
								thống, chuẩn hoá dữ liệu.
							</p>
							<br />
							<p>
								Đào tạo: Đào tạo Online & Offline để đảm bảo khách hàng sử dụng thành thạo và khai
								thác được tất cả lợi ích của phần mềm.
							</p>
						</div>

						<div>
							<h2>4. Cam kết dịch vụ hỗ trợ bảo hành</h2>
							<p>
								Cập nhật: Satavan cập nhật hệ thống liên tục để cho khách hàng luôn có trải nghiệm
								tốt nhất.
							</p>
							<br />
							<p>
								Hỗ trợ: Hỗ trợ kịp thời xử lý các nghiệp vụ vướng mắc trong quá trình sử dụng phần
								mềm phục vụ kinh doanh bán hàng của khách.
							</p>
							<br />
							<p>
								Lỗi: Tất cả lỗi được ghi nhận thông qua hệ thống Helpdesk, với những lỗi nghiêm
								trọng ảnh hưởng đến quá trình kinh doanh bán hàng sẽ được xử lý nhanh chóng trong
								ngày.
							</p>
						</div>
						<div>
							<h2>5. Cam kết đồng hành với khách hàng</h2>
							<p>
								Sau hơn 08 năm nghiên cứu và phát triển, Satavan luôn tập trung vào phát triển các
								giải pháp phần mềm trong doanh nghiệp. Nhằm giúp cho doanh nghiệp có lợi thế cạnh
								tranh so với các đối thủ trên thị trường. Chúng tôi nỗ lực mỗi ngày, cải tiến chất
								lượng sản phẩm nhằm gia tăng trải nghiệm & phục vụ quá trình mở rộng kinh doanh của
								khách hàng.
							</p>
						</div>
						<p>Trân trọng cảm ơn!</p>
					</div>
				</div>
			</div>
		</>
	);
};

CamKetChatLuongDichVu.Layout = MainLayout;
export default CamKetChatLuongDichVu;
