const todoForm = document.querySelector('form');
const todoInput = document.getElementById("todo-input")
const todoListUL = document.getElementById("todo-list")
const cleanText = document.getElementById("clean-text")

let allTodos = [];

// ----- EVENT FUNCTIONS -----
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("todos")) {
        restoreTodos()
    }
})

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

// ----- GENERAL FUNCTIONS -----
function addTodo(){
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        allTodos.push([todoText, false]);
        updateTodoList();
    }
    todoInput.value = "";
}

function deleteTodo(index){
    allTodos.splice(index, 1);
    updateTodoList();
}

function markTodo(index){
    !allTodos[index][1] ? allTodos[index][1] = true : allTodos[index][1] = false
    updateTodoList()
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, index) => {
        todoItem = createTodoItem(todo[0], index);
        
        const deleteButton = todoItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTodo(index);
        });
    
        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        checkbox.checked = todo[1]
        checkbox.addEventListener('change', function() {
            markTodo(index);
        });
        
        todoListUL.append(todoItem);
    });

    allTodos.length != 0 ? cleanText.style.display = 'none' : 
                            cleanText.style.display = 'flex';
    savesTodos();
}

// ----- HTML FUNCTIONS -----
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
    return todoLi;
}

//----- LOCAL STORAGE FUNCIONS -----
function savesTodos(){
    const todosJson = JSON.stringify(allTodos)
    localStorage.setItem("todos", todosJson)
}

function restoreTodos(){
    allTodos = JSON.parse(localStorage.getItem("todos"));
    updateTodoList();
}