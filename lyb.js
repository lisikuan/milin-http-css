
var _wrapper = document.querySelector("#wrapper");
var _inp = document.querySelector("#inp");
var _btn = document.querySelector("#btn");
var _name = document.querySelector("#name");

//得将聊天记录储存到数据库里去

//定义数组存储头像
var img = ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg', './img/6.jpg'];
var me = ['./img/1.webp'];
//定义数组存储名字
var names = ['鼠鼠', '猪猪', '小小熊', '兔兔', '大熊', '小熊'];
var i=1;
_btn.onclick = function () {
//还是无法实现储存，可恶

//随机的头像和姓名的下标
        var index = Math.floor(Math.random() * 6);
        //随机名字
        var id = names[index];
        //随机头像
        var imgs = img[index];
        //获取用户输入的input的值；
        var imgu = me[0];
    var msg = _inp.value;
    var name = _name.value;
            //判断为奇数行时，文本靠左,文本=文本+信息+:名字+头像
            _wrapper.innerHTML =
            `<div style=text-align:left;>${_wrapper.innerHTML}<img src="${imgs}"><span>${id}</span>:${msg}<br></div>`;
        
        //点击发送后清空input
        _inp.value = "";
        //增加行
        i++;
        _wrapper.scrollTop = _wrapper.scrollHeight;
}
