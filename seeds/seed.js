//ダミーデータの作成

const mongoose = require("mongoose");
const Report = require("../models/Report");

mongoose.connect("mongodb://localhost:27017/record_worktime", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedReports = async () => {
    //Report内の要素を全削除
  await Report.deleteMany({});
  //ダミーデータの挿入
  await Report.insertMany([
    {
      date: new Date("2025-06-12"),
      author: "山田",
      notes: "今日は集中できた。",
      workLogs: [
        { task: "コーディング", start: "09:00", end: "09:25", duration: 25 },
        { task: "会議", start: "10:00", end: "10:30", duration: 30 }
      ]
    }
  ]);
  console.log("Seed data inserted!");
  mongoose.connection.close();
};

seedReports();
