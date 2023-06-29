export const DEFAULT_LIMIT_PRODUCT = 24
export const PHONE_SCHEMA = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/
export const PASSWORD_SCHEMA = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const BASE64_REGEX = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
export const BASE64_READER_REGEX = /^data:image\/\w+;base64,/
export const FIREBASE_API_KEY = "AIzaSyBFTcgvxkTVzziiIlEOhvoAbP1bLpTpwsg"
export const FIREBASE_AUTH_DOMAIN = "womart-3a686.firebaseapp.com"
export const FIREBASE_DATABASE_URL =
  "https://womart-3a686-default-rtdb.asia-southeast1.firebasedatabase.app"
export const FIREBASE_PROJECT_ID = "womart-3a686"
export const FIREBASE_STORAGE_BUCKET = "womart-3a686.appspot.com"
export const FIREBASE_MESSAGING_SENDER_ID = "761325889031"
export const FIREBASE_APP_ID = "1:761325889031:web:a95b7a85155033038eeca2"
export const FIREBASE_MESUREMENT_ID = "G-Y65TNJYHSL"
export const FIREBASE_VAPID_KEY = "G-Y65TNJYHSL"
export const LIMIT_MESSAGES = 30
export const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL
export const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/

export const MESSAGE_STATUS = {
  pending: "Đang gửi",
  rejected: "Gửi lỗi",
  fulfilled: "Đã gửi",
}

export const MESSAGE_OPTION_MENU_SIZE = {
  width: 180,
  height: 168,
}

export const VNPAY_STATUS_NAME = {
  "00": "	Giao dịch thành công",
  "07": "	Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
  "09": "	Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  "10": "	Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
  "11": "	Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
  "12": "	Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
  "13": "	Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
  "24": "	Giao dịch không thành công do: Khách hàng hủy giao dịch",
  "51": "	Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
  "65": "	Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
  "75": "	Ngân hàng thanh toán đang bảo trì.",
  "79": "	Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
  "99": "	Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
}
