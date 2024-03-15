//日志：
//post方法实现数据传输,试图通过前端form表格把数据保存到postHTML变量里面去
//已实现post方法，不过不是保存到postHTML里，下一步准备将用户信息存入数据库
//已实现存储（注册），现在准备解决数据库内数据比对和登录,关于数据库的内容可以去guide sql3.js中找
//已安装好vue和jquery模块，准备实现上述功能
//准备载入聊天框功能，注册和登录先不搞了吧




var express = require('express');
//应用启动入口
var app = express();
//模板处理模块
var swig = require('swig')
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/**
 * //bodyParser配置
 *  返回一个只解析urlencoded消息体的中间件，
 *
 *  urlencoded:url编码，只接受utf-8对消息体进行编码，
 *  在前台返回的req对象添加一个新属性body，同时支持自动的gzip/deflate编码解析过的消息放在req.body对象中，
 *  这个对象包含的键值对
 *  当extended设置为true，是任何类型
 *  当extended为false的时候，是string或者一个数组。
 *  extended:如果设置为false，那么对URL-encoded的数据的解析采用querystring库，如果设置为true那么采用qs
 */
app.use('/public', express.static('public'));
//静态文件托管

/**
 * 根据不同功能划分模块
 */
//app.use('/admin', require('./routers/admin'))
//app.use('/api', require('./routers/api'))
//app.use('/', require('./routers/main'))

//创建app应用 相当于=》NodeJS Http.createServer();
/**
 * 定义模板引擎
 * 参数1：引擎名称，模板文件后缀；
 * 参数2：用于解析处理模板内容的方法
 */
//app.engine('html', swig.renderFile);
/**
 * 设置模板文件存放目录
 * 参数1，必须是views。
 * 参数2，是目录
 */
//app.set('views', './views');
/**
 * 注册使用的模板引擎；
 * 参数1，必须是'view engine'
 * 参数2，被注册的模板引擎的名称；
 */
//app.set('view engine', 'html')
/**
 * 首页
 *
 */
/*app.get('/', function (req, res, next) {
    /*
     * 读取views目录下的指定文件，解析并返回给客户端；
     * 参数1：模板文件，相对于views；
     * 参数2：传递给模板使用的数据；
     
    res.render('index');
})*/
//监听app请求；
//app.listen("3000")
/**
 * 开发过程中需要取消模板缓存
 * 改变html时，直接刷新就可以不需要重启服务；
 */

//swig.setDefaults({ cache: false })
//当用户访问url以/public开始，那么直接返回对应？？__dirname+"/public"下的文件；
//app.use('/public', express.static(__dirname + "/public"))

//统一返回方式；
//var resoinseData;
/**
 * router.use([path],function)
 * 当前路由将会使用此中间件
 */
//
/*router.use(function (req, res, next) {
    resoinseData = {
        code: 0,
        message: ''
    }
    next();
})*/

/**
 * 用户注册
 * 1，用户名是否存在；数据库查询；
 * router.post:
 * 处理任何以"/user/register"结束的请求
 * 
 */
/*router.post('/user/register', function (req, res, next) {
    console.log(req.body)
    var usersname = req.body.usersname;
    var password = req.body.password;
    if (usesname == '' || password == '') {
        resoinseData.code = 1
        resoinseData.message = '用户名或密码不能为空！'
        res.json(resoinseData);//json格式返回给前端；
        return
    } else {
        res.json(resoinseData)
    }
});*/










var http = require('http');
var querystring = require('querystring');
//sql操作部分
const sqlite3 = require("sqlite3").verbose()
let sqliteDbPath = "Test.db"
var db = new sqlite3.Database(sqliteDbPath)

