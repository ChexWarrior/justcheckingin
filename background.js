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
