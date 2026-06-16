function normalizar(texto){
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}


let musicas=[];

fetch('musicas.json')
.then(r=>r.json())
.then(data=>{

musicas=data;

document.getElementById('contador')
.innerHTML=
`${musicas.length} músicas cadastradas`;

});

document
.getElementById('busca')
.addEventListener('input',pesquisar);

function pesquisar(){

const texto = normalizar(
    document.getElementById('busca').value
);

const resultado=
document
.getElementById('resultado');

resultado.innerHTML='';

if(texto.length < 2){
    resultado.innerHTML='';
    return;
}

const encontrados=
musicas.filter(m=>

m.codigo.toString().includes(texto) ||

normalizar(m.musica).includes(texto)
||
normalizar(m.artista).includes(texto)

).slice(0,50);

encontrados.forEach(m=>{

resultado.innerHTML +=

`<div class="card">

<div class="codigo">
${m.codigo}
</div>

<h3>${m.musica}</h3>

<div class="artista">
${m.artista}
</div>

</div>`;

});

}
function normalizar(texto){
    return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase();
}