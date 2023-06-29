/* eslint-disable react/no-unescaped-entities */
import { Breadcrumb } from "@/components"
import { MainNoFooter } from "@/layout"
import React from "react"

const PTVC = () => {
  return (
    <div className="static__page-container">
      <div className="container">
        <Breadcrumb breadcrumbList={[{ name: "Phương thức vận chuyển", path: "/" }]} />
        <div className="static__page">
          <div className="">
            <h1>CHÍNH SÁCH VẬN CHUYỂN VÀ GIAO HÀNG</h1>
            <h3>
              Công ty TNHH Womart D2C Việt Nam (“WOMART”) cung cấp dịch vụ giao hàng toàn quốc đối
              với các giao dịch trên website & ứng dụng WOMART.
            </h3>
          </div>
          <div className="">
            <h2> 1. Thời gian giao hàng dự kiến:</h2>
            <p>Khu vực giao hàng</p>
            <p>Thời gian giao hàng</p>
            <p>Hà Nội, Đà Nẵng 2 - 3 ngày</p>
            <p>Các tỉnh, thành khác 3 - 5 ngày</p>
            <p>TP. Hồ Chí Minh giao trong ngày</p>
            <p>WOMART hỗ trợ giao hàng từ thứ 2 đến thứ 7 hàng tuần.</p>
            <p>
              Khung giờ giao hàng: Khung giờ giao hàng của các đơn vị vận chuyển sẽ bắt đầu từ 08:00
              đến 20:00 tối (tùy thuộc vào giờ làm việc từng đơn vị vận chuyển)
            </p>
          </div>
          <div className="">
            <h2> 2. Phí vận chuyển:</h2>
            <p>WOMART giao hàng miễn phí toàn quốc với đơn hàng từ 500.000 đồng.</p>
            <p>
              Đối với những đơn hàng có phát sinh phí vận chuyển, phí này sẽ phụ thuộc vào khối
              lượng của sản phẩm và khoảng cách vận chuyển. Để kiểm tra phí vận chuyển cho đơn hàng,
              Quý khách có thể chọn khu vực nhận hàng ở bước kiểm tra giỏ hàng.
            </p>
          </div>
          <div className="">
            <h2> CÁC HÌNH THỨC THANH TOÁN</h2>
            <p>Thanh toán tiền mặt khi nhận hàng (COD)</p>
            <p>
              Thanh toán bằng thẻ ATM hoặc thẻ tín dụng, thẻ ghi nợ Visa/Master/JCB/AMEX qua cổng
              thanh toán Payoo: Phí thanh toán tùy thuộc vào từng loại thẻ và ngân hàng phát hành
              thẻ. Vui lòng liên hệ với ngân hàng phát hành thẻ để biết rõ phí thanh toán.
            </p>
            <p>
              Thanh toán qua ứng dụng MoMo: Quý khách cần tải ứng dụng MoMo về điện thoại, liên kết
              với ngân hàng và nạp tiền vào ví MoMo sau đó đặt hàng trên WOMART và chọn vào phương
              thức thanh toán bằng Ví MoMo.
            </p>
            <p>
              Thanh toán qua ứng dụng Grab Moca: Quý khách cần tải ứng dụng Grab về điện thoại, liên
              kết với ngân hàng và nạp tiền vào ví Moca sau đó đặt hàng trên AeonEshop và chọn vào
              phương thức thanh toán bằng ví Moca.
            </p>
            <p>
              Thanh toán qua ZaloPay: Quý khách cần tải ứng dụng ZaloPay về điện thoại, liên kết với
              ngân hàng sau đó đặt hàng trên WOMART và chọn vào phương thức thanh toán bằng ZaloPay.
            </p>
            <p>
              Thanh toán qua VnPay: Quý khách cần tải ứng dụng VnPay về điện thoại, liên kết với
              ngân hàng đặt hàng trên WOMART và chọn vào phương thức thanh toán bằng VnPay.
            </p>
            <p>
              Ngoài ra, người mua hàng từ website/ứng dụng cần tuân thủ theo chính sách thanh toán
              của Công ty TNHH Womart D2C Việt Nam .
            </p>
          </div>

          <div className="">
            <h2> HỦY ĐƠN HÀNG</h2>
            <h3>
              Chúng tôi sẽ cố gắng xử lý tất đơn hàng trong vòng 24h kể từ khi Quý khách đặt hàng.
              Đơn hàng chỉ có thể hủy khi ở trạng thái Đợi xử lý & Đang xử lý. Khi đơn hàng chuyển
              sang trạng thái Đã giao nhà vận chuyển trở đi, chúng tôi không thể hủy đơn hàng.
            </h3>
            <h4>Để hủy Đơn hàng, Quý khách vui lòng thông báo cho WOMART qua:</h4>
            <p>Email: cs@womart.vn</p>
            <p>Hotline: 1900.58.88.54 – 028.36368466/69 (08:30 – 17:30)</p>
            <br />
            <h3>XÁC NHẬN ĐƠN HÀNG</h3>
            <p>
              - Xác nhận qua điện thoại: chỉ áp dụng cho các đơn hàng chưa có đủ thông tin giao hàng
              cần thiết hoặc khách hàng có ghi chú yêu cầu này.
            </p>
            <p>
              - Xác nhận qua tin nhắn SMS và Email: áp dụng cho tất cả đơn hàng có đầy đủ thông tin
              giao hàng.
            </p>
            <p>
              - Lưu ý: email xác nhận đơn hàng có thể nằm trong hộp thư rác (Junk mail/ Spam mail),
              Quý khách vui lòng tìm kiếm “WOMART” trong thanh tìm kiếm của hộp thư khi không nhận
              được email xác nhận.
            </p>
            <br />
            <h3>Đơn hàng sẽ tự động hủy nếu:</h3>
            <p>
              - Nhân viên tổng đài của WOMART không liên lạc được với khách hàng để xác nhận thông
              tin đơn hàng.
            </p>
            <p>
              - Nhân viên giao hàng hoặc nhân viên của WOMART không liên lạc được với Khách hàng tại
              thời điểm giao hàng (tối đa 3 cuộc gọi và mỗi lần cách nhau 10 phút).
            </p>
          </div>

          <div className="">
            <h2> QUY TRÌNH GIAO NHẬN HÀNG</h2>

            <p>- Mở gói hàng và đối chiếu hàng hóa với hoá đơn tính tiền.</p>
            <p>
              - Kiểm tra sản phẩm thực tế có đúng với sản phẩm mà Khách hàng đã đặt mua hay không.
            </p>
            <p>- Kiểm tra bao bì và sản phẩm có bị hư hại do quá trình vận chuyển hay không.</p>
            <br />
            <p>
              Nếu không hài lòng với 1 trong 3 điều trên, Khách hàng có thể yêu cầu Nhân viên giao
              hàng xác nhận và trả lại hàng. WOMART sẽ không chịu trách nhiệm giải quyết khiếu nại
              về việc thiếu hàng hoặc giao sai hang sau khi Khách hàng đã ký nhận và thanh toán.
              Khách hàng nếu chọn hình thức "Thanh toán trực tiếp khi nhận hàng" thì thanh toán trực
              tiếp cho nhân viên giao hàng ngay sau khi nhận hàng. Với các hình thức thanh toán
              Online khác như thanh toán qua thẻ (ATM, thẻ quốc tế Visa/ Master/ JCB...), thanh toán
              qua ví điện tử (ZaloPay, Momo), chuyển khoản thì khách hàng chỉ nhận hàng và ký nhận
              với nhân viên giao hang Với các đơn hàng đã thanh toán Online, nếu có phát sinh chi
              phí giao hàng thì khách hàng sẽ thanh toán trực tiếp khoản phí này cho nhân viên giao
              nhận
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

PTVC.Layout = MainNoFooter
export default PTVC
