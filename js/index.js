function createUrl() {
  let url = new URL("https://api.edamam.com/api/recipes/v2");
  url.searchParams.set("type", "public");
  url.searchParams.set("q", "Eatingwell, Martha Stewart");
  url.searchParams.set("app_id", "11ab28de")
  url.searchParams.set("app_key", "72de25b8688ec8bd852c99398df8e6f6")
 /*  url.searchParams.append("dishType", "Biscuits and cookies");
  url.searchParams.append("dishType", "Desserts");
  url.searchParams.append("dishType", "Sweets"); */
  url.searchParams.append("field", "label");
  url.searchParams.append("field", "image");
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
          name: hit.recipe.label,
          image: hit.recipe.image,
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
      let name = document.createElement("h3");
      let image = document.createElement("img");
      image.onload =function (){
        recipeArticle.style.display = "block";
      }
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

      recipeArticle.appendChild(name);
      recipeUrl.appendChild(image);
      recipeArticle.appendChild(recipeUrl);
      recipeArticle.appendChild(yield);
      recipeArticle.appendChild(ingredients);
      recipeArticle.appendChild(calories);
      recipeArticle.appendChild(totalTime);
      recipeArticle.appendChild(cuisineType);
      recipeList.appendChild(recipeArticle);
      
    });

}

document.getElementById("Buscar").addEventListener("change", setResults); // elemento qu e hace la llamada


