// pages/api/openai.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests are allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ message: "Message is required" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [{ role: "user", content: message }],
    });

    const responseMessage = completion.data.choices[0].message.content;

    res.status(200).json({ response: responseMessage });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error generating response" });
  }
}
