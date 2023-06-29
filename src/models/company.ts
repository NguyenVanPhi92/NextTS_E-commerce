export interface Company {
  id: number
  work_address_id: number
  address: string
  phone: string
  email: string
  website: string
  time_work: string
  latitude: string
  longitude: string
  name: string
  industry_id: []
  banner_img: string[]
  img_url: string
}

export interface CompanyDetail {
  id: number
  name: string
  phone: string
  email: string
  website: string
  vat: false
  time_work: string
  adress: {
    id: number
    street: string
    ward_id: string
    district_id: string
    state_id: string
    country_id: string
    full_adress: string
  }[]
  social_facebook: string
  social_github: string
  social_instagram: string
  social_linkedin: string
  social_twitter: string
  social_youtube: string
  logo: string
}
