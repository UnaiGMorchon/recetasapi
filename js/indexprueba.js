document.getElementById("track").addEventListener("click", search);
document.getElementById("artist").addEventListener("click", search);
document.getElementById("album").addEventListener("click", search);

function search(event) {
  let text = document.getElementById("Buscar").value.trim();
  if (text === "") return;
  let textEncoded = encodeURIComponent(text);
  let boton = event.target;
  let type = boton.id;

  fetch(`https://api.spotify.com/v1/search?q=${textEncoded}&type=${type}&`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      borrarLista();
      if (type === "track") {
        let items = data.tracks.items;
        showTracks(items);
      } else if (type === "artist") {
        let items = data.artists.items;
        showArtists(items);
      } else if (type === "album") {
        let items = data.albums.items;
        showAlbums(items);
      }
    })
    .catch((error) => console.error(error));
}





function showTracks(tracks) {
  tracks.forEach((element) => {
    console.log(`${element.name} / ${element.album.name}`);
    mostrarElementoTrack(element);
  });
}

function showArtists(artists) {
  artists.forEach((element) => {
    console.log(`${element.name}`);
    mostrarElementoArtista(element);
  });
}

function showAlbums(album) {
  album.forEach((element) => {
    console.log(`${element.name}`);
    mostrarElementoAlbum(element);
  });
}

function borrarLista() {
  let miDiv = document.getElementById("miLista");
  miDiv.innerHTML = "";
}

function mostrarElementoArtista(elemento) {
  // Obtenemos la lista del HTML y la asignamos a una variable
  let lista = document.getElementById("miLista");
  // Creamos un elemento <li> y le asignamos el texto pasado como argumento
  let nuevoElemento = document.createElement("li");
  let link = document.createElement("a");

  link.setAttribute("href", "artist.html?id=" + elemento.id);

  link.textContent = elemento.name;
  nuevoElemento.appendChild(link);

  // Agregamos el nuevo elemento a la lista
  lista.appendChild(nuevoElemento);

  //Creamos icono fav
  /* let iconoEstrella = document.createElement("i");
  iconoEstrella.classList.add("fa", "fa-heart");
  nuevoElemento.appendChild(iconoEstrella); */

  // Agregamos el nuevo elemento a la lista
  lista.appendChild(nuevoElemento);
}

function mostrarElementoAlbum(elemento) {
  // Obtenemos la lista del HTML y la asignamos a una variable
  let lista = document.getElementById("miLista");
  // Creamos un elemento <li> y le asignamos el texto pasado como argumento
  let nuevoElemento = document.createElement("li");
  let link = document.createElement("a");

  link.setAttribute("href", "album.html?id=" + elemento.id);

  link.textContent = elemento.name;
  nuevoElemento.appendChild(link);

  // Agregamos el nuevo elemento a la lista
  lista.appendChild(nuevoElemento);

  //Creamos icono fav
  /* let iconoEstrella = document.createElement("i");
  iconoEstrella.classList.add("fa", "fa-heart");
  nuevoElemento.appendChild(iconoEstrella); */

  // Agregamos el nuevo elemento a la lista
  lista.appendChild(nuevoElemento);
}

function mostrarElementoTrack(elemento) {
  // Obtenemos la lista del HTML y la asignamos a una variable
  let lista = document.getElementById("miLista");
  // Creamos un elemento <li> y le asignamos el texto pasado como argumento
  let nuevoElemento = document.createElement("li");
  let link = document.createElement("a");

  link.setAttribute("href", "track.html?id=" + elemento.id);

  link.textContent = elemento.name;
  nuevoElemento.appendChild(link);

  // Agregamos el nuevo elemento a la lista
  lista.appendChild(nuevoElemento);

  //Creamos icono fav
  /* let iconoEstrella = document.createElement("i");
  iconoEstrella.classList.add("fa", "fa-heart");
  nuevoElemento.appendChild(iconoEstrella); */

  // Agregamos el nuevo elemento a la lista
  lista.appendChild(nuevoElemento);
}

function listaFavoritos() {
  // Obtener el elemento de lista que queremos
  let lista = document.getElementById("miLista");

  // Crear un botón de favoritos y agregarlo a cada elemento de la lista
  let elementos = lista.getElementsByTagName("li");
  for (let i = 0; i < elementos.length; i++) {
    let botonFavoritos = document.createElement("button");
    let iconoEstrella = document.createElement("i");
    botonFavoritos.appendChild(iconoEstrella);
    elementos[i].appendChild(botonFavoritos);

    // Agregar un manejador de eventos al botón de favoritos
    botonFavoritos.addEventListener("click", () => {
      addFavorito;
    });
  }
}

function getFavoritos() {
  let favoritos = localStorage.getItem("Favoritos");
  if (favoritos == null) {
    favoritos = [];
  } else {
    favoritos = JSON.parse(favoritos);
  }
  return favoritos;
}

function addFavorito(nombre) {
  let favoritos = getFavoritos();
  if (favoritos.includes(nombre)) {
    return;
  }
  favoritos.push(nombre);
  let favoritosString = JSON.stringify(favoritos);
  localStorage.setItem("Favoritos", favoritosString);
}

