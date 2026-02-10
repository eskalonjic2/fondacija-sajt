// app/api/auth/imagekit/route.ts
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Inicijalizacija ImageKit-a na serverskoj strani
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // OVO MORA BITI U .env.local
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    // Generisanje sigurnosnog potpisa
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}