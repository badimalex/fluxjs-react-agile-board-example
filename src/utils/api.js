import datalist from './dataTask';

export function fetchTask() {
  return Promise.resolve({
    list: datalist,
  });
}
