"use client"

import { Customer, Organizer, User, Vendor } from "@prisma/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import UserLink from "../common/UserLink"

interface UserNavigationProps {
  user: User
  user_role: Organizer | Vendor | Customer
}

// ユーザーナビゲーション
const UserNavigation = ({ user, user_role }: UserNavigationProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={user.image || "/default.png"}
            className="rounded-full object-cover"
            alt={user.name || "avatar"}
            fill
            sizes="40px"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white p-2 w-[300px]" align="end">
        <UserLink userId={user_role.id} userName={user.name} userImage={user.image} userType={user.role as "vendor" | "organizer"} />
        {/* <Link href={`/author/${user.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <div className="break-words min-w-0">
              <div className="mb-2">{user.name || ""}</div>
              <div className="text-gray-500">{user.email || ""}</div>
            </div>
          </DropdownMenuItem>
        </Link> */}

        <DropdownMenuSeparator />

        {user.isAdmin && (
          <Link href="/event/new">
            <DropdownMenuItem className="cursor-pointer">
              イベント新規作成
            </DropdownMenuItem>
          </Link>
        )}

        <Link href="/settings/profile">
          <DropdownMenuItem className="cursor-pointer">
            アカウント設定
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onSelect={async (event) => {
            event.preventDefault()
            await signOut({ callbackUrl: "/" })
          }}
          className="text-red-600 cursor-pointer"
        >
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNavigation
