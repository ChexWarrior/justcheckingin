async function main() {
  const QUOTE_API_ENDPONT = 'https://talaikis.com/api/quotes/random/';
  const response = await fetch(QUOTE_API_ENDPONT);
  const jsonResponse = await response.json();
  const quote = jsonResponse.quote;
  const author = jsonResponse.author;

  document.querySelector('p.quote').innerHTML = `${quote}<br/>-${author}`;
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

addPortrait('caesar');
main();
