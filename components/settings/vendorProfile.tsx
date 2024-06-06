"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Vendor, User } from "@prisma/client"
import { trpc } from "@/trpc/react"
import { Loader2 } from "lucide-react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"
import toast from "react-hot-toast"


interface ProfileProps {
  vendor: Vendor
}

// プロフィール
const VendorProfile = ({ vendor: vendor }: ProfileProps) => {

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">イベント出店者プロフィール</div>
      <p>事業者名: {vendor.vendorName}</p>
    </div>
  )
}

export default VendorProfile