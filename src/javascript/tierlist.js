"use strict";

// ---------- ELEMENTS ----------

let queuedImagesArray = [],
  storageForm = document.querySelector(".storage"),
  storageDiv = document.querySelector(".storage-box"),
  inputDiv = document.querySelector(".upload"),
  input = document.querySelector(".upload input");

const colors = [
    "#FF7F7F",
    "#FFBF7F",
    "#FFDF7F",
    "#BFFF7F",
    "#7FFF7F",
    "#7FBFFF",
    "#7F7FFF"
  ],
  rows = document.querySelectorAll(".content__row");

// ---------- CARD/IMAGE LOGIC ----------

const onDragStart = (event) => {
  event.dataTransfer.setData("id", event.target.parentNode.id);

  setTimeout(() => {
    event.target.style.visibility = "hidden";
  }, 100);
};

const onDragEnd = (event) => {
  event.target.style.visibility = "visible";
};

// ---------- IMPORTING AND UPDATING IMAGES ----------

const displayQueuedImages = () => {
  let images = "";
  queuedImagesArray.forEach((image, index) => {
    images += `
        <div class="content__image" onclick="deleteImage(event)"
         draggable="true" id="${
           image.id
         }"ondragstart="onDragStart(event)" ondragend="onDragEnd(event)">
            <img width='100' height='100' style="pointerEvents:none;"src="${URL.createObjectURL(
              image
            )}"alt="image"/>
         </div>
        `;
  });

  storageDiv.innerHTML = images;
};

const deleteImage = (event) => {
  event.target.parentNode.remove();
};

input.addEventListener("change", () => {
  const files = input.files;
  for (let index = 0; index < files.length; index++) {
    const id = Date.now() + "" + index;
    files[index].id = id;
    queuedImagesArray.push(files[index]);
  }

  storageForm.reset(); // UpdateForm
  displayQueuedImages(); //Add new image
});

inputDiv.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    if (!files[i].type.match("image")) return;
    if (queuedImagesArray.every((image) => image.name !== files[i].name))
      queuedImagesArray.push(files[i]);
  }

  displayQueuedImages();
});

// ---------- ROW LOGIC ----------

const onDragOver = (event) => {
  event.preventDefault();
};

const onDrop = (event) => {
  event.preventDefault();

  const draggedCardId = event.dataTransfer.getData("id", event.target.id);
  const draggedCard = document.getElementById(draggedCardId);
  event.target.appendChild(draggedCard);
  queuedImagesArray.splice(draggedCard, 1);
};

rows.forEach((row, index) => {
  const label = row.querySelector(".content__row-label");
  label.style.backgroundColor = colors[index];
  row.ondragover = onDragOver;
  row.ondrop = onDrop;
});

document.addEventListener("DOMContentLoaded", function () {
    // Adiciona evento de clique no botão
    document.getElementById("captureBtn").addEventListener("click", () => {
        console.log("Botão clicado! Tentando capturar a tela...");

        // Captura apenas a section com o ID "section--1"
        html2canvas(document.querySelector("#section--1")).then((canvas) => {
            console.log("Captura realizada com sucesso!");

            // Cria um link para download
            let link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "tierlist.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});
