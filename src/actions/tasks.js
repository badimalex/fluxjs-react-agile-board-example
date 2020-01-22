import AppDispatcher from '../stores/AppDispatcher';

import * as api from '../utils/api';

export function addNewTask(newItem) {
  AppDispatcher.dispatch({
    type: 'task/addNewTask',
    newItem,
  });
}

export function udpateStateTask(task, status) {
  AppDispatcher.dispatch({
    type: 'task/udpateStateTask',
    task,
    status,
  });
}

export function fetchTask(task, status) {
  api.fetchTask().then(data => {
    AppDispatcher.dispatch({
      type: 'task/fetch',
      list: data.list,
    });
  });
}
