import { MainBanner } from "@/container"
import React from "react"
import { useBanner } from "shared/hook"

export const ShopDetailbanner = () => {
  const { data: banners, isValidating: isBannerLoading } = useBanner()

  return (
    <>
      {isBannerLoading ? (
        <MainBanner
          banners={{
            left: null,
            right: null,
          }}
        />
      ) : banners?.length > 1 ? (
        <MainBanner
          banners={{
            left: (banners as any)?.[0]?.images || null,
            right: (banners as any)?.[1]?.images || null,
          }}
        />
      ) : null}
    </>
  )
}
