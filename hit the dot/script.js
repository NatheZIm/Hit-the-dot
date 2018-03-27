gamelength = 30;
timerID = null
let playing = false;
let numholes = 6 * 10;
let currentpos = -1;

const clrholes = () => {
  for (let i = 0; i < document.gameboard.elements.length; i++)
    document.gameboard.elements[i].checked = false;
}

const stoptimer = () => {
  if (playing)
    clearTimeout(timerID);
}

const showtime = (remtime) => {
  document.buttonhead.timeleft.value = remtime;
  if (playing) {
    if (remtime == 0) {
      stopgame();
      return;
    } else {
      temp = remtime - 1;
      timerID = setTimeout("showtime(temp)", 1000);
    }
  }
}
const startgametext = () => {
  document.querySelector(".btn").textContent = "Start Game";
  document.querySelector(".btn").classList.add("btn-outline-success");
  document.querySelector(".btn").classList.remove("btn-outline-danger");
}

const stopgametext = () =>{
  document.querySelector(".btn").textContent = "Stop Game";
  document.querySelector(".btn").classList.add("btn-outline-danger");
  document.querySelector(".btn").classList.remove("btn-outline-success");
}

const stopgame = () => {
  stoptimer();
  playing = false;
  document.buttonhead.timeleft.value = 0;
  clrholes();
  display("Game Over");
  alert('Game Over.\nYour score is:  ' + totalhits);
  startgametext();

}

const play = () => {
  stoptimer();
  if (playing) {
    startgametext();
    stopgame();
  } else {
    playing = true;
    stopgametext();
    clrholes();
    totalhits = 0;
    document.buttonhead.score.value = totalhits;
    display("Playing");
    launch();
    showtime(gamelength);
  }

}

const display = (msg) => {
  document.buttonhead.state.value = msg;
}

const launch = () => {
  let launched = false;
  while (!launched) {
    mynum = random();
    if (mynum != currentpos) {
      document.gameboard.elements[mynum].checked = true;
      currentpos = mynum;
      launched = true;
    }
  }
}

const hithead = (id) => {
  if (playing == false) {
    clrholes();
    display("Push Start to Play");
    return;
  }
  if (currentpos != id) {
    totalhits += -1;
    document.buttonhead.score.value = totalhits;
    document.gameboard.elements[id].checked = false;
  } else {
    totalhits += 1;
    document.buttonhead.score.value = totalhits;
    launch();
    document.gameboard.elements[id].checked = false;
  }
}

const random = () => {
  return Math.floor(Math.random() * 100 % numholes);
}
