const express = require('express');
// const { MongoClient } = require('mongodb');
const fs = require('fs');
const filePath = 'data.json';
require('dotenv').config(); // 환경변수 사용 시 필요

const app = express();
const port = process.env.PORT || 8080;

// MongoDB Atlas URI 설정
// const uri = process.env.uri; // 환경변수 또는 직접 입력
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// 컬렉션 이름 설정
// const dbName = 'test';
// const collectionName = 'test';

function oauth() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let result = '';
    for (let i = 0; i < 10; i++) {
      const randomindex = Math.floor(Math.random() * characters.length)
      result += characters[randomindex]
    }
    return result
}

app.get('/', async (req, res) => {
  try {
    // await client.connect();
    // const db = client.db(dbName);
    // const collection = db.collection(collectionName);

    // const data = await collection.find({}).toArray();
    // res.json(data);
    fs.readFile(filePath, 'utf8', (err, datas) => {
      if (err) {
        console.error('파일 읽기 실패:', err);
        res.json("Error")
        return;
      }
      try {
        const username = req.query.name
        const userid = req.query.id
        const data = {
          "username" : username,
          "oauth" : oauth()
        }
        const n = JSON.parse(datas);
        n[userid] = data;
        data["userid"] = userid;
        const updatedJson = JSON.stringify(n, null, 2);

        fs.writeFile(filePath, updatedJson, 'utf8', (err) => {
          if (err) {
            console.error('파일 쓰기 실패', err);
            return;
          }
          console.log('파일 쓰기 성공');
          res.json(data)
        });
      }
      catch (parseErr) {
        console.log("에러", parseErr);
        res.json("Error")
      }
    })
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // await client.close(); // 연결 닫기 (연결 유지하고 싶다면 이 줄은 제거 가능)
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
