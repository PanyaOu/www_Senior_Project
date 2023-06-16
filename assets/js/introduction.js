
//Fetches data from a google docs and populates a page on the index.html
//ALL FORMATTING FROM GOOGLE DOCS IS SAVED. This is a current issue.
/*
async function fetchGoogleDocContent() {
  const googleDocUrl = 'https://docs.google.com/document/d/e/2PACX-1vQg5TRFar7qpB_ky6CURWWXMoQBZe_c-M11DKLGnBAjcCXfhebhAs3zxzQup3q84-ZetCIhVlF6wZEs/pub';
  const response = await fetch(googleDocUrl);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const content = doc.querySelector('#contents');
  document.getElementById('google-doc-content').innerHTML = content.innerHTML;
}*/

/*
This function grabs the image and text seperately without the formatting.
I have yet to get this to work as the text contains css that I do not yet 
know how to remove. */

const introductionDocURL = document.body.dataset.introductionDocUrl;
const introductionSheetsURL = document.body.dataset.introductionSheetsUrl;


async function fetchGoogleDocContent() {
  const googleDocUrl = introductionDocURL
  const response = await fetch(googleDocUrl);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const content = doc.querySelector('#contents');

  // console.log(content);


  // Fetch plain text
  let textElements  = content.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
  let textContent = Array.from(textElements).map(element => element.textContent);
  let allText = textContent.join("\n");

  document.getElementById('google-doc-content').innerText = allText;

  // Fetch images
  const images = content.querySelectorAll('img');
  const imageContainer = document.getElementById('google-doc-images');
  images.forEach((img) => {
    const newImg = document.createElement('img');
    newImg.src = img.src;
    imageContainer.appendChild(newImg);
  });
}

//fetches information from a google spreadsheet and makes them into links to populate
//the introduction page.
async function fetchGoogleSheetData() {
  const sheetUrl = introductionSheetsURL;
  const response = await fetch(sheetUrl);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const table = doc.querySelector('table');

  const linksContainer = document.getElementById('links-container');
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const name = row.cells[1].textContent;
    const link = row.cells[2].textContent;
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.target = '_blank';
    anchor.textContent = name;
    listItem.appendChild(anchor);
    linksContainer.appendChild(listItem);
  }
}

fetchGoogleSheetData();

fetchGoogleDocContent();