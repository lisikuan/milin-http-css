const apiBaseUrl = 'https://server-tni-serverllication-jlocxabspm.cn-hangzhou.fcapp.run';
async function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.userId) {
        document.getElementById('message').textContent = '登录成功！';
        localStorage.setItem('userId', data.userId);
    } else {
        document.getElementById('message').textContent = '登录失败：' + data.error;
    }
}

async function register(event) {
    event.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.success) {
        document.getElementById('message').textContent = '注册成功！';
    } else {
        document.getElementById('message').textContent = '注册失败：' + data.error;
    }
}

async function checkuser(username) {
    const response = await fetch(`${apiBaseUrl}/checkUsername?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.userId;
}

function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleButton = document.querySelector('button');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        toggleButton.textContent = '切换到注册';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        toggleButton.textContent = '切换到登录';
    }
}
export {
    login,
    register,
    checkuser,
    toggleForms
};
