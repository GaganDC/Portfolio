import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { username, password } = await req.json()

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
