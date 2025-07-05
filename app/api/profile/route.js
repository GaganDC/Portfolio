// app/api/profile/route.js
import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db("portfolio")
  const profile = await db.collection("profile").findOne({})
  return NextResponse.json(profile || {})
}

export async function PUT(req) {
  try {
    const body = await req.json()

    // ✅ Remove _id if present (MongoDB won't allow modifying it)
    if ('_id' in body) delete body._id

    const client = await clientPromise
    const db = client.db("portfolio")

    await db.collection("profile").updateOne(
      {}, // match the first document
      { $set: body },
      { upsert: true }
    )

    return NextResponse.json({ message: "Profile updated" })
  } catch (err) {
    console.error("PUT /api/profile error:", err)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
