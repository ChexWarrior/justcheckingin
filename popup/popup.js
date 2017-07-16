async function displayQuote(dogify) {
  document.querySelector('p.quote').innerHTML = await getQuote(dogify);
}

async function getQuote(dogify = false) {
  const QUOTE_API_ENDPONT = 'https://talaikis.com/api/quotes/random/';
  const response = await fetch(QUOTE_API_ENDPONT);
  const jsonResponse = await response.json();
  const quote = jsonResponse.quote;
  const author = jsonResponse.author;

  if(dogify) {
    return dogifyQuote(quote);
  }

  return  `${quote}<br/>-${author}`;
}

function dogifyQuote(quote) {
  let dogQuote = quote
    .replace(/man|woman/g, 'dog')
    .replace(/men|women/g, 'dogs')
    .replace(/success|failure/g, 'bone');

  return `${dogQuote}<br/>-Caesar`;
}

function addPortrait(subject) {
  let image;
  if(subject === "andy") {
    image = "portraits/andy-140.jpg";
  } else {
    image = "portraits/caesar.jpg";
  }

  document.querySelector('img.face').src = chrome.extension.getURL(image);
}

let andyPortraitInput = document.querySelector('input[value="andy"]');
let caesarPortraitInput = document.querySelector('input[value="caesar"]');
let portraitSelectEvent = (e) => {
  addPortrait(e.target.value);
  displayQuote((e.target.value === 'caesar'));
};

andyPortraitInput.addEventListener('click', (e) => portraitSelectEvent(e));
caesarPortraitInput.addEventListener('click', (e) => portraitSelectEvent(e));
addPortrait('andy');
displayQuote();
