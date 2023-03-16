import {getRecipes as favGetRecipes,addRecipes as favAddRecipes,deleteRecipe as favDeleteRecipes,clearMenu as clearFavorite} from "./modules.js"; //renonbrar el archivo con el as


function listFavorite(){
    let listFav = document.getElementById("listafavoritos")
    let recipes = favGetRecipes();
    let ul =document.createElement("ul");
    recipes.forEach(recipe => {
        let img = document.createElement("img");
            img.src = recipe.image;

          let recipeItem = document.createElement("li");
          recipeItem.innerText = recipe.name;

          recipeItem.appendChild(img);
          ul.appendChild(recipeItem);
        });
    listFav.appendChild(ul);
}


listFavorite();



function clearFavoriteList(event){
    let element = event.target;
    let parent = element.parentElement;
    let text = parent.getElementsByTagName("ul")[0];
    if (confirm("¿deseas borrar este elemento? \n" + text)) {
      parent.remove();
    }
  }






  

 