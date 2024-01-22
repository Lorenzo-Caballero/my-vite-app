import axios from 'axios';
const apiUrl = 'https://api.openai.com/v1/chat/completions';  


export const obtenerRespuestaAoki = async (userMessage) => {
  const apikey= import.meta.env.VITE_OPENAI_API_KEY;
  try {
    const respuesta = await axios.post(
      apiUrl,
      {
        messages: [
          {"role": "system", "content": "Eres un asistente de Aoki ,como asistente virtual de aoki , debes conocer que en Aoki es una empresa de desarrollo , Nacio en 2011 como departamento de sistemas de una empresa mayorista de autopartes. En 2022 se convirtio en una organización independiente y ganamos el Premio Argentina Tecnológica. debes responder con amabilidad preguntas referenciadas a la tecnologia si estan fuera del contexto tecnologico responde con un No conozco esos temas! (: si te preguntan por el equipo de aoki , Maca es nuestra Lider en Marketing , es muy talentosa!,ademas ten en cuenta que tienes un limite de respuesta de 70 tokens , evita que tu respuesta supere esos tokens"},
          {"role": "user", "content": userMessage} 
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 70,

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apikey}`,
        },
      }
    );

    return respuesta.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error);
    return 'Lo siento, hubo un problema al procesar tu solicitud.';
  }
};
