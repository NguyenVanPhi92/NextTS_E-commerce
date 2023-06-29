import { useDebounce, useInputText } from "shared/hook"
import { InputHTMLAttributes, useEffect, useRef } from "react"
import { IoClose } from "react-icons/io5"
import { RiSearchLine } from "react-icons/ri"

interface RoomFormProps {
  onChange?: (val: string) => void
  className?: string
  attributes?: InputHTMLAttributes<HTMLInputElement>
  onFocus?: Function
}

export const InputSearch = ({
  onChange: onChangeProps,
  className,
  attributes,
  onFocus,
}: RoomFormProps) => {
  const secondRef = useRef<boolean>(false)
  const { clearValue, onChange, value } = useInputText()
  const searchValue = useDebounce(value, 500)

  useEffect(() => {
    if (!secondRef.current) {
      secondRef.current = true
      return
    }

    onChangeProps?.(searchValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <div className={`w-full h-full relative flex items-center rounded-[8px] ${className}`}>
      <span className="absolute-vertical left-[14px]">
        <RiSearchLine className="text-gray-color-6" />
      </span>
      <input
        onFocus={() => onFocus?.()}
        className="form-input flex-1 border-none pl-40 pr-40 bg-bg text-sm"
        onChange={onChange}
        value={value}
        type="text"
        {...attributes}
      />

      {value ? (
        <span onClick={() => clearValue()} className="absolute-vertical right-16 cursor-pointer">
          <IoClose className="text-gray-color-3" />
        </span>
      ) : null}
    </div>
  )
}
