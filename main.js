

function validation (){
    let valid = prompt ("Com quantas cartas vamos jogar?");
    
    if (valid%2 !== 0 || valid<2 || valid>14) {
        alert ("Número inserido deve ser par e entre 2 e 14");
        validation ();
    } else {
        return(valid);
    }
}

numberOfCards = validation ();