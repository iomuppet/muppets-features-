const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Função para adicionar uma nova tarefa
function addTask() {
  const taskText = taskInput.value.trim(); // Remove espaços extras
  if (taskText === "") {
    alert("O campo de texto está vazio. Por favor, insira um filme!");
    return;
  }

  const maxText = taskText.substring(0, 60); // Limita o texto a 35 caracteres
  const li = document.createElement("li");

  // Texto da tarefa
  const span = document.createElement("span");
  span.textContent = maxText;

  // Contêiner para os botões
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex"; // Botões lado a lado
  buttonContainer.style.gap = "10px"; // Espaçamento entre os botões

  // Botão Editar
  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.className = "button-effect editButton";

  // Botão Remover
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remover";
  deleteButton.className = "remover-button deleteButton";

  // Adiciona os eventos
  editButton.onclick = () => editTask(editButton);
  deleteButton.onclick = () => deleteTask(deleteButton);

  // Monta o contêiner dos botões
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  // Monta o item da lista
  li.appendChild(span);
  li.appendChild(buttonContainer);

  tasklist.appendChild(li);
  taskInput.value = ""; // Limpa o campo de entrada
}

// Função para editar uma tarefa
function editTask(button) {
  const li = button.parentElement.parentElement; // Pai do botão é o contêiner; pai do contêiner é o <li>
  const span = li.querySelector("span");
  const newText = prompt("Editar tarefa:", span.textContent);

  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
  } else if (newText === "") {
    alert("O texto da tarefa não pode ser vazio!");
  }
}

// Função para remover uma tarefa
function deleteTask(button) {
  const li = button.parentElement.parentElement; // Pai do botão é o contêiner; pai do contêiner é o <li>
  tasklist.removeChild(li);
}

// Função de perguntar se quer excluir um filme da lista
function deleteTask(button) {
  const li = button.parentElement.parentElement;
  const confirmDelete = confirm("Tem certeza que deseja remover este filme?");
  if (confirmDelete) {
    tasklist.removeChild(li);
  }
}

// Função para salvar no localStorage
function saveTasks() {
  const tasks = [];
  tasklist.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    tasks.push(text);
  });
  localStorage.setItem("filmesAssistidos", JSON.stringify(tasks));
}

// Função para carregar as tarefas salvas
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("filmesAssistidos")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task;

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "button-effect editButton";
    editButton.onclick = () => editTask(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remover";
    deleteButton.className = "button-effect deleteButton";  // Aqui está a classe sendo atribuída
    deleteButton.classList.add("remover-button");  // Adicionando a classe 'remover-button'
    deleteButton.onclick = () => deleteTask(deleteButton);


    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(buttonContainer);
    tasklist.appendChild(li);
  });
}

// Inicializa a lista de tarefas
loadTasks();

// Salva as tarefas ao sair da página
window.addEventListener("beforeunload", saveTasks);