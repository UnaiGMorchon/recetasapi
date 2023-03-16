function createUrl() {
  let url = new URL("https://api.edamam.com/api/recipes/v2");
  url.searchParams.set("type", "public");
  url.searchParams.set("q", "Eatingwell, Martha Stewart");
  url.searchParams.set("app_id", "11ab28de")
  url.searchParams.set("app_key", "72de25b8688ec8bd852c99398df8e6f6")
 /*  url.searchParams.append("dishType", "Biscuits and cookies");
  url.searchParams.append("dishType", "Desserts");
  url.searchParams.append("dishType", "Sweets"); */
  url.searchParams.append("field", "image");
  url.searchParams.append("field", "label");
  url.searchParams.append("field", "yield");
  url.searchParams.append("field", "ingredients");
  url.searchParams.append("field", "calories");
  url.searchParams.append("field", "totalTime");
  url.searchParams.append("field", "cuisineType");
  url.searchParams.append("field", "uri");
  let text = document.getElementById("Buscar").value.trim();
  url.searchParams.append("dishType", text); // lo q saque del selecc

  return url.toString();
}

async function getRecipes() {
  let url = createUrl();
  let recipes = await fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.hits.map(hit => {
        return {
          image: hit.recipe.image,
          name: hit.recipe.label,
          yield: hit.recipe.yield,
          ingredients: hit.recipe.ingredients,
          calories: hit.recipe.calories,
          totalTime: hit.recipe.totalTime,
          id: hit.recipe.uri.split("_")[1],
          cuisineType: hit.recipe.cuisineType
          
        }
      });
    
    });

  return recipes;

}

async function setResults(){
  let recipes = await getRecipes();
  let recipeList = document.getElementById("recipeList");
      recipeList.innerHTML = "";
  
    recipes.forEach(recipe => {
      let recipeArticle = document.createElement("article");
      recipeArticle.style.display ="none";
      /* // let iconoFavorite = crearIcono("fa-bookmark");
     let iconoFavorite = crearIcono("fa-bookmark-o"); */
      let image = document.createElement("img");
      image.onload =function (){
        recipeArticle.style.display = "block";
      }
      let name = document.createElement("h3");
      let yield = document.createElement("p");
      let ingredients = document.createElement("ul");
      let calories = document.createElement("p");
      let totalTime = document.createElement("p");
      let cuisineType = document.createElement("p");
      let recipeUrl = document.createElement("a");

      name.innerText = recipe.name;
      image.src = recipe.image;
      yield.innerText = "Yield: " + recipe.yield;

          recipe.ingredients.forEach(ingredient => {
            let li = document.createElement("li");
            li.innerText = ingredient.text;
            ingredients.appendChild(li);
          });

        
      recipeUrl.href = "recetacard.html?id=" + recipe.id;

      /* ingredients.innerText = "Ingredients: " + recipe.ingredients; */
      calories.innerText = "Calories: " + recipe.calories;
      totalTime.innerText = "Total Time: " + recipe.totalTime;
      cuisineType.innerText = "Cuisine Type: " + recipe.cuisineType;

    
      recipeUrl.appendChild(image);
     //  recipeArticle.appendChild(iconoFavorite);
      recipeArticle.appendChild(name);
      recipeArticle.appendChild(recipeUrl);
      recipeArticle.appendChild(yield);
      recipeArticle.appendChild(ingredients);
      recipeArticle.appendChild(calories);
      recipeArticle.appendChild(totalTime);
      recipeArticle.appendChild(cuisineType);
      recipeList.appendChild(recipeArticle);
      
    });

}

/* function crearIcono(simbolo,callback){
  let icono = document.createElement("i");
  icono.classList.add("fa", simbolo);
  icono.addEventListener("click", callback);
  return icono;
}
 */


















/* function addToFavorites(event) {
  document.querySelector(".fa-bookmark-o").addEventListener("click", function(event) {
  sessionStorage.setItem("fa-bookmark-o", iconoFavorite); 
});

}
 */
/* 
function addToFavorites() {
  let recipeId = this.dataset.recipeId; // Obtener el ID de la receta desde el atributo "data-recipe-id" del icono
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Obtener la lista de favoritos del almacenamiento local o crear una nueva lista si no existe
  if (!favorites.includes(recipeId)) { // Si la receta aún no está en la lista de favoritos, agregarla
    favorites.push(recipeId);
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Guardar la lista de favoritos actualizada en el almacenamiento local
  }
}
let iconoFavorite = crearIcono("fa-bookmark-o", addToFavorites); // Crear el icono con la clase "fa-bookmark-o" y agregar el listener al hacer clic
iconoFavorite.dataset.recipeId = recipe.id; // Guardar el ID de la receta en el atributo "data-recipe-id" del icono
// Este código utiliza el método localStorage para guardar la lista de favoritos en el navegador del usuario. Al hacer clic en el icono, se obtiene el ID de la receta desde un atributo personalizado data-recipe-id del icono y se agrega a la lista de favoritos en el almacenamiento local si aún no está allí.

 */


document.getElementById("Buscar").addEventListener("change", setResults); // elemento que hace la llamada


