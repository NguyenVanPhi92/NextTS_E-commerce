import { BiLoaderCircle } from "react-icons/bi"
import { BsFillHeartFill } from "react-icons/bs"

interface ButtonWishlistProps {
  status?: boolean
  onChange?: (_: boolean) => void
  isLoading?: boolean
}

const ButtonWishlist = ({ status, onChange, isLoading }: ButtonWishlistProps) => {
  // const [currentId, setCurrentId] = useState<number | undefined>()

  return (
    <>
      <button onClick={() => onChange?.(!status)} className="product__intro-sub-item">
        {isLoading ? (
          <BiLoaderCircle className="loader" />
        ) : (
          <BsFillHeartFill
            style={{
              fill: status ? "#dc3545" : "#cacaca",
            }}
          />
        )}
      </button>
    </>
  )
}

export default ButtonWishlist
