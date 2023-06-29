import { EmptyLayout } from "@/layout"
import { persistor, store } from "core"
import Head from "next/head"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { SWRConfig } from "swr"
import { AppPropsWithLayout } from "../models"
import "../styles/index.scss"

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const { openGraphData = [] } = pageProps as any

  return (
    <>
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {openGraphData.map((og: any, index: number) => (
          <meta key={index} {...og} />
        ))}
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
