function site() {
  const reducer = Redux.combineReducers({
    todos: (state = [], action) => {
      const newState = Object.assign([], state);
      switch (action.type) {
        case "addTodo": {
          newState.push(action.payload);
          break;
        }
        case "removeTodo": {
          newState.splice(action.payload, 1);
          break;
        }
      }
      return newState;
    },
  });

  const store = Redux.createStore(reducer);

  store.subscribe(() => {
    render();
    console.log("state has been updated");
  });

  const render = () => {
    const container = document.getElementById("root");
    container.innerHTML = "";
    const state = store.getState();
    container.innerHTML = '<ul id="list" class="list-group"></ul>';
    const list = document.getElementById("list");
    state.todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `${index + 1} - ${todo}`;
      list.appendChild(li);
      li.onclick = () => {
        store.dispatch({
          type: "removeTodo",
          payload: index,
        });
      };
    });
  };

  function addTodo() {
    value = document.getElementById("todo-input").value;
    if (value !== "") {
      store.dispatch({
        type: "addTodo",
        payload: value,
      });
    }
  }

  const form = document.querySelector("form");
  form.onsubmit = (event) => {
    event.preventDefault();
    addTodo();
    form.reset();
  };

  document.getElementById("submit-todo").onclick = () => {
    addTodo();
  };
}
site();