app.get('/milin.html', function (req, res) {
    res.sendFile(__dirname + "/" + "milin.html");
})
app.post('/process_post', urlencodedParser, function (req, res) {
    //var yn = 0;
    var response = {
        "昵称": req.body.usersname,
        "学工号": req.body.url,
        "密码": req.body.password,
        "邮箱": req.body.email,
        "身份": req.body.identity
    };
    var id = req.body.url;
    var usersname = req.body.usersname;
    var password = req.body.password;
    var email = req.body.email;
    var identity = req.body.identity;
    if (usersname == '' || password == '' || id=='') {
        res.json('用户名、学工号或密码不能为空！');//json格式返回给前端；
        return
    } 
    console.log(response);
    res.json(response);
    //res.send('你干嘛');

    /*db.each("select * from users where ID=?", '${id}', function (err, row) {
        if (err) {
            throw err;
            yn = 1;
        }
        else {
            console.log('已有登录账号： ', row)
            yn = 2;
        }
    })
    //res.end(JSON.stringify(response));
    // 输出 JSON 格式
    if (yn == 1) {
        
        
    }
    else if (yn == 2) {
       res.end('正在登录');
    }*/
var sql_add = db.prepare(`insert into users (ID,usersname, password, email,identity) values('${id}','${usersname}', '${password}', '${email}','${identity}')`);
        sql_add.run()
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("运行成功，访问地址为 http://127.0.0.1:3000/milin.html")
})





//想把注册和登录分开写的来着，搞不定
/*function register() {
    //var sql_add = db.prepare(`insert into users (ID,usersname, password, email,identity) values('${req.body.url}','${req.body.usersname}', '${req.body.password}', '${req.body.email}','${req.body.identity}')`);
    var sql_add = db.prepare(`insert into users (ID,usersname, password, email,identity) values('${id}','${usersname}', '${password}', '${email}','${identity}')`);
    sql_add.run()
}*/








/*var postHTML = 
  '<html><head><meta charset="utf-8"><title>觅林系统登录界面</title></head>' +
  '<body>' +
  '<body bgcolor ="#E6E6FA">' +
  '<form method="post">' +
  '请输入信息来登入/验证~<br>'+
  '昵称： <input name="usersname"><br>' +
  '学工号： <input name="url"><br>' +
  '密码：<input name="password"><br>' +
  '邮箱：<input name="email"><br>' +
  '您的身份是：'+
  '<input type="radio" name="identity" value="学生">学生 <input type="radio" name="identity" value="教师">教师<br>'+
  //'是否使用过“觅林”网站？'+
    //'<input type="radio" name="answer" value="Yes">是的 <input type="radio" name="answer" value="No">没有<br>' +
    '<button>登录</button><br>' +
    '<button>注册</button>' +
  '<meta http-equiv="refresh" content="30">'+
  '</form>' +
    '</body>' +
    '</html>';*/


/*
http.createServer(function (req, res) {
    var text = "";
    req.on('data', function (chunk) {
        text += chunk;
    });
    req.on('end', function () {
        // 解析参数
        body = querystring.parse(text);
        console.log(body);
        // 设置响应头部信息及编码
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        if (body.usersname && body.url && body.password && body.email && body.identity) { // 输出提交的数据
            // res.write("<body bgcolor ="#E6E6FA">");
            res.write("<h1>已登录</h1>");
            res.write("<br>");
            res.write("您好！" + body.usersname + "  ~欢迎~");
            res.write("<br>");
            res.write("学工号：" + body.url);
            res.write("<br>");
            res.write("密码：" + body.password);
            res.write("<br>");
            res.write("邮箱：" + body.email);
            res.write("<br>");
            res.write("身份：" + body.identity);
        } else {  // 输出表单
            res.write(postHTML);
        }
        res.end();
    });
}).listen(3000);*/

/*function getBody() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const ID = document.getElementById('url').value
    const email = document.getElementById('email').value
    const identity = document.getElementById('identity').value
    return { username, password, ID, email, identity}
}


function myFunction() {
    const body = getBody()
    // 插入数据
    const sqlite3 = require("sqlite3").verbose
    let sqliteDbPath = "Test.db"
    var sql_add = db.prepare(`insert into users (ID,usersname, password, email) values('111','RHH', '1111', '221@163.com')`);
    sql_add.run()
    //db.run(`INSERT INTO users (ID, usersname) VALUES ('123', 'hahah')`);
    //var sql_add = db.prepare(`insert into users (ID, usersname, password, email) values(body.ID,body.username, body.password,body.email)`);
}*/