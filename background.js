const FORTUNE_API_ENDPOINT = 'http://fortunecookieapi.herokuapp.com/v1/cookie';
const ALARM_DELAY_MINUTES_MIN = 1;
const ALARM_DELAY_MINUTES_MAX = 2;
const PORTRAITS = [
  'portraits/caesar.jpg',
  'portraits/andy-140.jpg'
];
const DEFAULT_QUOTES = [
  'Saaaad',
  'Snugu?',
  'Hi!',
  'Iccccceeee',
  'Woof woof, what\'s for lunch? Haha...',
  'Who is that behind you?',
  '*beeeelch*'
];

// const ALARM = chrome.alarms ? chrome.alarms : browser.alarms;
// const NOTIFICATION = chrome.notifications ? chrome.notifications : browser.notifications;
// const EXTENSION = chrome.extension ? chrome.extension : browser.extension;
//
// if(chrome.alarms) console.log('hi');
//
// console.log(ALARM);
// console.log(NOTIFICATION);
// console.log(EXTENSION);

function createDefaultFortune() {
  // emulate return object from fortune api
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
      result = createDefaultFortune();
    }
  } catch(exception) {
    result = createDefaultFortune();
  }

  console.log('fortune', result);
  return result;
}

function createAlarm() {
  delayInMinutes = chance.integer({min: ALARM_DELAY_MINUTES_MIN, max: ALARM_DELAY_MINUTES_MAX});
  console.log('delayInMinutes', delayInMinutes);
  chrome.alarms.create('just-checking-in', {
    delayInMinutes
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  getMessage().then((results) => {
    let [message] = results;
    let lotto = message.lotto.numbers.join(',');
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: chrome.extension.getURL(chance.pick(PORTRAITS)),
      title: 'Just checking in!',
      message: `\n${message.fortune.message}\n\nLucky Numbers: ${lotto}`
    });

    createAlarm();
  });
});

createAlarm();
