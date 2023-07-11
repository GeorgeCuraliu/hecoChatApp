const express = require('express');
const cors = require('cors');
const fs = require('fs');
const expressWs = require('express-ws');
const WebSocket = require('ws');

const app = express();
const expressWsInstance = expressWs(app);
const aWss = expressWsInstance.getWss();
const port = 6969;

app.use(cors());
app.use(express.json());




let activeUsers = {}

app.ws('/chat', (ws, req) => {
    let username;
  
    // Handle new connection
    ws.on('message', (message) => {
      const data = JSON.parse(message);
  
      if (data.type === 'login') {
        // Store username in active users object
        username = data.username;
        activeUsers[username] = ws;
        console.log(`User ${username} connected.`);
      } else if (data.type === 'message') {
        const { username, message } = data;
  
        if (username === 'all') {
          // Broadcast message to all connected users except the sender
          aWss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'message', message }));
            }
          });
        } else {
          // Send message to the specified user
          const targetUser = activeUsers[username];
  
          if (targetUser && targetUser.readyState === WebSocket.OPEN) {
            targetUser.send(JSON.stringify({ type: 'message', message }));
          }
        }
      }
    });
  
    // Handle disconnection
    ws.on('close', () => {
      if (username) {
        // Remove user from active users object
        delete activeUsers[username];
        console.log(`User ${username} disconnected.`);
      }
    });
  });






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

    let tempObj = { ...data.users[req.body.userName].receivedMessages };
let returnObj = {};

    const sortedMessages = Object.entries(tempObj)
        .sort(([keyA, valueA], [keyB, valueB]) => {
            const dateA = new Date(valueA.date);
                const dateB = new Date(valueB.date);
            return dateB - dateA; // Compare dates in descending order
        });

    sortedMessages.forEach(([key, value]) => {
        returnObj[key] = value;
    });

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