/*Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
(attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.*/

// sezione dell' elemento contenitore e pulsante
const gridElement = document.getElementById("grid");
const startButton = document.getElementById("startButton");

// generare un array di numeri in ordine casuale in un range
const newArrNum = genArrayRandomNum(1, 64, 64);

for (let i = 1; i <= newArrNum.length; i++) {
    const newElement = createMyElement("div", "square");

    // inseriamo il numero all'interno della cella
    let numeroCellaIesimo = newArrNum[i];
    newElement.append(numeroCellaIesimo);

    // a seconda che numeroiesimo sia pari o dispari,
    // inserirò una classe diversa
    if (numeroCellaIesimo % 2 === 0) {
        newElement.classList.add("square-even");
    } else {
        newElement.classList.add("square-odd");
    }

    // Aggiungi il numero come testo all'interno del div
    newElement.textContent = i;

    newElement.addEventListener("click",
        function () {
            this.classList.add("clicked");
            console.log("hai cliccato la cella:" + i)
        }
    );

    gridElement.append(newElement);
}

startButton.addEventListener("click",
    function () {
    // Aggiungi qui la logica di inizio del gioco
    alert("Il gioco è iniziato!");
    }
);

// definizione funzione 
function createMyElement(tagtype, classname) {

    const currentElement = document.createElement(tagtype);
    currentElement.classList.add(classname);
    
    return currentElement;
}



// funzione che crea un array con ordinamento randomico di numeri in un range (min, max)
function genArrayRandomNum(minNum, maxNum, lunghezzaArr) {
    // array da popolare e poi tornare 
    const arrayToGen = [];

    // ciclo che mi popolerà l'array
    while (arrayToGen.length < lunghezzaArr) {
        // generare un numero random in un range (min, max)
        let newNumber = genRandomNumMinMax(minNum, maxNum);
        // se il numero generato NON è gia presente nell'array
        if (!arrayToGen.includes(newNumber)) {
            // allora lo pusho nell'array
            arrayToGen.push(newNumber);
        }
    }
    return arrayToGen;
}

// funzione che genera un numero random in un rantge (min, max)
function genRandomNumMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}