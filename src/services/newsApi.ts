import { GetPostsParams } from "@/models/news"
import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEWS_API_URL,
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response.data
    }
    return response
  },
  (err) => {
    throw err
  }
)

const newsApi = {
  getPosts: ({ limit = 12, offset = 0, categoryId }: GetPostsParams) => {
    return axiosClient.get(
      `/api/post?limit=${limit}&offset=${offset}${
        categoryId !== undefined ? `&categoryId=${categoryId} ` : ""
      }`
    )
  },

  getRelatedPosts: ({ limit = 12, offset = 0, categoryId }: GetPostsParams) => {
    return axiosClient.get(
      `/api/post?limit=${limit}&offset=${offset}${
        categoryId !== undefined ? `&categoryId=${categoryId} ` : ""
      }`
    )
  },

  getPostDetail: (postId: string) => {
    return axiosClient.get(`/api/post/${postId}`)
  },

  getCategories: () => {
    return axiosClient.get("/api/category")
  },
}

export default newsApi
