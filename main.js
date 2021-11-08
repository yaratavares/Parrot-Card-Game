const allCards = [
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot",
]
let card1;
let card2;
let numberOfCards;
let gameCards;
let contClick = 0;
let contGame = 0;
let testGame = 0;

//lógica para timer (bônus)
let second = 0;
let minute = 0;
let IdentificadorIntervalo;

// FUNÇÃO QUE GOVERNA TODAS AS FUNÇÕES A SEGUIR
function gameRepeat () {
    // validação do número escolhido
    numberOfCards = validation ();

    contClick = 0;

    if (numberOfCards !== null) {
        // sorteando todas as cards
        allCards.sort(comparador);
        
        // pegando somente as cartas que queremos
        gameCards = gameSort();
        
        // sorteando a ordem das cartas novamente
        gameCards.sort(comparador);
        
        // mostrando as cartas
        
        showCards (numberOfCards)
        
        // ligando o timer (bônus)
        timer ();
    }
}

// função de validação do numero digitado
function validation (){
    let valid = prompt ("Com quantas cartas vamos jogar?");
    if (valid == null){
        return (valid);
    } else {
        while (valid%2 !== 0 || valid<2 || valid>14) {
            alert ("Número inserido deve ser par e entre 2 e 14");
            valid = prompt ("Com quantas cartas vamos jogar?");
        } 
        return (valid);
    }
} 

// função que misturamos as cartas
function comparador() { 
    return Math.random() - 0.5; 
}

// pegando o número de cartas necessárias para o jogo
function gameSort() {
    let cardsAleatory = allCards.slice(0);

    cardsAleatory.length = numberOfCards/2;
    for (i=0; i < numberOfCards/2; i++){
        cardsAleatory.push(cardsAleatory[i]); 
    } 
    return (cardsAleatory);
}

// função de mostrar as cartas
function showCards (numberCards){
    
    let listCards = document.querySelector(".container");
    for (i=0; i < numberCards; i++) {
        
        listCards.innerHTML += 
        `<div class="card" onclick="clickCard(this)" data-identifier="card">
        <div class= "front-face face" data-identifier="front-face">
        <img class="parrot" src= "assets/parrot.png"/>
        </div>
        <div class= "back-face face" data-identifier="back-face">
        <img src="assets/${gameCards[i]}.gif"/>
        </div>
        </div>`
    }
}
// TODAS AS FUNÇÕES GOVERNADAS POR GAMEREPEAT TERMINA AQUI

// FUNÇÕES DO EVENTO CLICAR
function clickCard (locationCard){
    locationCard.classList.add('click');
    contClick++;

    let identificationCard = locationCard.lastElementChild;
    
    gameClick(identificationCard);
}

function gameClick (identificationCard) {

    if (testGame == 0){
        card1 = identificationCard;
        (card1.parentElement).classList.add('noClick');
        testGame++;
     } else {
        blockEveryone();
        card2 = identificationCard;
        testGame = 0;
        if (card1.innerHTML !== card2.innerHTML){
            setTimeout (removeProgram, 1000);
           
        } else {
            (card1.parentElement).classList.add('acertou');
            (card2.parentElement).classList.add('acertou');
            removeProgram();
            contGame += 2;
        }
     }

     if (contGame == numberOfCards){
        setTimeout (endOfGame, 1000, contClick);
    }
}

function removeProgram (){
    (card1.parentElement).classList.remove('click');
    (card2.parentElement).classList.remove('click');
    unlockEveryone();
}
// solução implementada para impedir cliques sucessivos nos cards
function blockEveryone (){
    const noBug = document.querySelectorAll('.card');
 
    for (let i=0; i < numberOfCards; i++){
        (noBug[i]).classList.add('noClick');
    }
}
function unlockEveryone (){
    const noBug = document.querySelectorAll('.card');
 
    for (let i=0; i < numberOfCards; i++){
        (noBug[i]).classList.remove('noClick');
    }
}
// FUNÇÕES DESENCADEADAS PELO EVENTO CLICAR FINALIZAM AQUI

// FUNÇÃO RESPONSÁVEL PELO ALERT AO FINAL DO JOGO
function endOfGame (contClick) {
    alert(`Você ganhou em ${contClick} rodadas! Em ${minute} minutos e ${second} segundos`);
    clearInterval(IdentificadorIntervalo);
    
    // PARTE RESPONSÁVEL PELA REPETIÇÃO SUCESSIVA DO JOGO (BÔNUS)
    let choise = prompt ("Você quer reiniciar o jogo? Digite 'sim' para continuar a jogar e 'não' para sair.");
    if (choise == "sim") {
        second = 0;
        minute = 0;

        var node = document.querySelectorAll('.card');
        
        for (i=0; i<numberOfCards; i++){
            node[i].parentNode.removeChild(node[i]);
        }
        
        contGame = 0;
        testGame = 0;
        gameRepeat()
    } else {
        return null;
    }
}

// FUNÇÃO PARA O CONTATOR (BÔNUS)
function timer() {
    IdentificadorIntervalo = setInterval(counter, 1000);
}

function counter() {
    second++;

    const counter_s = document.querySelector(".second");
    const counter_m = document.querySelector(".minute");

    if (second < 10) {
        counter_s.innerHTML = "0" + second;
    } else {
        counter_s.innerHTML = second;
    }

    if (second == 60) {
        minute++;
        second = 00;
        counter_s.innerHTML = second;
        counter_m.innerHTML = minute;
    }
}

gameRepeat ();

// ALTERAÇÃO FUTURA: leve delay no timer