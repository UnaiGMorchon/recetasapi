

Para crear la página de un restaurante en Javascript que tenga todas estas funcionalidades y utilice la API de edamam, seguiría los siguientes pasos:

1. Investigación y planificación: lo primero que haría sería investigar y planificar detalladamente la estructura de mi proyecto, usando un diagrama de flujo para visualizar la lógica de la aplicación en su conjunto. Además, investigaría la documentación de la API de edamam para asegurarme de que pueda acceder a la información necesaria.

2. Configuración inicial del proyecto: crearía la estructura de mi proyecto, creando carpetas y archivos necesarios para la organización. También inicializaría el control de versiones con Git.

3. Implementación del buscador de platos: crearía una página para el buscador de platos y, usando la API de edamam, implementaría la lógica necesaria para permitir al usuario buscar por nombre y tipo de plato.

4. Implementación del listado de platos: una vez que el usuario realiza una búsqueda en el buscador, los resultados se mostrarían en una lista de platos. Implementaría la lógica necesaria para mostrar la imagen, nombre y tipo de cada plato en la lista.

5. Implementación del detalle de cada plato: en el listado de platos, habría un botón para ver el detalle de cada plato. Una vez que se hace clic en este botón, se mostraría la página de detalle del plato. Implementaría la lógica necesaria para mostrar la imagen, nombre, tipo, ingredientes y enlace a la receta original.

6. Implementación de los botones de navegación: agregaría botones de navegación en cada página para volver al listado de platos, a la página de inicio y a la página del restaurante. También agregaría un botón en la página de inicio para ir directamente a la lista de platos.

7. Implementación de la página del restaurante: crearía otra página que serviría la misma funcionalidad que la página de inicio, pero dentro del contexto de un restaurante.

8. Estilización de la interfaz de usuario: aplicaría estilos para hacer que la aplicación sea fácil de usar e intuitiva.

9. Depuración y pruebas: realizaría pruebas exhaustivas para asegurarme de que la aplicación funcione bien y solucionaría cualquier problema que encuentre.

Aquí está el código en JavaScript para solicitar la información de la API de edamam y obtener los datos relevantes para las funcionalidades requeridas:

```js
const APP_ID = 'your_app_id';
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
```