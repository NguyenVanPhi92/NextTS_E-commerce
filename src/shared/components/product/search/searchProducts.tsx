/* eslint-disable react/no-unescaped-entities */
import { RootState } from "@/core/store"
import { addSearchHistoryProduct, setOpenSearchModal } from "@/modules"
import productApi from "@/services/productApi"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { useClickOutside } from "shared/hook"
import useSWR from "swr"
import { SearchForm } from "../../form"
import { Spinner } from "../../common/loader"
import { ProductSearchItem } from "./productSearchItem"
import { convertViToEn, generateProductSlug } from "@/helper"

interface SearchProductsProps {
  device?: "mobile" | "desktop"
}

export const SearchProducts = ({ device = "desktop" }: SearchProductsProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const partner_id = useSelector((state: RootState) => state.user.userInfo?.id || 0)
  const searchProductsHistory = useSelector((state: RootState) => state.searchProductHistory.data)

  const [value, setValue] = useState<string>()
  const [showSearchResult, setShowSearchResult] = useState<boolean>()
  const [isSearching, setSearching] = useState<boolean>(false)

  const { data, mutate } = useSWR(
    "get_search_product",
    () =>
      productApi.getProductList({ partner_id }).then((res) => res?.result?.data?.products || []),
    {
      revalidateOnMount: false,
    }
  )

  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  useClickOutside([ref, formRef], () => setShowSearchResult(false))

  const searchProducts = async (value: string) => {
    if (!value) return

    try {
      setSearching(true)
      const data = await productApi.getProductList({
        keyword: value,
        partner_id,
      })
      setSearching(false)
      mutate(data.result.data.products || [], false)
    } catch (error) {
      setSearching(false)
    }
  }

  const handleSubmit = (value: string) => {
    if (!value) return
    router.push({
      pathname: `/products/search?keyword=${value}`,
      query: {
        ...router.query,
        keyword: value,
        category_id: null,
        offset: 0,
      },
    })
  }

  const handleClickSeachResultItem = (name: string, id: number) => {
    setShowSearchResult(false)
    router.push(generateProductSlug(name, id))
    if (device === "mobile") {
      dispatch(setOpenSearchModal(false))
    }
  }

  useEffect(() => {
    if (device === "mobile") {
      setShowSearchResult(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div style={{ zIndex: 101, position: "relative" }} className="">
        <div ref={formRef}>
          <div className="search__desktop-form">
            <SearchForm
              onFocus={() => setShowSearchResult(true)}
              timer={500}
              onSubmit={(val) => handleSubmit(val)}
              onChange={(val) => setValue(val as string)}
              onChangeWithDebounceValue={(val) => searchProducts(val)}
            />
          </div>

          <div className="search__mobile-modal">
            <button
              onClick={() => dispatch(setOpenSearchModal(false))}
              className="btn-reset search__mobile-modal-btn-back"
            >
              <BiArrowBack />
            </button>

            <SearchForm
              onFocus={() => setShowSearchResult(true)}
              timer={500}
              onSubmit={(val) => handleSubmit(val as string)}
              onChange={(val) => setValue(val as string)}
              onChangeWithDebounceValue={(val) => searchProducts(convertViToEn(val))}
              device="mobile"
            />
          </div>
        </div>

        {showSearchResult ? (
          <div ref={ref} className="search__result">
            {isSearching ? (
              <Spinner />
            ) : value ? (
              <>
                {!data || data?.length === 0 ? (
                  <div className="search__result--no-result">
                    không có kết quả nào cho{" "}
                    <span>
                      <small>"</small>
                      {value}
                      <small>"</small>
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="search__result-keyword">
                      <span> {`Hiển thị ${data?.length || 0} kết quả cho`}: </span>
                      <p>"{value}"</p>
                    </div>

                    {data?.map((item) => (
                      <ProductSearchItem
                        data={item}
                        key={item.id}
                        onChange={(val) => {
                          dispatch(addSearchHistoryProduct(item))
                          handleClickSeachResultItem(val.name, val.id)
                        }}
                      />
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                <p className="search__result-history-title">Lịch sử tìm kiếm</p>

                {searchProductsHistory?.map((item) => (
                  <ProductSearchItem
                    onChange={({ id }) => handleClickSeachResultItem(item.name, id)}
                    data={item}
                    key={item.id}
                  />
                ))}
              </>
            )}
          </div>
        ) : null}
      </div>

      {showSearchResult ? (
        <div onClick={() => setShowSearchResult(false)} className="search-overlay"></div>
      ) : null}
    </>
  )
}
