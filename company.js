var _wrapper = document.querySelector("#wrapper");
var _inp = document.querySelector("#inp");
var _btn = document.querySelector("#btn");
var _join = document.querySelector("#join");
var _import = document.querySelector("#import");

//应用启动入口
/*var app = express();
//模板处理模块
var router = Router();
import { urlencoded } from 'body-parser';
var urlencodedParser = urlencoded({ extended: false })
//sql操作部分
const sqlite3 = require("sqlite3").verbose()
let sqliteDbPath = "Company.db"
var db = new sqlite3.Database(sqliteDbPath)
*/

var i = 1;
var j = 1;
_btn.onclick = function () {

    var msg = _inp.value;
            //判断为偶数行时，文本靠右,文本=文本+头像+名字:+信息
            _wrapper.innerHTML =
                `<div style=text-align:left;color:black;>${_wrapper.innerHTML}${msg}<br><hr></div>`;
        //点击发送后清空input
        _inp.value = "";
        //增加行
        i++;
        _wrapper.scrollTop = _wrapper.scrollHeight;
}

_join.onclick = function () {
        var npq = _inp.value;
                //判断为偶数行时，文本靠右,文本=文本+头像+名字:+信息
                _import.innerHTML =
                    `<div style=text-align:left;color:black;>${_import.innerHTML}${npq}<br><hr></div>`;
            //点击发送后清空input
            _inp.value = "";
            //增加行
            j++;
            _import.scrollTop = _import.scrollHeight;
    }


    /*app.get('/company.html', function (req, res) {
        res.sendFile(__dirname + "/" + "company.html");
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