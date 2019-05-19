const actions = (store) => ({
  addTask: ({ tasks }, task) => {
    return { tasks: [...tasks, task], maxIndex: task.index + 1 };
  },

  deleteTask: ({ tasks }, id) => {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    return { tasks };
  },

  getTask: ({ tasks }, id) => {
    const index = tasks.findIndex((task) => task.id === id);
    return { edit: tasks[index] };
  },

  changeTask: ({ tasks }, data) => {
    const index = tasks.findIndex((task) => data.id === task.id);
    tasks[index] = { ...tasks[index], ...data };
    return { tasks: [...tasks] };
  },

  changeTimeLine: ({ timeLine }, { hours, minutes, type }) => {
    timeLine[type] = [hours, minutes];
    return { timeLine: { ...timeLine } };
  },
  changeSequence: ({}, tasks) => {
    console.log(tasks)
    return { tasks }},
  addDraggedItem: ({}, draggedItem) => ({ draggedItem }),
});

export default actions;
