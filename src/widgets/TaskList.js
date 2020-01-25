import getCoords from '@/utils/getCoords';
import { List } from 'antd';
import React from 'react';
import Draggable from 'react-draggable';
import style from '@/pages/style.less';

let uniqDragKey = 0;

class TaskList extends React.PureComponent {
  state = {};
  columnRefs = {};
  activeTask = null;

  constructor(props) {
    super(props);

    const { statusList } = props.taskStore;

    statusList.forEach((el, key) => {
      this.columnRefs[key] = React.createRef();
    });
  }

  componentDidMount() {
    this.props.fetchTask();
  }

  handleStart = (e, task) => {
    const { statusList } = this.props.taskStore;

    statusList.forEach((status, key) => {
      this.columnRefs[key].current.classList.add(style.activeColumn);
    });

    this.activeTask = document.getElementById(task.taskNumber);
  };

  insideBox = (taskCoord, columnCoord) => {
    return (
      (taskCoord.box.right > columnCoord.left && taskCoord.left < columnCoord.box.right) ||
      taskCoord.box.left > columnCoord.right
    );
  };

  handleDrag = (e, task) => {
    const { statusList } = this.props.taskStore;

    e.preventDefault();
    const taskCoord = getCoords(this.activeTask);
    statusList.forEach((status, key) => {
      const columnCoord = getCoords(this.columnRefs[key].current);

      if (this.insideBox(taskCoord, columnCoord) && task.taskStatus.title != status.title) {
        this.columnRefs[key].current.classList.add(style.hoverColumn);
      } else {
        this.columnRefs[key].current.classList.remove(style.hoverColumn);
      }
    });
  };

  handleStop = (e, task) => {
    const { statusList } = this.props.taskStore;

    e.preventDefault();
    const taskCoord = getCoords(this.activeTask);
    statusList.forEach((status, key) => {
      this.columnRefs[key].current.classList.remove(style.hoverColumn);
      this.columnRefs[key].current.classList.remove(style.activeColumn);

      const columnCoord = getCoords(this.columnRefs[key].current);

      if (this.insideBox(taskCoord, columnCoord) && task.taskStatus.title != status.title) {
        setTimeout(() => {
          this.props.udpateStateTask(task, status.title);
        }, 10);
      }
    });
  };

  mapTaskItem = (task, key) => {
    uniqDragKey += key + 1;
    return (
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        key={uniqDragKey}
        onStart={e => this.handleStart(e, task)}
        onStop={e => this.handleStop(e, task)}
        onDrag={e => this.handleDrag(e, task)}
      >
        <div id={task.taskNumber} className={`${style.taskItem} handle`}>
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

export default TaskList;
