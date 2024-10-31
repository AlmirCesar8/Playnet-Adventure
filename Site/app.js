let open = false; // Variável para controlar o estado da barra de pesquisa

document.querySelector(".search-container img").addEventListener("click", toggleSearch);

function toggleSearch() {
    const input = document.querySelector(".search-container input");
    const searchIcon = document.querySelector(".search-container img");
    const paragraphs = document.querySelectorAll(".search-container p");

    if (!open) {
        input.style.width = "100%";
        searchIcon.style.right = "42px";
        searchIcon.style.transform = "rotate(360deg)";
        input.style.opacity = "1";
        paragraphs.forEach((e) => e.style.opacity = "0");
    } else {
        input.style.width = "0%";
        input.style.opacity = "0";
        searchIcon.style.transform = "rotate(0deg)";
        paragraphs.forEach((e) => e.style.opacity = "1");

        document.querySelectorAll(".sidebar .types div p").forEach((e) => {
            e.style.cssText = ""; // Reset styles if necessary
        });
    }
    open = !open; // Inverte o estado
}

function pesquisar() {
    // Obtém a seção onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();
    // Inicializa uma string vazia para armazenar os resultados
    let resultado = "";
  
    // Itera sobre cada dado na lista de dados
    for (let dado of dados) {
      let tag = dado.tags.toLowerCase()
      if (dado.nome.toLowerCase().includes(campoPesquisa) || dado.posicao.toLowerCase().includes(campoPesquisa) || dado.nacionalidade.toLowerCase().includes(campoPesquisa) || tag.includes(campoPesquisa)) {
        // Cria um novo elemento div para cada resultado
        if (dado.posicao != "goleiro") {
            resultado += `
            <div class="item-resultado">
                <img class="perfil" src="jogadores/${dado.foto}" alt="${dado.nome}">
                <div class="info">
                    <h2>${dado.nome}<a href=${dado.insta} target="_blank"><img class="logo" src="imagens/insta.png" alt="Instagram"></a></h2>
                    <p>${dado.nacionalidade} de ${dado.idade} anos, o camisa ${dado.camisa} do Corinthians é um(a) ${dado.posicao} que já disputou ${dado.jogos} jogos, marcando ${dado.gols} gols e distribuindo ${dado.assistencias} assistências nessas partidas. ${dado.descricao}</p>
                    <a href="${dado.wiki}" target="_blank">Mais informações</a>
                </div>
              </div>
            </div>
            `;
          }
        else {
          resultado += `
          <div class="item-resultado">
            <div class="topo">
              <img class="perfil" src="jogadores/${dado.foto}" alt="${dado.nome}">
              <div class="info">
                  <h2>${dado.nome}<a href=${dado.insta} target="_blank"><img class="logo" src="imagens/insta.png" alt="Instagram"></a></h2>
                  <p>${dado.nacionalidade} de ${dado.idade} anos, o camisa ${dado.camisa} do Corinthians é um(a) ${dado.posicao} que já disputou ${dado.jogos} jogos, defendendo ${dado.penal_def} pênaltis e sofrendo ${dado.gols_sofri} gols. ${dado.descricao}</p>
                  <a href="${dado.wiki}" target="_blank">Mais informações</a>
              </div>
            </div>
          </div>
          `;
        }
      }
    }
    if (!resultado) {
      resultado = '<div class= "item-erro"><h2>Nada foi encontrado</h2></div>';
    }
    // Atribui o HTML gerado à seção de resultados
    section.innerHTML = resultado;
  }