/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/jlBltejfrmZ
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
'use client'
import { getAuthSession } from "@/lib/nextauth"

import { Event, User, Comment, CommentLike } from "@prisma/client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { trpc } from "@/trpc/react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import CommentDetail from "@/components/comment/CommentDetail"

import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

interface EventDetailProps {
  event: Event & {
    user: Pick<User, "id" | "name" | "image">
  }
  userId?: string
  comments: (Comment & { user: Pick<User, "id" | "name" | "image"> } & {
    hasLiked: boolean
    commentLikeId: string | null
  } & { likes: CommentLike[] })[]
  pageCount: number
  totalComments: number
  isSubscribed: boolean
}

const EventDetail = ({
  event: event,
  userId,
  comments,
  pageCount,
  totalComments,
  isSubscribed,
}: EventDetailProps) => {

  const router = useRouter()

  // 表示内容判定
  const isSubscribedEvent =
    event.premium && !isSubscribed && event.userId !== userId

  // 投稿内容を200文字に制限
  const content =
    isSubscribedEvent && event.content.length > 200
      ? event.content.slice(0, 200) + "..."
      : event.content

  // 投稿削除
  const { mutate: deleteEvent, isLoading } = trpc.event.deleteEvent.useMutation({
    onSuccess: () => {
      toast.success("投稿を削除しました")
      router.refresh()
      router.push(`/`)
    },
    onError: (error) => {
      toast.error(error.message)
      console.error(error)
    },
  })

  // 削除ボタンクリック時の処理
  const handleDeleteEvent = () => {
    if (event.user.id !== userId) {
      toast.error("投稿は削除できません")
      return
    }

    // 投稿削除
    deleteEvent({
      eventId: event.id,
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8">
        {event.premium && (
          <div className="bg-gradient-radial from-blue-500 to-sky-500 rounded-md text-white font-semibold px-3 py-1 text-xs inline-block">
            有料会員限定
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div>
            <Link href={`/author/${event.user.id}`}>
              <div className="flex items-center space-x-1">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Image
                    src={event.user.image || "/default.png"}
                    className="rounded-full object-cover"
                    alt={event.user.name || "avatar"}
                    fill
                  />
                </div>
                <div className="text-sm hover:underline break-words min-w-0">
                  {event.user.name} |{" "}
                  {format(new Date(event.updatedAt), "yyyy/MM/dd HH:mm")}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-2 text-gray-500">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>June 15, 2023 - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              <span>123 Main St, Anytown USA</span>
            </div>
          </div>
        </div>
        <div className="aspect-[16/9] relative">
          <Image
            fill
            src={event.image || "/noImage.png"}
            alt="thumbnail"
            className="object-cover rounded-md"
          />
        </div>
        <div className="font-bold text-2xl break-words">内容</div>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          <p>{event.content}</p>
        </div>
        <div className="font-bold text-2xl break-words">開催場所</div>
        <div className="leading-relaxed break-words whitespace-pre-wrap">
          {event.location}
        </div>
        <Button className="w-full sm:w-auto">参加リクエスト(vendor用)</Button>
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-bold">参加リクエスト中(organizer用)</h2>
            <ul className="grid gap-4 mt-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-gray-500">Acme Inc.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Approve
                  </Button>
                  <Button size="sm" variant="ghost">
                    Decline
                  </Button>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Appleseed</p>
                    <p className="text-gray-500">Widgets Inc.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Approve
                  </Button>
                  <Button size="sm" variant="ghost">
                    Decline
                  </Button>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">参加確定</h2>
            <ul className="grid gap-4 mt-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Sarah Miller</p>
                    <p className="text-gray-500">Acme Inc.</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <XIcon className="w-5 h-5" />
                  <span className="sr-only">Remove</span>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>TW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Tom Wilson</p>
                    <p className="text-gray-500">Widgets Inc.</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <XIcon className="w-5 h-5" />
                  <span className="sr-only">Remove</span>
                </Button>
              </li>
            </ul>
          </div>
          {userId === event.user.id && (
            <div className="flex items-center justify-end space-x-1">
              <Link href={`/event/${event.id}/edit`}>
                <div className="hover:bg-gray-100 p-2 rounded-full">
                  <Pencil className="w-5 h-5" />
                </div>
              </Link>
              <button
                className="hover:bg-gray-100 p-2 rounded-full"
                disabled={isLoading}
                onClick={handleDeleteEvent}
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          )}

          {isSubscribedEvent && (
            <div className="bg-gradient-radial from-blue-500 to-sky-500 text-white rounded-md p-5 sm:p-10 text-center space-y-5">
              <div>この記事の続きは有料会員になるとお読みいただけます。</div>

              <div className="inline-block">
                {userId ? (
                  <Link href="/payment">
                    <div className="w-[300px] bg-white text-blue-500 hover:bg-white/90 font-bold shadow rounded-md py-2">
                      有料プランをみる
                    </div>
                  </Link>
                ) : (
                  <Link href="/login">
                    <div className="w-[300px] bg-white text-blue-500 hover:bg-white/90 font-bold shadow rounded-md py-2">
                      ログインする
                    </div>
                  </Link>
                )}
              </div>

              <div className="text-xs">※いつでも解約可能です</div>
              <div className="font-bold">有料会員特典</div>
              <div className="text-sm">有料記事が読み放題</div>
            </div>
          )}

          <CommentDetail
            userId={userId}
            eventId={event.id}
            comments={comments}
            pageCount={pageCount}
            totalComments={totalComments}
          />
        </div>
      </div>
    </div>
  )
}
export default EventDetail

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
