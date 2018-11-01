var resultadosAnimes = [];

$(document).ready(function(){
	
	// <div class="col-sm-12 col-md-3 col-lg-3">

 //         <div class="card vermelho">
 //            <img class="card-img-top" src="https://picsum.photos/200/300/?random" alt="Card image cap">
 //             <div class="card-body">
 //                <h5 class="card-title">Título</h5>
 //            </div>
 //        </div>

 //    </div>

	$("#btnPesquisar").click(function(){

		var nomeAnime = $("#nomeAnime").val();
		if(nomeAnime != ""){
			puxarAnimes(nomeAnime);
		}
		else{
			alert("Digite algo no campo de busca.");
		}
		$("#nomeAnime").val("");

	});

});

function puxarAnimes(texto){
	resultadosAnimes = [];
	let anime = texto.replace(" ", "%20");
	anime = anime.replace("=", "?q=");
	var URL = "https://api.jikan.moe/v3/search/"+anime;

	$.ajax({
		url: URL,
		type: 'GET',
		dataType: 'json',
		success: function(data){
			for (anime of data.results){
				resultadosAnimes.push(anime);
			}
		},
		error: function(error){

		}
	})
	.done(function(){
		criarElementosHTML();
	});
}

function criarElementosHTML(){
	var lista = '';

	resultadosAnimes.forEach(function(e, i){
		lista += '<div class="col-sm-12 col-md-3 col-lg-3 parte"><div class="card"><img class="card-img-top" src="'+resultadosAnimes[i].image_url+'" alt="'+resultadosAnimes[i].title+'"><div class="card-body"><h5 class="card-title">'+resultadosAnimes[i].title+'</h5></div></div></div>';
	});

	atualizarTela(lista);
}

function atualizarTela(lista){
	document.getElementById("lugar").innerHTML = lista;
}
