import api from "./api.js"
import elementosVisuaisHtml from "./elementosVisuais.js"

export async function manipularFormulario(evento) {
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