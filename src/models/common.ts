import { AxiosPromise, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ForwardedRef, ReactChild, ReactElement, ReactNode } from 'react'
import { KeyedMutator } from 'swr'
import { ShippingAddress } from './address'

export interface HasChildren {
  children: ReactChild
}
export interface LayoutProps {
  children: ReactNode
}

export interface QueryList {
  limit?: number
  offset?: number
}

export type QueryListFunction<T, V> = {
  params: V & QueryList
  onSuccess?: (_: T[]) => void
  onError?: Function
}

export interface UseQueryListRes<T, V> {
  isValidating: boolean
  hasMore: boolean
  fetchMore: (_: QueryListFunction<T, V>) => Promise<void>
  filter: (_: QueryListFunction<T, V>) => Promise<void>
  isFetchingMore: boolean
  offset: number
  data: T[] | undefined
  error: any
  isFirstLoading: boolean
  mutate: KeyedMutator<any>
  params: (V & QueryList) | undefined
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface PayloadBoolean {
  payload: boolean
}

export interface BooleanType {
  payload: boolean
}

export type MessageType = 'info' | 'danger' | 'warning' | 'success'
export type MessageDirection = 'center' | 'top' | 'bottom'
export type MessageSize = 'small' | 'medium' | 'large'

export interface ModalConfirmProps {
  isOpen: boolean
  heading?: string
  title: string
}

export interface AttachmentId {
  attachment_id: string
  url: string
}

export interface CommonSlice {
  isOpenModalProduct: boolean
  isOpenModalProductCombo: boolean
  isOpenModalOptionAccount: boolean
  isOpenModalCoupons: boolean
  modalConfirm: ModalConfirmProps
  isOpenAddressForm: boolean
  isChannelGroupOpen: boolean
  isOpenModalFilter: boolean
  isOpenNavLeftModal: boolean
  currentReviewId: number
  addressForm: ShippingAddress | undefined
  breadcrumbList: BreadcrumbItem[] | undefined
  isOpenSearchModal: boolean
  isOpenCategoryModal: boolean
  isOpenCartModal: boolean
  isOpenScreenLoading: boolean
  isOpenOrderSummary: boolean
  isOpenOtpLoginModal: boolean
  isOpenLoginSMSModal: boolean
  isOpenLoginModal: boolean
  previewImageUrl: string | undefined
}

export interface SetMessageProps {
  payload: {
    title: string
    isOpen?: boolean
    type?: MessageType
    duration?: number
    direction?: MessageDirection
    size?: MessageSize
  }
}

export interface BreadcrumbItem {
  name: string
  path: string
}

declare module 'axios' {
  export interface AxiosResponse<T> {
    jsonrpc: string
    id: any
    result: {
      code: 200 | 400 | 401 | 404 | 409
      success: boolean
      message: string
      validate_token: boolean
      data: T
    }
  }

  export interface AxiosResponse2<T> {
    jsonrpc: string
    id: any
    result: T
  }

  export interface AxiosResponse3<T> {
    jsonrpc: string
    id: any
    result: {
      success: boolean
      message: string
      data: {
        products: T
      }
    }
  }
}

export interface GetBannerParams {
  radio: string[]
  type?: 'slide' | 'banner' | 'advertisement' | 'background' | 'category' | 'advertisement' | 'sale'
}

export type BannerAreaType = 'topArea' | 'bottomArea' | 'centerArea'
export type BannerRatio = '1:3' | '1:1' | '3:1'

export interface BannerRes {
  [key: string]: {
    name: string
    type: string
    ratio: BannerRatio
    images: string[]
  }[]
}

export interface PayloadType<T> {
  payload: T
}

export type ForwaredResetForm = ForwardedRef<{ onReset: Function }>

export type OnResetParams = {
  onReset: () => void
}

export interface AsyncHandlerConfig {
  showScreenLoading?: boolean
  showErrorMessage?: boolean
  successMsg?: string
  showSuccessMsg?: boolean
  errorMsg?: string
}

export interface AsyncHandlerRoot<T, V> {
  fetcher: AxiosPromise<AxiosResponse<T>>
  onSuccess?: (_: T) => void
  onError?: () => void
  config?: AsyncHandlerConfig
}

export interface AsyncHandler<T, U> {
  params: T
  onSuccess?: (params: U) => void
  onError?: Function
}

export interface ListQuery {
  limit?: number
  offset?: number
}

export interface OpenGraphData {
  content: string
  property: string
  key: string
}

export type TIME_TYPE = 'day' | 'second' | 'hour' | 'minute' | 'year' | 'month' | 'week'

export interface GroupTimeType {
  hour_value: string
  date_value: string
  time_type: 'today' | 'yesterday' | 'day' | 'date' | 'year'
  name: string
  date_duration?: number
}

export interface FetcherConfig {
  showScreenLoading?: boolean
  errorMsg?: string
  successMsg?: string
  showErrorMsg?: boolean
  toggleOverFlow?: boolean
}

export interface UseParams<T, U> {
  params: T
  onSuccess: (params: U) => void
  onError?: Function
  config?: FetcherConfig
}

export interface ResponseType<T> {
  result: {
    code: 200 | 400 | 401 | 404 | 409
    success: boolean
    message: string
    validate_token: boolean
    data: T
  }
}

export interface OptionType<T extends string | number> {
  label: string
  value: T
}
