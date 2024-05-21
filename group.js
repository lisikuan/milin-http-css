import { checkuser } from './user.js';
var apiBaseUrl = 'https://server-tni-serverllication-jlocxabspm.cn-hangzhou.fcapp.run';
let username = localStorage.getItem('username');

checkuser(username).then(userId => {
    localStorage.setItem('userId', userId);
}).catch(() => {
    username = 'default'; // defauly username
    localStorage.setItem('username', username);
    userId = 8; // default userId
    localStorage.setItem('userId', userId);
});

function getMessages() {
    fetch(apiBaseUrl + "/messages?username=" + username)
        .then(response => response.json())
        .then(data => {
            if (data.chat) {
                var chatWindow = document.getElementById('chatWindow');
                chatWindow.innerHTML = '';
                data.chat.forEach(function (msg) {
                    chatWindow.innerHTML += '<p>' + msg.sender + ': ' + msg.message + '</p>';
                });
            } else {
                alert(data.error);
            }
        });
}

function addMessage(message) {
    if (message === null) {
        throw new Error('message cannot be null');
    }
    fetch(apiBaseUrl + "/message", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, senderUsername: username, receiverUsername: username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                getMessages();
                document.getElementById('messageInput').value = '';
            } else {
                alert('Message not sent');
            }
        });
}

window.onload = function () {
    getMessages();
    document.getElementById('sendButton').addEventListener('click', function () {
        var message = document.getElementById('messageInput').value;
        if (message) {
            addMessage(message);
        }
    });
    var groupButtons = document.getElementsByClassName('groupButton');
    for (var i = 0; i < groupButtons.length; i++) {
        groupButtons[i].addEventListener('click', function () {
            username = this.id;
            getMessages();
        });
    }
};