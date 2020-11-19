
/* const para utilizar a dependecia express */
const express = require('express');

/* const para utilizar a dependecia mongoose */
const mongoose = require('mongoose');

/* const para utilizar a dependecia cors */
const cors = require('cors');

/* Inicializa o Express */
const app = express();

/* Faz a Requição do Modelo Employee para ser utilizado no mongoDB  */
require("./Models/Employee");

/* Permite que o app utilize o formato JSON */
app.use(express.json());

/* Define quem pode solicitar chamadas para api */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

/* Const para Acessar a Tabela Employee do Banco de dados  */
const Employee = mongoose.model('employee');

mongoose.connect('mongodb://127.0.0.1/cadastro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() =>{
    console.log('MongoDB INICIOU');
}
).catch((erro) =>
{
    console.log(erro);
});





app.listen(8080, ()=> {
    console.log('servidor iniciado na porta 8080');
})

app.get("/getEmployee", (req, res) =>{
    Employee.find({}).then((employee) => {
        return res.json(employee);
    }).catch((erro) => {
        return res.status(200).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});

app.post("/saveEmployee", (req,res) => {
    const employee = Employee.create(req.body, (error) => {
        if(error)
         {
             return res.status(400).json({
                 error:true,
                 message:"error:employee não cadastrado"
             })
         }
         return res.status(200).json({
            error:false,
            message:"Sucess: Employee Cadastrado"
        }) 
    });
})

app.put("/editEmployee/:id", (req,res) => {
    const employee = Employee.updateOne({ _id: req.params.id}, req.body, (error) => {
        if(error)
        {
            return res.status(400).json({
                error:true,
                message:"Error: não foi possível editar o employee"
            });
        }
        return res.status(200).json({
            error:false,
            message:"Employee editado com sucesso"
        });
    })
})

app.delete("/deleteEmployee/:id", (req,res) => {
    const employee = Employee.deleteOne({ _id: req.params.id}, req.body, (error) => {
        if(error)
        {
            return res.status(400).json({
                error:true,
                message:"Error: não foi possivel excluir o employee"
            });
        }
        return res.status(200).json({
            error:false,
            message:"Employee Excluido com sucesso"
        });
    })
})