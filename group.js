import { checkuser } from './user.js';
var apiBaseUrl = 'https://server-tni-serverllication-jlocxabspm.cn-hangzhou.fcapp.run';
let username = localStorage.getItem('username');
let group = "群聊3";

checkuser(username).then(userId => {
    localStorage.setItem('userId', userId);
}).catch(() => {
    username = 'default'; // defauly username
    localStorage.setItem('username', username);
    localStorage.setItem('userId', 8);
});

function getMessages(group) {
    fetch(apiBaseUrl + "/messages?username=" + group)
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
        body: JSON.stringify({ message: message, senderUsername: username, receiverUsername: group })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                getMessages(group);
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
            group = this.id;
            getMessages(group);
        });
    }
};
