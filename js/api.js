const api = {
    //lista todos os pensamentos
    async buscarPensamentos (){
        try{
            const resposta = await fetch('http://localhost:3000/pensamentos')
            return await resposta.json()
        }
        catch{
            console.log("Erro ao buscar pensamentos")
            throw error
        }
    },

    //adiciona os pensamentos na api
                        // um obj de pensamento
    async adicionarPensamentosNaApi(pensamento){
        try{
            const resposta = await fetch('http://localhost:3000/pensamentos', {
                //METODO PARA INSERIR DADOS NA API
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                //converte um obj js para uma string json
                body: JSON.stringify(pensamento)
            })
            return await resposta.json()
        }
        catch{
            console.log("Erro em adicionar pensamentos")
            throw error
        }
    },


    async buscarPensamentosPorId (id) {
        try{
            const resposta = await fetch(`http://localhost:3000/pensamentos/${id}`)

            return await resposta.json()
        }
        catch{
            console.log("Erro em buscar pensamentos por id")
            throw error
        }

    },


    async editarPensamentos(pensamento){
        try{
            const resposta = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
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
        catch{
            console.log("Erro em editar pensamentos")
            throw error
        }
    },
}

export default api;