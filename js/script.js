let arrTasks = []

function Task(task, date, finish) {
    this.task = task;
    this.date = date;
    this.finish = finish;
}


window.addEventListener("load", () => {
    if (localStorage.hasOwnProperty("arrTasks")) {
        updateTask()
    }
  })



const submitBtn = document.querySelector('.submit-button');
submitBtn.addEventListener("click", function () {
    const taskInput = document.querySelector('#task');
    const dateInput = document.querySelector('#date');
    const hourInput = document.querySelector('#hour');

    //formatar data
    const formatDate = dateInput.value.split('-')
    let newDate = new Date(formatDate[0], formatDate[1] - 1, formatDate[2])
    newDate = newDate.toString().split(' ')
    const objDate = {
        year: newDate[3],
        month: newDate[1],
        day: {
            number: newDate[2],
            text: newDate[0]
        }
    }

    const date = `${objDate.day.number}    ${objDate.month}    ${hourInput.value}`
    
    const task = taskInput.value
    taskInput.value = '';
    dateInput.value = '';
    hourInput.value = '';
     
    if(!(date.includes('undefined') || date.includes('Date'))){
        //salvar
        if (localStorage.hasOwnProperty("arrTasks")) {
            arrTasks = JSON.parse(localStorage.getItem("arrTasks"))
        } 
        let validate = true
    
        for(let tasks of arrTasks){
            if(date === tasks.date ){
                alert("indisponivel")
                validate = false
            } 
        }
        console.log(validate+' c')

        if(validate){
            //inserir no vetor
            arrTasks.push(new Task(task, date, false));
            localStorage.setItem("arrTasks", JSON.stringify(arrTasks))
            console.log(validate+' v')

            updateTask();
        }
    }else{alert("indisponivel")}
    
    


    //resetar inputs
    taskInput.value = '';
    dateInput.value = '';
    hourInput.value = '';
})

 const updateTask = () => {

    const sectionTask = document.querySelector('#tasks');
    sectionTask.innerHTML = '';

    let cont = 0
    arrTasks = JSON.parse(localStorage.getItem("arrTasks"))
    for (let task of arrTasks) {
        sectionTask.innerHTML += createTask(task, cont++);
    }
}

 const createTask = (task, cont) => {
    let divTaskClass = 'task-item';
    if (task.finish === true) {
        divTaskClass += ' active';
    }
    const date = `${task.date}`;

    return `
        <div data-date="${date}"  class="${divTaskClass}">
            <button class="done-button" id="done-button-${cont}" onclick="doneTask(${cont})"></button>
            <p>${task.task}</p>
            <time>${date}</time>

            <div class="buttons">
                <button id="edit-button-${cont}" class="edit-button" onclick="editTask(${cont})"></button>
                <button id="remove-button-${cont}" class="remove-button" onclick="removeTask(${cont})"></button>
            </div>
        </div>
    `
}

function doneTask(cont) {
    const button = document.querySelector(`#done-button-${cont}`);

    arrTasks = JSON.parse(localStorage.getItem("arrTasks"))
    for (let task of arrTasks) {
        if (task.date === button.parentElement.dataset.date) {
            if (task.finish === false)
                task.finish = true
            else
                task.finish = false
            localStorage.setItem("arrTasks", JSON.stringify(arrTasks))
        }

    }
    updateTask()
}

const removeTask = (cont) => {
    if (submitBtn.className === 'submit-button edit-mode') {
        submitBtn.classList.toggle('edit-mode')
    }

    const button = document.querySelector(`#done-button-${cont}`);
    button.parentElement.remove()

    arrTasks = JSON.parse(localStorage.getItem("arrTasks"))
    for (let index in arrTasks) {
        if (arrTasks[index].date === button.parentElement.dataset.date) {
            arrTasks.splice(index, 1)
            localStorage.setItem("arrTasks", JSON.stringify(arrTasks))
        }
    }
}

const editTask = (cont) => {
    const button = document.querySelector(`#edit-button-${cont}`);

    submitBtn.classList.toggle('edit-mode')
    submitBtn.setAttribute("disabled", "")
    button.classList.toggle('edit-mode')

    arrTasks = JSON.parse(localStorage.getItem("arrTasks"))
    for (let task of arrTasks) {
        if (task.date === button.parentElement.parentElement.dataset.date) {
            const taskInput = document.querySelector('#task');
            const dateInput = document.querySelector('#date');
            const hourInput = document.querySelector('#hour');

            task.task = taskInput.value;

            const formatDate = dateInput.value.split('-')
            let newDate = new Date(formatDate[0], formatDate[1] - 1, formatDate[2])
            newDate = newDate.toString().split(' ')
            const objDate = {
                year: newDate[3],
                month: newDate[1],
                day: {
                    number: newDate[2],
                    text: newDate[0]
                }
            }

            task.date = `${objDate.day.number}    ${objDate.month}    ${hourInput.value}`
            button.parentElement.parentElement.dataset.date = task.date
            console.log(arrTasks)
            localStorage.setItem("arrTasks", JSON.stringify(arrTasks))
            taskInput.value = '';
            dateInput.value = '';
            hourInput.value = '';
            
        }
    }
    if (button.className !== 'edit-button edit-mode') {
        submitBtn.removeAttribute("disabled")
        updateTask()
    }
}

 
