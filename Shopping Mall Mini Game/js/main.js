'use strict';


// Fetch the items from the JSON file (JSON 파일에서 항목을 가져옵니다.)
function loadItems(){
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

//  Update the list with the given items (주어진 항목으로 목록 업데이트)
function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item (주어진 데이터 항목에서 HTML 목록 항목을 만듭니다.)
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function OnButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if (key == null || value == null){
        return;
    }

    // displayItems(items.filter(item => item[key] === value));
    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
}

// Handle button click (버튼 클릭처리)
function onButtonClick(event, items){
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;
    if (key == null || value == null){
        return;
    }
    updateItems(items, key, value);
}

// Make the items mactching {key: value} invisible.(항목을 보이지 않게 만듬)
function updateItems(items, key, value){
    items.forEach(item => {
        if(item.dataset[key] === value){
        item.classList.remove('invisible');
    } else {
        item.classList.add('invisible');
    }
    });
}


function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => OnButtonClick(event, items));
}

// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items)
})
.catch(console.log)
