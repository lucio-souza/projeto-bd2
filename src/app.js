import express from 'express'
import router from './routers/routes.js'


const app = express();

//determina que o app leia obody das  req com json
app.use(express.json())

//determina a utilizaçao das rotas
app.use(router)


export default app;