var _import = document.querySelector("#import");
var _inp = document.querySelector("#inp");
var _sl = document.querySelector("#sl");
var _jy = document.querySelector("#jy");
var _solve = document.querySelector("#solve");
var _kh = document.querySelector("#kh");
var _tell = document.querySelector("#tell");
var _nd = document.querySelector("#nd");
var _sl = document.querySelector("#sl");
var _jy = document.querySelector("#jy");


/*import express, { Router } from 'express';
//应用启动入口
var app = express();
//模板处理模块
var router = Router();
import { urlencoded } from 'body-parser';
var urlencodedParser = urlencoded({ extended: false })
//sql操作部分
const sqlite3 = require("sqlite3").verbose()
let sqliteDbPath = "Help.db"
var db = new sqlite3.Database(sqliteDbPath)
*/

_solve.onclick = function () {
    _kh.innerHTML=`<p>请输入你的答复:</p>`;
}

_tell.onclick = function () {
    _kh.innerHTML=`<p>请输入你的困惑:</p>`;
}

_sl.onclick = function () {
    _inp.value = "";
}

_jy.onclick = function () {
    _inp.value = "";

}

  /*  app.get('/help.html', function (req, res) {
    res.sendFile(__dirname + "/" + "help.html");
})
app.post('/process_post', urlencodedParser, function (req, res) {
    var response = {
        "搭子": req.body.inp
    };
    var msg = req.body.msg;
    console.log(response);
    //res.json(response);
//var sql_add = db.prepare(`insert into users (ID) values('${id}')`);
        sql_add.run()
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("运行成功，访问地址为 http://127.0.0.1:3000/milin.html")
})*/