
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/analyze-text', async (req, res) => {
  const { text } = req.body;
  const apiKey = '5da6b39527166cd10190d3948f89e32dd21f8fa13da616d3d8ec1be8'; // Reemplaza con tu propia clave de API

  try {
    const response = await axios.post('https://api.textrazor.com/', {
      text: text,
      extractors: ['entities'],
    }, {
      headers: {
        'X-TextRazor-Key': apiKey,
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error en la llamada a la API de TextRazor:', error);
    res.status(500).json({ error: 'Error en la llamada a la API de TextRazor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
