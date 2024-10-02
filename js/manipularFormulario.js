import api from "./api.js"
import elementosVisuaisHtml from "./elementosVisuais.js"
import { validarData } from "./validarData.js";
import validarEntradaDeDados from "./validandoEntradaDeDados.js";

const setStringPensamento = new Set()

async function adicionarStringPensamentoAoSet() {
    try {
        const pensamentos = await api.buscarPensamentos();
        pensamentos.forEach(pensamento => {
            const stringPensamento = 
            //remove espaco e deixa tudo em minusculo
            `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
        
            setStringPensamento.add(stringPensamento)
        })
    } catch (error) {
        console.log("Erro ao adicionar string pensamento ao set")
        throw error
    }
}


export async function manipularFormulario(evento) {
    evento.preventDefault();
    await adicionarStringPensamentoAoSet();

    const id = document.getElementById("pensamento-id").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const autoria = document.getElementById("pensamento-autoria").value
    const data = document.getElementById("pensamento-data").value

    if(!validarData(data)){
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data")
        //finaliza o programa
        return
    }

     if(!validarEntradaDeDados.validandoConteudo(conteudo)){
        alert("No conteúdo é permitido a inclusão apenas de letras e espaços com no mínimo 10 caracteres")
        elementosVisuaisHtml.limparFormulario()
        return
     }

     if(!validarEntradaDeDados.validandoAutoria(autoria)){
        alert("Na autoria é permitida a inclusão apenas de letras e espaços com no mínimo 3 caracteres")
        elementosVisuaisHtml.limparFormulario()
        return
    }

    const chaveNovoPensamento = 
    //remove espaco e deixa tudo em minusculo
    `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`


    if(setStringPensamento.has(chaveNovoPensamento)){
        alert('Esse pensamento já existe')
        elementosVisuaisHtml.limparFormulario()
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