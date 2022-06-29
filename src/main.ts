import {v4} from 'uuid'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './style.css'

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const taskList = document.querySelector<HTMLDivElement>('#taskList')
interface Task {
  id: String
  title: string
  description: string
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', e => {
  e.preventDefault();

  const title = taskForm['title'] as unknown as HTMLInputElement
  const description = taskForm['description'] as unknown as HTMLInputElement

  tasks.push({
    title: title.value, 
    description: description.value,
    id: v4()
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
  
  Toastify({
    text: 'Task Added',
  }).showToast();


  renderTask(tasks)
  taskForm.reset()
  title.focus()


})

document.addEventListener('DOMContentLoaded', () =>{
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  renderTask(tasks)
})

function renderTask(tasks: Task[]){

    taskList!.innerHTML = ""

    tasks.forEach(task => {
      const taskElement = document.createElement('div')
      taskElement.className = 'bg-zinc-800 mb-1 rounded-lg hover:bg-zinc-900 hover:cursor-pointer p-4'
      const header = document.createElement('header')
      header.className = 'flex justify-between'
      const title = document.createElement('span')

      
      title.innerText =  task.title
      const btnDelete = document.createElement('button')
      btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md hover:bg-red-900 transition'
      btnDelete.innerText = 'Delete task'

      btnDelete.addEventListener( 'click', e => {
        const index = tasks.findIndex(t => t.id === task.id)
        tasks.splice( index, 1 )
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTask(tasks)
      })

      const descripcion = document.createElement('p')
      descripcion.innerText = task.description
      
      header.append(title)
      header.append(btnDelete)
      taskElement.append(header)
      taskElement.append(descripcion)
      
      taskList?.append(taskElement)
    })
}