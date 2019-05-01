const actions = (store) => ({
  addTask: (state, tasks) => {
    const newTasks = [].concat(state.tasks);
    newTasks.push(tasks);

    return { tasks: newTasks };
  },

  deleteTask: (state, id) => {
    const newTasks = [].concat(state.tasks);
    newTasks.map((task, index) => {
      if (id === task.id) newTasks.splice(index, 1);
    });

    return { tasks: newTasks };
  },

  getTask: (state, id) => {
    let data = {};
    state.tasks.map((task, index) => {
      if (id === task.id) data = state.tasks[index];
    });
    return { edit: data };
  },

  changeTask: (state, data) => {
    const newTasks = [].concat(state.tasks);
    newTasks.map((task, index) => {
      if (data.id === task.id) {
        for (const key in newTasks[index]) {
          newTasks[index][key] = data[key];
        }
      }
    });
    return { tasks: newTasks };
  },
});

export default actions;
