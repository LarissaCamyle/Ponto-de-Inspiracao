import elementosVisuaisHtml from "./elementosVisuais.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
    verificarSeEstaVazio();

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
        //se ja tem um id edita
        if(id){
            await api.editarPensamentos({id, conteudo, autoria});
        }
        //se n tem cria
        else{
            await api.adicionarPensamentosNaApi({conteudo, autoria})
        }

        elementosVisuaisHtml.BuscaPensamentosECriaVisualmente()
    }
    catch{
        alert("Erro ao adicionar um pensamento")
    }
}

export default function verificarSeEstaVazio (){
    const listaPensamentos = document.getElementById("lista-pensamentos")
    const muralVazio = document.querySelector(".mural-vazio");

    if(listaPensamentos.childElementCount === 0){
        muralVazio.classList.remove('hidden');
    }
    else{
        muralVazio.classList.add('hidden');
    }
}