import { avatar } from "@/assets"
import { API_URL } from "@/services"
import Image from "next/image"

interface AvatarProps {
  url: string
  size?: number
  onClick?: Function
  objectFit?: string
  className?: string
}

export const Avatar = ({
  url,
  size = 32,
  onClick,
  objectFit = "",
  className = "",
}: AvatarProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[50%] cursor-pointer ${className}`}
      onClick={() => onClick?.()}
      style={{ width: size, height: size }}
    >
      <Image
        src={url ? (url?.includes("data:image/png;base64") ? url : `${API_URL}${url}`) : avatar}
        layout="fill"
        alt=""
        className="image"
        objectFit={objectFit as any}
      />
    </div>
  )
}
