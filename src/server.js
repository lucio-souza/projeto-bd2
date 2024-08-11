import express from 'express'
import router from './routers/routes.js'
import cors from 'cors'

const app = express();

const corsOptions = {
    origin: ['http://127.0.0.1:5500'], // A URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};
  
  app.use(cors(corsOptions));

//determina que o app leia obody das  req com json
app.use(express.json())

//determina a utilizaçao das rotas
app.use(router)

const port = "3000";

app.listen(port, ()=>{
    console.log('pai ta on. http://localhost:3000')
})