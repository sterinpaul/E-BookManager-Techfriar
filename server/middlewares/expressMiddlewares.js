import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'express'
import configKeys from '../config/configKeys.js';
import mongoSanitize from 'express-mongo-sanitize';


const expressConfig = (app) => {
  // Enabling CORS
  const enableCors = {
    origin: [
      configKeys.CLIENT_URL
    ],
    exposeHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }

  // Express middlewares configuration
  app.use(cors(enableCors))
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  
  app.use(
    mongoSanitize({
      allowDots: true,
      replaceWith: ' ',
    })
  );
}

export default expressConfig