/* // Función para agregar elementos a favoritos (ya definida anteriormente)
function agregarAFavoritos(elemento) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (favoritos.some(item => item.id === elemento.id)) {
    console.log('El elemento ya está en favoritos.');
    return;
  }
  favoritos.push(elemento);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  console.log('El elemento ha sido agregado a favoritos.');
}
// Obtenemos el elemento guardado en el local storage
const elementoDesdeLocalStorage = localStorage.getItem('Articulo añadido a favoritos');
// Convertimos el elemento de texto a su formato original
const elementoEnFormatoOriginal = JSON.parse(elementoDesdeLocalStorage);
console.log(elementoEnFormatoOriginal); // 'elemento2'
























/* const APP_ID = 'your_app_id';
const APP_KEY = 'your_app_key';
const API_URL = 'https://api.edamam.com/api/recipes/v2';

function searchRecipes(query, mealType) {
  const url = `${API_URL}?type=public&q=${query}&mealType=${mealType}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const recipes = data.hits.map(hit => hit.recipe);
      return recipes;
    });
}

function getRecipe(id) {
  const url = `${API_URL}/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.recipe);
}






function crearPost(event) {
  event.preventDefault();
  let articulo = document.createElement("article");// creamos un articulo para unificar h2 y p en un mismo blog
  articulo.classList.add("article");
  //TITULO
  let titulo = document.getElementById("titulo").value.trim(); 
  let tituloToCheck = titulo.replace(/\s/g,"");
  if (tituloToCheck.length <2){
      return;
  }
  if (alreadyExists(titulo)){
      return;
  } 
  let h2 = document.createElement("h2");
  h2.innerText = titulo; 
  articulo.appendChild(h2);//Llamas para que te lo guarde en articulo en lugar de sección
  document.getElementById("titulo").value = " ";
















/* 
let categoriesDesserts ={
    "Biscuits": "Biscuits and cookies",
    "Desserts": "Desserts",
    "Sweets": "Sweets"
}


let url = creatBaseUrl();
url.searchParams.set("type", "public")
url.searchParams.set("q", "Eatingwell, Martha Stewart")
url.searchParams.set("app_id", "11ab28de")
url.searchParams.set("app_key", "72de25b8688ec8bd852c99398df8e6f6")
url.searchParams.set("dishType", "Desserts")
url.searchParams.append("field", "label")
url.searchParams.append("field", "images")
url.searchParams.append("field", "ingredientLines")
url.searchParams.append("field", "ingredients")
url.searchParams.append("field", "calories")
url.searchParams.append("field", "totalTime")

let url2 =creatBaseUrl();
url2.searchParams.set("type", "public")
url2.searchParams.set("q", "Eatingwell, Martha Stewart")
console.log(url.toString())

function creatBaseUrl(){
  let url= new URL("https://api.edamam.com/api/recipes/v2")
  url.searchParams.set("app_id", "11ab28de")
  url.searchParams.set("app_key","72de25b8688ec8bd852c99398df8e6f6")
  return url;

}

async function getRecipes(url){
  let recipes = await fetch(url.toString()).then(response => response.json()).then (data => {
      let recipes = data.hits.map(recipe => {
        return{
          name: recipe.recipe.label,
          image: recipe.recipe.image,
          url: recipe.recipe.url,
          ingredients: recipe.recipe.ingredients,
          };
        });
    console.log(recipes);
    return recipes;
  }) 
  console.log(recipes);
}





let recipies =[]

function recipiesdessert(){
  fetch("https://api.edamam.com/api/recipes/v2?type=public&q=Eatingwell%2C%20Martha%20Stewart&app_id=11ab28de&app_key=72de25b8688ec8bd852c99398df8e6f6&dishType=Biscuits%20and%20cookies&dishType=Desserts&dishType=Sweets&field=label&field=image&field=images&field=source&field=url&field=shareAs&field=yield&field=dietLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=tags")
      .then(response => response.json())
      .then(data => {
        recipies.push(data.results); // metemos las recetas en recipies con push
        console.log(recipies);
      });
  }
 


  let url = creatBaseUrl();
  url.searchParams.set("type", "public")
  url.searchParams.set("q", "Eatingwell, Martha Stewart")
  url.searchParams.set("app_id", "11ab28de")
  url.searchParams.set("app_key", "72de25b8688ec8bd852c99398df8e6f6")
  url.searchParams.set("dishType", "Desserts")
  url.searchParams.append("field", "label")
  url.searchParams.append("field", "images")
  url.searchParams.append("field", "ingredientLines")
  url.searchParams.append("field", "ingredients")
  url.searchParams.append("field", "calories")
  url.searchParams.append("field", "totalTime")
  
  let url2 =creatBaseUrl();
  url2.searchParams.set("type", "public")
  url2.searchParams.set("q", "Eatingwell, Martha Stewart")
  console.log(url.toString())
  
  function creatBaseUrl(){
    let url= new URL("https://api.edamam.com/api/recipes/v2")
    url.searchParams.set("app_id", "11ab28de")
    url.searchParams.set("app_key","72de25b8688ec8bd852c99398df8e6f6")
    return url;
  }
  
  async function getRecipes(url){
    creatBaseUrl();
    let recipes = await fetch(url.toString()).then(response => response.json()).then (data => {
        let recipes = data.hits.map(recipe => {
          return{
            name: recipe.recipe.label,
            image: recipe.recipe.image,
            url: recipe.recipe.url,
            ingredients: recipe.recipe.ingredients,
            };
          });
      return recipes;
    }) 
    console.log(recipes);
  }
   */ */