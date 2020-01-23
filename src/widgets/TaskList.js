import getCoords from '@/utils/getCoords';
import { List } from 'antd';
import React from 'react';
import Draggable from 'react-draggable';
import style from '@/pages/style.less';

let uniqDragKey = 0;

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

  handleDrag = (e, task) => {
    const { statusList } = this.props.taskStore;

    e.preventDefault();
    statusList.forEach((status, key) => {
      const columnCoord = getCoords(this.columnRefs[key].current);
      const rect = getCoords(this.columnRefs[key].current);
      const taskCard = e.path.find(el => el.className.indexOf('react-draggable') > -1);
      const taskCoord = getCoords(taskCard);

      if (
        e.clientY < rect.top ||
        e.clientY >= rect.box.bottom ||
        e.clientX < rect.left ||
        e.clientX >= rect.box.right
      ) {
        if (
          !this.columnRefs[key].current.classList.contains(style.hoverColumn) &&
          status.id !== task.taskStatus.id
        ) {
          this.columnRefs[key].current.classList.add(style.hoverColumn);
        }
      }
    });
  };

  componentDidMount() {
    this.props.fetchTask();
  }

  handleStart = e => {
    const { statusList } = this.props.taskStore;

    statusList.forEach((status, key) => {
      this.columnRefs[key].current.classList.add(style.activeColumn);
    });
  };

  handleStop = (e, task) => {
    const { statusList } = this.props.taskStore;

    e.preventDefault();
    statusList.forEach((status, key) => {
      this.columnRefs[key].current.classList.remove(style.hoverColumn);
      this.columnRefs[key].current.classList.remove(style.activeColumn);
      const columnCoord = getCoords(this.columnRefs[key].current);
      const taskCard = e.path.find(el => el.className.indexOf('react-draggable') > -1);
      const taskCoord = getCoords(taskCard);

      if (
        (taskCoord.box.right > columnCoord.left && taskCoord.left < columnCoord.box.right) ||
        taskCoord.box.left > columnCoord.right
      ) {
        this.props.udpateStateTask(task, status.title);
      }
    });
  };

  mapTaskItem = (task, key) => {
    uniqDragKey += key + 1;
    return (
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        key={uniqDragKey}
        onStart={this.handleStart}
        onStop={e => this.handleStop(e, task)}
        onDrag={e => this.handleDrag(e, task)}
      >
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

export default TaskList;
