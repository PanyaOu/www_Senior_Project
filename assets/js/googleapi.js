/*Note that this has yet to work for me. I will continue trying to use google's API in the future but at the 
moment it doesn't work*/


// Client ID and API key from the Developer Console
const CLIENT_ID = '243020814737-646jaqpgpuk401qsfkna8qmvrcdv9g72.apps.googleusercontent.com';
const API_KEY = 'AIzaSyD4Bz2w76GzrUQeYWqkrFShu4lee8FrCfU';

// ID of the Google Document
const DOCUMENT_ID = '1GkExfkkU3QIAoAO9yZ_MMzZWxL2agO54lLr9ywmN_T4';

// Load the Google Docs API
gapi.load('client', displayAboutMe);

function displayAboutMe() {
  // Initialize the Google Docs API client
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ['https://docs.googleapis.com/$discovery/rest?version=v1'],
    scope: 'https://www.googleapis.com/auth/documents.readonly'
  }).then(() => {
    // Call the Google Docs API to retrieve the content of the document
    return gapi.client.docs.documents.get({
      documentId: DOCUMENT_ID,
    });
  }).then(response => {
    // Extract the text content from the response
    const content = response.result.body.content.reduce((acc, obj) => {
      if (obj.paragraph) {
        const text = obj.paragraph.elements.map(element => element.textRun.content).join('');
        acc += `${text}\n`;
      }
      return acc;
    }, '');
    console.log(content);
    // Display the content on the webpage
    document.getElementById('about-me').innerText = content;
  }).catch(error => {
    console.error('Error fetching content from Google Docs:', error);
  });
}


window.gapi.client
        .init({
          clientId:'243020814737-646jaqpgpuk401qsfkna8qmvrcdv9g72.apps.googleusercontent.com',
          scope: "yyaaoouu@gmail.com",
          plugin_name:'Senior Project'
        })
