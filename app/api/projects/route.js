import { ObjectId } from "mongodb"
import clientPromise from "/React-App/merged_my_portfolio/lib/mongodb"

// GET - Fetch all projects
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")
    const projects = await db.collection("projects").find().toArray()
    return Response.json(projects)
  } catch (err) {
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST - Add a new project
export async function POST(req) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db("portfolio")
    const result = await db.collection("projects").insertOne(body)
    return Response.json({ message: "Project added", id: result.insertedId })
  } catch (err) {
    return Response.json({ error: "Failed to add project" }, { status: 500 })
  }
}

// DELETE - Delete a project by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const client = await clientPromise
    const db = client.db("portfolio")
    const result = await db.collection("projects").deleteOne({ _id: new ObjectId(id) })
    return Response.json({ message: "Deleted", id })
  } catch (err) {
    return Response.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

// PUT - Update a project
export async function PUT(req) {
  try {
    const { id, ...data } = await req.json()
    const client = await clientPromise
    const db = client.db("portfolio")
    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    )
    return Response.json({ message: "Updated", id })
  } catch (err) {
    return Response.json({ error: "Failed to update project" }, { status: 500 })
  }
}
