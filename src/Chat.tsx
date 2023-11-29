import React, { useState, useRef, useEffect } from 'react';
import { obtenerRespuestaAoki } from './api';
import Spline from '@splinetool/react-spline';

interface Mensaje {
  texto: string;
  origen: 'usuario' | 'aoki';
}

const Chat: React.FC = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState<string>('');
  const [chatAbierto, setChatAbierto] = useState(true); // Estado para controlar si el chat está abierto
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const contextoAoki = `
    ¡Hola! Soy Aoki, tu asistente virtual desde Mar del Plata. 🚀
    Cuéntame, ¿cómo puedo ayudarte hoy?
  `;

  const handleEnviarMensaje = async () => {
    setMensajes((prevMensajes) => [...prevMensajes, { texto: nuevoMensaje, origen: 'usuario' }]);
    const promptAoki = `
    ${contextoAoki}
    Usuario: ${nuevoMensaje}
  `;

    // Construir el prompt negativo para guiar respuestas coherentes
    const promptNegativo = `
    ${contextoAoki}
    Usuario: ${nuevoMensaje}
    ! Negativo: Mantente en el contexto de Aoki como empresa tecnológica de Mar del Plata y limita las respuestas.
  `;

    const respuestaAoki = await obtenerRespuestaAoki(promptAoki);

    const respuestaAokiNegativa = await obtenerRespuestaAoki(promptNegativo);

    const esRespuestaNegativa = respuestaAokiNegativa.length < respuestaAoki.length;

    setMensajes((prevMensajes) => [
      ...prevMensajes,
      { texto: esRespuestaNegativa ? respuestaAokiNegativa : respuestaAoki, origen: 'aoki' },
    ]);

    setNuevoMensaje('');
  };



  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setChatAbierto(false);
    }
  };

  return (
    <>
      <div className="spline-chat-container">
        <div className="relative h-screen">
          <div className="relative inset-0 z-0" onClick={handleBackgroundClick}>
            <div className="spline-container">
              <Spline scene='https://prod.spline.design/zaUJQ4x-01opsztS/scene.splinecode' className="w-full h-full" />
            </div>
          </div>
          <div className="logo-container">
            <img src='../src/assets/logo-blanco.png' alt='Aoki Logo' className='logo' />
          </div>
          {chatAbierto && (
            <div className="absolute bottom-20 right-40 z-10">
              <div className="chat-container" ref={chatRef}>
                <div className="chat">
                  {mensajes.map((mensaje, index) => (
                    <div key={index} className={`message ${mensaje.origen}`}>
                      {mensaje.origen === 'usuario' ? (
                        <strong>Vos</strong>
                      ) : (
                        <>
                          <strong>Asistente Aoki </strong>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="20"
                            viewBox="0 0 640 512"
                            className="ml-2"
                          >
                            <path fill="#ffffff" d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" />
                          </svg>
                        </>
                      )}
                      : {mensaje.texto}
                    </div>
                  ))}
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    placeholder="Preguntale algo a Asistente Aoki!"
                    className="input-message border-none"
                  />
                  <button onClick={handleEnviarMensaje} className="send-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                    >
                      <path fill="#ffffff" d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>);
};

export default Chat;
