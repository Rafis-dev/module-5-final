import saveToLocalStorage from './storage.js';
// Функция обновления номеров задач
export const updateTaskNumbers = (arr) => {
  const allRows = document.querySelectorAll('.table-row');
  allRows.forEach((item, index) => {
    const taskId = item.querySelector('.task').id;
    item.querySelector('.task-number').textContent = index + 1;

    // Обновляем номер задачи в массиве
    const task = arr.find((task) => task.id === taskId);
    if (task) {
      task.taskNum = index + 1;
    }
  });
};
// состояние для выполненной задачи
const taskDone = (tableRow, rowTask) => {
  tableRow.classList.remove('table-light');
  rowTask.classList.add('text-decoration-line-through');
  tableRow.querySelector('.btn-info').setAttribute('disabled', '');
  tableRow.querySelector('.status').textContent = 'Выполнена';
};
// состояние для невыполненной задачи
const taskNotDone = (tableRow, rowTask) => {
  tableRow.classList.add('table-light');
  rowTask.classList.remove('text-decoration-line-through');
  tableRow.querySelector('.btn-info').removeAttribute('disabled');
  tableRow.querySelector('.status').textContent = 'В процессе';
};

// функция для завершения редактирования задачи
const finishEdit = (arr, taskId, rowTask, askName, tableRow) => {
  // Сохраняем изменения текста задачи
  const task = arr.find((task) => task.id === taskId);
  task.text = rowTask.textContent.trim(); // Обновляем текст задачи

  // Сохраняем обновленный массив в localStorage
  saveToLocalStorage(arr, askName);

  // Снимаем режим редактирования
  rowTask.removeAttribute('contenteditable');
  rowTask.style.color = 'unset';
  tableRow.querySelector('.btn-success').removeAttribute('disabled');
};

export default {
  updateTaskNumbers,
  taskDone,
  taskNotDone,
  finishEdit,
};

