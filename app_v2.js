const todoForm = document.querySelector('form');
const todoInput = document.getElementById("todo-input")
const todoListUL = document.getElementById("todo-list")
const cleanText = document.getElementById("clean-text")
todoListUL.innerHTML = "";
let todoList =[]

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("todos")) {
        restoreTodos()
    }
})

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
    cleanText.style.display = 'none';
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        index = todoListUL.children.length + 1
        todoItem = createTodoItem(todoText, index);
        todoListUL.append(todoItem);

        todoList.push([index, todoText, false]);
        updateTodos();
        todoInput.value = "";   
    }
}

function createTodoItem(todoText, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox"> 
            <svg fill= "transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button" >
            <svg fill= "var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    const deleteButton = todoLi.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        todoLi.remove()
        const index = todoList.findIndex(todoItem => todoItem[0] == todoIndex)
        todoList.splice(index, 1)
        updateTodos()

        if (todoListUL.children.length == 0){
            cleanText.style.display = 'flex';
        }
    });

    const checkbox = todoLi.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
        const index = todoList.findIndex(todoItem => todoItem[0] == todoIndex)
        !todoList[index][2] ? todoList[index][2] = true : todoList[index][2] = false
        updateTodos()
    })

    return todoLi;
}

function updateTodos(){
    const todosJson = JSON.stringify(todoList)
    localStorage.setItem("todos", todosJson)
}

function restoreTodos(){
    todoList = JSON.parse(localStorage.getItem("todos"))
    if (todoList.length > 0){
        todoList.forEach(Item => {
            todoItem = createTodoItem(Item[1], Item[0]);
            const checkbox = todoItem.querySelector('input[type="checkbox"]');
            if (Item[2]) {
                checkbox.checked = true; 
            }
            todoListUL.append(todoItem);
        });
        cleanText.style.display = 'none';
    }
}
