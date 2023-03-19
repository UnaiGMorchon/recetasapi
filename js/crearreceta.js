let boton = document.getElementById("guardar");
boton.addEventListener("click", guardarElemento);

function guardarElemento() {
  let text = document.getElementById("input").value.trim();
  let textToCheck = text.replace(/\s/g, "");
  if (textToCheck < 2) {
    return;
  }
  if (alreadyExist(text)) {
    return;
  }
  let li = document.createElement("li");
  let icono = document.createElement("i");
  icono.classList.add("fa", "fa-trash");
  li.innerText = text;
  li.appendChild(icono);
  li.addEventListener("click", clickImportant);
  document.getElementById("lista").appendChild(li);
  document.getElementById("input").value = "";
}
function clickImportant(event) {
 
  let element = event.target;
  if (element.classList.contains("fa-trash")) {
    deleteParent(element);
    return;
  }
  toggleImportant(event.target);
}

function toggleImportant(element) {
  element.classList.toggle("important");
}

function deleteParent(element) {
  let parent = element.parentElement;
  let text = parent.innerText;
  if (confirm("¿deseas borrar este elemento? \n" + text)) {
    parent.remove();
  }
}

function alreadyExist(text) {
  let lista = document.getElementById("lista");
  let elementosLista = lista.getElementsByTagName("li");
  for (let i = 0; i < elementosLista.length; i++) {
    if (text === elementosLista[i].innerText) {
      return true;
    }
  }
  return false;
}










// apartir de aqui son funciones
function createRecipeEvent(event) {
  event.preventDefault();
  let titulo = document.getElementById("titulo").value.trim(); 
  let contenido = document.getElementById("contenido").value.trim();
  createRecipe (titulo,contenido);
 
  document.getElementById("recetaForm").reset();
}

function createRecipe(titulo,contenido){
      let h3 = document.createElement("h3");
      let p = document.createElement("p");
      let article = document.createElement("article");
      
      let iconoEditar = crearIcono ("fa-pencil", upDateRecipe);
     
      let iconoBorrar = crearIcono("fa-trash",deleteRecipe);
      h3.innerText = titulo;
      p.innerText = contenido;
      article.appendChild(h3);
      article.appendChild(p);
      article.appendChild(iconoEditar);
      article.appendChild(iconoBorrar);
      nuevosReceta.insertBefore(article, nuevosReceta.children[1]);
      
}




function crearIcono(simbolo,callback){
  let icono = document.createElement("i");
  icono.classList.add("fa", simbolo);
  icono.addEventListener("click", callback);
  return icono;
}

function deleteRecipe(event){
  let element = event.target;
  let parent = element.parentElement;

  let text = parent.getElementsByTagName("h3")[0].innerText;
  if (confirm("¿deseas borrar este elemento? \n" + text)) {
    parent.remove();
  }
}

function saveRecipe(event){
  let element = event.target;
  let parent = element.parentElement; 
  let titulo = parent.getElementsByTagName("input")[0].value;
  let contenido = parent.getElementsByTagName("textarea")[0].value;
  let h3 = document.createElement("h3");
  let p = document.createElement("p");

  h3.innerText = titulo;
  p.innerText = contenido;
  parent.appendChild(h3);
  parent.appendChild(p);

  parent.getElementsByTagName("input")[0].remove();
  parent.getElementsByTagName("textarea")[0].remove();
  element.remove();

  let iconoEditar = crearIcono("fa-pencil",upDateRecipe);
  let iconoBorrar = crearIcono("fa-trash",deleteRecipe);
  parent.appendChild(iconoBorrar);
  parent.appendChild(iconoEditar);
  parent.querySelector(".fa-close").remove();

  let breaks = parent.getElementsByTagName("br");
  breaks = [...breaks];
  breaks.forEach(element => {
    element.remove();
  });

}


function cancelEdit(event,textoTitulo,textoParrafo){
  let element = event.target;
  let parent = element.parentElement; 
  let titulo = document.createElement("h3");
  let parrafo = document.createElement("p");
  titulo.innerText = textoTitulo;
  parrafo.innerText = textoParrafo;
  parent.appendChild(titulo);
  parent.appendChild(parrafo);
  parent.getElementsByTagName("input")[0].remove();
  parent.getElementsByTagName("textarea")[0].remove();
 
  element.remove();
  parent.querySelector(".fa-paper-plane-o").remove();

  let iconoEditar = crearIcono("fa-pencil",upDateRecipe);
  let iconoBorrar = crearIcono("fa-trash",deleteRecipe);
  parent.appendChild(iconoBorrar);
  parent.appendChild(iconoEditar);

  let breaks = parent.getElementsByTagName("br");
  breaks = [...breaks]; 
  breaks.forEach(element => {
    element.remove();
  });
}

//update

    function upDateRecipe (event){

    let element = event.target; 
     let parent = element.parentElement; 
   
    let titulo = parent.getElementsByTagName("h3")[0].innerText; 
    let texto = parent.getElementsByTagName("p")[0].innerText; 
   
    let inputTitulo = document.createElement("input"); 
    let textArea = document.createElement("textarea"); 
    let br = document.createElement("br"); 

  
    

  let iconoCancelar = crearIcono("fa-close", function(event){
    cancelEdit(event,titulo,texto);
  })
  let iconoGuardar = crearIcono("fa-paper-plane-o", saveRecipe);
  
   
    inputTitulo.setAttribute("type", "text"); 
    inputTitulo.value = titulo; 
    textArea.value = texto;
    parent.appendChild(inputTitulo); 
    parent.appendChild(br);
    parent.appendChild(textArea);
    parent.appendChild(iconoCancelar);
    parent.appendChild(iconoGuardar);


    
  
    let titulo1 = parent.getElementsByTagName("h3")[0];
    titulo1.remove();
    parent.getElementsByTagName("p")[0].remove();
    element.remove();
    parent.querySelector(".fa-trash").remove();
    
  }



  ///apartir de aqui es ejecucion
let form = document.getElementById("recetaForm");
form.addEventListener("submit",createRecipeEvent);
