import api from "./api.js"
import verificarSeEstaVazio from "./verificarSeEstaVazio.js";

const elementosVisuaisHtml = {
    limparFormulario(){
        const form = document.querySelector("form");
        form.reset();
    },


    async preencherFormularioParaEdicao(pensamentoId){
        const pensamento = await api.buscarPensamentosPorId(pensamentoId)

        document.getElementById("pensamento-id").value = pensamento.id
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo
        document.getElementById("pensamento-autoria").value = pensamento.autoria
    },


    async BuscaPensamentosECriaVisualmente(pensamentosFiltrados) {
        //limpa a li antes de printar
        const listaPensamentos = document.getElementById("lista-pensamentos")
        listaPensamentos.innerHTML = ""
                
        try{
            let pensamentosFiltradosParaPrintar;

            //se tiver pensamentos para filtrar, recebe os filtrados
            if(pensamentosFiltrados){
                pensamentosFiltradosParaPrintar = pensamentosFiltrados; 
            }
            //nao tem pensamentos filtrados, recebe todos os pensamentos
            else{
                pensamentosFiltradosParaPrintar = await api.buscarPensamentos();
            }

            pensamentosFiltradosParaPrintar.forEach(elementosVisuaisHtml.criarPensamentosNoHtml);
        }
        catch(error){
            alert("Erro em renderizar pensamentos");
            throw error
        }
    },


    criarPensamentosNoHtml(pensamento) {
        //criando os elementos
        
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const li = document.createElement("li")
        li.setAttribute("data-id", pensamento.id)
        li.classList.add("li-pensamento")
        
        const iconeAspas = document.createElement("img")
        iconeAspas.src = "/img/marcador.png"
        iconeAspas.alt = "Aspas azuis"
        iconeAspas.classList.add("icone-aspas")
        
        const pensamentoConteudo = document.createElement("div")
        pensamentoConteudo.textContent = pensamento.conteudo
        pensamentoConteudo.classList.add("pensamento-conteudo")
        
        const pensamentoAutoria = document.createElement("div")
        pensamentoAutoria.textContent = pensamento.autoria
        pensamentoAutoria.classList.add("pensamento-autoria")

        const btnEditar = document.createElement("button")
        pensamentoAutoria.classList.add("botao-editar")
        btnEditar.onclick = () => elementosVisuaisHtml.preencherFormularioParaEdicao(pensamento.id)
        const iconEditar = document.createElement("img")
        iconEditar.src = "/img/editar.png"
        iconEditar.alt = "editar"


        const btnExcluir = document.createElement("button")
        btnExcluir.classList.add("botao-excluir")
        btnExcluir.onclick = async () => {
            try {
                await api.excluirPensamentos(pensamento.id)
                
                elementosVisuaisHtml.BuscaPensamentosECriaVisualmente()
            } 
            catch (error) {
                alert("Erro ao excluir pensamnto")
            }
        }
        const iconeExcluir = document.createElement("img")
        iconeExcluir.src = "/img/lixo.png"
        iconeExcluir.alt = "Excluir"


        const btnFavorito = document.createElement("button")
        btnFavorito.classList.add("btn-favorito")
        const iconeFavorito = document.createElement("img")
        iconeFavorito.src = pensamento.favorito ?
        "/img/estrela-preenchida.png" :
        "/img/estrela-vazia.png"
        iconeFavorito.alt = "Ícone de favorito"
        btnFavorito.onclick = async () => {
            try {                                     //se esta como true fica como falso
                                                    //se ja esta como favorito tem q retirar
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito)
                elementosVisuaisHtml.BuscaPensamentosECriaVisualmente()
            } 
            catch (error) {
                console.log("Erro no click do btn favorito")
            }

        }

        const divBtns = document.createElement("div");

        //adicionando ao html
        divBtns.classList.add("icones")
        divBtns.appendChild(btnFavorito)
        divBtns.appendChild(btnEditar)
        divBtns.appendChild(btnExcluir)
        btnEditar.appendChild(iconEditar);
        btnFavorito.appendChild(iconeFavorito);
        btnExcluir.appendChild(iconeExcluir)
        li.appendChild(iconeAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(divBtns)
        listaPensamentos.appendChild(li)

        verificarSeEstaVazio()
    },



}

export default elementosVisuaisHtml;