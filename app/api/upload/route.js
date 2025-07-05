// app/api/upload/route.js
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

// Configure cloudinary with your .env values
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req) {
  try {
    const { image } = await req.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "portfolio",
    })

    return NextResponse.json({ url: uploadResponse.secure_url })
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "GET not supported. Use POST to upload an image." },
    { status: 405 }
  )
}
