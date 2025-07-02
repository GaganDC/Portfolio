// app/api/profile/route.js
import clientPromise from "../../../lib/mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db("portfolio")
  const profile = await db.collection("profile").findOne({})
  return Response.json(profile || {})
}

export async function PUT(req) {
  const body = await req.json()
  const client = await clientPromise
  const db = client.db("portfolio")
  const result = await db.collection("profile").updateOne(
    {},
    { $set: body },
    { upsert: true }
  )
  return Response.json({ message: "Profile updated" })
}
