import React from "react"

interface BadgeProps {
  count: number
  className?: string
  size?: number
}

const Badge = ({ count, className = "", size = 14 }: BadgeProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={`rounded-[50%] font-medium text-[8px] flex-center bg-error text-white-color ${className}`}
    >
      {count > 9 ? (
        <>
          <span>9</span>
          <span className="text-[6px]">+</span>
        </>
      ) : (
        count
      )}
    </div>
  )
}

export { Badge }
