import * as actions from '@/actions/tasks';
import TaskListStore from '@/stores/TaskListStore';
import TaskList from '@/widgets/TaskList';
import TaskModal from '@/widgets/TaskModal';
import { Container } from 'flux/utils';
import React from 'react';
import style from './style.less';

const App = props => (
  <>
    <TaskModal {...props} />
    <TaskList {...props} />

    <p className={style.footer}>Created using: React.js, umi.js, flux.js, .less, css modules</p>
  </>
);

function getStores() {
  return [TaskListStore];
}

function getState() {
  const taskStore = TaskListStore.getState();

  return {
    taskStore,
    ...actions,
  };
}

export default Container.createFunctional(App, getStores, getState);
