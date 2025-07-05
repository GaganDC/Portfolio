// app/api/projects/route.js
import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/mongodb"
import { NextResponse } from "next/server"

// GET - Fetch all projects
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")
    const projects = await db.collection("projects").find().toArray()
    return NextResponse.json(projects)
  } catch (err) {
    console.error("GET /api/projects error:", err)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST - Add a new project
export async function POST(req) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db("portfolio")
    const result = await db.collection("projects").insertOne(body)
    return NextResponse.json({ message: "Project added", id: result.insertedId })
  } catch (err) {
    console.error("POST /api/projects error:", err)
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 })
  }
}

// PUT - Update a project
export async function PUT(req) {
  try {
    const { id, ...data } = await req.json()
    if (data._id) delete data._id

    const client = await clientPromise
    const db = client.db("portfolio")
    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    )

    return NextResponse.json({ message: "Project updated", result })
  } catch (err) {
    console.error("PUT /api/projects error:", err)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE - Delete a project
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const client = await clientPromise
    const db = client.db("portfolio")
    const result = await db.collection("projects").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ message: "Project deleted", result })
  } catch (err) {
    console.error("DELETE /api/projects error:", err)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
