const URL = "http://localhost:3000"
import { converterData } from "./converterStringParaData.js"

const api = {
    //lista todos os pensamentos
    async buscarPensamentos (){
        try{
            const resposta = await fetch(`${URL}/pensamentos`)
            const pensamentos = await resposta.json()

            return pensamentos.map(pensamento => {
                return {
                    ...pensamento,
                    //converte a data para printar
                    data: new Date(pensamento.data)
                }
            })
        }
        catch (error){
            console.log("Erro ao buscar pensamentos")
            throw error
        }
    },

    //adiciona os pensamentos na api
                        // um obj de pensamento
    async adicionarPensamentosNaApi(pensamento){
        try{
            const dataNova = converterData(pensamento.data)

            const resposta = await fetch(`${URL}/pensamentos`, {
                //METODO PARA INSERIR DADOS NA API
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                //converte um obj js para uma string json
                body: JSON.stringify({
                    //copia todas as propriedades do obj
                    ...pensamento,
                    //sobreescreve a data com a nova data
                    data: dataNova.toISOString()
                })
            })
            return await resposta.json()
        }
        catch (error){
            console.log("Erro em adicionar pensamentos")
            throw error
        }
    },


    async buscarPensamentosPorId (id) {
        try{
            const resposta = await fetch(`${URL}/pensamentos/${id}`)
            const pensamento = await resposta.json()

            return{
                ...pensamento,
                //converte a data para printar
                data: new Date(pensamento.data)
            }
        }
        catch (error){
            console.log("Erro em buscar pensamentos por id")
            throw error
        }

    },


    async editarPensamentos(pensamento){
        try{
            const resposta = await fetch(`${URL}/pensamentos/${pensamento.id}`, {
                //METODO PARA EDITAR DADOS NA API
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                //converte um obj js para uma string json
                body: JSON.stringify(pensamento)
            })
            return await resposta.json()
        }
        catch (error){
            console.log("Erro em editar pensamentos")
            throw error
        }
    },

    async excluirPensamentos(id){
        try{
            const resposta = await fetch(`${URL}/pensamentos/${id}`, {
                //METODO PARA EDITAR DADOS NA API
                method: "DELETE", 
            })
        }
        catch (error){
            console.log("Erro ao excluir pensamentos")
            throw error
        }
    },


    async buscarPensamentosBarraDePesquisa(texto){
        try{
            const pensamentos = await this.buscarPensamentos();
            const textoEmMinusculas = texto.toLowerCase();
    
            //filtra entre todos somentes os correspondentes ao texto do input
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                //se atende a condição armazena na const
                return (pensamento.conteudo.toLowerCase().includes(textoEmMinusculas) ||
                pensamento.autoria.toLowerCase().includes(textoEmMinusculas))
            })
    
            return pensamentosFiltrados
        }
        catch (error){
            console.log("Erro ao buscar pensamentos pela barra de pesquisa")
            throw error
        }
    },


    async atualizarFavorito(id, favorito){
        try {
            const response = await fetch(`${URL}/pensamentos/${id}`, {
            //metodo que atualiza alguns dados e n precisa enviar todos os dados
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                //           mesmo que {favorito: favorito}
                body: JSON.stringify({ favorito}),
            });

            // Converte a resposta para JSON
            const data = await response.json(); 
            return data; 
        } 
        catch (error) {
            console.log("Erro ao atualizar favorito")
            throw error
        }
    }


}

export default api;