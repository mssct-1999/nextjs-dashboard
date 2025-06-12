import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL_NO_SSL!, { 
  ssl: { rejectUnauthorized: false }, // Accept any SSL certificate
  max: 1,
  idle_timeout: 30,
  connect_timeout: 60,
  connection: {
    application_name: 'nextjs-dashboard-dev'
  }
});

export async function GET() {
  try {
    console.log('Testing connection without SSL...');
    
    const result = await sql`SELECT NOW() as current_time, 'Hello from Neon!' as message`;
    
    await sql.end();
    
    return Response.json({ 
      success: true,
      message: result[0].message,
      timestamp: result[0].current_time,
      ssl: false
    });
    
  } catch (error) {
    console.error('Connection error:', error);
    
    return Response.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}