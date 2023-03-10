// function addScriptToPage(path) {
//     var script = document.createElement('script');
//     script.src = path;
//     document.head.appendChild(script);
//   }


function scrollToSecondSection() {
const section2 = document.getElementById('home');
const section2Position = section2.getBoundingClientRect().top + window.pageYOffset;

window.scrollTo({
    top: section2Position,
    behavior: 'smooth'
});
}

window.onload = scrollToSecondSection; // Call the function when the page loads or reloads