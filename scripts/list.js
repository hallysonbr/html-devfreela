let list = [];

window.onload = function() {
  document.querySelector('#name').innerText = localStorage.getItem('user.name');
  document.querySelector('#role').innerText = localStorage.getItem('role');
  getProjects();
}

function getProjects() {
  fetch("https://637c0ed76f4024eac21d48b8.mockapi.io/api/projects")
  .then(response => response.json())
  .then(response => {
    list = response;
    console.log(response);
    buildTable(list);    
  })
  .catch(error => {
    alert('Erro no servidor!');
    console.log(error);
  })               
}

function goToEdit(id) {
  window.location.href = `project-create-edit.html?id=${id}`
}

function deleteProject(id) {
  fetch(`https://637c0ed76f4024eac21d48b8.mockapi.io/api/projects/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(response => {
    list = list.filter(project => project.id != id);    
    buildTable();
  })
  .catch(error => {
    alert('Erro no servidor!');
    console.log(error);
  })  
}

function buildTable() {
  document.querySelector('#table-body').innerHTML = "";
  const idClient = localStorage.getItem("clientId");

  list = list.filter(el => el.idClient === idClient)

  list.forEach(element => {
    let template = `<div class="row">
                    <div class="title-description">
                      <h6 class="title">${element.title}</h6>
                      <p class="description">${element.description}</p>
                    </div>
                    <div class="price">R$ ${element.totalCost}</div>
                    <div class="actions">
                      <span class="edit material-icons" onclick="goToEdit(${element.id})">edit</span>
                      <span class="delete material-icons" onclick="deleteProject(${element.id})">delete_outlined</span>
                    </div>
                  </div>`

    document.querySelector('#table-body').insertAdjacentHTML("beforeend", template);
  });
}