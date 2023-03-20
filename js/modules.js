export function getRecipes(){
let recipes =localStorage.getItem("recipes");
if(recipes === null){
    return [];
}
return JSON.parse(recipes);
}

function saveRecipes(recipes){
    let recipesJSON = JSON.stringify(recipes);
    localStorage.setItem("recipes",recipesJSON);
}


export function addRecipes(recipe){
    let recipes = getRecipes(); 
    if(inList(recipe,recipes) !== -1){// para no meterla dos veces
        return;
    }
    recipes.push(recipe);
    saveRecipes(recipes);
}

function inList(recipe,recipes){
    let index = recipes.findIndex(element => element.name === recipe.name) // findindex ya existe een js no esta creado
            return index;
        }

export function deleteRecipe(recipe){
    let recipes = getRecipes(); // conseguimos las recetas
    let index = inList(recipe,recipes); // busca el indice de la receta
        if(index === -1){
             return;
        }
    recipes.splice(index,1); // saca el indice y borra 1, donde empieza y con los q continua
    saveRecipes(recipes); // y vuelve a salvarlo
}

export function clearMenu(){
    localStorage.clear();
}