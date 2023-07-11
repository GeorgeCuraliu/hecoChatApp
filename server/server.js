const express = require('express');
const cors = require('cors');
const fs = require('fs');
const webSocket = require('ws')

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json());






const server = new webSocket.Server({port:'8008'})

server.on('connection', socket => {
    
    console.log('Client connected')
    
    socket.on('message', message => {
        socket.send(`We received your ${message}`)
    })
    
    socket.on('close', (event) => {
        console.log('Client disconnected')
    })
})
console.log('socket initialized on port 8008')










let dbPath = "data.json";

const readDB = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, (err, jsonData) => {
            if(err){resolve(new Error("no db found"))}
            resolve(JSON.parse(jsonData));
        })
    })
}

const writeDB = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(data), err => {
            if(err){resolve(new Error("no db found"))}
            resolve(true)
        })
    })
}


app.post("/createAccount", async (req, res) =>  {//req.body.name[surname, firstname]   req.body.password    req.body.departament   req.body.userName  req.body.adminAcces

        let data;
        try{
            data = await readDB();
        }catch{
            return res.status(500).send("Coudlnt acces the data base");
        }

        if(data.users[req.body.userName]){return res.status(409).send("The username is already in the db")}

        data.users[req.body.userName] = {
            surname: req.body.name[0],
            firstname : req.body.name[1],
            password: req.body.password,
            departament:  req.body.departament,
            receivedMessages: {},
            adminAcces: req.body.adminAcces
        }

        try{
            await writeDB(data);
        }catch{
            return res.status(500).send("Couldnt acces the data base")
        }

        return res.status(201).send("New user added --- suuper");
        
})


app.post("/logIn", async (req, res) => {//req.body.userName  req.body.password

    let data
    try{
         data = await readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    if(data.users[req.body.userName] && data.users[req.body.userName].password === req.body.password){
        return res.status(200).send(data.users[req.body.userName].adminAcces);

    }else{
        return res.status(403).send()
    }

})

app.post("/getUsers", async (req, res) => {//req.body.userName

    let data
    try{
        data = await readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    let returnObj = {};
    Object.entries(data.users).forEach(([key, value]) => {
        if(key != req.body.userName){
            returnObj[key] = {...value}
            delete returnObj[key].receivedMessages;
            delete returnObj[key].password;
        }
    })

    return res.status(200).send(returnObj)


})


app.post("/sendMessage", async (req, res) => {//req.body.to  req.body.from   req.body.hangar    req.body.for    req.body.time   req.body.date    req.body.message
    
    let data
    try{
        data = await readDB();
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
       await writeDB(data);
    }catch{
        return res.status(500).send("Couldnt acces the data base")
    }

    return res.status(200).send()

})



app.post("/getMessages",async (req, res) => {//req.body.userName

    let data
    try{
        data = await readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    let tempObj = {...data.users[req.body.userName].receivedMessages}
    let returnObj = {};
    let highestVal = 0;

    for(let i = 0; i <= Object.keys(tempObj).length + 4; i++){//will sort the data in 

        console.log(i);
        let corespKey, corespValue;
        highestVal = 0;

        Object.entries(tempObj).forEach(([key,value], index) => {

            let currentValue = new Date(value.date).getHours() * 100 + new Date(value.date).getMinutes();
            console.log(currentValue + " " + index)
            if(currentValue >= highestVal){
                highestVal = currentValue;
                corespKey = key;
                corespValue = value;
            }
            if(index === Object.keys(tempObj).length - 1){
                console.log(`a iteration is complete ${highestVal} -- ${index} -- ${Object.keys(tempObj).length}`);
                returnObj[corespKey] = corespValue;
                delete tempObj[corespKey];
            }

        })
        
    }
    console.log(returnObj)
    return res.status(200).send(returnObj);

})


app.post("/deleteUser", async (req, res) => {//req.body.userName

    let data
    try{
        data = await readDB();
    }catch{
        return res.status(500).send("Couldnt acces the data base");
    }

    delete data.users[req.body.userName];

    try{
        await writeDB(data);
    }catch{
        return res.status(500).send("Couldnt acces the data base")
    }

    return res.status(200).send()

})


app.listen(port, () => {
    console.log("Local server is running, time to chat :)")
})