const validarEntradaDeDados = {
    removendoEspacos (string){
        //nn coloca ^ para q percorra a string toda
        //+ significa encontrar 1 ou mais espaços
        //g é para substituir na string toda
        //'' para sustituir
        return string.replaceAll(/\s+/g, '')
    },

    validandoConteudo(conteudo){
        //primeiro remove os espaços
        const conteudoSemEspaco = this.removendoEspacos(conteudo);

        //maiusculo, minusculo, aceita espaço, no min 10 caracteres
        const regexConteudo = /^[A-Za-zÀ-ÿ\s.,!?]{5,}$/

        //retorna um booleano
        return regexConteudo.test(conteudoSemEspaco)
    },

    validandoAutoria (autoria){
        //primeiro remove os espaços
        const autoriaSemEspaco = this.removendoEspacos(autoria);

        //maiusculo, minusculo, aceita espaço, no min 3 caracteres
        const regexAutoria = /^[A-Za-zÀ-ÿ\s.,!?]{3,}$/

        //retorna um booleano
        return regexAutoria.test(autoriaSemEspaco)
    },
}

export default validarEntradaDeDados;

