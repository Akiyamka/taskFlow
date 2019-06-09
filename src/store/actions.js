/* eslint-disable no-param-reassign */
const actions = () => ({
  addTask: ({ tasks }, task) => {
    return { tasks: [...tasks, task] };
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

  changeTasks: ({ tasks }, data) => {
    const newTask = tasks;
    const task = newTask.splice(data.oldIndex, 1);
    newTask.splice(data.newIndex, 0, ...task);
    return { tasks: [...newTask] };
  },

  changeTimeLine: ({ timeLine }, { time, type }) => {
    timeLine[type] = time;
    return { timeLine: { ...timeLine } };
  },
  saveCurrentTimeInterval: (store, currentTimeInterval) => {
    return { currentTimeInterval };
  },

  resizeFirstClick: (store, { positionY, height, ref }) => {
    return {
      resize: {
        ref,
        height,
        positionY,
        isResize: true,
      },
    };
  },
  resizeLastClick: () => {
    return {
      resize: {
        isResize: false,
      },
    };
  },
});

export default actions;
