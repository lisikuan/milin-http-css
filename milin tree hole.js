/*
        // 在文档加载完成后执行  
document.addEventListener('DOMContentLoaded', function() {  
    // 选择ID为 "myInput" 的input元素  
    var inp = document.querySelector('#inp');  
      
    // 确保找到了input元素  
    if (inp) {  
        // 为ID为 "pick" 的按钮添加点击事件监听器  
        var pickButton = document.querySelector('#pick');  
        if (pickButton) {  
            pickButton.addEventListener('click', function() {  
                // 清空input元素的内容  
                inp.value = '';
                alert("正在捡起信件ing……"); 
            });  
        } else {  
            console.error('未找到ID为 "pick" 的按钮。');  
        }  
  
        // 为ID为 "shoot" 的按钮添加点击事件监听器  
        var shootButton = document.querySelector('#shoot');  
        if (shootButton) {  
            shootButton.addEventListener('click', function() {  
                // 清空input元素的内容  
                inp.value = '';  
                alert("已投递成功！");
            });  
        } else {  
            console.error('未找到ID为 "shoot" 的按钮。');  
        }  
    } else {  
        console.error('未找到ID为 "inp" 的input元素。');  
    }  
});*/

const API_BASE = 'https://server-tni-serverllication-jlocxabspm.cn-hangzhou.fcapp.run';
        const submitBtn = document.getElementById('submitBtn');
        const fetchBtn = document.getElementById('fetchBtn');
        const bottleMessage = document.getElementById('bottleMessage');
        const bottleContainer = document.getElementById('bottleContainer');

        submitBtn.addEventListener('click', async () => {
            const message = bottleMessage.value;
            const response = await fetch(`${API_BASE}/bottle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            if (data.success) {
                bottleMessage.value = '';
                bottleMessage.style.display = 'none';
            } 
        });

        fetchBtn.addEventListener('click', async () => {
            const response = await fetch(`${API_BASE}/bottle`);
            const bottle = await response.json();
            if (bottle) {
                bottleContainer.textContent = bottle.message;
                bottleMessage.style.display = 'block';
            } 
        });
