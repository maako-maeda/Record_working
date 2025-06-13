const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose")
const methodOverride = require("method-override");
const Report = require("#DBsite");
const { report } = require("process");
// const morgan = require("morgan");
// const engine = require("ejs-mate");

mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("connection error")
    console.log(err);
})

// app.engine("ejs",engine);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
// app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"))

//一覧
app.get("/reports",async (req,res)=>{
    const allreports = await report.find();
    res.render("/reports/showall",{allreports});
});

//新規作成
app.get("/reports/new",async (req,res)=>{
    res.render("/reports/new");
});

//作成投稿
app.post("/reports",async (req,res)=>{
    const report = new Report(req.body.report)
    await report.save();
    res.redirect("/reports")
})


// 詳細表示
app.get("/reports/:id",async (req,res)=>{
    const {id} = req.params.id;
    const report = await Report.findById();
    res.render("/reports/show",{report});
});


// 編集フォーム
app.get("/reports/:id/edit",async (req,res)=>{
    const {id} = req.params;
    const report = await Report.findById();
    res.render("/reports/edit",{report});
});


// 更新処理
app.put("/reports/:id",async (req,res)=>{
    const {id} = req.params;
    const report = await Report.findByIdAndUpdate(id, {...req.body.report})
   res.redirect(`/reports/${report._id}`)
})


//削除
app.delete('/reports/:id',async (req,res)=>{
    const {id} = req.params;
    await Report.findByIdAndDelete(id);
    res.redirect("/reportmas");
})