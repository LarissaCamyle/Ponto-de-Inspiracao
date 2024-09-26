import elementosVisuaisHtml from "./elementosVisuais.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
    elementosVisuaisHtml.BuscaPensamentosECriaVisualmente()


    const formularioPensamento = document.getElementById("pensamento-form")
    formularioPensamento.addEventListener("submit", manipularFormulario);


    const btnCancelar = document.getElementById("botao-cancelar");
    btnCancelar.addEventListener("click", elementosVisuaisHtml.limparFormulario)
})

async function manipularFormulario(evento) {
    evento.preventDefault();

    const id = document.getElementById("pensamento-id").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const autoria = document.getElementById("pensamento-autoria").value

    try{
        await api.adicionarPensamentosNaApi({conteudo, autoria})
        elementosVisuaisHtml.BuscaPensamentosECriaVisualmente()
    }
    catch{
        alert("Erro ao adicionar um pensamento")
    }
}

