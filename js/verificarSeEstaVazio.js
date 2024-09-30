export default function verificarSeEstaVazio (){
    const listaPensamentos = document.getElementById("lista-pensamentos")
    const muralVazio = document.querySelector(".mural-vazio");

    if(listaPensamentos.childElementCount === 0){
        muralVazio.classList.remove('hidden');
    }
    else{
        muralVazio.classList.add('hidden');
    }
}