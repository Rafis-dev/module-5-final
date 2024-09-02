import render from './modules/render.js';
import saveToLocalStorage from './modules/storage.js';
import taskControl from './modules/taskControl.js';
import formControl from './modules/formControl.js';
const {updateTaskNumbers, taskDone, taskNotDone, finishEdit} = taskControl;
const {renderApp, renderTasks} = render;
const {blockInput, resetInput, sendForm} = formControl;
const appContainer = document.querySelector('.app-container');


const start = () => {
  const askName = prompt('Как вас зовут?');
  if (askName === null) {
    if (confirm('Точно хотите выйти?')) {
      return;
    } else {
      start();
    }
  }

  askName.trim();

  if (!askName) {
    alert('Вы должны ввести имя');
    return start();
  }
  // основные элементы таблицы
  renderApp(appContainer, askName);

  let arr = JSON.parse(localStorage.getItem(askName)) || [];
  const form = document.querySelector('.form');
  const formInput = document.querySelector('.form-control');
  const tbody = document.querySelector('tbody');
  const saveBtn = document.querySelector('.btn-primary');
  const resetBtn = document.querySelector('.btn-warning');

  // отображаем табличку
  renderTasks(tbody, arr);

  // блокируем кнопку отправки в зависимости от наличия ввода в инпут
  blockInput(formInput, saveBtn);

  // очищаем инпут и блокируем кнопку отправки
  resetInput(form, resetBtn, saveBtn);

  // отправляем данные из формы на страницы и сохраняем в localStorage
  sendForm(tbody, formInput, arr, form, saveBtn, askName);

  // работаем с задачами
  tbody.addEventListener('click', e => {
    const target = e.target;
    const tableRow = target.closest('.table-row');
    const rowTask = tableRow.querySelector('.task');
    // Получаем id задачи
    const taskId = rowTask.id;

    if (target.classList.contains('btn-success')) {
      tableRow.classList.toggle('table-success');

      // Найти задачу в массиве и обновить её статус done
      const task = arr.find(task => task.id === taskId);
      if (task) {
        task.done = tableRow.classList.contains('table-success');
        saveToLocalStorage(arr, askName);
      }

      // состояние для выполненной и невыполненной задач
      if (task && task.done) {
        taskDone(tableRow, rowTask);
      } else {
        taskNotDone(tableRow, rowTask);
      }
    };

    // удаление задач из localStorage и из страницы
    if (target.classList.contains('btn-danger')) {
      tableRow.remove();
      arr = arr.filter(task => task.id !== taskId);
      // Обновляем номера задач после удаления и сохраняем
      updateTaskNumbers(arr);
      saveToLocalStorage(arr, askName);
    }

    // редактируем задачи
    if (target.closest('.btn-info')) {
      // Переключаем режим редактирования
      rowTask.toggleAttribute('contenteditable');

      // Устанавливаем состояние для режима редактирования
      if (rowTask.hasAttribute('contenteditable')) {
        tableRow.querySelector('.btn-success').setAttribute('disabled', '');
        rowTask.focus();
        rowTask.style.color = 'red';
        tableRow.querySelector('.bi-pencil').style.display = 'none';
        tableRow.querySelector('.bi-floppy').style.display = 'block';

        // Добавляем обработчик для завершения редактирования по Enter
        rowTask.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            // функция для завершения редактирования задачи
            finishEdit(arr, taskId, rowTask, askName, tableRow);
          }
        });
      } else {
        // Завершаем редактирование при повторном нажатии на кнопку редактирования
        finishEdit(arr, taskId, rowTask, askName, tableRow);
      };
    }
  });
};

start();


