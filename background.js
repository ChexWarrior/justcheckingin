const FORTUNE_API_ENDPOINT = 'http://fortunecookieapi.herokuapp.com/v1/cookie'
const PORTRAITS = [
  'portraits/caesar.jpg',
  'portraits/andy-140.jpg'
];
const DEFAULT_QUOTES = [
  'Saaaad',
  'Snugu?',
  'Hi!',
  'Iccccceeee',
  'Woof woof, what\'s for lunch? Haha...'
];

function getPortraitURL(randomNumber) {
  return browser.extension.getURL(PORTRAITS[randomNumber - 1]);
}

async function getMessage() {
  let result;
  let response = await fetch(FORTUNE_API_ENDPOINT);

  if(response.status !== 200) {
    result = await response.json();
  } else {
    // emulate return object from fortune api
    result = [{
      fortune: {
        message: chance.pick(DEFAULT_QUOTES)
      },
      lotto: {
        numbers: [
          chance.integer({min: 0, max: 59}),
          chance.integer({min: 0, max: 59}),
          chance.integer({min: 0, max: 59}),
          chance.integer({min: 0, max: 59}),
          chance.integer({min: 0, max: 59}),
          chance.integer({min: 0, max: 59})
        ]
      }
    }];
  }
  console.log('message result', result);
  return result;
}

function createAlarm() {
  delayInMinutes = chance.integer({min: 5, max: 30});
  browser.alarms.create('just-checking-in', {
    delayInMinutes
  });
}

browser.alarms.onAlarm.addListener((alarm) => {
  getMessage().then((results) => {
    let [message] = results;
    let lotto = message.lotto.numbers.join(',');
    let randomNumber = chance.integer({min: 1, max: 2});

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
