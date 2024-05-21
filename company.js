import { checkuser } from './user.js';
const API_BASE = 'https://server-tni-serverllication-jlocxabspm.cn-hangzhou.fcapp.run';
let categories = [];
let selectedCategory = null;
let username = localStorage.getItem('username');

checkuser(username).then(userId => {
    localStorage.setItem('userId', userId);
}).catch(() => {
    username = 'default'; // defauly username
    localStorage.setItem('username', username);
    userId = 8; // default userId
    localStorage.setItem('userId', userId);
});

async function fetchCategories() {
    const response = await fetch(`${API_BASE}/categories`);
    const data = await response.json();
    categories = data;
    refreshCategories();
}

async function addCategory(category) {
    if (category === null) {
        throw new Error('Category cannot be null');
    }
    const response = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category })
    });
    if (response.status === 201) {
        categories.push(category);
        refreshCategories();
    }
}

async function deleteCategory(category) {
    if (category === null) {
        throw new Error('Category cannot be null');
    }
    const response = await fetch(`${API_BASE}/categories`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category })
    });
    if (response.status === 200) {
        const index = categories.indexOf(category);
        if (index > -1) {
            categories.splice(index, 1);
        }
        if (selectedCategory === category) {
            selectedCategory = null;
        }
        refreshCategories();
    }
}

async function addToCandidate(category, user) {
    if (category === null || user === null) {
        throw new Error('Category and user cannot be null');
    }
    const response = await fetch(`${API_BASE}/subcategories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, user })
    });
    return response.status === 201;
}

async function removeFromCandidate(category, user) {
    if (category === null || user === null) {
        throw new Error('Category and user cannot be null');
    }
    const response = await fetch(`${API_BASE}/subcategories`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, user })
    });
    return response.status === 200;
}




async function fetchSubcategories(category) {
    if (category === null) {
        throw new Error('Category cannot be null');
    }
    console.log(`Fetching subcategories for category: ${category}`);
    const response = await fetch(`${API_BASE}/subcategories?category=${category}`);
    const data = await response.json();
    console.log(`Received subcategories: ${JSON.stringify(data)}`);
    return data;
}



async function refreshCategories() {
    const categoryContainer = document.getElementById('categoryContainer');
    categoryContainer.innerHTML = '';
    for (const category of categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category' + (category === selectedCategory ? ' selected' : '');

        const categoryRow = document.createElement('div');
        categoryRow.className = 'categoryRow';

        const categoryText = document.createElement('span');
        categoryText.className = 'categoryText';
        categoryText.textContent = category;

        categoryRow.appendChild(categoryText);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttonContainer';

        const join = document.createElement('button');
        join.className = 'join';
        join.textContent = '加入候选';
        join.addEventListener('click', () => {
            addToCandidate(category, username).then(success => {
                if (success) {
                    join.style.display = 'none';
                    quit.style.display = 'inline-block';
                }
            });
        });

        const quit = document.createElement('button');
        quit.className = 'quit';
        quit.textContent = '退出候选';
        quit.style.display = 'none';
        quit.addEventListener('click', () => {
            removeFromCandidate(category, username).then(success => {
                if (success) {
                    join.style.display = 'inline-block';
                    quit.style.display = 'none';
                }
            });
        });

        buttonContainer.appendChild(join);
        buttonContainer.appendChild(quit);

        categoryRow.appendChild(buttonContainer);

        categoryDiv.appendChild(categoryRow);

        const subcategoryContainer = document.createElement('div');
        subcategoryContainer.className = 'subcategoryContainer';
        subcategoryContainer.style.display = 'none'; // 默认隐藏子类容器

        // 添加点击事件监听器到 categoryText
        categoryText.addEventListener('click', async () => {
            // 隐藏所有其他的子类容器
            const allSubcategoryContainers = document.querySelectorAll('.subcategoryContainer');
            allSubcategoryContainers.forEach(container => {
                container.style.display = 'none';
            });

            // 清空 subcategoryContainer
            subcategoryContainer.innerHTML = '';
            // 获取子类并添加到 subcategoryContainer
            const subcategories = await fetchSubcategories(category);
            subcategories.forEach(subcategory => {
                if (subcategory !== null) {
                    const subcategoryText = document.createElement('div');
                    subcategoryText.textContent = subcategory;
                    subcategoryContainer.appendChild(subcategoryText);
                }
            });

            // 显示当前的子类容器
            subcategoryContainer.style.display = 'block';
        });

        categoryDiv.appendChild(subcategoryContainer);

        categoryContainer.appendChild(categoryDiv);
    }
}

document.getElementById('newCategoryButton').addEventListener('click', () => {
    const newCategoryInput = document.getElementById('newCategoryInput');
    const newCategory = newCategoryInput.value;
    if (newCategory) {
        if (categories.includes(newCategory)) {
            alert('该分类已存在！');
        } else {
            addCategory(newCategory);
            newCategoryInput.value = '';
        }
    }
});

fetchCategories();
