import { Breadcrumb, HeaderMobile } from "@/components";
import { MainLayout } from "@/layout";
import React from "react";

const ChinhSachBaoHanh = () => {
	return (
		<div className="static__page-container">
			<HeaderMobile centerChild={<p>Chính sách bảo hành</p>} />
			<div className="container">
				<Breadcrumb breadcrumbList={[{ name: "Chính sách bảo hành", path: "/" }]} />
				<div className="static__page">
					<div>
						<h1>Chính sách bảo hành</h1>
						<h4>
							Sản phẩm dịch vụ được phân phối tại SATAVAN.COM là sản phẩm chính hãng do công ty sản
							xuất và được hưởng chế độ bảo hành chính hãng tại Việt Nam. Vì thế, trong quá trình
							quý khách triển khai Giải pháp quản trị doanh nghiệp SATAVAN All in One thì chúng tôi
							sẽ hỗ trợ 24/24 cho quý khách khi hệ thống gặp sự cố. Ngoài ra, chúng tôi sẽ hướng dẫn
							quy trình nghiệp vụ cho quý khách theo lịch trình cố định. Tuỳ theo tính chất phức tạp
							của hệ thống, chúng tôi sẽ phân bổ thời gian hợp lý để tư vấn cho doanh nghiệp của quý
							khách hoạt động hiệu quả. Vui lòng tham khảo kỹ các điều khoản về bảo hành trên từng
							sản phẩm dịch vụ cụ thể khi ký kết hợp đồng. Dưới đây là Quy định chung và các điều
							khoản khác về bảo hành.
						</h4>
						<h4>
							Khi cần bảo hành sản phẩm hãy liên hệ với chúng tôi sớm nhất, chúng tôi sẽ có trách
							nhiệm hỗ trợ cải thiện tất cả các vấn đề quyết khách yêu cầu.
						</h4>
					</div>
					<div>
						<h3>Quy định chung:</h3>
						<p>
							1. Bảo hành sản phẩm là: khắc phục những lỗi phát sinh từ hệ thống trở về trạng thái
							hoạt động ban đầu.
						</p>
						<br />
						<p>
							2. Sản phẩm dịch vụ còn trong thời hạn bảo hành theo quy định của từng hãng sản xuất
							và từng thiết bị.
						</p>
						<br />
						<p>3. Có phiếu bảo hành/tem niêm phong của nhà sản xuất hoặc nhà phân phối.</p>
						<br />
						<p>4. Có hóa đơn mua hàng của SATAVAN.</p>
						<br />
						<p>
							5. Sản phẩm bảo hành sẽ tuân theo quy định bảo hành của từng chủng loại đối với các sự
							cố về mặt kỹ thuật.
						</p>
					</div>
					<div>
						<h3>Điều khoản loại trừ:</h3>
						<p>
							1. Sản phẩm dịch vụ đã quá thời hạn bảo hành ghi trên phiếu Bảo hành/tem niêm phong
							hoặc mất Phiếu Bảo hành (nếu có).
						</p>
						<br />
						<p>
							2. Những sản phẩm dịch vụ không thể xác định được nguồn gốc mua tại Satavan.com thì
							chúng tôi có quyền từ chối hỗ trợ bảo hành:
						</p>
						<div className="pl-8">
							<p>- Mất hóa đơn.</p>
							<p>- Tem niêm phong bảo hành bị rách, vỡ, hoặc bị sửa đổi.</p>
							<p>- Phiếu bảo hành (nếu có) không ghi rõ số Serial và ngày mua hàng.</p>
							<p>
								- Số serial trên sản phẩm và phiếu bảo hành không trùng khớp nhau hoặc không xác
								định được vì bất kỳ lý do nào.
							</p>
							<p>- Số serial trên sản phẩm dịch vụ không xác định được.</p>
						</div>
						<br />
						<p>
							3. Sản phẩm bị lỗi do sử dụng không đúng kỹ thuật theo hướng dẫn của nhà sản xuất.
						</p>
						<br />
						<p>
							4. Sản phẩm bị hư hỏng do tác động cơ học làm rơi, vỡ, va đập, trầy xước, móp méo, ẩm
							ướt, hoen rỉ, thấm nước.
						</p>
						<br />
						<p>
							5. Sản phẩm có dấu hiệu hư hỏng do chuột bọ hoặc côn trùng xâm nhập hoặc do hỏa hoạn,
							thiên tai gây nên.
						</p>
						<br />
						<p>
							6. Tự ý tháo dỡ, sửa chữa bởi các cá nhân hoặc kỹ thuật viên không được sự ủy quyền
							của Satavan.com.
						</p>
					</div>
					<p>Trân trọng cảm ơn quý khách hàng.</p>
				</div>
			</div>
		</div>
	);
};

ChinhSachBaoHanh.Layout = MainLayout;
export default ChinhSachBaoHanh;
