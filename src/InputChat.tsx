import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChatInput = ({ nuevoMensaje, setNuevoMensaje, handleEnviarMensaje }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="input-message"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleEnviarMensaje}
        className="send-button"
      >
        Enviar
      </motion.button>
    </div>
  );
};

export default ChatInput;
