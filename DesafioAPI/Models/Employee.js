/* const para utilizar a dependecia mongoose */
const mongoose = require('mongoose');

/* const para montar a tabela no mongoDB*/
const Schema = mongoose.Schema;
/* define a chave primária */
const ObjectId = Schema.ObjectId;
/* Modelo que será utilizado para a criação da tabela no MongoDB */
const Employee = new mongoose.Schema({
    id:ObjectId,
    nome:String,
    cpf:String,
    email:String,
    dateBirth:String,
    salary:Number
});

/* Criação da tabela no MongoDB de acordo com a const Employee */
mongoose.model('employee', Employee);