


async function determinePortrait() {
  let andyPortraitUrl = chrome.extension.getURL('portraits/andy-140.jpg');
  let caesarPortraitUrl = chrome.extension.getURL('portraits/caesar.jpg');
  let response = await fetch('https://www.random.org/integers/?num=1&max=1&min=0&col=1&base=10&format=plain&md=new');
  let determinePortrait = await response.text();

  console.log(determinePortrait);

  if(determinePortrait > 0) return andyPortraitUrl;

  return caesarPortraitUrl;
}

Promise.resolve(determinePortrait()).then((portrait) => {
  let popup = `<div class="justcheckingin-popup"
    <div class="grid">
      <div><img class="face" src="${portrait}"/></div>
      <div><p class="quote"></p></div>
    </div>
  </div>
  `;

  let outerDiv = document.createElement('div');
  outerDiv.innerHTML = popup;
  document.body.appendChild(outerDiv.firstChild);
});
