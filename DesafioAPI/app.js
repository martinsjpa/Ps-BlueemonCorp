const express = require('express');
const app = express();


app.get("/", (req, res) =>{
    res.send("introdução");
});

app.listen(8080, ()=> {
    console.log('servidor iniciado na porta 8080');
})