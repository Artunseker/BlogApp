const express = require('express');

const app = express();//uygulamamızı oluşturduk

app.use((req,res)=>{
    res.end("Ana Sayfa");
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});