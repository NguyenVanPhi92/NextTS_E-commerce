/* eslint-disable @next/next/no-img-element */
import { API_URL } from "@/services"
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

interface MainBannerProps {
  banners: {
    left: string[] | null
    right: string[] | null
  }
}

export const MainBanner = ({ banners }: MainBannerProps) => {
  if (banners === null) return null
  return (
    <div className="home__banner">
      {banners.left !== null ? (
        <div className="home__banner-left">
          {banners.left.length === 1 ? (
            <img
              style={{ height: "100%" }}
              src={`${API_URL}${banners.left[0]}`}
              alt=""
              className="img-fluid"
            />
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {banners.left.map((banner, index) => (
                <SwiperSlide key={index}>
                  <img src={`${API_URL}${banner}`} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      ) : (
        <div className="home__banner-left home__banner-left-loading"></div>
      )}

      {banners.right !== null ? (
        <div className="home__banner-right">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
          >
            {banners.right.map((banner, index) => (
              <SwiperSlide key={index}>
                <img src={`${API_URL}${banner}`} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="home__banner-right home__banner-right-loading"></div>
      )}
    </div>
  )
}
