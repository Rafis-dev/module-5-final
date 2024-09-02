const createHeading = (title) => {
  const heading = document.createElement('h1');
  heading.textContent = title;
  return heading;
};

const createUser = (userName) => {
  const user = document.createElement('p');
  user.textContent = userName;
  user.style.cssText = `
  font-size: 40px;
  font-weight: 500;
  color: #0d6efd;
  `;
  return user;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('form', 'd-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeEnd', `
    <label class="form-group me-3 mb-0">
        <input type="text" class="form-control" placeholder="ввести задачу">
      </label>

      <button type="submit" class="btn btn-primary me-3" disabled>
        Сохранить
      </button>

      <button type="reset" class="btn btn-warning">
        Очистить
      </button>
    `);
  return form;
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  tableWrapper.style.overflow = 'auto';
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeEnd', `
          <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>`);
  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  tableWrapper.append(table);

  return tableWrapper;
};

const createRow = item => {
  const row = document.createElement('tr');
  row.classList.add('table-row', 'table-light');

  row.innerHTML = `
  <td class="task-number">${item.taskNum}</td>
            <td class="task" id="${item.id}" style="max-width: 520px; overflow: auto">
              ${item.text}
            </td>
            <td class="status">В процессе</td>
            <td>
              <button class="btn btn-danger">
                Удалить
              </button>
              <button class="btn btn-success">
                Завершить
              </button>
              <button type="button" class="btn btn-info">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16" style="display:none">
  <path d="M11 2H9v3h2V2Z"/>
  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z"/>
</svg>
              </button>
            </td>
  `;

  return row;
};


export default {
  createHeading,
  createForm,
  createTable,
  createRow,
  createUser,
};
