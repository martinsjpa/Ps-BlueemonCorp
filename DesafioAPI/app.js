
const express = require('express');
const mongoose = require('mongoose');
const app = express();

require("./Models/Employee");

app.use(express.json());

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

app.get("/", (req, res) =>{
    res.send("introdução");
});



app.listen(8080, ()=> {
    console.log('servidor iniciado na porta 8080');
})

app.post("/employee", (req,res) => {
    console.log(req.body);
    return res.json({"mec":"tref"});
})