(function () {
  let array = [];
  let listName = '';
  // создаем и взвращаем Заголовок приложения
  function createAppTitle(title) { //передаем title стобы менять название
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title; // присваиваем  внутреннее значение , h2 = заголовок, кот. мы ввели(title)
    return appTitle;
  }
  // создаем и возвращаем Форму для создания дела
  function createTodoItemForm() {

    let form = document.createElement('form');//создаем форму
    let input = document.createElement('input');//создаем input
    let buttonWrapper = document.createElement('div'); //див для хранения кнопки
    let button = document.createElement('button'); //button

    //создаем атрибуты элементам
    form.classList.add('input-group', 'mb-3');//создает классы mb-3 создает отступы
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');//располагает кнопку справа
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;
    //обьединяем
    buttonWrapper.append(button); // в врапер вкладывваем кнопку
    form.append(input);//инпут вкладывваем в форму
    form.append(buttonWrapper);

    input.addEventListener('input', function () {
      if (input !== '') { button.disabled = false }
      else { button.disabled = true; }
    })
    return {
      form,
      input,
      button,// возвращаем форму и те элементы к которым будем обращаться(то есть на кнопку и инпут будем нажимать
      // а на врапер не будем , поэтому его не возвращаем
    };
  }
  // создаем и возвращаем список дел
  function createTodoList() {
    let list = document.createElement('ul');  //создаем список и возвращаем
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(obj) {//3

    let item = document.createElement('li')
    let buttonGroup = document.createElement('div') //див для двух кнопок
    let doneButton = document.createElement('button') //кнопка готово
    let deleteButton = document.createElement('button') //кнопка удалить

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = obj.name;//3

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    if (obj.done == true) { item.classList.add('list-group-item-success') }

    //обработчики на кнопки
    doneButton.addEventListener('click', function () {
      item.classList.toggle('list-group-item-success')
      let currentName = item.firstChild.textContent
      for (let listItem of array) {
        if (listItem.id == obj.id) { listItem.done = !listItem.done }
      }
      saveList(array, listName);
    })


    deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        item.remove();

        for (let i = 0; i < array.length; i++) {
          if (array[i].id == obj.id) { array.splice(i, 1) }

        }
        saveList(array, listName);
      }
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);//две кнопки вкладываем в див
    item.append(buttonGroup);//див вкладывваем в ли

    return {
      item,
      doneButton,
      deleteButton,
    };

  };

  function getNewId(arr) {
    let max = 0;
    for (const item of arr) {
      if (item.id > max) {
        max = item.id
      }
    }
    return max + 1;
  }

  function saveList(arr, keyName) {//ыункция сохранения
    localStorage.setItem(keyName, JSON.stringify(arr))//записываем в локал массив в виде строки
  }
  function createTodoApp(container, title = 'Список дел', keyName) { //создаем атрибут keyname и пишем в коде что передаем
    listName = keyName;//чтобы имя было глобально и доступно во всей программе
    //вызываем все три созданные функции
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    //при запуске приложения расшифровать локалсторидж


    let localData = localStorage.getItem(listName)

    if (localData !== null && localData !== '')//если не равна нулю строчка и не пустая
    {
      array = JSON.parse(localData)
    }
    console.log(array)
    for (const itemList of array) {
      let todoItem = createTodoItem(itemList);
      todoList.append(todoItem.item);
    }



    //результат размещаем в контейнере
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.form.addEventListener('submit', function (e) {//событие на форме по нажатию энтер или на кнопку создания дела

      e.preventDefault(); //чтобы страница не перезагружалась при отправке формы

      //проверяем есть ли значение внутри интпута
      //если ничего нет просто возвращаемся и не делаем ничего
      if (!todoItemForm.input.value) {
        return;
      }

      let newItem = {
        id: getNewId(array),
        name: todoItemForm.input.value,
        done: false
      }
      let todoItem = createTodoItem(newItem);




      array.push(newItem);
      saveList(array, listName);//сохраняем при любом изменении
      todoList.append(todoItem.item);
      todoItemForm.button.disabled = true;
      //обнуляем то что ввели в инпуте
      todoItemForm.input.value = '';

    });
    /*      todoItemForm.input.addEventListener('input', () => {
          if (todoItemForm.input.value.trim().length > 0) {
            button.disabled = false;
          }
          else {
            button.disabled = true
          }
        })  */
  }

  //помещаем эти три функции в дом страницы
  document.addEventListener('DOMContentLoaded', function () {//получить доступ к дом-дереву

  });
  window.createTodoApp = createTodoApp;
})();

