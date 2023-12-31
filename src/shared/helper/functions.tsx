import {
  AttributeWithParentIdAndName,
  CartItem,
  Category,
  CreateOrderDoneRes,
  DraftOrderLine,
  DraftProductList,
  GroupTimeType,
  LastMessage,
  ListAttributeId,
  MessageRes,
  Product,
  ProductAttribute,
  ProductCombo,
  ProductComboDetail,
  ProductDetail,
  ProductDetailRes,
  ProductIds,
  ShippingAddress,
  TIME_TYPE,
  TypeGet,
  Unit,
  UnitSelect,
  Variant,
} from "@/models"
import _ from "lodash"

import { view1Icon, view2Icon, view3Icon, view4Icon } from "@/assets"
import { ItemDropdown } from "@/components"
import { BASE64_READER_REGEX, OBJECT_ID_REGEX } from "./constants"

export const correctEmail = (value: string) => {
  ;/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

export const correctPassword = (value: string) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)
}

export const isVietnamesePhoneNumberValid = (num: string) => {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(num)
}

export const checkNumberPhone = (number: string) => {
  ;/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number)
}

export const onScrollBottom = (callBack: Function) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event)
    }
  }
}

export const generateProductSlug = (name: string, id: number): string => {
  return `/${convertViToEn(name).replaceAll(" ", "-")}-${id}`
}

export const fromProductSlugToProductId = (slug: string): number => {
  const productIdArr = slug?.split("-")

  return Number(productIdArr?.[productIdArr.length - 1])
}

export const getRandomId = (): number => {
  return +Math.floor(Math.random() * 10000000000)
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export function isValidHttpUrl(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === "http:" || url.protocol === "https:"
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end)
}

// hàm định dạng tiền việt nam
// export function formatMoneyVND(num: string) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
// }
export const FormatNumber = (money: number, separator = ",") => {
  if (!money) return "0"
  return (money + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator)
}

export const formatNumberDec = (nStr: string, decSeparate: string, groupSeparate: string) => {
  nStr += ""
  let x = nStr.split(decSeparate)
  let x1 = x[0]
  let x2 = x.length > 1 ? "." + x[1] : ""
  let rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + groupSeparate + "$2")
  }
  return x1 + x2
}
// hàm định dạng tiền việt nam

export function formatMoneyVND(num: number | string) {
  if (typeof num == "number") {
    num = Math.floor(num)
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ`
  } else if (typeof num == "string") {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ`
  }
}

export const translateDataToTree = (categories: Category[]) => {
  if (!isArrayHasValue(categories)) return []

  _(categories).forEach((f) => {
    f.children = _(categories)
      .filter((g) => g.parent_id === f.id)
      .value()
  })
  return _(categories)
    .filter((f) => !f.parent_id)
    .value()
}

export const getBannerUrls = (list: Category[]) => {
  const bannerUrlList: Array<string> = []

  list.forEach((item) => {
    if (item.image.length > 0) {
      item.image?.forEach((url) => bannerUrlList.push(url))
    }
  })
  return bannerUrlList
}

export function formatNumberInput(value: string, separator = ",") {
  value += ""
  const list = value.split(".")
  const prefix = list[0].charAt(0) === "-" ? "-" : ""
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ""
  while (num.length > 3) {
    result = `${separator}${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`
}

export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toFirstLowerCase = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export function getFullAddress(address?: ShippingAddress): string {
  if (!address) return ""
  return `${address.street}, ${address.ward_id}, ${address.district_id}, ${address.state_id}.`
}

export function productListToObjectIdQuantity(productList: CartItem[]): DraftProductList {
  if (productList?.length === 0) {
    return {}
  }

  return productList.reduce(
    (obj, item) =>
      Object.assign(obj, {
        [item.product_id]:
          item.price_table?.length > 0
            ? item.price_table.map((y) => ({
                id: y.uom_id,
                qty: item.product_qty,
              }))
            : item.product_qty,
      }),
    {}
  )
}

export function getCartItemsChecked(productList: CartItem[]): CartItem[] {
  return productList.filter((item) => item.is_check === true)
}

export function isExistCart(obj1: ProductIds, obj2: ProductIds) {
  return (
    obj1.product_tmpl_id === obj2.product_tmpl_id && obj1.product_prod_id === obj2.product_prod_id
  )
}

export const getProductIds = (cart: CartItem): ProductIds => ({
  product_prod_id: cart.product_id,
  product_tmpl_id: cart.product_id,
})

export function isObjectHasValue(obj: any): boolean {
  return obj && _.isObject(obj) && Object.keys(obj).length > 0
}

export function isArrayHasValue(array: any): boolean {
  return array && _.isArray(array) && array.length > 0
}

//api response do not include daily_deal_promotion
export function getPriceProduct(product: Product | ProductCombo): number {
  const deal = (product as any)?.daily_deal_promotion
  if (deal && Object.keys(deal).length > 0) {
    if (deal.compute_price === "fixed") {
      return deal.fixed_price
    }

    if (deal.compute_price === "percentage") {
      return product.price * (1 - deal.percent_price / 100)
    }
  }

  return product.price
}

export function getOrderIdsQueryString(data: CreateOrderDoneRes[]): string {
  let query = ""
  data.forEach((item) => (query += `sale_order_id=${item.sale_order_id}&`))
  return query.slice(0, query.length - 1)
}

//api response do not include daily_deal_promotion
export function getPercentageProductDeal(product: Product): number {
  const deal = (product as any)?.daily_deal_promotion
  if (deal && Object.keys(deal).length > 0) {
    if (deal.compute_price === "fixed") {
      const percentage = ((product.price - deal.fixed_price) / product.price) * 100

      return percentage > 0 ? +percentage.toFixed(0) : 0
    }

    if (deal.compute_price === "percentage") {
      return deal.percent_price
    }
  }

  return product.price
}

export function getProductId(product: Product): number {
  return product.attributes.length > 0 ? product.id_product_att : product.id
}

export const getCompanyIndexFromOrderLineList = (
  orderLineList: DraftOrderLine[],
  company_id: number
) => {
  return orderLineList.findIndex((item) => (item.company_id || 1) === (company_id || 1))
}

export const isAllProductListChecked = (productList: DraftOrderLine[]) => {
  return productList.every((productListItem) =>
    productListItem?.productList.every((cartItem) => cartItem.is_check === true)
  )
}

export const countProductListCheckedItem = (productList: DraftOrderLine[]) => {
  let result = 0
  productList?.forEach((productListItem) =>
    productListItem?.productList.forEach((product) => {
      if (product.is_check) {
        result += 1
      }
    })
  )
  return result
}

export const getFromLocalStorage: any = (key: string) => {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(key)
    if (typeof value !== "object" && typeof value !== "function") {
      return value
    } else {
      return JSON.parse(value as any)
    }
  }
}

