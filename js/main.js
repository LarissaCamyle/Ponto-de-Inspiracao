import elementosVisuaisHtml from "./elementosVisuais.js"
import { manipularFormulario } from "./manipularFormulario.js";
import verificarSeEstaVazio from "./verificarSeEstaVazio.js";
import { manipularBusca } from "./buscarPensamentos.js";

document.addEventListener("DOMContentLoaded", () => {
    verificarSeEstaVazio();

    //printar pensamentos
    elementosVisuaisHtml.BuscaPensamentosECriaVisualmente()

    //adicionar ou editar pensamentos
    const formularioPensamento = document.getElementById("pensamento-form")
    formularioPensamento.addEventListener("submit", manipularFormulario);

    //limpa formulario
    const btnCancelar = document.getElementById("botao-cancelar");
    btnCancelar.addEventListener("click", elementosVisuaisHtml.limparFormulario)

    //barra de pesquisa
    const input = document.querySelector("#input");
    input.addEventListener("input", manipularBusca)
})



