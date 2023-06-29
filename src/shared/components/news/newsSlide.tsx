import { PostRes } from "@/models"
import { Autoplay, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { NewsItem } from "./newsItem"

const NewsSlide = ({ data, isLoading }: { data: PostRes[]; isLoading: boolean }) => {
  if (isLoading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-custom">
        {Array.from({ length: 4 }).map((_, index) => (
          <NewsItem key={index} data={null} />
        ))}
      </div>
    )

  return (
    <Swiper
      className="swiper-hover"
      spaceBetween={12}
      slidesPerView={2}
      breakpoints={{
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      modules={[Navigation, Autoplay]}
      navigation={true}
      autoplay={{ delay: 5000 }}
    >
      {data &&
        data?.map((item) => (
          <SwiperSlide key={item.postId} className="relative aspect-[3/2]">
            <NewsItem data={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export { NewsSlide }