export function getTotalPrice(productList: CartItem[]) {
  if (productList?.length === 0) return 0

  return productList.reduce((prev, curr) => prev + curr.price * curr.product_qty, 0)
}

export const setToLocalStorage: any = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    if (typeof value !== "object" && typeof value !== "function") {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, value)
    }
  }
}

export const getFromSessionStorage: any = (key: string) => {
  if (typeof window !== "undefined") {
    return window.sessionStorage.getItem(key)
  }
}

export const setToSessionStorage: any = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    return window.sessionStorage.setItem(key, value)
  }
}

export const getAttributeList = (product: Product): AttributeWithParentIdAndName[] => {
  return product.attributes?.length > 0
    ? product?.attributes.map((item) => ({
        parentId: item.id,
        parentName: item.name,
        ...item.values[0],
      }))
    : []
}

export const changeUomCateTypeToReactSelectType = (uomCateg: Unit[]): UnitSelect[] => {
  return uomCateg?.length > 0
    ? uomCateg.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    : []
}

export const changeReactSelectTypeToUomType = (unit: UnitSelect): Unit => {
  return { id: unit.value, name: unit.label }
}

// {id, name} -> {value, label}
export const changeUomTypeToReactSelectType = (uom: Unit): UnitSelect => {
  return { value: uom?.id || 0, label: uom?.name || "" }
}

export const getListAttributeId = (product: Product | ProductCombo): ListAttributeId => {
  return {
    id: (product as Product)?.id || (product as ProductCombo)?.id || 0,
    lst_attributes_id:
      product?.attributes?.length > 0
        ? product.attributes.map((item: ProductAttribute) => item.values[0].id)
        : [],
  }
}

export function mergeProductAndProductDetail({
  product,
  productDetail,
}: {
  product: Product
  productDetail: ProductDetailRes
}): ProductDetail {
  return {
    ...product,
    ...productDetail,
    categ_id: product.categ_id,
    qty_available: productDetail.qty_available,
  }
}

export function mergeProductAndProductDetailToProductType({
  product,
  productDetail,
}: {
  product: Product
  productDetail: ProductDetail
}): Product {
  return {
    ...product,
    ...productDetail,
    id: productDetail.product_tmpl_id,
    id_product_att: productDetail.id,
  }
}

export function convertProductDetailToProductType(productDetaill: ProductDetail): Product {
  return {
    ...productDetaill,
    id: productDetaill.product_tmpl_id,
    id_product_att: productDetaill.id,
  }
}

export function convertProductToCartItem({
  product,
  quantity,
  variant,
  type,
}: {
  product: Product
  quantity: number
  variant: Variant[] | []
  type: "cart" | "buy"
}): CartItem {
  return {
    type: product.type,
    company_id: product?.company_id || 1,
    company_name: product?.company_name || "",
    is_check: type === "buy",
    product_id: product.id_product_att, //id of variant
    product_templ_id: product.id,
    product_name: product.name,
    image_url: product.image_url || [],
    price: product.price,
    variant,
    uom: product.uom,
    uom_categ: product.uom_categ,
    price_discount: product.price_discount,
    product_qty: quantity,
    price_table: product.price_table,
    attributes: product.attributes || [],
    list_products: [],
  }
}

