let allCards = [
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

// função de validação do numero digitado
function validation (){
    const valid = prompt ("Com quantas cartas vamos jogar?");
    if (valid%2 !== 0 || valid<2 || valid>14) {
        alert ("Número inserido deve ser par e entre 2 e 14");
        validation ();
    } else {
        return(valid);
    }
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

// função que misturamos as cartas
function comparador() { 
    return Math.random() - 0.5; 
}

// pegando o número de cartas necessárias para o jogo
function gameSort() {
    allCards.length = numberOfCards/2;
    for (i=0; i < numberOfCards/2; i++){
        allCards.push(allCards[i]); 
    } 
    return (allCards);
}

// função do clique das cartas
function clickCard (locationCard){
    locationCard.classList.add('click');
    contClick++;
    let identificationCard = locationCard.lastElementChild;
    
    gameClick(identificationCard);
}

function gameClick (identificationCard) {
    if (testGame < 1){
        card1 = identificationCard;
        testGame++;
     } else {
        card2 = identificationCard;
        testGame = 0;
        if (card1.innerHTML !== card2.innerHTML){
            setTimeout (removeProgram, 1000);
        } else {
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
}

//responsável pelo alert ao final do jogo
function endOfGame (contClick) {
    alert(`Você ganhou em ${contClick} rodadas! Em ${minute} minutos e ${second} segundos`);
}

// função do contador (bônus)
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


// lógica implementada
numberOfCards = validation ();
console.log(numberOfCards);
    
// sorteando todas as cardas
allCards.sort(comparador);
    
// pegando somente as cartas que queremos
gameCards = gameSort();

// sorteando a ordem das cartas novamente
gameCards.sort(comparador);

// mostrando as cartas
showCards (numberOfCards);

// inicia timer (bônus)
timer ();




   




