import api from "./api.js"
import elementosVisuaisHtml from "./elementosVisuais.js"
import { validarData } from "./validarData.js";

export async function manipularFormulario(evento) {
    evento.preventDefault();

    const id = document.getElementById("pensamento-id").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const autoria = document.getElementById("pensamento-autoria").value
    const data = document.getElementById("pensamento-data").value

    if(!validarData(data)){
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data")
        elementosVisuaisHtml.limparFormulario()
        //finaliza o programa
        return
    }

    try{
        //se ja tem um id edita
        if(id){
            await api.editarPensamentos({id, conteudo, autoria, data});
        }
        //se n tem cria
        else{
            await api.adicionarPensamentosNaApi({conteudo, autoria, data})
        }

        elementosVisuaisHtml.BuscaPensamentosECriaVisualmente()
    }
    catch{
        alert("Erro ao adicionar um pensamento")
    }
}