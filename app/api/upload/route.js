import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { image, fileBase64, isResume } = await req.json();
    const file = image || fileBase64;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const upload = await cloudinary.uploader.upload(file, {
      folder: "portfolio",
      resource_type: isResume ? "raw" : "image",
      public_id: isResume ? `resume_${Date.now()}.pdf` : undefined,
    });

    return NextResponse.json({ url: upload.secure_url });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
