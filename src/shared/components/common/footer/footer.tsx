/* eslint-disable @next/next/no-img-element */
import {
	appStoreIcon,
	boCongThuong,
	googlePlayIcon,
	paymentMethodsImage,
	shippingMethodsImage,
} from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiFacebookCircleFill, RiGlobalLine, RiYoutubeFill } from "react-icons/ri";

export const Footer = () => {
	const router = useRouter();

	return (
		<footer
			style={{
				marginBottom:
					router.pathname === "/" || router.pathname === "/product/[productId]" ? 60 : 0,
			}}
			className="footer"
		>
			<div className="footer__body">
				<div className="container">
					<ul className="footer__body-list grid grid-col-1 grid-col-sm-2 grid-col-md-3 grid-col-lg-4 grid-col-xl-5">
						<li className="footer__body-list-item">
							<h3 className="footer__body-list-item-heading">VỀ CHÚNG TÔI</h3>
							<Link href="/gioi-thieu">
								<a className="footer__body-list-item-title">Giới thiệu</a>
							</Link>
						</li>

						<li className="footer__body-list-item">
							<h3 className="footer__body-list-item-heading">HỖ TRỢ KHÁCH HÀNG</h3>

							{[
								{
									path: "/chinh-sach-bao-hanh",
									label: "Chính sách bảo hành",
								},
								{ path: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
								{ path: "/chinh-sach-thanh-toan", label: "Chính sách thanh toán" },
								{ path: "/dieu-khoan-dieu-kien", label: "Điều khoản và điều kiện" },
								{ path: "/hop-tac-trao-doi", label: "Hợp tác & trao đổi" },
								{ path: "/cam-ket-chat-luong-dich-vu", label: "Cam kết chất lượng & dịch vụ" },
							].map(({ label, path }, index) => (
								<Link key={index} href={path}>
									<a className="footer__body-list-item-title">{label}</a>
								</Link>
							))}
						</li>

						<li className="footer__body-list-item">
							<h3 className="footer__body-list-item-heading">THÔNG TIN LIÊN HỆ</h3>
							{[
								`Tên đơn vị: CÔNG TY TNHH SATAVAN`,
								"Hotline CSKH : 093 6794 557",
								"Văn phòng: ....................",
								"Fax: ....................",
								"Email: info@satavan.com",
								"Mã số thuế : ....................",
							].map((item, index) => (
								<p className="footer__body-list-item-title" key={index}>
									{item}
								</p>
							))}
						</li>

						<li className="footer__body-list-item">
							<h3 className="footer__body-list-item-heading">THANH TOÁN & VẬN CHUYỂN</h3>
							<img className="img-fluid" src={paymentMethodsImage} alt="" />
							<br />
							<br />
							<img src={shippingMethodsImage} alt="" className="img-fluid" />
						</li>

						<li className="footer__body-list-item">
							<h3 className="footer__body-list-item-heading">KẾT NỐI VỚI CHÚNG TÔI</h3>
							<div className="footer__body-icon-wrapper">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.facebook.com/womart.vietnam"
								>
									<RiFacebookCircleFill />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.youtube.com/channel/UCP8NAzxRVCDQAkwd1cxEpEg"
								>
									<RiYoutubeFill />
								</a>
								<a target="_blank" rel="noopener noreferrer" href="https://satavan.com/">
									<RiGlobalLine />
								</a>
							</div>

							<div className="footer__main-contact-right">
								<h3 className="footer__body-list-item-heading footer__main-contact-right-heading">
									Tải Ứng dụng trên điện thoại{" "}
								</h3>
								<div className="footer__body-image-wrapper">
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://play.google.com/store/apps/details?id=com.app.womart"
									>
										<div className="image-container image-wrapper-item">
											<Image src={googlePlayIcon} alt="" layout="fill" className="image" />
										</div>
									</a>

									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://apps.apple.com/vn/app/womart/id1602223932?l=vi"
									>
										<div className="image-container image-wrapper-item image-wrapper-last">
											<Image src={appStoreIcon} alt="" layout="fill" className="image" />
										</div>
									</a>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div className="footer__bottom-wrapper">
				<div className="container">
					<div className="footer__bottom">
						<div className="footer__bottom-left">
							<h4>© 2022 - Bản quyền của Công ty TNHH SATAVAN Việt Nam</h4>
							<p>
								Địa chỉ: Số 238/12 Lê Văn Quới, P. Bình Hưng Hòa A, Q. Bình Tân, TP. Hồ Chí Minh,
								Việt Nam.
							</p>
						</div>
						<div className="footer__bottom-right">
							<img className="img-fluid" src={boCongThuong} alt="" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
