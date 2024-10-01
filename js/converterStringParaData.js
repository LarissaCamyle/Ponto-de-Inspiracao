export const converterData = (dataString) => {
    //retira os - e separa em variaveis diferentes
    const [ano, mes, dia] = dataString.split("-")
    //mes -1 pq js trata os meses de 0 a 11 e n de 1 a 12
    return new Date(Date.UTC(ano, mes - 1, dia))
}