import { Breadcrumb, HeaderMobile } from "@/components";
import { MainLayout } from "@/layout";
import React from "react";

const ChinhSachBaoMat = () => {
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
			<HeaderMobile centerChild={<p>Chính sách bảo mật</p>} />
			<div className="static__page-container">
				<div className="container">
					<Breadcrumb breadcrumbList={[{ name: "Chính sách bảo mật", path: "/" }]} />

					<div className="static__page">
						<div className="">
							<h1> CHÍNH SÁCH BẢO MẬT</h1>
							<h2> CHÍNH SÁCH BẢO MẬT THÔNG TIN</h2>
							<p>
								Riêng tư của khách hàng vô cùng quan trọng với Giải pháp quản trị doanh nghiệp
								SATAVAN All in One, vì thế chúng tôi chỉ sử dụng thông tin cá nhân của quý khách vào
								những trường hợp nêu ra sau đây:
							</p>
							<p>
								Bảo vệ dữ liệu là vấn đề của sự tin tưởng và bảo mật danh tính của quý khách vô cùng
								quan trọng với chúng tôi. Vì thế, chúng tôi chỉ sẽ sử dụng tên và một số thông tin
								khác của quý khách theo cách được đề ra trong Chính sách Bảo mật này. Chúng tôi chỉ
								sẽ thu thập những thông tin cần thiết và có liên quan đến giao dịch giữa chúng tôi
								và quý khách
							</p>
							<p>
								Chúng tôi chỉ giữ thông tin của quý khách trong thời gian luật pháp yêu cầu hoặc cho
								mục đích mà thông tin đó được thu thập.
							</p>
							<p>
								Quý khách có thể ghé thăm trang web mà không cần phải cung cấp bất kỳ thông tin cá
								nhân nào. Khi viếng thăm trang web, quý khách sẽ luôn ở trong tình trạng vô danh trừ
								khi quý khách có tài khoản trên trang web và đăng nhập vào bằng tên và mật khẩu của
								mình.
							</p>
							<p>
								Khi truy cập trang web {renderWebSiteLink()} nghĩa là quý khách đồng ý chấp nhận
								thực hiện những mô tả trong Quy định bảo mật. Nếu quý khách không đồng ý với các
								điều khoản của Quy định bảo mật, vui lòng không sử dụng trang web{" "}
								{renderWebSiteLink()}
							</p>
							<p>
								Thông báo bảo mật này được đưa ra để thể hiện vai trò của chúng tôi trong vấn đề bảo
								mật trực tuyến và dịch vụ khách hàng. Chúng tôi xử lý thông tin của quý khách bằng
								tính trung thực và độ nhạy cảm nhằm đem lại lợi ích cao nhất cho khách hàng.
							</p>
							<p>
								Nếu quý khách có ý kiến hay đóng góp gì, xin vui lòng gửi đến địa chỉ bưu điện hoặc
								gửi email tới {renderEmail()}. Chúng tôi luôn sẵn sàng lắng nghe nhận xét của quý
								khách.
							</p>
						</div>

						<div className="">
							<h2> 1. Thu thập thông tin cá nhân</h2>
							<p>
								Giải pháp quản trị doanh nghiệp SATAVAN không bán, chia sẻ hay trao đổi thông tin cá
								nhân của khách hàng thu thập trên trang web cho một bên thứ ba nào khác.
							</p>
							<p>Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty</p>
							<br />
							<p>
								Khi quý khách đăng ký tài khoản trên trang web {renderWebSiteLink()} thông tin cá
								nhân mà chúng tôi thu thập sẽ được sử dụng cho một hoặc tất cả các mục đích sau đây:
							</p>
							<br />
							<p>- Quý khách đã sử dụng dịch vụ của SATAVAN</p>
							<br />
							<p>- Thông báo về việc giao hàng và hỗ trợ khách hàng</p>
							<br />
							<p>- Cung cấp thông tin liên quan đến sản phẩm</p>
							<br />
							<p>
								- Xử lý đơn đặt hàng, cung cấp dịch vụ và thông tin qua trang web của chúng tôi theo
								yêu cầu của quý khách
							</p>
							<br />
							<p>
								- Ngoài ra, chúng tôi sẽ sử dụng thông tin quý khách cung cấp để hỗ trợ quản lý tài
								khoản khách hàng; xác nhận và thực hiện các giao dịch tài chính liên quan đến các
								khoản thanh toán trực tuyến của quý khách; kiểm tra dữ liệu tải từ trang web của
								chúng tôi; cải thiện giao diện và/hoặc nội dung của các trang mục trên trang web và
								tùy chỉnh để dễ dàng hơn khi sử dụng; nhận diện khách đến thăm trang web; gửi đến
								quý khách thông tin mà chúng tôi nghĩ sẽ có ích hoặc do quý khách yêu cầu, bao gồm
								thông tin về sản phẩm và dịch vụ.
							</p>
							<br />
							<p>
								Chúng tôi có thể chia sẻ tên, địa chỉ và số điện thoại của quý khách cho một bên thứ
								ba để có thể giao hàng cho quý khách (ví dụ như dịch vụ chuyển phát nhanh hoặc nhà
								cung cấp của chúng tôi).
							</p>
							<br />
							<p>
								Khi quý khách đăng ký làm thành viên trên website SATAVAN, chúng tôi sẽ sử dụng
								thông tin cá nhân của quý khách để gửi các thông tin khuyến mãi/tiếp thị. Quý khách
								có thể hủy nhận các thông tin đó bất kỳ lúc nào bằng cách sử dụng chức năng hủy đăng
								ký trong các thông báo quảng cáo
							</p>
							<br />
							<p>
								Chi tiết đơn hàng của quý khách sẽ được chúng tôi lưu trữ nhưng vì lý do bảo mật,
								quý khách không thể yêu cầu thông tin đó từ chúng tôi. Tuy nhiên, quý khách có thể
								kiểm tra thông tin đó bằng cách đăng nhập vào tài khoản riêng của mình trên trang
								web. Tại đó, quý khách có thể theo dõi đầy đủ chi tiết của các đơn hàng đã hoàn tất,
								những đơn hàng mở và những đơn hàng sắp được giao cũng như quản lý thông tin về địa
								chỉ, thông tin về ngân hàng và những bản tin mà quý khách đã đăng ký nhận. Quý khách
								cần bảo đảm là thông tin được truy cập một cách bí mật và không làm lộ cho một bên
								thứ ba không có quyền. Chúng tôi sẽ không chịu trách nhiệm đối với việc sử dụng sai
								mật khẩu trừ khi đó là lỗi của chúng tôi
							</p>
							<br />
						</div>

						<div>
							<h2>Đặt hàng</h2>
							<p>
								Nếu quý khách thực hiện mua hàng trực tuyến tại SATAVAN, quý khách sẽ được yêu cầu
								cung cấp thông tin liên lạc, phương thức thanh toán, thông tin thanh toán/ hóa đơn
								và địa chỉ giao hàng. Quý khách vui lòng cung cấp thông tin đúng và đầy đủ để thực
								hiện xử lý đơn hàng. Nếu có một người nào bên ngoài lợi dụng các thông tin này dẫn
								đến những sai sót khi giao hàng, chúng tôi sẽ thực hiện điều tra và xử lý. Nếu lỗi
								do quý khách bị lộ thông tin quý khách phải chịu hoàn toàn trách nhiệm.
							</p>
						</div>

						<div>
							<h2>Cập nhật thông tin cá nhân</h2>
							<p>
								Quý khách có thể cập nhật thông tin cá nhân của mình bất kỳ lúc nào bằng cách đăng
								nhập vào trang web {renderWebSiteLink()}
							</p>
						</div>

						<div>
							<h2>Bảo mật thông tin cá nhân</h2>
							<p>SATAVAN đảm bảo rằng mọi thông tin thu thập được sẽ được lưu giữ an toàn</p>
							<p>
								Tuy nhiên, quý khách nên biết rằng không có hệ thống máy tính nào là hoàn toàn an
								toàn và đó là những rủi ro vốn có khi thực hiện các giao dịch trên Internet. Để đảm
								bảo quý khách có các tính năng bảo mật mới nhất trên trình duyệt của mình, quý khách
								nên tải về phiên bản mới nhất của trình duyệt ưa thích của quý khách và cần phải có
								hỗ trợ SSL đầy đủ.
							</p>
						</div>

						<div>
							<h2>Tiết lộ thông tin cá nhân</h2>
							<p>
								Chúng tôi sẽ không chia sẻ thông tin của quý khách cho bất kỳ một công ty nào khác
								ngoại trừ những công ty và các bên thứ ba có liên quan trực tiếp đến việc giao hàng
								mà quý khách đã mua tại SATAVAN. Trong một vài trường hợp đặc biệt, SATAVAN có thể
								bị yêu cầu phải tiết lộ thông tin cá nhân, ví dụ như khi có căn cứ cho việc tiết lộ
								thông tin là cần thiết để ngăn chặn các mối đe dọa về tính mạng và sức khỏe, hay cho
								mục đích thực thi pháp luật
							</p>
							<p>
								Nếu Quý khách tin rằng bảo mật của quý khách bị SATAVAN xâm phạm, xin vui lòng liên
								hệ với chúng tôi tại địa chỉ {renderEmail()} để được giải quyết vấn đề.
							</p>
						</div>
						<div>
							<h2>Thay đổi của Chính sách Bảo mật</h2>
							<p>
								SATAVAN có quyền thay đổi và chỉnh sửa Quy định Bảo mật này vào bất kỳ lúc nào mà
								không cần báo trước với khách hàng. Bất cứ thay đổi nào về chính sách này đều được
								đăng trên trang web của chúng tôi
							</p>
							<p>
								Nếu quý khách không hài lòng với việc chúng tôi xử lý thắc mắc hay khiếu nại của quý
								khách, xin vui lòng liên hệ với chúng tôi tại {renderEmail()}
							</p>
							<br />
							<p>Trân trọng cảm ơn quý khách.</p>
							<br />
							<p>SATAVAN hân hạnh được phục vụ Quý khách</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

ChinhSachBaoMat.Layout = MainLayout;
export default ChinhSachBaoMat;
