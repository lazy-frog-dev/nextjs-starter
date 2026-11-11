import { db } from "@/lib/db";

// The platform calls this before sending traffic (services.json healthcheck_path). It must answer
// 200 without authentication, quickly, and only when the app can serve.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.query("SELECT 1");
    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "database unavailable" }, { status: 503 });
  }
}
