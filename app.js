setInterval(timeCalc, 1)
// variables
const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const alarm = document.querySelector('.alarm');
const clock = document.querySelector('.clock');
const numbers = document.querySelectorAll('.number');
// alarm variables
const toggler = document.querySelector('#switch');
const up = document.querySelector('.setup');
const down = document.querySelector('.setdown');
let alarmDegrees = getCurrentRotation(alarm);
let audio = new Audio('assets/goustarw na xorevw.mp3');
let lowDeg = null;
let highDeg = null;
let add = 0;

// event listeners 
up.addEventListener('mousedown', () => interval = setInterval(addTime, 50));
up.addEventListener('mouseup', () => clearInterval(interval));
up.addEventListener('touchstart', () => interval = setInterval(addTime, 50));
up.addEventListener('touchend', () => clearInterval(interval));
down.addEventListener('touchstart', () => interval = setInterval(reduceTime, 50));
down.addEventListener('touchend', () => clearInterval(interval));
down.addEventListener('mousedown', () => interval = setInterval(reduceTime, 50));
down.addEventListener('mouseup', () => clearInterval(interval));
up.addEventListener('click', addTime);
down.addEventListener('click', reduceTime);

function timeCalc() {
  const now = new Date();
  // const milliSecondsRatio = (now.getMilliseconds() / 1000);
  const secondsRatio = ((now.getSeconds()) / 60);
  const minutesRatio = ((secondsRatio + now.getMinutes()) / 60);
  const hoursRatio = ((minutesRatio + now.getHours()) / 12);
  // rotateClock(milliSecondHand, milliSecondsRatio);
  rotateClock(secondHand, secondsRatio);
  rotateClock(minuteHand, minutesRatio);
  rotateClock(hourHand, hoursRatio);
  alarmCheck(secondsRatio);
}

function rotateClock(hand, rotationRatio){
  hand.style.setProperty('--rotation', rotationRatio * 360)
}

function clearInt() {
  clearInterval(con);
}

function addTime(){
  add++;
  alarm.style.setProperty('--rotation', add);
  alarmDegrees = getCurrentRotation(alarm);
}

function reduceTime(){
  add--;
  alarm.style.setProperty('--rotation', add);
  alarmDegrees = getCurrentRotation(alarm);
}

function getCurrentRotation(el){
  var st = window.getComputedStyle(el, null);
  var tm = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           "none";
  if (tm != "none") {
    var values = tm.split('(')[1].split(')')[0].split(',');
    /*
    a = values[0];
    b = values[1];
    angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
    */
    //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
    var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
  }
  return 0;
}

let index = 0;
function alarmCheck(ratio) {
  const absDifference = (ratio * 360) - alarmDegrees;
  if(toggler.checked && absDifference >= 0 && absDifference <= 40 && index <= 0) {
    audio.play();
    setTimeout(() => {
      clock.style.background = 'url("assets/tenor.gif") no-repeat center center/cover'
      numbers.forEach((number) => number.style.color = 'white');
    }, 600);
    index++;
  }
  else if(toggler.checked === false) {
    audio.pause();
    clock.style.background = 'seashell';
    numbers.forEach((number) => number.style.color = 'black');
    audio.currentTime = 0;
    index = 0;
  }
}

timeCalc();
