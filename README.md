## AI GIFs

<p align="center">
<img src="https://github.com/btahir/ai-gifs/blob/main/public/demo.gif" alt="AI GIFs Demo">
</p>

AI GIFs is a powerful application that lets you generate GIFs using advanced AI techniques. Whether you're looking for a unique meme, a captivating animation, or just exploring the boundaries of AI-generated content, AI GIFs has got you covered.

It was built from the official Next.js + TailwindCSS starter.

This repo, while showcasing a specific AI App, is meant to serve as a starter. You can take it, modify the model on the backend (explore the numerous options Replicate offers), and voilà, you have a new app!

## AI App Production Checklist

I do a quick walkthrouigh of this [here](https://www.loom.com/share/a9787af9f3944b72bde41dd4bd1a0d77?sid=52c9732a-4f78-4f5c-bfc1-74a16f047f88).

Below are steps taken during the app's development. They serve as a general guideline when building an AI-based application.

**App Architecture**:
The app architecture is straightforward. Users input a prompt via a form. Upon submission, a backend route handler is triggered, which then calls the AI model and returns the result.

**AI Model Hosting**:
We've utilized Replicate for hosting our AI model. This eliminates the need for individual deployment, handling inference, scaling, and the often cumbersome devops-related tasks.

**Optimizations**:

- **Prompt Suggestions**: Leveraging libraries like `promptmaker` can pre-populate the form, offering users creative ideas.
  
- **Loading State**: To enhance user experience while awaiting results, we implemented a loading GIF, aligning with the theme of our app.
  
- **Safety Checks**: For initial content filtering, an older library named `bad-words` was employed. For more in-depth content checks, consider modern libraries such as [nsfw-filter](https://github.com/Nutlope/nsfw-filter).

**Rate Limits**:
Before launching, especially for free apps, it's crucial to consider potential costs associated with serverless architectures. To avoid unexpected bills, we've integrated rate limits using Upstash, ensuring a controlled request flow. The setup is hassle-free and efficient.

Now, with everything in place, it's tempting to invite users immediately. However, always ensure preventive measures are established to maintain budget and performance.

**Deployment**:
The site is deploy on Vercel.

## Getting Started

**Install Dependencies**:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

This repository utilizes [Replicate](https://replicate.com/) for model inference and [Upstash](https://upstash.com/) for rate limiting. Ensure you have accounts set up for both services.

**Environment Variables to Add**:

Create a .env.local file and add these variables.

```bash
REPLICATE_API_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

**Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
