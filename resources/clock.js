
function getTime() {
  const currentDay = new Date();
  const time = currentDay.getTime();
  const hours = currentDay.getHours();
  const minutes = currentDay.getMinutes();
  const seconds = currentDay.getSeconds();

  document.getElementById("clock").innerHTML = `
    <span>${hours < 10 ? `0${hours} ` : hours}</span> : 
    <span>${minutes < 10 ? `0${minutes} ` : minutes}</span> : 
    <span>${seconds < 10 ? `0${seconds} ` : seconds}</span>
  `;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();