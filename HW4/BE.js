const express = require('express');
const mongoose = require('mongoose')
const port = 8080;

async function start(){
  await mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true,  useUnifiedTopology: true });
  const usersSchema = mongoose.Schema({name: String, ip: String})
  const User = await mongoose.model('Users', usersSchema);


  const app = express();

  app.listen(port, async ()=>{
    const names = await User.find();
    console.log(names);
  })

  app.use((req, res, next)=>{  
   if (req.headers?.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem') next();
  })

  app.post('/', (req, res)=>{
    const ip = req.ip;
    const name = req.query.name;
   
    const user = new User({name: name, ip: ip});
    user.save((err, savedUser)=>{
        if (err) throw err;
        res.send(`Hi ${savedUser.name}`);       
       });
  })
}

start();