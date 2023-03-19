import {getRecipes as favGetRecipes,addRecipes as favAddRecipes,deleteRecipe as favDeleteRecipes,clearMenu as clearFavorite, deleteRecipe} from "./modules.js"; //renonbrar el archivo con el as


function listFavorite(){
    let listFav = document.getElementById("listafavoritos")
    let recipes = favGetRecipes();
    let ul =document.createElement("ul");
    recipes.forEach(recipe => {
        let buttonEliminar = document.createElement("button");
        buttonEliminar.innerText = "borrar";
        buttonEliminar.addEventListener("click", () => {
            favDeleteRecipes(recipe);
            recipeItem.remove();
        })

        let img = document.createElement("img");
            img.src = recipe.image;

        let recipeItem = document.createElement("li");
          recipeItem.innerText = recipe.name;

          recipeItem.appendChild(img);
          recipeItem.appendChild(buttonEliminar);
          ul.appendChild(recipeItem);
        });
    listFav.appendChild(ul);
}
listFavorite();












 