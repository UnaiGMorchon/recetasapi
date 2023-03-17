import {getRecipes as favGetRecipes,addRecipes as favAddRecipes,deleteRecipe as favDeleteRecipes} from "./modules.js"; //renonbrar el archivo con el as




function crearIcono(simbolo,callback){
  let icono = document.createElement("i");
  icono.classList.add("fa", simbolo);
  icono.addEventListener("click", callback);
  return icono;
}


async function getRecipe(url){
    let recipe = await fetch(url.toString()).then(response => response.json()).then(data => {
console.log(data);
        return {
            name: data.recipe.label,
            image: data.recipe.image,
            yield: data.recipe.yield,
            ingredients: data.recipe.ingredients,
            calories: data.recipe.calories,
            totalTime: data.recipe.totalTime,
            id: data.recipe.uri.split("_")[1],
            cuisineType: data.recipe.cuisineType,
            recipeUrl: data.recipe.uri
          };
        })
        console.log(recipe);
    return recipe;
  }

function createUrl(id) {
    let url = new URL("https://api.edamam.com/api/recipes/v2/" + id);
    url.searchParams.set("type", "public");
    url.searchParams.set("app_id", "11ab28de");
    url.searchParams.set("app_key", "72de25b8688ec8bd852c99398df8e6f6");

    return url;
  }

async function showRecipeOne(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let recipeUrl = createUrl(id); 
    let recipe = await getRecipe(recipeUrl);
    setResults(recipe);   
}



  async function setResults(recipe){
        let recipename = document.createElement("h3");
        // let iconoFavorite = crearIcono("fa-bookmark");
        let iconoFavorite = crearIcono("fa-bookmark-o");
        let recipeimage = document.createElement("img");
        let recipeyield = document.createElement("p");
        let recipeingredients = document.createElement("ul");
        let recipecalories = document.createElement("p");
        let recipetotalTime = document.createElement("p");
        let recipecuisineType = document.createElement("p");
  
        recipename.innerText = recipe.name;
        recipeimage.src = recipe.image;
        iconoFavorite.addEventListener("click",() => favAddRecipes(recipe));
        //recipeyield.innerText = "Yield: " + recipe.yield;
  
        recipe.ingredients.forEach(ingredient => {
              let li = document.createElement("li");
              li.innerText = ingredient.text;
              recipeingredients.appendChild(li);
            });

        recipecalories.innerText = "Calories: " + recipe.calories;
        recipetotalTime.innerText = "Total Time: " + recipe.totalTime;
        recipecuisineType.innerText = "Cuisine Type: " + recipe.cuisineType;
  
        recipeArticle.appendChild(recipename);
        recipeArticle.appendChild(iconoFavorite);
        recipeArticle.appendChild(recipeimage);
        //recipeArticle.appendChild(recipeyield);
        recipeArticle.appendChild(recipecalories);
        recipeArticle.appendChild(recipetotalTime);
        recipeArticle.appendChild(recipecuisineType);
        recipeArticle.appendChild(recipeingredients);
      };
  
      showRecipeOne();
      

