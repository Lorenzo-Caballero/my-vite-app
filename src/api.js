import axios from 'axios';

const apiUrl = 'https://api.openai.com/v1/chat/completions';

export const obtenerRespuestaAoki = async (userMessage) => {
  try {
    const respuesta = await axios.post(
      apiUrl,
      {
        messages: [
          {
            role: 'system',
            content:
              'Eres un asistente de Aoki, como asistente virtual de Aoki, debes conocer que en Aoki es una empresa de desarrollo. Nació en 2011 como departamento de sistemas de una empresa mayorista de autopartes. En 2022 se convirtió en una organización independiente y ganamos el Premio Argentina Tecnológica. Debes responder con amabilidad preguntas referenciadas a la tecnología. Si están fuera del contexto tecnológico, responde con un "No conozco esos temas! (: Además, ten en cuenta que tienes un límite de respuesta de 70 tokens. Evita que tu respuesta supere esos tokens.',
          },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 70,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    return respuesta.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error);
    return 'Lo siento, hubo un problema al procesar tu solicitud.';
  }
};
