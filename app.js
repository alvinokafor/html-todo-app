let todoList = getSavedTodos()


 //1. filter todo items and render on browser
 //2. display how many todos are left

//to display uncompleted items
 //1. create an event listener that checks when a check box is unchekced or not
 //2. create a filter property with default value of false for todo items
 //3. create a new filter logic for sorting out only incompleted todo's

const filters = {
    searchText: '',
    isCompleted: false
}


renderTodo(todoList, filters)


document.querySelector('#inputForm').addEventListener('submit', function(e) {
    e.preventDefault()

    todoList.push({
        title: e.target.elements.inputTodo.value,
        completed: false
    })

    localStorage.setItem('todo', JSON.stringify(todoList))
    document.querySelector('#todoInput').innerHTML = ''
    renderTodo(todoList, filters)

})


document.querySelector('#search-query').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodo(todoList, filters)
})

document.querySelector('#hideCompleted').addEventListener('change', function(e) {
    filters.isCompleted = e.target.checked
    renderTodo(todoList, filters)
})
