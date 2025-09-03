const itemInput = document.getElementById("itemInput");
const itemCount = document.getElementById("itemCount");
const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");

let todoDb = [];

const addToList = () => {
  const itemName = String(itemInput.value);
  const itemExists = Boolean(
    todoDb.filter((item) => item.itemName === itemName).length
  );

  if (itemName.length <= 2 || itemExists) return;

  const newItem = { itemName, ifDone: false };
  todoDb.push(newItem);
  itemInput.value = "";

  renderUi();
};

const updateItem = (itemIndex) => {
  const previousValue = todoDb[itemIndex];

  todoDb[itemIndex] = {
    ...previousValue,
    ifDone: !previousValue.ifDone,
  };
  renderUi();
};

const editItem = (itemIndex) => {
  const newValue = prompt("Edit your todo:", todoDb[itemIndex].itemName);
  if (newValue && newValue.trim() !== "") {
    todoDb[itemIndex].itemName = newValue.trim();
    todoDb[itemIndex].ifDone = false; // Remove line-through
  }
  renderUi();
};

const deleteItem = (itemIndex) => {
  todoDb = todoDb.filter((_, index) => index != itemIndex);
  renderUi();
};

const createTodoItemUi = (item = {}, index = 0) => {
  const itemHtml = ` <li class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150 group">
      <div class="flex items-center space-x-3 flex-1">
        <input ${item.ifDone ? "checked" : ""}
        onclick = "updateItem(${index})" id = "toggle(${index})"
          type="checkbox"
          class="w-4 h-4 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
            "
        />
        <div class="w-3 h-3 bg-orange-400 rounded-full transition-all duration-200"></div>
        <span 
          class="text-gray-800 ${item.ifDone ? "line-through" : ""}
                         font-medium transition-all duration-200"
        >${item?.itemName}</span>
      </div>
       <button onclick="editItem(${index})" class="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg">Edit</button>
     <button 
     onclick= "deleteItem(${index})"
      class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
    </li>`;

  const itemElement = document.createElement("span");
  itemElement.innerHTML = itemHtml;
  return itemElement;
};

const createTodoListUi = () => {
  todoList.innerHTML = "";

  todoDb.forEach((item, index) => {
    todoList.appendChild(createTodoItemUi(item, index));
  });
};

const renderUi = () => {
  itemCount.innerText = todoDb.length;

  if (todoDb.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  createTodoListUi();
};

renderUi();
