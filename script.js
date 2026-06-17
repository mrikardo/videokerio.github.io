let musicas = [];

// Carrega o JSON
fetch("musicas.json")
.then(response => response.json())
.then(data => {

    musicas = data;

    document.getElementById("contador").innerHTML =
        `${musicas.length} músicas cadastradas`;

})
.catch(error => {

    console.error("Erro ao carregar musicas.json", error);

    document.getElementById("contador").innerHTML =
        "Erro ao carregar catálogo";

});


// Evento da busca
document
.getElementById("busca")
.addEventListener("input", pesquisar);


// Função principal
function pesquisar(){

    const texto =
    document
    .getElementById("busca")
    .value
    .toLowerCase()
    .trim();

    const resultado =
    document
    .getElementById("resultado");

    resultado.innerHTML = "";

    if(texto.length < 1){
        return;
    }

    const encontrados = musicas.filter(m =>

        m.codigo.toString().includes(texto)

        ||

        m.musica.toLowerCase().includes(texto)

        ||

        m.artista.toLowerCase().includes(texto)

    ).slice(0,100);


    if(encontrados.length === 0){

        resultado.innerHTML = `
        <div class="card">
            <h3>Nenhuma música encontrada</h3>
        </div>
        `;

        return;
    }


    encontrados.forEach(m => {

        resultado.innerHTML += `

        <div class="card">

            <div class="codigo">
                ${m.codigo}
            </div>

            <h3>
                ${m.musica}
            </h3>

            <div class="artista">
                ${m.artista}
            </div>

            <div class="genero">
                ${m.genero || ""}
            </div>

            <div class="favorito">
                🤍
            </div>

        </div>

        `;

    });

}