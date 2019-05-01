const actions = (store) => ({
  addTask: ({ tasks }, task) => {
    return { tasks: [].concat(tasks, task) };
  },

  deleteTask: ({ tasks }, id) => {
    const index = [].concat(tasks).findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    return { tasks };
  },

  getTask: ({ tasks }, id) => {
    const index = tasks.findIndex((task) => task.id === id);
    return { edit: tasks[index] };
  },

  changeTask: ({ tasks }, data) => {
    const index = [].concat(tasks).findIndex((task) => data.id === task.id);
    for (const key in tasks[index]) {
      tasks[index][key] = data[key];
    }
    return { tasks: [].concat(tasks) };
  },
});

export default actions;
