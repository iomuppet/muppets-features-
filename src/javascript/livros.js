const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
let totalPages = 0; // Variável para armazenar o número total de páginas
let pagesRead = 0; // Variável para armazenar as páginas lidas

// Função para definir o número de páginas do livro
function addPages() {
  const pagesInput = prompt("Quantas páginas tem esse livro?");
  if (pagesInput !== null && !isNaN(pagesInput) && pagesInput.trim() !== "") {
    totalPages = parseInt(pagesInput.trim());
    alert(`Número de páginas definido: ${totalPages}`);
  } else {
    alert("Por favor, insira um número válido de páginas.");
  }
}

// Função para adicionar uma nova tarefa (livro)
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("O campo de texto está vazio. Por favor, insira um livro!");
    return;
  }

  if (totalPages === 0) {
    alert("Por favor, insira o número de páginas antes de adicionar!");
    return;
  }

  const maxText = taskText.substring(0, 60);
  const li = document.createElement("li");

  // Inicializa o progresso com 0 páginas lidas e a porcentagem de 0%
  const span = document.createElement("span");
  span.textContent = `${maxText} - ${totalPages} páginas - 0% lidas`;

  // Contêiner para os botões
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";

  // Botão Editar
  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.className = "button-effect editButton";
  editButton.onclick = () => editTask(editButton);

  // Botão Progresso
  const progressButton = document.createElement("button");
  progressButton.textContent = "Progresso";
  progressButton.className = "progress-button";
  progressButton.onclick = () => updateProgress(progressButton);

  // Botão Remover
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remover";
  deleteButton.className = "remover-button deleteButton";
  deleteButton.onclick = () => deleteTask(deleteButton);

  // Adiciona os botões ao contêiner
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(progressButton);
  buttonContainer.appendChild(deleteButton);

  // Monta o item da lista
  li.appendChild(span);
  li.appendChild(buttonContainer);

  tasklist.appendChild(li);
  taskInput.value = "";
  totalPages = 0;
  pagesRead = 0;
  saveTasks();
}

// Função para editar uma tarefa
function editTask(button) {
  const li = button.parentElement.parentElement;
  const span = li.querySelector("span");
  const parts = span.textContent.split(" - ");
  const newText = prompt("Editar título do livro:", parts[0]);
  const newPages = prompt("Editar número de páginas:", parts[1].replace(" páginas", ""));

  if (newText && newPages && !isNaN(newPages)) {
    span.textContent = `${newText.trim()} - ${newPages.trim()} páginas - ${parts[2]}`;
    saveTasks();
  } else {
    alert("Valores inválidos! Verifique os dados inseridos.");
  }
}

// Função para atualizar o progresso da leitura
function updateProgress(button) {
    const li = button.parentElement.parentElement;
    const span = li.querySelector("span");
    const parts = span.textContent.split(" - ");
    const totalPages = parseInt(parts[1]);
    const currentProgress = parseInt(parts[2].replace("% lidas", ""));
  
    const newProgress = prompt(`Quantas páginas você já leu de ${totalPages}?`, currentProgress);
  
    if (newProgress !== null && !isNaN(newProgress) && newProgress >= 0 && newProgress <= totalPages) {
      // Calculando a porcentagem e arredondando para o inteiro mais próximo
      const progressPercentage = Math.round((newProgress / totalPages) * 100); // Arredonda a porcentagem
      span.textContent = `${parts[0]} - ${totalPages} páginas - ${progressPercentage}% lidas`;
      saveTasks();
    } else {
      alert("Por favor, insira um número válido dentro do total de páginas.");
    }
  }
  

// Função para remover uma tarefa
function deleteTask(button) {
  const li = button.parentElement.parentElement;
  const confirmDelete = confirm("Tem certeza que deseja remover este livro?");
  if (confirmDelete) {
    tasklist.removeChild(li);
    saveTasks();
  }
}

// Função para salvar no localStorage
function saveTasks() {
  const tasks = [];
  tasklist.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    tasks.push(text);
  });
  localStorage.setItem("livrosLidos", JSON.stringify(tasks));
}

// Função para carregar as tarefas salvas
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("livrosLidos")) || [];
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

    const progressButton = document.createElement("button");
    progressButton.textContent = "Progresso";
    progressButton.className = "progress-button";
    progressButton.onclick = () => updateProgress(progressButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remover";
    deleteButton.className = "remover-button deleteButton";
    deleteButton.onclick = () => deleteTask(deleteButton);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(progressButton);
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
