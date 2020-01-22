import * as actions from '@/actions/tasks';
import TaskListStore from '@/stores/TaskListStore';
import TaskModal from '@/widgets/TaskModal';
import { List } from 'antd';
import { Container } from 'flux/utils';
import React from 'react';
import Draggable from 'react-draggable';
import style from './style.less';
import getCoords from '@/utils/getCoords';

class TaskList extends React.PureComponent {
  state = {};
  columnRefs = {};

  constructor(props) {
    super(props);

    const { statusList } = props.taskStore;

    statusList.forEach((el, key) => {
      this.columnRefs[key] = React.createRef();
    });
  }

  handleStart = e => {
    console.log('handleStart');
    console.log(e);
  };

  componentDidMount() {
    this.props.fetchTask();
  }

  handleStop = (e, task) => {
    const { statusList } = this.props.taskStore;

    e.preventDefault();
    statusList.forEach((status, key) => {
      const columnCoord = getCoords(this.columnRefs[key].current);
      const taskCard = e.path.find(el => el.className.indexOf('react-draggable') > -1);
      const taskCoord = getCoords(taskCard);

      if (
        (taskCoord.box.right > columnCoord.left && taskCoord.left < columnCoord.box.right) ||
        (taskCoord.box.left > columnCoord.right && taskCoord.right > columnCoord.box.left)
      ) {
        this.props.udpateStateTask(task, status.title);
      }
    });
  };

  mapTaskItem = (task, key) => {
    return (
      <Draggable key={key} onStop={e => this.handleStop(e, task)}>
        <div className={`${style.taskItem} handle`}>
          <p>{task.taskNumber}</p>
          <span>{task.taskTitle}</span>
        </div>
      </Draggable>
    );
  };

  render() {
    const { statusList, taskList } = this.props.taskStore;

    return (
      <>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={statusList}
          renderItem={item => <List.Item className={style.listTitle}>{item.title}</List.Item>}
        />

        <ul className={style.taskWraper}>
          {statusList.map((status, key) => {
            return (
              <li ref={this.columnRefs[key]} className={style.taskColumn} key={key}>
                <div className={style.bg}>
                  {taskList
                    .filter(task => task.taskStatus.title == status.title)
                    .map(this.mapTaskItem)}
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

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
