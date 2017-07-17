// every 15 minutes show a notification with a random quote and portrait
const alarmDelay = .5;

browser.alarms.create({
  delayInMinutes: alarmDelay,
  periodInMinutes: alarmDelay
});

browser.alarms.onAlarm.addListener((alarm) => {
  browser.notifications.create("test", {
    type: 'basic',
    iconUrl: browser.extension.getURL('portraits/caesar.jpg'),
    title: 'TEST',
    message: 'hi!'
  });
});
