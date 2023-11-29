import React from 'react'
import ReactDOM from 'react-dom'
import 'tailwindcss/tailwind.css';
import './index.css'
import App from './App.jsx'
import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
  <App/>, document.getElementById("root")
)
