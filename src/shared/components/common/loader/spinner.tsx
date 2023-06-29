import { BiLoaderAlt } from "react-icons/bi"

export const Spinner = ({ size }: { size?: number }) => {
  return (
    <div className="spinner">
      <BiLoaderAlt style={{ fontSize: size, fill: "#595959" }} />
    </div>
  )
}
