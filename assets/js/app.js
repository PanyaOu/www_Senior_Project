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

//Toggle button function
function toggleColorInversion() {
  const section1 = document.querySelector(".section1");
  const section2 = document.querySelector(".section2");
  const section3 = document.querySelector(".section3");
  const section4 = document.querySelector(".section4");
  const sidebar = document.querySelector(".sidebar");

  section1.classList.toggle("color-inverted");
  
  section2.classList.toggle("color-inverted");
  section3.classList.toggle("color-inverted");

  section4.classList.toggle("color-inverted");

  //sidebar.classList.toggle("color-inverted");
}

window.onload = scrollToSecondSection; // Call the function when the page loads or reloads
