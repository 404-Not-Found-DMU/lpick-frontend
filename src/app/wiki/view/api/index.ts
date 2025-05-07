export async function GET() {
  const res = await fetch('https://example.com/api/wiki/123');
  const data = await res.json();

  return Response.json(data);
}