export function convertComboDetailToCartItem({
  comboDetail,
  quantity,
  type,
}: {
  comboDetail: ProductComboDetail
  quantity: number
  type: "cart" | "buy"
}): CartItem {
  return {
    type: comboDetail.type,
    company_id: comboDetail.company_id || 1,
    company_name: comboDetail.company_name || "",
    is_check: type === "buy",
    product_id: comboDetail.id,
    product_templ_id: comboDetail.id,
    product_name: comboDetail.name,
    image_url: comboDetail.image || [],
    price: comboDetail.price,
    variant: [],
    price_discount: comboDetail.price_discount,
    product_qty: quantity,
    attributes: [],
    price_table: comboDetail.price_table,
    description_sale: comboDetail.description_sale,
    description_combo: comboDetail.description_combo,
    list_products: comboDetail.list_products || [],
  }
}

export const listView = [
  { id: 1, icon: view1Icon, value: 1 },
  { id: 2, icon: view2Icon, value: 2 },
  { id: 3, icon: view3Icon, value: 3 },
  { id: 4, icon: view4Icon, value: 4 },
]

export const productListView = [
  { id: 1, icon: view1Icon, value: 1, name: "1" },
  { id: 2, icon: view2Icon, value: 2, name: "2" },
  { id: 3, icon: view3Icon, value: 3, name: "3" },
  { id: 4, icon: view4Icon, value: 4, name: "4" },
  { id: 5, icon: view4Icon, value: 5, name: "5" },
  { id: 6, icon: view4Icon, value: 6, name: "6" },
]

export const limitProductList: ItemDropdown[] = [
  {
    id: 2,
    title: "24",
    value: 24,
  },
  {
    id: 3,
    title: "36",
    value: 36,
  },
  {
    id: 4,
    title: "48",
    value: 48,
  },
]

interface SortList {
  id: number
  title: string
  value: TypeGet
}

export const sortList: SortList[] = [
  {
    id: 5,
    title: "Phổ biến",
    value: "",
  },
  {
    id: 4,
    title: "Bán Chạy",
    value: "top_sale",
  },
  {
    id: 3,
    title: "Hàng Mới",
    value: "new",
  },
  {
    id: 1,
    title: "Giá Thấp",
    value: "price_reduction",
  },
  {
    id: 2,
    title: "Giá Cao",
    value: "price_increase",
  },
]

export function convertBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => resolve(fileReader.result as string)
    fileReader.onerror = (error) => reject(error)
  })
}

export function convertViToEn(str: string, toUpperCase = false) {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, "") // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str
}

export const formatTimeType = (time: TIME_TYPE): string => {
  switch (time) {
    case "day":
      return "ngày"
    case "hour":
      return "giờ"
    case "minute":
      return "phút"
    case "month":
      return "tháng"
    case "second":
      return "giây"
    case "week":
      return "tuần"
    case "year":
      return "năm"
    default:
      break
  }
  return "giây"
}

export const formatGroupTimeType = (date: GroupTimeType): string => {
  const type = date.time_type

  if (type === "date") {
    return `${date.date_value}`
  }

  if (type === "day") {
    return `${date.date_duration || 1} Ngày trước`
  }

  if (type === "today") {
    return `${date.hour_value} Hôm nay`
  }

  if (type === "year") {
    return `${date.date_value}`
  }

  if (type === "yesterday") {
    return `${date.hour_value} Hôm qua`
  }

  return ""
}

export const calculateElapsedTime = (timeCreated: string) => {
  const created = new Date(timeCreated).getTime()
  let periods: any = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  }
  let diff = Date.now() - created

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key])
      return `${result} ${result === 1 ? key : key + "s"} ago`
    }
  }

  return "Just now"
}

export const toggleHTMLOverflow = (status: "hidden" | "unset") => {
  const htmlTag = document.querySelector("html")
  if (htmlTag) {
    htmlTag.style.overflow = status
  }
}

export const isObjectID = (val: string): boolean => {
  return OBJECT_ID_REGEX.test(val)
}

export const getMessageDescription = (params: MessageRes): string => {
  let message_text = params?.message_text || ""
  if (params.attachments?.length) {
    message_text = "Hình ảnh"
  } else if (params?.product_id) {
    message_text = "Sản phẩm"
  } else if (params?.sale_order_id) {
    message_text = "Đơn hàng"
  } else if (params?.promotion_id) {
    message_text = "Khuyến mãi"
  }

  return message_text
}

export const getLastMessage = (params: MessageRes): LastMessage => {
  return {
    author_name: params.author.author_name || "",
    created_at: params.created_at,
    is_author: params.is_author,
    message_id: params.message_id,
    message_text: getMessageDescription(params),
    room_id: params.room_id,
  }
}

export const toImageUrl = (url: string) => `${process.env.NEXT_PUBLIC_API_URL}${url}`

export const removeBase64Reader = (str: string) => str.replace(BASE64_READER_REGEX, "")
