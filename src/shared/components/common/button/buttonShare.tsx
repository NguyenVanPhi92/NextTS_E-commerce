/* eslint-disable @next/next/inline-script-id */
/* eslint-disable @next/next/no-sync-scripts */
import { DOMAIN_URL, generateProductSlug } from "@/helper"
import Script from "next/script"
import { useEffect, useState } from "react"
import { BsMessenger, BsTwitter } from "react-icons/bs"
import { FaFacebookF } from "react-icons/fa"
import { RiWhatsappLine } from "react-icons/ri"
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"

interface IButtonShare {
  name: string
  description: string
  imageUrl: string
  product_id: number
}

const ButtonShare = ({ name, description, imageUrl, product_id }: IButtonShare) => {
  const url = `${DOMAIN_URL}/${generateProductSlug(name, product_id)}`

  const RenderZaloBtn = () => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
      const id = setTimeout(() => {
        setShow(true)
      }, 3000)

      return () => {
        setShow(false)
        // if (id?.hasRef) {}
      }
    }, [])

    if (show)
      return (
        <div className="zalo-share-button-wrapper">
          {/* <div class="zalo-share-button" data-href="" data-oaid="1026828826434252149" data-layout="1" data-color="blue" data-customize="false"></div> */}
          <div
            className="zalo-share-button"
            data-href=""
            data-oaid="1026828826434252149"
            data-layout="1"
            data-color="blue"
            data-customize="false"
          >
            hello
          </div>
        </div>
      )

    return null
  }

  return (
    <div className="button-share">
      <FacebookShareButton
        className="button-share-facebook"
        quote={name}
        title={name}
        hashtag={`#${name}`}
        url={url}
      >
        <FaFacebookF />
      </FacebookShareButton>

      <Script src="https://sp.zalo.me/plugins/sdk.js" />

      <RenderZaloBtn />

      <FacebookMessengerShareButton
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ""}
        className="button-share-messenger"
        title={name}
        url={url}
      >
        <BsMessenger />
      </FacebookMessengerShareButton>
      <TwitterShareButton className="button-share-twitter" title={name} url={url}>
        <BsTwitter />
      </TwitterShareButton>
      <WhatsappShareButton className="button-share-whatsapp" title={name} url={url}>
        <RiWhatsappLine />
      </WhatsappShareButton>
    </div>
  )
}

export default ButtonShare
