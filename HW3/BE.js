const NamesModel = require('./NamesModel')
const express = require('express')
const port = 8080

const app = express();

app.listen(port, async ()=>{
    const names = await NamesModel.getAll();
    console.log(names);
})

app.use((req, res, next)=>{  
 if (req.headers?.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem') next();
})

app.post('/', (req, res)=>{
    const ip = req.ip;
    const name = req.query.name;

    res.send(`Hi ${name}`);

    new NamesModel(name, ip).save();
})
