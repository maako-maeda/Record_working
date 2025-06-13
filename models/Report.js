// models/Report.js
const mongoose = require("mongoose");

const workLogSchema = new mongoose.Schema({
  task: String,           // 作業内容（例：コーディング、会議）
  start: String,          // 開始時刻（例："09:00"）
  end: String,            // 終了時刻（例："09:25"）
  duration: Number        // 作業時間（分）
});

const reportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  workLogs: [workLogSchema], // 作業ログの配列
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);
