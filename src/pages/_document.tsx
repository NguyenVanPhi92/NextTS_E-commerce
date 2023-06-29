/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="shortcut icon" href="/logo.ico" />
        </Head>

        <body>
          {/* <div
            className="zalo-chat-widget"
            data-oaid="3309605815278018281"
            data-welcome-message="Rất vui khi được hỗ trợ bạn!"
            data-autopopup="0"
            data-width=""
            data-height=""
          /> */}

          <Main />
          <NextScript />
          <script
            src="https://sp.zalo.me/plugins/sdk.js"
            onLoad={() => {
              setTimeout(() => {
                const element = document?.querySelector?.(".zalo-share-button-wrapper")
                console.log({ element })

                console.log("loaded by document")
                if (element) {
                  element.innerHTML = `
    <div class="zalo-share-button" data-href="" data-oaid="1026828826434252149" data-layout="1" data-color="blue" data-customize="false"></div>
      `
                }
              }, 1000)
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
