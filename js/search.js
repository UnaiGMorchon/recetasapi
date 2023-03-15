
document.getElementById("buscadorpalabra").addEventListener("keyup",searchPalabra); // reconoce las teclas del teclado

function searchPalabra()
{
    let text = document.getElementById("buscadorpalabra").value.toLowerCase();
    console.log(text);
    let titulos = section.querySelectorAll("article > h3"); // hijos directos de article
    titulos = [...titulos]; // titulos = array.from[titulo];
    console.log(titulos);
    let titulosFiltrados = titulos.filter(titulo => !titulo.innerText.toLowerCase().includes(text));  //titulo.includes(text) los que no incluyan text que seran los que ocultamos
    
    titulos.forEach(titulo =>{
        let article = titulo.parentElement;
        article.style.display= "block"; // vuelve a aparecer lo que has quitado
    })

}