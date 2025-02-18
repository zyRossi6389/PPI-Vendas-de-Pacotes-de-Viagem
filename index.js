import express from "express";
import autenticar from "./security/verify.js";
import session from "express-session";

const app = express()

//configurar como o express irá procesasar os parametros do formulário
app.use(express.urlencoded({extended: true})); //biblioteca QS / QueryString *pesquisar a diferença

app.use(session({
    secret: "K2Lk5aWp9A0vB32aRe1", //estudar variáveis de ambiene
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 20
    }
}))

const porta = 3000;
const localhost = "0.0.0.0";

app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html')
})

app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario == "admin" && senha == "admin"){
        requisicao.session.autenticado = true;
        resposta.redirect('/index.html')
    } else {
        resposta.redirect('/login.html')
    }

})

app.use(express.static("./public"))

// o HTTP é um protocolo Stateless (sem estabelecimento de sessão)
// função autenticar se comporta como um middleware
app.use(autenticar, express.static("./private"))

app.listen(porta, localhost, () => {
    console.log(`Servidor Disponível em: http://${localhost}:${porta}`)
})

