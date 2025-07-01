export async function GET() {
  return new Response(
    JSON.stringify({ message: 'Hello from the Next.js API!' }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
export async function POST(request) {
  const data = await request.json();
  console.log('Received data:', data);

  return new Response(JSON.stringify({ status: 'success', received: data }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
