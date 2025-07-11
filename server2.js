const express = require("express")
const app = express()

const json = require("./data.json")

function oauth() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let result = '';
    for (let i = 0; i < 10; i++) {
      const randomindex = Math.floor(Math.random() * characters.length)
      result += characters[randomindex]
    }
    return result
}

app.get("/signup", async (req, res) => {
    const username = req.query.username
    const userid = req.query.userid
    const oauthnum = oauth()
    json[oauthnum] = {userid, username}
    res.send(json)
})

app.get("/signin", async (req, res) => {
    const oauthnum = req.query.oauthnum
    if (json[oauthnum]) {
        res.send(json[oauthnum])
    }
    else {
        res.send("잘못된 값")
    }
})

app.listen(8080, () => {
    console.log(`http://127.0.0.1:8080`)
})