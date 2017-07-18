function getDelay() {
  return 1;
}

function getPortraitURL() {
  return browser.extension.getURL('portraits/caesar.jpg');
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
  const API_ENDPOINT = `https://www.random.org/integers/?num=1&max=${max}&min=${min}&base=10&format=plain&md=new`;
  let response = await fetch(API_ENDPOINT);
  
  return await response.text();
}

browser.alarms.onAlarm.addListener((alarm) => {
  browser.notifications.create('test', {
    type: 'basic',
    iconUrl: getPortraitURL(),
    title: 'Just checking in!',
    message: getMessage()
  });

  createAlarm();
});

createAlarm();
