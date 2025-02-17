import express from "express";
import autenticar from "./security/verify.js";

const app = express()

const porta = 3000;
const localhost = "0.0.0.0";

app.use(express.static("./public"))

// o HTTP é um protocolo Stateless (sem estabelecimento de sessão)
// função autenticar se comporta como um middleware
app.use(autenticar, express.static("./private"))

app.listen(porta, localhost, () => {
    console.log(`Servidor Disponível em: http://${localhost}:${porta}`)
})

