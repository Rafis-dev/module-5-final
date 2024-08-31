import saveToLocalStorage from './storage.js';
import elements from './createElements.js';
import {updateTaskNumbers} from './taskControl.js';
const {createRow} = elements;

// блокируем кнопку отправки в зависимости от наличия ввода в инпут
const blockInput = (formInput, saveBtn) => {
  formInput.addEventListener('input', () => {
    if (formInput.value.trim() === '') {
      saveBtn.disabled = true;
    } else {
      saveBtn.disabled = false;
    }
  });
};

// очищаем инпут и блокируем кнопку отправки
const resetInput = (form, resetBtn, saveBtn) => {
  resetBtn.addEventListener('click', e => {
    form.reset();
    saveBtn.disabled = true;
  });
};

// отправляем данные из формы на страницы и сохраняем в localStorage
const sendForm = (tbody, formInput, arr, form, saveBtn, userName) => {
  // отправляем данные из инпута на страницу
  form.addEventListener('submit', e => {
    e.preventDefault();
    const allRows = document.querySelectorAll('.table-row');

    // создаем объект в котором текст задания, случайный id, номер задачи в зависимости от длины масива,
    // done - отвечает за статус выролнения задачи
    const newTask = {
      text: formInput.value,
      id: Math.random().toString().substring(2, 10),
      taskNum: allRows.length + 1,
      done: false,
    };
    // добавляем в таблицу новую задачу
    tbody.append(createRow(newTask));
    // объект добавляем в массив задач
    arr.push(newTask);
    // обновляем номера задач
    updateTaskNumbers(arr);
    // сохраняем обновленный массив
    saveToLocalStorage(arr, userName);
    form.reset();
    saveBtn.disabled = true;
  });
};


export default {
  blockInput,
  resetInput,
  sendForm,
};
