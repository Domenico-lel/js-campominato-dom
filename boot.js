/*Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
(attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.*/




// Ottieni il riferimento all'elemento della griglia e al pulsante di avvio dal DOM
const gridElement = document.getElementById("grid");
const startButton = document.getElementById("startButton");

// Definisci costanti per il numero massimo di celle, la percentuale di bombe e le variabili di stato
const maxCells = 64;
const bombPercentage = 25;
let bombCount, bombArray, clickedCount;

// Aggiungi un listener per il click al pulsante di avvio
startButton.addEventListener("click", initializeGame);

// Funzione per inizializzare il gioco
function initializeGame() {
    // Pulisci la griglia
    gridElement.innerHTML = "";

    // Calcola il numero di bombe in base alla percentuale
    bombCount = Math.floor((maxCells * bombPercentage) / 100);

    // Genera una nuova array con le posizioni delle bombe
    bombArray = generateBombArray(bombCount, maxCells);

    // Inizializza il conteggio dei clic e ascolta il click su ogni cella della griglia
    clickedCount = 0;
    for (let i = 1; i <= maxCells; i++) {
        // Crea un nuovo elemento (cella) nella griglia
        const newElement = createMyElement("div", "square");

        // Assegna un numero alla cella tramite il dataset
        newElement.dataset.cellNumber = i;

        // Aggiungi un listener per gestire il click su questa cella
        newElement.addEventListener("click", handleClick);

        // Aggiungi la cella alla griglia
        gridElement.append(newElement);
    }
}

// Funzione per gestire il click su una cella
function handleClick() {
    // Ottieni il numero della cella cliccata
    const cellNumber = parseInt(this.dataset.cellNumber);

    // Se la cella contiene una bomba, aggiungi le classi e termina il gioco
    if (bombArray.includes(cellNumber)) {
        // Aggiungi le classi per indicare che la cella è stata cliccata e contiene una bomba
        this.classList.add("clicked", "bomb");

        // Termina il gioco e mostra il messaggio di perdita
        endGame(false);
    } else {
        // Altrimenti, aggiungi la classe e cambia il colore di sfondo
        this.classList.add("clicked");
        this.style.backgroundColor = "blue";

        // Incrementa il conteggio dei clic e verifica se tutte le celle sono state cliccate
        clickedCount++;
        const remainingCells = maxCells - bombCount - clickedCount;

        if (remainingCells === 0) {
            // Se tutte le celle sono state cliccate, termina il gioco e mostra il messaggio di vittoria
            endGame(true);
        }
    }
}

// Funzione per terminare il gioco e mostrare un messaggio
function endGame(isWinner) {
    // Determina il messaggio in base alla vittoria o alla perdita
    const message = isWinner ? "Hai vinto!" : "Hai perso.";

    // Mostra un alert con il messaggio e il punteggio
    alert(`${message} Punteggio: ${clickedCount}`);

    // Inizializza un nuovo gioco
    initializeGame();
}

// Funzione per generare un array con le posizioni delle bombe
function generateBombArray(bombCount, maxCells) {
    const bombArray = [];

    // Continua a generare posizioni casuali finché non raggiungi il numero desiderato di bombe
    while (bombArray.length < bombCount) {
        // Genera una posizione casuale
        const bombPosition = Math.floor(Math.random() * maxCells) + 1;

        // Se la posizione non è già presente nell'array, aggiungila
        if (!bombArray.includes(bombPosition)) {
            bombArray.push(bombPosition);
        }
    }

    // Restituisci l'array finale con le posizioni delle bombe
    return bombArray;
}

// Funzione per creare un nuovo elemento con la classe specificata
function createMyElement(tagtype, classname) {
    const currentElement = document.createElement(tagtype);

    // Aggiungi la classe all'elemento
    currentElement.classList.add(classname);

    // Restituisci l'elemento creato
    return currentElement;
}

// Inizia il gioco quando la pagina si carica
initializeGame();
