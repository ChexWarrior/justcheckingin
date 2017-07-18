const RANDOM_API_ENDPOINT = 'https://www.random.org/integers/?num=1&base=10&col=1&format=plain&md=new';
const FORTUNE_API_ENDPOINT = 'http://fortunecookieapi.herokuapp.com/v1/cookie'
const PORTRAITS = [
  'portraits/caesar.jpg',
  'portraits/andy-140.jpg'
];

function getDelay() {
  return .5;
}

function getPortraitURL(randomNumber) {
  console.log('randomNumber', randomNumber);
  return browser.extension.getURL(PORTRAITS[randomNumber - 1]);
}

function getMessage() {
  return 'HI!';
}

function createAlarm() {
  let delayInMinutes = getDelay();
  browser.alarms.create('just-checking-in', {
    delayInMinutes
  });
}

async function getRandomNumber(min, max) {
  let response = await fetch(`${API_ENDPOINT}&min=${min}&max=${max}`);
  let result = await response.text();
  console.log('result', result);
  return result;
}

browser.alarms.onAlarm.addListener((alarm) => {
  getRandomNumber(1, 2).then((randomNumber) => {
    browser.notifications.create('test', {
      type: 'basic',
      iconUrl: getPortraitURL(randomNumber),
      title: 'Just checking in!',
      message: getMessage()
    });

    createAlarm();
  });
});

createAlarm();
