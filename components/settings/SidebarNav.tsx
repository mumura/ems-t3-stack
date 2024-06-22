"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

// ナビゲーション
const items = [
  {
    title: "プロフィール",
    href: "/settings/profile",
  },
  {
    title: "イベント主催者プロフィール",
    href: "/settings/organizerProfile",
  },
  {
    title: "イベント出店者プロフィール",
    href: "/settings/vendorProfile",
  },
  // {
  //   title: "定期購入",
  //   href: "/settings/billing",
  // },
  {
    title: "パスワード変更",
    href: "/settings/password",
  },
]

// サイドナビゲーション
const SidebarNav = () => {
  const pathname = usePathname()

  const [isDevicePC, setIsDevicePC] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      // 画面の幅が700px以上、高さが700px以上の場合はPCと判定
      setIsDevicePC(window.innerWidth > 700 && window.innerHeight > 700)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div>
      {isDevicePC && (
        <nav className={cn("flex space-x-2 md:flex-col md:space-x-0 md:space-y-1")}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}

export default SidebarNav
