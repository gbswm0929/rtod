const express = require('express');
const file = require("./data.json");

const app = express();
const port = 8080;

function oauth() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let result = '';
    for (let i = 0; i < 10; i++) {
      const randomindex = Math.floor(Math.random() * characters.length)
      result += characters[randomindex]
    }
    return result
}

app.get('/signup', async (req, res) => {
    const username = req.query.username
    const userid = req.query.userid
    const oauthnum = oauth()
    file[oauthnum] = {userid, username}
    res.send({"oauth": oauthnum, "userid": userid, "username": username})
});

app.get('/signin', async (req, res) => {
    const oauthnum = req.query.oauthnum
    if (file[oauthnum]) {
        res.send(file[oauthnum])
    }
    else {
        res.status(400).send()
    }
});

app.get('/', async (req, res) => {
  res.send("home")
});

app.listen(port, () => {
  console.log("server start")
});
