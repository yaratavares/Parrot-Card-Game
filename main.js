const allCards = [
    "bobrossparrot",
    "explodyparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot"
]





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
    
    const listCards = document.querySelector(".container");
    for (i=0; i < numberCards; i++) {
        
        listCards.innerHTML += 
        `<div class="card" onclick="clickCard(this)">
            <div class= "front-face face">
                <img class="parrot" src= "assets/parrot.png"/>
            </div>
            <div class= "back-face face">
                <img src="assets/bobrossparrot.gif"/>
            </div>
        </div>`
    }
    
}

function clickCard (locationCard){
    locationCard.classList.add('click');
}
// lógica implementada


const numberOfCards = validation ();
showCards (numberOfCards);




// allCards.sort(comparador);

// showCards();

// function comparador() { 
//     return Math.random() - 0.5; 
// }