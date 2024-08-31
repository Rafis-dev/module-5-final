const saveToLocalStorage = (arr, userName) => {
  localStorage.setItem(userName, JSON.stringify(arr));
};


export default saveToLocalStorage;
