export const taskTitles = ['Design', 'Language', 'For background', 'Applications'];

export const statuses = [
  {
    id: 0,
    title: 'Backlog',
  },
  {
    id: 1,
    title: 'In progress',
  },
  {
    id: 2,
    title: 'Testing',
  },
  {
    id: 3,
    title: 'Done',
  },
];

export function randomStatusGen() {
  return statuses[Math.floor(Math.random() * statuses.length)];
}

export function randomTaskGen() {
  return taskTitles[Math.floor(Math.random() * taskTitles.length)];
}
