
//Variabler for hele spillet
var numberOfPlayers = 2;
var currentPlayer = 1;
var currentRow = 1;
var throwsLeft = 3;
var currentDices = [0, 0, 0, 0, 0];
//Bruker en 2 dimensjonal array som representasjon for brettet. 
//Første dimentsjon er rad, andre er spilleren
var currentBoard = initializeBoard();

/* ************************************************************************
  Klargjør en representasjon av brettet
*/
function initializeBoard() {
  //Brettet har 18 rader inklusiv sum (rad 7), bonus (rad 8) og totalsum (rad 18)
  var board = new Array(18);
  for (var i = 0; i < board.length; i++) {
    //Oppretter fire spillere per rad;
    board[i] = new Array(4);
  }
  return board;
}

/* ************************************************************************
 Skriver ut brettet på konsollet. Fint for å debugge :-)
 */
 function displayBoard(board) {
   console.log("*****************");
   for (let i = 0; i < board.length; i++) {
     console.log(board[i]);
   }
   console.log("*****************");
}

/* ************************************************************************
  Returnerer en verdi mellom 1 og 6
*/
function throwOneDice() {
  return Math.floor(Math.random()*6 + 1);
}

/* ************************************************************************
 Kaster terning for aktuell spiller. Metoden starter fra onClick i HTML koden.
*/
function throwDice() { 
  //Sjekker om dette er første kast på ny runde (throwsLeft = 0)
  if (throwsLeft == 0) {
    //Nullstiller terningene;
    clearDices();

    //Dersom siste spiller er ferdig skal ny rad startes;
    if (numberOfPlayers == currentPlayer) {
      currentRow = currentRow +1;
      currentPlayer = 1;
    } else {
      //Hvis ikke er det neste spiller sin tur
      currentPlayer++;
    }
  }

  //Kaster 5 terninger;
  for (let i = 1; i <= 5; i++) {
    //Sjekk om terning skal beholdes;
    var keep = document.getElementById("keep"+i);
    console.log(keep.checked);
    if (keep.checked == false) {
      //Kaster bare terning dersom keep ikke er krysset av 
      var currentDice = throwOneDice();
      var ter = document.getElementById("terning"+i);
      ter.src = "terning"+currentDice+".png"
    }
      //Oppdaterer array med terninger. Arrayer starter på 0 (trekker fra en)
      currentDices[i-1] = currentDice;

      
  }
  //Teller ned antall kast som er igjen
  throwsLeft = throwsLeft - 1;
  if (throwsLeft == 0) {
    //Her summerer vi opp etter at siste kaste er gjort.
    finishRound();      
  }
}

/* ************************************************************************
 Summerer opp runden - summerer alltid opp delsummer og bonus;
*/
function finishRound() {
  var sumRow = calculateScoreForRow(currentRow);    
  currentBoard[currentRow-1][currentPlayer-1] = sumRow;  
  document.getElementById("p"+currentPlayer+"-"+currentRow).innerHTML = sumRow;

  if (currentRow == 6) {
    console.log("LAST ROUND + SUM");
    //Beregner Sum 1 
    currentRow++;
    var sum1 = calculateSum1(currentPlayer, currentBoard);
    currentBoard[currentRow-1][currentPlayer-1] = sum1;  
    document.getElementById("p"+currentPlayer+"-"+currentRow).innerHTML = sum1;

    currentRow++;
    var bonus = 0;
    //Beregner bonus
    if (sum1 >= 63) {
      bonus = 50;
    }
    document.getElementById("p"+currentPlayer+"-"+currentRow).innerHTML = bonus;
  }
  displayBoard(currentBoard);
}

/* ************************************************************************
 * Summerer opp antall terninger for aktuell rad/runde på spillbrettet;
*/
function calculateScoreForRow(currentRow) {
  var valueForRow = 0;
  if (currentRow <= 6) {
    //For rad 1 - 6 så rad lik terningen vi skal ha (1-6)
    valueForRow = calculateDice(currentRow);
  }

  console.log(valueForRow);
  return valueForRow;
}

/* ************************************************************************
  Beregner verdi for en terning (1 til 6)
  */
function calculateDice(dice) {
  var sumForDice = 0;
  for (let i=1; i<= 5; i++) {
    if (currentDices[i-1] == dice) {
      sumForDice += dice;
    }
  }
  return sumForDice;
}

/* ************************************************************************
 * Nullstiller terningene
*/
function clearDices() {
  for (let i = 1; i <= 5; i++) {
    //Fjerner hold markeringen
    document.getElementById("keep"+i).checked=false;
  }
  //Nullstiller terningene i arrayen og antall kast
  currentDices = [0,0,0,0,0];
  throwsLeft = 3;
}

/* ************************************************************************
  Beregner sum for terning 1 til 6
*/
function calculateSum1(player, board) {
  var sum1 = 0;
  for (let i = 1; i <= 6; i++) {
    console.log(board[i-1][player - 1])
    sum1 = sum1 + board[i-1][player - 1];
  }
  return sum1;
}

