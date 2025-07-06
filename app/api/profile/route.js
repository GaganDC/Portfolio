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
    if (body._id) delete body._id

    const client = await clientPromise
    const db = client.db("portfolio")

    const result = await db.collection("profile").updateOne(
      {},
      { $set: body },
      { upsert: true }
    )

    return NextResponse.json({ message: "Profile updated", result })
  } catch (err) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
