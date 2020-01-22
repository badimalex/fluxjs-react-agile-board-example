import * as randomData from './randomData';

const dataTask = [
  439,
  329,
  176,
  191,
  209,
  398,
  421,
  552,
  674,
  31,
  261,
  651,
  322,
  374,
  414,
  587,
  631,
  874,
  91,
  101,
];

const taskList = [];

for (let index = 0; index < dataTask.length; index++) {
  const taskId = dataTask[index];
  const randomTask = randomData.randomTaskGen();
  const randomStatus = randomData.randomStatusGen();

  taskList.push({
    taskStatus: randomStatus,
    taskNumber: `PR-${taskId}`,
    taskTitle: `${randomTask} (${taskId})`,
  });
}

export default taskList;
