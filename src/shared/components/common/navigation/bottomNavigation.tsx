import { useRouter } from "next/router"
import React from "react"
import { useDispatch } from "react-redux"
import { navMobileLinks } from "../header"

export const BottomNavigation = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <div className="nav__mobile">
      <ul className="nav__mobile-list">
        {navMobileLinks.map((nav) => (
          <li
            key={nav.id}
            onClick={() =>
              nav.onClick ? dispatch(nav.onClick && nav.onClick(true)) : router.push(nav.id)
            }
            className="nav__mobile-list-item"
          >
            {nav.icon}
            <p>{nav.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
