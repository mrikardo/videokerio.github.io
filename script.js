let musicas = [];

let resultados = [];

let paginaAtual = 1;

const itensPorPagina = 20;

let favoritos =
JSON.parse(
    localStorage.getItem("favoritos")
) || [];


/* ==========================
   CARREGA CATÁLOGO
========================== */

fetch("musicas.json")
.then(response => response.json())
.then(data => {

    musicas = data;

    document.getElementById("contador").innerHTML =
`${musicas.length} músicas cadastradas`;
    resultados = [...musicas];

    ordenarResultados();

    atualizarBotaoFavoritos();

    renderizar();

})
.catch(error => {

    console.error(error);

    document.getElementById("contador").innerHTML =
        "Erro ao carregar catálogo";

});


/* ==========================
   EVENTO BUSCA
========================== */

document
.getElementById("busca")
.addEventListener("input", pesquisar);


/* ==========================
   ORDENAÇÃO
========================== */

function ordenarResultados(){

    resultados.sort((a,b)=>

        a.musica.localeCompare(
            b.musica,
            "pt-BR",
            {
                sensitivity:"base"
            }
        )

    );

}


/* ==========================
   PESQUISA
========================== */

function pesquisar(){

    const texto =
    document
    .getElementById("busca")
    .value
    .toLowerCase()
    .trim();

    if(texto === ""){

        mostrarTodas();

        return;
    }

    resultados = musicas.filter(m =>

        m.codigo.toString().includes(texto)

        ||

        m.musica.toLowerCase().includes(texto)

        ||

        m.artista.toLowerCase().includes(texto)

    );

    paginaAtual = 1;

    renderizar();

}


/* ==========================
   BOTÃO FAVORITOS
========================== */

function atualizarBotaoFavoritos(){

    const botao =
    document.querySelector(
        '.categoria[onclick="mostrarFavoritos()"]'
    );

    if(botao){

        botao.innerHTML =
        `❤️ FAVORITOS (${favoritos.length})`;

    }

}


/* ==========================
   RENDERIZA RESULTADOS
========================== */

function renderizar(){

    const resultado =
    document.getElementById("resultado");

    resultado.innerHTML = "";

    const inicio =
    (paginaAtual - 1) * itensPorPagina;

    const fim =
    inicio + itensPorPagina;

    const pagina =
    resultados.slice(inicio, fim);

    pagina.forEach(m => {

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

            <div
                class="favorito"
                onclick="favoritar('${m.codigo}')">

                ${
                    favoritos.includes(
                        m.codigo.toString()
                    )
                    ? "❤️"
                    : "🤍"
                }

            </div>

        </div>

        `;

    });

    atualizarPagina();

    atualizarResultadosEncontrados();

}


/* ==========================
   RESULTADOS ENCONTRADOS
========================== */

function atualizarResultadosEncontrados(){

    const info =
    document.getElementById(
        "resultadosEncontrados"
    );

    if(!info) return;

    const textoBusca =
    document
    .getElementById("busca")
    .value
    .trim();

    if(textoBusca === ""){

        info.innerHTML = "";

    }else{

        info.innerHTML =
        `${resultados.length} resultado(s) encontrado(s)`;

    }

}


/* ==========================
   PAGINAÇÃO
========================== */

function atualizarPagina(){

    const totalPaginas = Math.max(
        1,
        Math.ceil(
            resultados.length /
            itensPorPagina
        )
    );

    document.getElementById(
        "paginaAtual"
    ).innerHTML =
    `${paginaAtual} de ${totalPaginas}`;

}


function proximaPagina(){

    const totalPaginas =
    Math.ceil(
        resultados.length /
        itensPorPagina
    );

    if(paginaAtual < totalPaginas){

        paginaAtual++;

        renderizar();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

}


function paginaAnterior(){

    if(paginaAtual > 1){

        paginaAtual--;

        renderizar();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

}


/* ==========================
   FAVORITOS
========================== */

function favoritar(codigo){

    codigo = codigo.toString();

    const indice =
    favoritos.indexOf(codigo);

    if(indice === -1){

        favoritos.push(codigo);

    }else{

        favoritos.splice(indice,1);

    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    atualizarBotaoFavoritos();

    renderizar();

}


function mostrarFavoritos(){

    document
    .querySelectorAll(".categoria")
    .forEach(btn =>
        btn.classList.remove("ativa")
    );

    const btnFavoritos =
    document.querySelector(
        '.categoria[onclick="mostrarFavoritos()"]'
    );

    if(btnFavoritos){

        btnFavoritos.classList.add("ativa");

    }

    resultados = musicas.filter(m =>

        favoritos.includes(
            m.codigo.toString()
        )

    );

    ordenarResultados();

    paginaAtual = 1;

    renderizar();

}


function mostrarTodas(){

    document
    .querySelectorAll(".categoria")
    .forEach(btn =>
        btn.classList.remove("ativa")
    );

    const btnTodas =
    document.querySelector(
        '.categoria[onclick="mostrarTodas()"]'
    );

    if(btnTodas){

        btnTodas.classList.add("ativa");

    }

    resultados = [...musicas];

    ordenarResultados();

    paginaAtual = 1;

    renderizar();

}
function limparCategorias(){

document
.querySelectorAll(".categoria")
.forEach(btn =>
    btn.classList.remove("ativa")
);

}

function mostrarFavoritos(){

limparCategorias();

const btn = document.getElementById("btnFavoritos");

if(btn){
    btn.classList.add("ativa");
}

resultados = musicas.filter(m =>
    favoritos.includes(m.codigo.toString())
);

ordenarResultados();

paginaAtual = 1;

renderizar();

}

function mostrarTodas(){

limparCategorias();

const btn = document.getElementById("btnTodas");

if(btn){
    btn.classList.add("ativa");
}

resultados = [...musicas];

ordenarResultados();

paginaAtual = 1;

renderizar();

}

function mostrarNacionais(){

limparCategorias();

const btn = document.getElementById("btnNacionais");

if(btn){
    btn.classList.add("ativa");
}

resultados = musicas.filter(m =>
    m.idioma === "BRA"
);

ordenarResultados();

paginaAtual = 1;

renderizar();

}

function mostrarInternacionais(){

limparCategorias();

const btn = document.getElementById("btnInternacionais");

if(btn){
    btn.classList.add("ativa");
}

resultados = musicas.filter(m =>
    m.idioma !== "BRA"
);

ordenarResultados();

paginaAtual = 1;

renderizar();

}

function mostrarGospel(){

limparCategorias();

const btn = document.getElementById("btnGospel");

if(btn){
    btn.classList.add("ativa");
}

resultados = musicas.filter(m =>
    m.genero &&
    m.genero.toLowerCase() === "gospel"
);

ordenarResultados();

paginaAtual = 1;

renderizar();

}

function mostrarInfantil(){

limparCategorias();

const btn = document.getElementById("btnInfantil");

if(btn){
    btn.classList.add("ativa");
}

resultados = musicas.filter(m =>
    m.genero &&
    m.genero.toLowerCase() === "infantil"
);

ordenarResultados();

paginaAtual = 1;

renderizar();

}