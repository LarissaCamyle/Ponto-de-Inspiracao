import api from "./api.js"

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

    async BuscaPensamentosECriaVisualmente () {
        try{
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(elementosVisuaisHtml.criarPensamentosNoHtml);
        }
        catch{
            alert("Erro em renderizar pensamentos");
        }
    },

    criarPensamentosNoHtml(pensamento) {
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

        const divBtns = document.createElement("div");
        divBtns.classList.add("icones")
        

        divBtns.appendChild(btnEditar)
        btnEditar.appendChild(iconEditar);
        li.appendChild(iconeAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(divBtns)
        listaPensamentos.appendChild(li)
    }
}

export default elementosVisuaisHtml;