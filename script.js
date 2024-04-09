const cells = document.querySelectorAll('.empty');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.toggle('darkred');
  });
});

console.log('ta')