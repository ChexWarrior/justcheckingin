async function main() {
  const QUOTE_API_ENDPONT = 'https://talaikis.com/api/quotes/random/';
  let quoteElement = document.querySelector('p.quote');
  const response = await fetch(QUOTE_API_ENDPONT);
  const jsonResponse = await response.json();
  const quote = jsonResponse.quote;
  const author = jsonResponse.author;
  quoteElement.innerHTML = `${quote} -${author}`;
  console.log(quoteElement);
  console.log(jsonResponse);
}

main();
