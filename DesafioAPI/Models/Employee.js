const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Employee = new mongoose.Schema({
    id:ObjectId,
    nome:String,
    cpf:String,
    email:String,
    dataNasc:String,
    salario:Number
});

mongoose.model('employee', Employee);