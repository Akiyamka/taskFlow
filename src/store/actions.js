const actions = (store) => ({
  addTask(state, tasks) {
    let newTasks = [].concat(state.tasks);
    tasks.map((task) => {
      newTasks.push(task);
    });

    return {
      tasks: newTasks,
    };
  },

  deleteTask(state, id) {
    let newTasks = [].concat(state.tasks);
    newTasks.map((task, index) => {
      if (id === task.id) newTasks.splice(index, 1);
    });

    return {
      tasks: newTasks,
    };
  },

  getTask(state, id) {
    let data = {};
    state.tasks.map((task, index) => {
      if (id === task.id) data = state.tasks[index];
    });
    return {
      edit: data,
    };
  },

  changeTask(state, data) {
    let newTasks = [].concat(state.tasks);
    newTasks.map((task, index) => {
      if (data.id === task.id) {
        for (const key in newTasks[index]) {
          newTasks[index][key] = data[key];
        }
      }
    });
    return {
      tasks: newTasks,
    };
  },
});

export default actions;
