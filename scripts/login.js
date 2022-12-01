function roleIsChecked() {
  let list = document.getElementsByName("cargo");
  let counter = 0;

  for(let radioButton of list) {
    if(radioButton.checked === false) {
      counter++;
    }
  }

  return counter !== list.length;
}

function cadastrar() {
  //Verifica se alguma role está checada
  if(roleIsChecked() === false) {
    alert('Marque Alguma Role!');
    return;
  }

  //Pegar os dados do formulário
  let payLoad = {
    role: document.getElementsByName("cargo")[0].checked === true ? 'Dev' : 'Cliente',
    fullName: document.querySelector("#fullName").value,
    birthDate: document.querySelector("#birthDate").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value
  }

  //Enviar para a api
  fetch("https://637c0ed76f4024eac21d48b8.mockapi.io/api/users", {
    method: 'POST',
    body: JSON.stringify(payLoad),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(response => {
    alert('Usuário cadastrado com sucesso!');
    console.log(response);
  })
  .catch(error => {
    alert('Erro no servidor!');
    console.log(error);
  })
}