// Pega os parâmetros da URL
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Type: 'create' | 'edit'
const screenType = params.id ? 'edit' : 'create';  

window.onload = function() {
  setScreenTypeTexts();
}

function setScreenTypeTexts() {
   //  MODO CRIAR
   if(screenType == 'create') {
    document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
    document.querySelector('#action-button').innerText = "Cadastrar";
  }

  // MODO EDITAR
  if(screenType == 'edit') {
    document.querySelector('#main-title').innerText = "Editar projeto";
    document.querySelector('#action-button').innerText = "Salvar";
  }
}

function createOrEdit() { 
  //Pegar os dados do formulário
  let payLoad = {
    title: document.querySelector("#title").value,
    totalCost: document.querySelector("#totalCost").value,
    description: document.querySelector("#description").value,
    idClient: 1,
  }

  //Enviar para a api
  fetch(`https://637c0ed76f4024eac21d48b8.mockapi.io/api/projects${screenType === 'edit' ? '/' + params.id : ''}`, {
    method: screenType === 'edit' ? 'PUT' : 'POST',
    body: JSON.stringify(payLoad),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(response => {
    alert(`Projeto ${screenType === 'edit' ? 'atualizado' : 'cadastrado'} com sucesso!`);
    console.log(response);
  })
  .catch(error => {
    alert('Erro no servidor!');
    console.log(error);
  })
}