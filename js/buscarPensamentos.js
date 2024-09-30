import api from "./api.js";
import elementosVisuaisHtml from "./elementosVisuais.js";

export async function manipularBusca() {
    const texto = document.querySelector("#input").value;

    try {
        //filtra apartir do input
        const pensamentosFiltrados = await api.buscarPensamentosBarraDePesquisa(texto);
        //printa na tela
        elementosVisuaisHtml.BuscaPensamentosECriaVisualmente(pensamentosFiltrados)

    } catch (error) {
        console.log("erro na função manipularBusca")
    }

}