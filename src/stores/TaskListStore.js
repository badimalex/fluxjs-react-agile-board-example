import { ReduceStore } from 'flux/utils';
import * as randomData from '../utils/randomData';
import AppDispatcher from './AppDispatcher';

const initialState = {
  statusList: randomData.statuses,
  taskList: [],
};

class AppStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    console.log(action);
    switch (action.type) {
      case 'task/udpateStateTask': {
        return {
          ...state,
          taskList: state.taskList.map(task => {
            if (action.task.taskNumber == task.taskNumber) {
              task.taskStatus = randomData.statuses.find(s => s.title == action.status);
            }
            return task;
          }),
        };
      }

      case 'task/addNewTask': {
        const randomTask = randomData.randomTaskGen();
        const randomStatus = randomData.randomStatusGen();
        const taskId = state.taskList.length + 1;

        return {
          ...state,
          taskList: state.taskList.concat({
            taskStatus: randomData.statuses[0],
            taskNumber: `PR-${taskId}`,
            taskTitle: `${action.newItem.title} (${taskId})`,
          }),
        };
      }

      case 'task/fetch': {
        return {
          ...state,
          taskList: action.list,
        };
      }

      case 'task/reset': {
        return initialState;
      }

      default:
        return state;
    }
  }
}

export default new AppStore();
