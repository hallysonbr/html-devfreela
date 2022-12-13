window.onload = function() {
  document.querySelector('#name').innerText = localStorage.getItem('user.name');
  document.querySelector('#role').innerText = localStorage.getItem('role');
}