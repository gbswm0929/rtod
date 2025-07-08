const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // 환경변수 사용 시 필요

const app = express();
const port = process.env.PORT || 8080;

// MongoDB Atlas URI 설정
const uri = process.env.uri; // 환경변수 또는 직접 입력
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// 컬렉션 이름 설정
const dbName = 'test';
const collectionName = 'test';

app.get('/', async (req, res) => {
  console.log(req.query.name, req.query.id)
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();
    // res.json(data);
    res.json("hello");
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close(); // 연결 닫기 (연결 유지하고 싶다면 이 줄은 제거 가능)
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
