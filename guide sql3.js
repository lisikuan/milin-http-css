const sqlite3 = require("sqlite3").verbose()
// sqlites数据库地址
let sqliteDbPath = "Test.db"
// 打开sqlites数据库
var db = new sqlite3.Database(sqliteDbPath)
//例如查询所有数据 
/*db.all(`select * from user`, function (err, row) {
    if (err) throw err
    else {
        console.log('查询结果是： ', row)
        console.log('转成JSON后的结果是：', JSON.stringify(row));
    }
})*/

// 按条件查询
/*db.each("select * from user where username=?", 'miao', function (err, row) {//user 表头 username 数据库字段
    if (err) throw err
    else {
        console.log('按条件查询结果是： ', row)
    }
})*/
//新增一条数据
var sql_add = db.prepare(`insert into users (ID,usersname, password, email) values('111','RHH', '1111', '221@163.com')`);
//db.run(`INSERT INTO users (ID, usersname) VALUES ('123', 'hahah')`);
sql_add.run()
console.log(sql_add);

// each逐条查询数据,每一段会单独打印
/*db.each("select * from user", function (err, row) {
    if (err) throw err
    else {
        console.log(' each查询结果：', row)
    }
})*/

//修改一条数据
//var sql_modify = db.prepare(`update user set username='helloRHH' where id=1`);
//sql_modify.run();


//删除数据
//var sql_del = db.prepare(`delete from user where username='RHH'`);
//sql_del.run();
//删除数据
//var sql_del = db.prepare(`delete from user where name='RHH'`);
//sql_del.run();





//第二种尝试

/*var express = require('express')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('DatabaseName.db', () => {
    // 增:
     var add = db.prepare("INSERT OR REPLACE INTO student (name, password) VALUES (?,?)");
     add.run("User1",3);
     add.run("User2",3);
     add.run("User3",3);
     add.finalize();

    // 删:
    // var del=db.prepare("DELETE from student where name =?");  
    // del.run('User1');  
    // del.finalize();

    //改:
    // var r = db.prepare("UPDATE student set name =? where ID =2");  
    // r.run("User22222");  
    // r.finalize();

    // 查 指定字段
    // db.each("SELECT id, name,age FROM human", function(err, row) {
    //     console.log(`${row.ID} 姓名:${row.name} 密码:${row.password}`);
    //   });

    // 查 所有字段
    // db.all("select * from student",function(err,row){
    //     console.log(JSON.stringify(row));
    // })

    // 查 按条件
    // db.each("SELECT ID, name,password FROM student where name=?",'User2', function(err, row) {
    //     console.log(`${row.ID} 姓名:${row.name} 密码:${row.password}`);
    //   });

})
*/