//checks if todo list exists in local storage
function getSavedTodos () {
    const todoJSON = localStorage.getItem('todo')

    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    } else {
        return []
    }
}


//generate DOM elements 
function generateDOM (todo) {
    const todoItem = document.createElement('p')
    todoItem.textContent = todo.title
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
