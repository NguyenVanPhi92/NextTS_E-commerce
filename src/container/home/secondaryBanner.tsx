/* eslint-disable @next/next/no-img-element */
import { API_URL } from "@/services"
import { Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

export const SecondaryBanner = ({ banners }: { banners: string[] | null }) => {
  return (
    <div className="secondary__banner">
      {banners ? (
        <div className="secondary__banner-list">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            slidesPerGroup={2}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              992: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
              },
            }}
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <img src={`${API_URL}${banner}`} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="secondary__banner-loading"></div>
      )}
    </div>
  )
}
