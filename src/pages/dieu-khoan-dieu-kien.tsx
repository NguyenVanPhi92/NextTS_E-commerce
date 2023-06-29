import React from "react";
import { MainLayout } from "@/layout";
import { Breadcrumb, HeaderMobile } from "@/components";

const DieuKhoanDieuKien = () => {
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
		<div className="static__page-container">
			<HeaderMobile centerChild={<p>Điều khoản & Điều kiện</p>} />
			<div className="container">
				<Breadcrumb breadcrumbList={[{ name: "Điều khoản & Điều kiện", path: "/" }]} />
				<div className="static__page">
					<div>
						<h1>Điều khoản & Điều kiện</h1>
						<p>
							Xin vui lòng đọc kỹ các điều khoản và điều kiện này trước khi đặt mua bất cứ sản phẩm
							dịch vụ nào từ website của chúng tôi. Xin quý khách hiểu rằng khi quý khách đã đặt mua
							sản phẩm của chúng tôi, quý khách đã đồng ý bị ràng buộc bởi các điều khoản và điều
							kiện này. Quý khách nên in bản sao của các Điều Khoản và Điều Kiện này để tham khảo
							thêm
						</p>
						<p>
							Website có url {renderWebSiteLink()} là kênh mua sắm trực tuyến chính thức của Công ty
							TNHH Tin học và Công nghệ Địa lý ITGIS.
						</p>
						<p>
							Các đơn hàng của khách hàng thực hiện tại website {renderWebSiteLink()} đều có thể
							được xem xét để chấp nhận hoặc từ chối bởi bộ phận phụ trách kinh doanh trực tuyến của
							Công ty ITGIS.
						</p>
						<p>
							Vì giá sản phẩm dịch vụ có thể thay đổi, đơn hàng của quý khách có thể không được chấp
							nhận hoặc chúng tôi có thể liên lạc với quý khách để thông tin thêm về sự thay đổi giá
							hoặc các vấn đề phát sinh sau khi quý khách thực hiện đặt hàng.
						</p>
					</div>
					<div>
						<h2>Bản quyền thông tin và thương hiệu</h2>
						<p>
							Thương hiệu SATAVAN hoặc bất cứ thương hiệu hay logo, hình ảnh, biểu tượng, văn bản,
							nội dung và cách thức trưng bày sản phẩm dịch vụ của Công ty TNHH Tin học và Công nghệ
							Địa lý ITGIS không được sử dụng cho mục đích quảng cáo hoặc công bố thông tin mà không
							có sự cho phép bằng văn bản của chúng tôi.
						</p>
						<p>Thông tin trên website này có thể thay đổi mà không cần thông báo.</p>
					</div>
					<div>
						<h2>Chính sách đơn hàng của khách hàng</h2>
						<p>
							Không phải bất cứ đơn đặt hàng trực tuyến nào của quý khách cũng được chấp nhận. Chúng
							tôi có toàn quyền chấp nhận hoặc từ chối đơn hàng của quý khách với bất kỳ lý do không
							hợp lệ nào đó của đơn hàng mà chúng tôi xác định được.
						</p>
						<p>
							Chúng tôi có thể yêu cầu xác minh và đề nghị quý khách cung cấp thêm thông tin trước
							khi chấp nhận đơn hàng của quý khách.
						</p>
					</div>
					<div>
						<h2>Thông tin hiển thị bị lỗi do lỗi nhập liệu</h2>
						<p>
							Trong trường hợp một sản phẩm dịch vụ hiển thị sai giá hoặc sai thông tin do lỗi nhập
							liệu hoặc do sự sai sót của nhà cung cấp, SATAVAN có quyền từ chối hoặc hủy các đơn
							hàng đối với các sản phẩm bị hiển thị sai thông tin giá bán. Ngoài ra, chúng tôi có
							quyền từ chối hoặc hủy các đơn hàng cho dù đơn hàng đã được xác nhận và quý khách đã
							thực hiện thanh toán hay chưa. Trong trường hợp quý khách đã thanh toán cho việc mua
							hàng và đơn hàng của quý khách bị hủy, chúng tôi sẽ nhanh chóng hoàn trả lại toàn bộ
							số tiền mua hàng vào lại tài khoản của quý khách.
						</p>
					</div>
					<div>
						<h2>Giao và hoàn trả hàng</h2>
						<p>
							Giải pháp quản trị doanh nghiệp SATAVAN sẽ vận chuyển hàng trong khoảng thời gian và
							địa điểm như thỏa thuận khi quý khách thanh toán. Tuy nhiên, chúng tôi không thể đảm
							bảo tất cả các đơn hàng sẽ được giao trong khoảng thời gian đã thống nhất.
						</p>
						<br />
						<p>
							Ngay sau khi đơn hàng của quý khách được gửi đi từ kho của chúng tôi, quý khách sẽ
							nhận được thư xác nhận rằng hàng hóa đang trên đường vận chuyển. Nếu chúng tôi không
							thể giao hàng đúng ngày dự kiến, chúng tôi sẽ thông báo cho khách hàng trước 24h so
							với thời gian giao hàng như thỏa thuận và chúng tôi không chịu trách nhiệm về bất kỳ
							tổn thất, chí phí, thiệt hại hay chi phí phát sinh từ việc giao hàng trễ. Nếu quý
							khách vắng mặt/chúng tôi không liên hệ được với khách hàng tại địa điểm và thời gian
							giao/nhận hàng như thỏa thuận, chúng tôi sẽ gửi cho khách hàng thông tin hướng dẫn
							bằng email để khách hàng nhận hàng lại hoặc lấy hàng từ hãng vận chuyển.
						</p>
						<br />
						<p>
							Để kiểm tra đơn hàng, quý khách hãy sử dụng mã số theo dõi đã được gửi trong thư xác
							nhận. Sau khi hàng được chuyển đến quý khách, trước khi ký xác nhận, quý khách vui
							lòng kiểm tra nếu sản phẩm có bất kỳ lỗi hay khiếm khuyết nào. Để đề phòng, xin vui
							lòng giữ lại biên lại vận chuyển.
						</p>
						<br />
						<p>
							SATAVAN thực hiện đổi hàng/trả lại tiền cho quý khách, nhưng không hoàn lại phí vận
							chuyển hoặc lệ phí giao hàng, Trừ những trường hợp sau:
							<div className="pl-4">
								<p>- Không đúng chủng loại, mẫu mã như quý khách đặt hàng.</p>
								<p>- Không đủ số lượng, không đủ bộ như trong đơn hàng.</p>
								<p>
									- Tình trạng bên ngoài bị ảnh hưởng như bong tróc, bể vỡ xảy ra trong quá trình
									vận chuyển,…{" "}
								</p>
								<p>
									- Không đạt chất lượng như: quá hạn sử dụng, hết bảo hành, không vận hành được,
									hỏng hóc khách quan trong phạm vi bảo hành của nhà cung cấp, nhà sản xuất,...
								</p>
							</div>
						</p>
						<br />
						<p>
							Quý khách vui lòng kiểm tra hàng hóa và ký nhận tình trạng với Nhân viên giao hàng
							ngay khi nhận được hàng. Khi phát hiện một trong các trường hợp trên, quý khách có thể
							trao đổi trực tiếp với Nhân viên giao hàng hoặc phản hồi cho chúng tôi trong vòng 12h
							theo đường dây nóng: Mr Cơ: 0909.099.580 (Kỹ thuật); Mr. Thống: 0796844200 (Kinh
							doanh)
						</p>
						<br />
						<p>
							SATAVAN sẽ không chấp nhận đổi/trả hàng khi:
							<div className="pl-8">
								<p>- Quý khách muốn thay đổi chủng loại, mẫu mã nhưng không thông báo trước.</p>
								<p>
									- Quý khách tự làm ảnh hưởng tình trạng bên ngoài như rách bao bì, bong tróc, bể
									vỡ,…
								</p>
								<p>- Quý khách vận hành không đúng chỉ dẫn gây hỏng hóc hàng hóa.</p>
								<p>
									- Quý khách không thực hiện các quy định theo yêu cầu để được hưởng chế độ bảo
									hành (ví dụ không gửi phiếu bảo hành về đúng nơi quy định trong thời gian quy
									định).
								</p>
								<p>
									- Quý khách đã kiểm tra và ký nhận tình trạng hàng hóa nhưng không có phản hồi
									trong vòng 12h kể từ lúc ký nhận hàng.
								</p>
							</div>
						</p>
						<p>
							Chú ý:
							<div className="p-4">
								<p>
									- Quy trình xử lý thủ tục đổi hoặc trả hàng được thực hiện trong vòng hai (02)
									tuần tính từ ngày nhận đủ thông tin và chứng từ từ khách hàng.
								</p>
								<p>
									- Việc đổi hàng, sửa chữa sẽ được thực hiện theo đúng quy định của nhà cung cấp,
									nhà sản xuất, hoặc nhà bảo hành được ủy quyền của nhà cung cấp, nhà sản xuất đó.
								</p>
							</div>
						</p>
					</div>
					<div>
						<h2>Đóng gói</h2>
						<p>
							- Hàng hóa sẽ được đóng gói cẩn thận khi chuyển đến khách hàng. Các kiện hàng của quý
							khách có thể được đóng gói trong các bao bì/thùng hàng lớn hơn để đảm bảo tính an toàn
							cho hàng hóa.
						</p>
					</div>
					<div>
						<h2>Phiếu mua hàng</h2>
						<p>
							- Trong trường hợp bạn được tặng phiếu mua hàng trực tuyến tại SATAVAN, phiếu mua
							hàng/ Mã số khuyến mãi sẽ được gửi đến cùng địa chỉ nhận hàng của bạn/ địa chỉ mail
							khi đăng ký tài khoản của bạn, trừ khi bạn có ghi chú riêng về địa chỉ nhận phiếu mua
							hàng khác với địa chỉ nhận hàng/ địa chỉ mail nhận Mã số khuyến mãi khác.
						</p>
					</div>
					<div>
						<h2>Thời gian xử lý đơn hàng</h2>
						<p>
							- Đơn hàng của bạn sẽ được kiểm tra bởi bộ phận Bán hàng của SATAVAN để đảm bảo rằng
							đơn đặt hàng của quý khách là chính xác, phương thức thanh toán tiền đơn hàng là hợp
							lệ và quý khách có quyền sử dụng phương thức thanh toán này. Một khi đơn hàng của quý
							khách đã được bộ phận Bán hàng của chúng tôi chấp nhận, đơn hàng sẽ được chuyển đến Kế
							toán và Kho hàng để thực hiện việc chuyển hàng đến quý khách.
						</p>
						<br />
						<p>
							- Xin lưu ý, vì lý do an toàn, chúng tôi có thể gọi điện xác nhận với quý khách trước
							khi chúng tôi tiến hành xử lý đơn hàng.
						</p>
						<br />
						<p>
							- Nếu hàng hóa quý khách đặt mua đang sẵn có, chúng tôi sẽ nhanh chóng chuyển hàng từ
							một hoặc từ các kho hàng của chúng tôi đến cho quý khách.
						</p>
						<br />
						<p>
							- Nếu hàng hóa quý khách đặt mua đang hết hàng, chúng tôi sẽ liên hệ lại quý khách để
							thông tin thêm về đơn hàng/sản phẩm cũng như thời gian sớm nhất có thể đáp ứng đơn
							hàng của quý khách.
						</p>
						<br />
						<p>
							- Trong các ngày lễ, tết, sự kiện khuyến mãi lớn của chúng tôi, do lượng đơn hàng lớn,
							đơn hàng của quý khách có thể được xử lý chậm hơn thời gian quy định.
						</p>
					</div>
					<div>
						<h2>Thời gian chuyển hàng</h2>
						<p>- Các đơn hàng được đặt sau 16h00 sẽ được xử lý vào ngày hôm sau.</p>
						<br />
						<p>
							- Đối với những đơn hàng đặt vào sau 11h00 Thứ bảy và trong ngày Chủ Nhật hàng tuần
							chúng tôi sẽ xử lý vào ngày thứ hai của tuần kế tiếp.
						</p>
						<br />
						<p>
							- Trong một số trường hợp chúng tôi có thể chậm trễ khi giao hàng do những điều kiện
							bất khả kháng như thời tiết xấu, điều kiện giao thông không thuận lợi, xe hỏng hóc
							trên đường giao hàng, trục trặc trong quá trình xuất hàng,…Trong mọi trường hợp chậm
							trễ chúng tôi sẽ liên hệ và thông tin đến quý khách sớm nhất.
						</p>
						<br />
						<p>
							- Trong thời gian chờ đợi nhận hàng, Quý khách có bất cứ thắc mắc gì về thông tin vận
							chuyển xin vui lòng liên hệ trực tiếp với chúng tôi ở mục Liên hệ hoặc thông qua đường
							dây nóng: Mr Cơ: 0909.099.580 (Kỹ thuật); Mr. Thống: 0796844200 (Kinh doanh)
						</p>
						<br />
						<p>
							- Tổng thời gian phân phối: Thời gian phân phối hàng tùy thuộc vào thời gian chúng tôi
							thiết lập được thanh toán trên tài khoản của quý khách, thời gian xử lý đơn hàng và
							thời gian chuyển hàng của đơn vị giao nhận. Có thể từ 24 tiếng đến 07 ngày nếu quý
							khách đặt hàng trong trạng thái còn hàng (in-stock).
						</p>
					</div>

					<div>
						<h2>Cước phí chuyển và giao nhận hàng</h2>
						<p>
							- Cước phí chuyển hàng được tính dựa trên TRỌNG LƯỢNG của hàng hóa hoặc KÍCH THƯỚC sản
							phẩm (đối với sản phẩm cồng kềnh), chi phí đóng kiện gỗ (để đảm bảo an toàn cho hàng
							hóa khi thực hiện giao hàng xa), KHOẢNG CÁCH địa lý nơi nhận hàng, và HÌNH THỨC DỊCH
							VỤ VẬN CHUYỂN mà quý khách lựa chọn.
						</p>
					</div>

					<div>
						<h2>Phiếu quà tặng/ Mã số khuyến mãi</h2>
						<p>
							- Sử dụng Phiếu quà tặng/ Mã số khuyến mãi để mua bất kỳ sản phẩm hiện có tại SATAVAN.
						</p>
						<p>
							- Phiếu quà tặng/ Mã số khuyến mãi không được quy đổi thành tiền mặt. Giá trị của
							Phiếu quà tặng/ Mã số khuyến mãi không được thay thế nếu mất, bị đánh cắp hoặc sử dụng
							mà không có sự cho phép của chủ nhân.
						</p>
					</div>

					<div>
						<h2>Nguy cơ mất và hư hại hàng hóa</h2>
						<p>
							- Nếu khách hàng sử dụng dịch vụ chuyển hàng của SATAVAN hoặc của đối tác vận chuyển
							cung cấp bởi chúng tôi, chúng tôi sẽ có trách nhiệm với hàng hóa và sự rủi ro của việc
							mất hoặc hư hại hàng hóa trong suốt quá trình chuyển hàng đến khách hàng.
						</p>
						<p>
							- Nếu khách hàng lựa chọn một công ty/hình thức vận chuyển hàng hóa khác cho riêng
							mình, trách nhiệm với hàng hóa và sự rủi ro của việc mất hoặc hư hại hàng hóa trong
							quá trình chuyển hàng từ SATAVAN đến khách hàng thuộc về khách hàng. Khách hàng sẽ
							chịu trách nhiệm cho toàn bộ việc chuyển hàng và cước phí liên quan.
						</p>
					</div>

					<div>
						<h2>Trách nhiệm với hàng hóa nhận được</h2>
						<p>
							- Quý khách có trách nhiệm kiểm tra hàng hóa khi nhận hàng. Thông báo ngay cho Nhân
							viên giao nhận những hư hại, trầy xước, bể vỡ, mốp méo, hoặc sai hàng hóa và tiến hành
							ký xác nhận tình trạng hàng hóa với Nhân viên giao nhận.
						</p>
						<p>
							- Sau khi quý khách đã ký nhận hàng, chúng tôi không có trách nhiệm với những thông
							báo hư hỏng, trầy xước, bể vỡ, móp méo, sai hàng hóa,… từ quý khách.
						</p>
					</div>
					<p>Trân trọng cảm ơn quý khách hàng.</p>
					<br />
					<p>Giải pháp quản trị doanh nghiệp SATAVAN hân hạnh được phục vụ Quý khách hàng!</p>
				</div>
			</div>
		</div>
	);
};

DieuKhoanDieuKien.Layout = MainLayout;
export default DieuKhoanDieuKien;
