import Replicate from "replicate";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  console.log(prompt)

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  
  const output = await replicate.run(
    "lucataco/hotshot-xl:3897d2751458e9f0d4f969a9fd072627aadfa6a7e001875c3facb8e5e8f7182b",
    {
      input: {
        prompt,
        output: 'gif'
      }
    }
  );
 
  return Response.json(output)
}
