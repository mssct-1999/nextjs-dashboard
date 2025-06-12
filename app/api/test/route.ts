import postgres from 'postgres';

export async function GET() {
  try {
    const sql = postgres(process.env.POSTGRES_URL!, {
      ssl: { rejectUnauthorized: false }
    });
    const result = await sql`SELECT NOW() as now`;
    await sql.end();
    return Response.json({ success: true, now: result[0].now });
  } catch (error) {
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}