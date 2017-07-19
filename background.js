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

function createDefaultFortune() {
  return [{
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

async function getMessage() {
  let result;

  try {
    let response = await fetch(FORTUNE_API_ENDPOINT);
    if(response.status === 200) {
      result = await response.json();
    } else {
      // emulate return object from fortune api
      result = createDefaultFortune();
    }
  } catch(exception) {
    result = createDefaultFortune();
  }

  console.log('fortune', result);
  return result;
}

function createAlarm() {
  delayInMinutes = chance.integer({min: 1, max: 2});
  console.log('delayInMinutes', delayInMinutes);
  browser.alarms.create('just-checking-in', {
    delayInMinutes
  });
}

browser.alarms.onAlarm.addListener((alarm) => {
  getMessage().then((results) => {
    let [message] = results;
    let lotto = message.lotto.numbers.join(',');
    browser.notifications.create('Hi Joan!', {
      type: 'basic',
      iconUrl: browser.extension.getURL(chance.pick(PORTRAITS)),
      title: 'Just checking in!',
      message: `\n${message.fortune.message}\n\nLucky Numbers: ${lotto}`
    });

    createAlarm();
  });
});

createAlarm();
