
//checks if todo list exists in local storage
function getSavedTodos () {
    const todoJSON = localStorage.getItem('todo')

    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    } else {
        return []
    }
}

//saves todos
function saveTodos (todoList) {
    localStorage.setItem('todo', JSON.stringify(todoList))
}

//function to remove notes
function removeTodos (todoID) {
    const todoIndex = todoList.findIndex(function (todo) {
        return todo.id === todoID
    })

    if (todoIndex > -1) {
        todoList.splice(todoIndex, 1)
    }
}

//toggle todo completed property
function toggleTodo (todoID) {
    const checkIndex = todoList.find(function (todo) {
        return todo.id === todoID
    })

    if (checkIndex !== undefined) {
        checkIndex.completed = !checkIndex.completed
    }
}

//render elements to DOM
function renderTodo (todoList, filters) {
    let filteredTodos = todoList.filter(function (todo) {
        return todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(function (todo) {
        if (filters.isCompleted) {
            return !todo.completed
        } else {
            return true
        }
    })

    document.querySelector('#todos').innerHTML = ''

    //renders todo items to DOM
    filteredTodos.forEach(function (todo) {
        const todoItem = generateDOM(todo)
        document.querySelector('#todos').appendChild(todoItem)
    })


    document.querySelector('#todoSummary').innerHTML = ''

    const unCompletedTodos = generateSummary(filteredTodos)
    document.querySelector('#todoSummary').appendChild(unCompletedTodos)
}


//generate DOM elements 
function generateDOM (todo) {
    const todoItem = document.createElement('div')
    const textEl = document.createElement('span')
    const checkBox = document.createElement('input')
    const button = document.createElement('button')

    checkBox.setAttribute('type', 'checkbox')
    button.textContent = 'Delete Todo'

    // checks if todo is completed
    checkBox.checked = todo.completed
    checkBox.addEventListener('change', function () {
        toggleTodo(todo.id)
        saveTodos(todoList)
        renderTodo(todoList, filters)
    })


    // event listener to remove notes
    button.addEventListener('click', function () {
        removeTodos(todo.id)
        saveTodos(todoList)
        renderTodo(todoList, filters)
    })
    
    todoItem.appendChild(checkBox)
    todoItem.appendChild(textEl)
    todoItem.appendChild(button)
    

    textEl.textContent = todo.title
    return todoItem
}




//generate todo summary
function generateSummary (filteredTodos) {
    const unDoneTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    const incompleteTodo = document.createElement('h4')
    incompleteTodo.textContent = `You have ${unDoneTodos.length} todo's left`
    return incompleteTodo
}



