export function validarData(data){
    const dataAtual = new Date();
    const dataInserida = new Date (data);
    //se a data inserida é menor ou igual a atual
    return dataInserida <= dataAtual
}