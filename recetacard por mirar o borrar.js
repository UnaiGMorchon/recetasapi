function createUrl() {
    let url = new URL("https://api.edamam.com/api/recipes/v2/" + id);
    url.searchParams.set("type", "public");
    url.searchParams.set("app_id", "11ab28de");
    url.searchParams.set("app_key", "72de25b8688ec8bd852c99398df8e6f6");

    return url.toString();
  }

async function showRecipeOne(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
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
            cuisineType: hit.recipe.cuisineType,
            recipeUrl: hit.recipe.uri
          }
        });
      
      });
  
    return recipes;
  }
  

  
  