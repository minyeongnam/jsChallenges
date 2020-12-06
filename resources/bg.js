const body = document.querySelector("body");
const IMG_NUMBER = 6;


function getRandom() {
  const random = Math.floor(Math.random()*IMG_NUMBER) +1;
  return random;
}
function init() {
  const number = getRandom();
  body.style.backgroundImage = "url('./resources/images/bg_0"+number+".jpg')"
}
init();
