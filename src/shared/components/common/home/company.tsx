import companyApi from "@/services/companyApi"
import Link from "next/link"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import useSWR from "swr"
import { Avatar } from "../avatar"

export const HomeCompany = () => {
  const { isValidating, data } = useSWR("get_company_list", () =>
    companyApi.getCompanyList().then((res) => res?.result?.data || [])
  )

  if (!isValidating && data?.length < 2) return null
  return (
    <div className="">
      <div className="home__heading-text mb-12">
        <h3>Thương hiệu</h3>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        slidesPerGroup={4}
        navigation
        loop={false}
        breakpoints={{
          500: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          576: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 8,
            slidesPerGroup: 8,
          },
          992: {
            slidesPerView: 9,
            slidesPerGroup: 9,
          },
          1024: {
            slidesPerView: 10,
            slidesPerGroup: 10,
          },
          1200: {
            slidesPerView: 12,
            slidesPerGroup: 12,
          },
        }}
      >
        {!isValidating
          ? data?.length
            ? data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div key={item.id}>
                    <Link href={`/company/${item.id}`} passHref>
                      <div className="flex flex-col items-center justify-center">
                        <Avatar url={item.img_url} size={62} objectFit="contain" />

                        <p className="text-[13px] leading-[18px] font-semibold line-clamp-2 text-center cursor-pointer">
                          {item.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))
            : null
          : Array.from({ length: 12 }).map((_, index) => (
              <SwiperSlide className="flex-center flex-col" key={index}>
                <div className="skeleton w-[62px] h-[62px] rounded-[50%] mb-8" />
                <div className="h-[12px] rounded-[4px] skeleton w-[90%]" />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}
