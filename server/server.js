const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json());

let dbPath = "data.json";


const readDB = () => {
    fs.readFile(dbPath, (err, jsonData) => {
        if(err){return new Error("no db found")}
        return JSON.parse(jsonData);
    })
}

const writeDB = (data) => {
    fs.writeFile(dbPath, JSON.stringify(data), err => {
        if(err){return new Error("no db found")}
        return true;
    })
}


app.post("/createAccount", (req, res) => {//req.body.name[surname, firstname]   req.body.password    req.body.departament   req.body.userName

        let data
        try{
            data = readDB();
        }catch{
            return res.status(500).send("Coudlnt acces the data base");
        }

        data = JSON.parse(jsonData);

        if(data[req.body.userName]){return res.status(409).send("The username is already in the db")}

        data[req.body.userName] = {
            surname: req.body.name[0],
            firstname : req.body.name[1],
            password: req.body.password,
            departament:  req.body.departament,
            receivedMessages: {}
        }

        try{
            writeDB(data);
        }catch{
            return res.status(500).send("Couldnt acces the data base")
        }

        return res.status(201).send("New user added --- suuper");
        
})


app.post("/logIn", (req, res) => {//req.body.userName  req.body.password

    let data
    try{
        data = readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    if(data.users[req.body.userName] && data.users[req.body.userName].password === req.body.password){

        return res.status(200).send();

    }

})

app.post("/getUsers", (req, res) => {//req.body.userName

    let data
    try{
        data = readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    let returnObj;
    Object.entries(data.users).forEach(([key, value]) => {
        if(key != req.body.userName){
            returnObj[key] = {...value}
            delete returnObj[key].receivedMessages;
            delete returnObj[key].password
        }
    })

    return res.status(200).send(returnObj)


})


app.post("/sendMessage", (req, res) => {//req.body.to  req.body.from   req.body.hangar    req.body.for    req.body.time   req.body.date    req.body.message
    
    let data
    try{
        data = readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    data.users[req.body.to].receivedMessages[req.body.from] = {
        date: req.body.date,
        durations: req.body.time,
        hangar: req.body.hangar,
        for: req.body.for,
        message: req.body.message
    }


    try{
        writeDB(data);
    }catch{
        return res.status(500).send("Couldnt acces the data base")
    }

    return res.status(200).send()

})



app.post("/getMessages", (req, res) => {//req.body.userName

    let data
    try{
        data = readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    do{//will sort the data in 
        let flag = true;

    }while(flag);

})



app.listen(port, () => {
    console.log("Local server is running, time to chat :)")
})