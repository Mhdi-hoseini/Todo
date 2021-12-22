const log = (x) => console.log(x)
const main = document.getElementById('main')
const temp = document.getElementById('temp')
const addItemBtn = document.getElementById('add-btn')
const startPlanningBtn = main.querySelector('#planning-btn')
const incompleteList = main.querySelector('#incomplete-list')
const completedList = main.querySelector('#completed-list')

const cloneTemp = () => {
  const clonTempBody = temp.content.cloneNode(true);
  temp.appendChild(clonTempBody);
}
const clearTemp = () => {
  addItemBtn.classList.add('hidden')
  temp.querySelector('form input:first-of-type').value = null
  temp.querySelector('form input:last-of-type').value = null
  temp.querySelector('div textarea').value = null
  temp.classList.remove('hide-body')
  temp.classList.remove('hide-temp')
}
const saveItem = () => {
  let title = temp.querySelector('form input:first-of-type').value
  let category = temp.querySelector('form input:last-of-type').value
  let note = temp.querySelector('div textarea').value

  const newItem = document.createElement('li')
  newItem.classList.add('incomplete-item')
  newItem.innerHTML =
    `<div class="checkbox">
      <input type="checkbox" />
      <span class="checkmark"></span>
    </div>
    <h4>${title}</h4>
    <span class="label">${category}</span>
    <hr hidden />
    <p hidden>${note}</p>`
  incompleteList.querySelector('h3').insertAdjacentElement('afterend', newItem)
  return newItem
}
const closeTemp = () => {
  temp.classList.add('hide-body')
  temp.classList.add('hide-temp')
  setTimeout(() => {
    temp.style.display = 'none'
  }, 500)
}
const changeBody = () => {
  main.classList.replace('planning', 'home')
  incompleteList.classList.replace('hidden', 'show')
  addItemBtn.classList.remove('hidden')
}
const saveHandler = () => {
  let newItem = saveItem()
  closeTemp()
  changeBody()

  const checkbox = newItem.querySelector('.checkbox')
  checkbox.addEventListener('change', (e) => {
    newItem.classList.add('hide')

    if (e.path[3].id == 'incomplete-list') {
      setTimeout(() => {
        completedList.querySelector('h3').insertAdjacentElement('afterend', newItem)
      }, 300)
      completedList.classList.replace('hidden', 'show')
      newItem.classList.remove('hide')

      if (incompleteList.childNodes.length == 4) {
        incompleteList.classList.replace('show', 'hidden')
      }
      else {
        incompleteList.classList.replace('hidden', 'show')
      }
    }
    if (e.path[3].id == 'completed-list') {
      setTimeout(() => {
        incompleteList.querySelector('h3').insertAdjacentElement('afterend', newItem)
      }, 300)
      incompleteList.classList.replace('hidden', 'show')
      newItem.classList.remove('hide')

      if (completedList.childNodes.length == 4) {
        completedList.classList.replace('show', 'hidden')
      }
      else {
        completedList.classList.replace('hidden', 'show')
      }
    }
  })
}
const templateHandler = () => {
  temp.style.display = 'block'
  const saveItemBtn = temp.querySelector('#save-btn')
  saveItemBtn.addEventListener('click', saveHandler)
}

startPlanningBtn.addEventListener('click', (e) => {
  startPlanningBtn.setAttribute('disabled', '')
  main.classList.toggle('temp-add')
  cloneTemp()
  templateHandler()
})
addItemBtn.addEventListener('click', (e) => {
  clearTemp()
  templateHandler()
})