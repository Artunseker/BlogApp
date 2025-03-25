const express = require('express');

const app = express();//uygulamamızı oluşturduk

app.use((req,res,next)=>{
    console.log("middleware 1");
    next();
});

app.use((req,res,next)=>{
    console.log("middleware 2");
    next();
});

app.use((req,res)=>{
    console.log("middleware 3");
    res.send("<h1>home page</h1>");
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
}); 