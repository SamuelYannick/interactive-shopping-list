document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const shoppingList = document.getElementById('shoppingList');

   
    let shoppingItems = JSON.parse(localStorage.getItem('shoppingItems')) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
    };

    const renderList = () => {
        shoppingList.innerHTML = '';
        shoppingItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = item.purchased ? 'purchased' : '';
    
            const textSpan = document.createElement('span');
            textSpan.textContent = item.name;
            textSpan.contentEditable = true;
            textSpan.addEventListener('input', () => {
                shoppingItems[index].name = textSpan.textContent;
                saveToLocalStorage();
            });
    
            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = item.purchased ? 'Unmark' : 'Mark Purchased';
            purchaseButton.addEventListener('click', () => {
                shoppingItems[index].purchased = !shoppingItems[index].purchased;
                saveToLocalStorage();
                renderList();
            });
    
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            `;
            deleteButton.addEventListener('click', () => {
                shoppingItems.splice(index, 1);
                saveToLocalStorage();
                renderList();
            });
    
            listItem.appendChild(textSpan);
            listItem.appendChild(purchaseButton);
            listItem.appendChild(deleteButton);
            shoppingList.appendChild(listItem);
        });
    };
    

    const addItem = () => {
        const newItem = itemInput.value.trim();
        if (newItem) {
            shoppingItems.unshift({ name: newItem, purchased: false });
            saveToLocalStorage();
            renderList();
            itemInput.value = '';
        }
    };

    const clearList = () => {
        shoppingItems = [];
        saveToLocalStorage();
        renderList();
    };

    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);
    itemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addItem();
    });
    
    renderList();
});
