import { Breadcrumb, HeaderMobile } from "@/components";
import { MainLayout } from "@/layout";
import React from "react";

const HopTacTraoDoi = () => {
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
			<HeaderMobile centerChild={<p>Hợp tác & Trao đổit</p>} />
			<div className="static__page-container">
				<div className="container">
					<Breadcrumb breadcrumbList={[{ name: "Hợp tác & Trao đổi", path: "/" }]} />

					<div className="static__page">
						<div>
							<h1>Hợp tác & Trao đổi</h1>
							<h3>
								Nhằm hợp tác, trao đổi để xây dựng một mạng lưới đối tác, tạo điều kiện thuận lợi để
								kinh doanh ngày một phát triển hơn, chúng tôi Giải pháp quản trị doanh nghiệp
								SATAVAN ({renderWebSiteLink()}) có chính sách về Quảng cáo - Trao đổi logo, liên kết
								trên Website.
							</h3>
						</div>
						<div>
							<h2>Trao đổi LOGO</h2>
							<p>
								- Hình thức trao đổi LOGO được áp dụng cho các nhà cung cấp sản phẩm có bán tại
								SATAVAN như sau: LOGO của đối tác được hiển thị trong trang đối tác chiến lược của
								SATAVAN, bên cạnh đó quý đối tác có thể đặt LOGO hoặc BANNER của chúng tôi lên vị
								trí thích hợp trên website do hai bên thỏa thuận.
							</p>
							<p>
								- Điều kiện trao đổi LOGO: phải là đối tác chiến lược hoặc là đối tác cung cấp sản
								phẩm bởi SATAVAN. Nếu không phải là đối tác chiến lược của SATAVAN, Website của quý
								đối tác phải có lượt truy cập lớn.
							</p>
							<p>
								- Trong thời gian trao đổi liên kết chúng tôi có thể ngưng và thông báo cho phía đối
								tác trước hai (02) ngày nếu chúng tôi thấy việc trao đổi không mang lại được hiệu
								quả (không mang lại lượt truy cập nào từ website của đối tác) hoặc website của quý
								đối tác vi phạm pháp luật Việt Nam.
							</p>
						</div>
						<div>
							<h2>Đặt BANNER</h2>
							<p>
								Hình thức đặt BANNER trên url {renderWebSiteLink()} được quy định như sau: Đối tác
								có thể đặt BANNER tại các vị trí Top của các danh mục hoặc trang chủ. Chúng tôi sẽ
								duyệt các BANNER trước khi đặt lên các vị trí do đối tác yêu cầu.
							</p>
							<h4>Điều kiện đặt banner:</h4>
							<p>
								- Là đối tác chiến lược của SATAVAN sẽ được đặt BANNER quảng cáo sản phẩm trong
								category tương ứng. Hình thức hợp tác sẽ được chúng tôi hoặc phía đối tác đề xuất
								thích hợp (ví dụ: tài trợ giảm giá bán sản phẩm cho khách hàng, thực hiện các chương
								trình khuyến mãi, tài trợ chi phí tổ chức các chương trình offline…).
							</p>
							<p>
								- Nếu không thuộc đối tác chiến lược của SATAVAN cũng có thể đặt banner trên các
								danh mục mong muốn nhưng chúng tôi sẽ thu phí quảng cáo dựa vào lượt truy cập (truy
								cập vào BANNER đối tác) hoặc dựa vào lượt xem (pageview trên website chúng tôi) mà
								quý khách nhận được khi đặt BANNER tại website {renderWebSiteLink()}. Chi phí quảng
								cáo vui lòng liên hệ với chúng tôi để biết thông tin chi tiết.
							</p>
						</div>

						<div>
							<h2>Trao đổi hoặc hỗ trợ đăng tin</h2>
							<p>
								Quý khách có thể đăng tin tại Website {renderWebSiteLink()} nếu muốn. Các thông tin
								liên quan vui lòng gởi cho chúng tôi bằng tập tin đính kèm qua email:{" "}
								{renderEmail()}, chúng tôi sẽ kiểm duyệt thông tin, nếu thấy phù hợp sẽ đăng tin
								trong vòng 24 giờ. Tin gởi của quý khách có thể được đăng hoặc không đăng vì một số
								lý do như vi phạm nguyên tắc website, tin không phù hợp,…và chúng tôi không có bất
								cứ trách nhiệm nào phải thông báo cho quý khách về thông tin không được đăng cũng
								như không có bất cứ cam kết nào từ việc đăng tải thông tin quý khách gởi cho chúng
								tôi.
							</p>
							<div>
								<p>Điều kiện về thông tin:</p>
								<div className="pl-8">
									<p>
										- Thông tin giới thiệu sản phẩm mới, sản phẩm công nghệ hoặc các thông tin liên
										quan đến thị trường cùng ngành.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

HopTacTraoDoi.Layout = MainLayout;
export default HopTacTraoDoi;
