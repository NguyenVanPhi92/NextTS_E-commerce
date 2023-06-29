import { imageBlur } from "@/assets"
import { PostRes } from "@/models"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

interface NewsItemProps {
  data: PostRes | null
  onClick?: (id: string) => void
}

const NewsItem = ({ data, onClick }: NewsItemProps) => {
  const router = useRouter()

  if (data === null)
    return (
      <div className="flex flex-col">
        <div className="aspect-1 skeleton mb-16 rounded-[5px] lg:rounded-[10px]"></div>
        <div className="rounded-[4px] mb-12 h-[18px] skeleton w-1/2"></div>
        <div className="rounded-[4px] h-[12px] skeleton mb-4"></div>
        <div className="rounded-[4px] h-[12px] skeleton w-[2/3]"></div>
      </div>
    )
  return (
    <div onClick={() => (onClick ? onClick?.(data.postId) : router.push(`/news/${data.postId}`))}>
      <div className="mb-[8px] lg:mb-16 cursor-pointer">
        <div className="relative aspect-1 overflow-hidden rounded-[5px] lg:rounded-[10px] group">
          <Image
            className="select-none transform group-hover:scale-110 transition-all duration-500"
            src={data.thumbnail}
            layout="fill"
            objectFit="cover"
            alt=""
            blurDataURL={imageBlur}
          />
        </div>
      </div>

      <div className="">
        <div className="">
          <p className="line-clamp-1 text-[10px] md:text-12 text-gray-color-3 font-normal mb-[4px] lg:mb-[8px]">
            {moment(data.createdAt).format("DD/MM/YYYY")}
          </p>
          <Link href={`/news/${data.postId}`}>
            <a className="text-14 leading-[22px] hover:text-primary md:text-[16px] md:leading-[24px] font-semibold line-clamp-2">
              {data.title}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export { NewsItem }
