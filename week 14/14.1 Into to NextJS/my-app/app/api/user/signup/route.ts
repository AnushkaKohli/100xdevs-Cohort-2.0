import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  console.log("Username: ", username, "\nPassword: ", password);
  return NextResponse.json({
    username,
    password,
  });
}
