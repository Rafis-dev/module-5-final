import elements from './createElements.js';
const {createHeading, createForm, createTable, createRow, createUser} = elements;

// создаем основные элементы приложения
const renderApp = (appContainer, name) => {
  appContainer.append(createHeading('Todo App'), createUser(name), createForm(), createTable());
};

// отображаем задания
const renderTasks = (tbody, tasks) => {
  const rows = tasks.map(createRow);
  tbody.append(...rows);

  // Обновляем состояние каждой задачи после рендеринга в зависимости от свойства `done`
  tasks.forEach((task) => {
    const tableRow = document.getElementById(task.id).closest('.table-row');

    if (task.done) {
      tableRow.classList.add('table-success');
      tableRow.classList.remove('table-light');
      tableRow.querySelector('.task').classList.add('text-decoration-line-through');
      tableRow.querySelector('.status').textContent = 'Выполнена';
      tableRow.querySelector('.btn-info').setAttribute('disabled', '');
      tableRow.querySelector('.btn-success').textContent = 'Возобновить';
    } else {
      tableRow.classList.add('table-light');
      tableRow.querySelector('.task').classList.remove('text-decoration-line-through');
      tableRow.querySelector('.status').textContent = 'В процессе';
      tableRow.querySelector('.btn-info').removeAttribute('disabled');
      tableRow.querySelector('.btn-success').textContent = 'Завершить';
    }
  });


  return rows;
};

export default {
  renderApp,
  renderTasks,
};
