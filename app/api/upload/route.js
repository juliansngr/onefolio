export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  return new Response("File uploaded", { status: 200 });
}
