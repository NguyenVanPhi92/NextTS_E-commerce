/* eslint-disable react/no-unescaped-entities */
import { Breadcrumb, HeaderMobile } from "@/components";
import { MainLayout } from "@/layout";
import { satavanRoadMap } from "@/assets";
import Image from "next/image";

const GioiThieu = () => {
	return (
		<section className="static__page-container">
			<HeaderMobile centerChild={<p>Giới thiệu</p>} />
			<section className="container">
				<Breadcrumb breadcrumbList={[{ name: "Giới thiệu", path: "/" }]} />
				<div className="static__page">
					<div>
						<h1>Giới thiệu về Satavan</h1>
						<h3>
							Công ty TNHH Tin học & Công nghệ thông tin Địa lý ITGIS thành lập từ tháng 09 năm 2014
							do sở kế hoạch và đầu tư thành phố Hồ Chí Minh cấp. Lĩnh vực hoạt động chính:
						</h3>
						<div className="pl-16">
							<p>1. Tư vấn & Thiết kế giải pháp quản trị doanh nghiệp tổng thể ERP</p>
							<br />
							<p>2. Xây dựng hệ thống ERP theo yêu cầu</p>
							<br />
							<p>3. Cung cấp phần mềm doanh nghiệp dịch vụ SAAS</p>
							<br />
							<p>4. Cung cấp phần mềm kênh phân phối DMSPlus SAAS</p>
							<br />
							<p>5. Thiết kế & xây dựng App theo yêu cầu doanh nghiệp</p>
							<br />
							<p>6. Cung cấp dịch vụ App bán hàng B2B2C</p>
							<br />
							<p>7. Cung cấp dịch vụ Website bán hàng B2B2C</p>
							<br />
							<p>8. Cung cấp giải pháp bán hàng đa kênh Omnichannel</p>
							<br />
							<p>9. Cung cấp hệ thống bán hàng tại quầy POS</p>
							<br />
							<p>10. Liên kết với các đơn vị thứ 3: Thanh toán – Vận chuyển</p>
						</div>
					</div>

					<div>
						<h2>Tầm nhìn</h2>
						<p>
							SATAVAN cam kết cung cấp các giải pháp và dịch vụ công nghệ thông tin toàn diện, luôn
							đổi mới sáng tạo hệ giá trị cho khách hàng, mang lại niềm vui & sự hạnh phúc cho tất
							cả các cộng sự, đóng góp sự phát triển thịnh vượng cho cộng đồng.
						</p>
					</div>

					<div>
						<h2>Sứ mệnh</h2>
						<p>Thị trường: Cung cấp các sản phẩm – dịch vụ chất lượng quốc tế</p>
						<br />
						<p>Cổ đông & Đối tác: Hợp tác cùng phát triển, tạo nên hệ giá trị bền vững</p>
						<br />
						<p>Nhân sự: Môi trường làm việc chuyên nghiệp, sáng tạo</p>
						<br />
						<p>Xã hội: Nỗ lực làm việc để phụng sự cộng đồng</p>
					</div>

					<div>
						<h2>Giá trị cốt lõi</h2>
						<div>
							<h3>1. Khách hàng là trọng tâm</h3>
							<p>
								"Khách hàng là người trả lương cho chúng ta, trong mọi tình huống khách hàng phải
								được tôn trọng". Do đó, tất cả các bộ phận trong Satavan đều có nghĩa vụ, trách
								nhiệm mang lại lợi ích và làm khách hàng hài lòng ngoài sự mong đợi.
							</p>
							<p>
								Tất cả các sản phẩm dịch vụ của Satavan cải tiến không ngừng để đáp ứng nhu cầu ngày
								càng khó tính của khách hàng.
							</p>
						</div>
						<div>
							<h3>2. Tiêu chí làm việc của Satavan</h3>
							<p>
								Nhân sự luôn được trao cơ hội phát huy năng lực, phát triển bản thân để cùng thành
								công với công ty. Có chung niềm tin và mục tiêu vì sự phát triển thịnh vượng.
							</p>
						</div>
						<div>
							<h3>3. Năng động & Sáng tạo</h3>
							<p>
								Ngành công nghệ thông tin với tốc độ thay đổi chóng mặt. Vì thế, Satavan không bao
								giờ hài lòng, thoả mãn với kết quả đạt được. Tất cả nhân sự Satavan luôn học hỏi
								nghiên cứu để áp dụng vào các sản phẩm dịch vụ công ty mỗi ngày.
							</p>
						</div>
						<div>
							<h3>4. Chia sẻ lợi ích – Hợp tác lâu dài</h3>
							<p>
								Tại Satavan, chúng tôi gắn liền lợi ích cá nhân với tập thể, giữa công ty với lợi
								ích khách hàng. Cùng chia sẻ cơ hội hợp tác tốt nhất với đối tác nhằm phát huy tối
								đa lợi ích song phương giữa các bên.
							</p>
						</div>
					</div>

					<div>
						<h2>Lộ trình phát triển của Satavan</h2>
						<div className="relative w-full min-h-[400px] shadow-md">
							<Image src={satavanRoadMap} layout="fill" alt="" objectFit="fill" />
						</div>
						<h4>
							Năm 2014: Thành lập Công ty ITGIS, cung cấp dịch vụ bản đồ số trong ngành Trắc địa.
						</h4>
						<br />
						<h4>
							Năm 2015: Nhận thấy cơ hội số hoá doanh nghiệp, ITGIS quyết định tạm dừng mảng dịch vụ
							Bản đồ số, bắt đầu gia công hệ thống ERP cho doanh nghiệp.
						</h4>
						<br />
						<h4>
							Năm 2019: Thương hiệu Satavan ra đời, chuyển hướng dịch vụ từ Gia công hệ thống chuyển
							giao công nghệ, chúng tôi chuyển sang hình thức đóng gói sản phẩm SAAS, cung cấp cho
							doanh nghiệp theo hình thức “Thuê bao”.
						</h4>
						<br />
						<h4>
							Năm 2022: Chúng tôi chuyển đổi loại hình doanh nghiệp từ công ty trách nhiệm hữu hạn
							sang Công ty cổ phần.
						</h4>
					</div>
				</div>
			</section>
		</section>
	);
};

GioiThieu.Layout = MainLayout;
export default GioiThieu;
