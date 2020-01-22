export default function(el) {
  const box = el.getBoundingClientRect();
  return {
    box,
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}
