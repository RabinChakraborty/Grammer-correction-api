const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/check', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt:
        'Correct this to standard English:\n\n i no go before him there market in the.',
      temperature: 0,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response ? error.response.data : 'error on server',
    });
  }
});

const port = 3000;

app.listen(port, () => console.log(`server is running at ${port}`));
//http://localhost:3000/
