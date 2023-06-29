import productApi from '@/services/productApi'
import React from 'react'
import useSWR from 'swr'
import { ProductGrid } from '../product'

export const ShopProducts = () => {
    const { data, isValidating } = useSWR('get_product_of_shop', () =>
        productApi.getProductList({ limit: 24 }).then((res) => res?.result?.data?.products || [])
    )
    return <ProductGrid data={data} isLoading={isValidating} />
}
