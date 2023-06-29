import { CompanyDetail } from "@/models"
import { useDispatch } from "react-redux"
import { ShopDetailHeader } from "./shopDetailHeader"

interface ShopInfoProps {
  data: CompanyDetail
}

export const ShopInfo = ({ data }: ShopInfoProps) => {
  const dispatch = useDispatch()

  return (
    <div>
      <header className="relative">
        <ShopDetailHeader data={data} />
      </header>
    </div>
  )
}
