import { Company, CompanyDetail } from "@/models"
import { AxiosResponse } from "axios"
import axiosClient from "."

const companyApi = {
  getCompanyList: (): Promise<AxiosResponse<Company[]>> => {
    return axiosClient.post("/api/v3.0/user/get_list_all_companies", {
      params: {},
    })
  },

  getDetailCompany: (company_id: number): Promise<AxiosResponse<CompanyDetail>> => {
    return axiosClient.post("/api/v2.0/get_info_company", {
      params: {
        company_id,
      },
    })
  },
}

export default companyApi
