const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const Port = 3000

const Self_info = {
    profile_img : "https://pbs.twimg.com/media/HKiPDB7WwAAhbHA?format=jpg&name=small",

    name : "Tanadach Boonthum",
    nickname : "Tonnam",
    birthday : "20 Janauary 2009",
    age : "17 year",
    school : "PSU Witthayanusorn Suratthani",
    hobby : ["Play game", "Read LN Manga", "Coding"],
    game : ["Wuthering Wave", "Honkai Star Rail", "Arknights EndField", "Roblox", "Minecraft"]
}

app.get('/Info', (_, res) => {
    res.json(Self_info)
})

app.listen(Port, () => {
    console.log("Server Starts successfully");
    console.log(`Start On : http://localhost:${Port}`);
})
