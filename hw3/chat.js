const wsUri = " wss://echo-ws-service.herokuapp.com";
const input = document.querySelector('.input');
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
const userMessages = document.querySelector('.user-messages');
const serverMessages = document.querySelector('.server-messages');
const wrapperChat =  document.querySelector('.chat');

function writeToScreen(message, position='flex-end') {
let element = `
<p class='messages' style='align-self: ${position}'>
${message}</p>
`;
userMessages.innerHTML += element;
wrapperChat.scrollTop = wrapperChat.scrollHeight;
}

let websocket = new WebSocket(wsUri); 
websocket.onopen = function(evt) {
console.log("CONNECTED");
};

websocket.onmessage = function(evt) {
writeToScreen(`${evt.data}`, 'flex-start');
};
	
websocket.onerror = function(evt) {
writeToScreen(`server: ${evt.data}`, 'flex-start');
};
  
btnSend.addEventListener('click', (e) => {
	e.preventDefault()
let message = input.value;
websocket.send(message);
writeToScreen(`${message}`);
input.value = ''
});

const error = () => {
let textErr0r = 'Ошибка';
writeToScreen(textErr0r);
};
  
const success = (position) => {
let latitude  = position.coords.latitude;
let longitude = position.coords.longitude;
let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
};
  
btnGeo.addEventListener('click', () => {
	e.preventDefault()
if (!navigator.geolocation) {
console.log('Геолокация не поддерживается вашим браузером');
} else {
navigator.geolocation.getCurrentPosition(success, error);
}
});
