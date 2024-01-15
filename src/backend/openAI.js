const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const OpenAIApi = require("openai");

const openaiInstance = new OpenAIApi({
  apiKey: "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",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  console.log(req.body);
  const { messages } = req.body;

  try {
    const completion = await openaiInstance.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 256,
      temperature: 1,
      messages: messages,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(completion.choices[0].message);
    res.send(completion.choices[0].message);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
