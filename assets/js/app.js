//Creates a smooth transition between the current page and the selected page
document.getElementById("scroll-to-section").addEventListener("change", function() {
  var sectionId = this.value;
  if (sectionId !== "") {
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
  }
});



//Sets the very first loading page to be the title page
function scrollToSecondSection() {
  const section2 = document.getElementById('home');
  const section2Position = section2.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
      top: section2Position,
      behavior: 'smooth'
  });
}

window.onload = scrollToSecondSection; // Call the function when the page loads or reloads
