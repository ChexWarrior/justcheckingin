const RANDOM_API_ENDPOINT = 'https://www.random.org/integers/?num=1&base=10&col=1&format=plain&md=new';
const FORTUNE_API_ENDPOINT = 'http://fortunecookieapi.herokuapp.com/v1/cookie'
const PORTRAITS = [
  'portraits/caesar.jpg',
  'portraits/andy-140.jpg'
];
const ANDY_QUOTES = [
  'Saaaad',
  'Snugu?',
  'Hi!'
];
const CAESAR_QUOTES = [
  'Woof woof, what\'s for lunch? Haha...',
  'Hi!',
];

function getDelay() {
  return .5;
}

function getPortraitURL(randomNumber) {
  return browser.extension.getURL(PORTRAITS[randomNumber - 1]);
}

async function getMessage() {
  let response = await fetch(FORTUNE_API_ENDPOINT);
  let result = await response.json();
  console.log('fortune', result);
  return result;
}

function createAlarm() {
  let delayInMinutes = getDelay();
  browser.alarms.create('just-checking-in', {
    delayInMinutes
  });
}

async function getRandomNumber(min, max) {
  let response = await fetch(`${RANDOM_API_ENDPOINT}&min=${min}&max=${max}`);
  let result = await response.text();
  console.log('random number', result);
  return result;
}

browser.alarms.onAlarm.addListener((alarm) => {
  Promise.all([getRandomNumber(1, 2), getMessage()]).then((results) => {
    let randomNumber = results[0];
    let [message] = results[1];
    let lotto = message.lotto.numbers.join(',');

    browser.notifications.create('Hi Joan!', {
      type: 'basic',
      iconUrl: getPortraitURL(randomNumber),
      title: 'Just checking in!',
      message: `\n${message.fortune.message}\n\nLucky Numbers: ${lotto}`
    });

    createAlarm();
  });
});

createAlarm();
