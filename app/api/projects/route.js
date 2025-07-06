import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET all projects
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const projects = await db.collection("projects").find().toArray();
    return NextResponse.json(projects);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST new project
export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("portfolio");

    const result = await db.collection("projects").insertOne(body);
    return NextResponse.json({ message: "Project added", id: result.insertedId });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
  }
}

// PUT (edit existing project)
export async function PUT(req) {
  try {
    const body = await req.json();
    const { _id, ...rest } = body;

    if (!_id) return NextResponse.json({ error: "Missing project ID" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("portfolio");

    await db.collection("projects").updateOne(
      { _id: new ObjectId(_id) },
      { $set: rest }
    );

    return NextResponse.json({ message: "Project updated" });
  } catch (err) {
    console.error("PUT /api/projects error:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("portfolio");

    await db.collection("projects").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Project deleted" });
  } catch (err) {
    console.error("DELETE /api/projects error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
