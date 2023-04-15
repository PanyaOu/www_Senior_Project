function setActiveProjectLink() {
  const sidebar = document.querySelector(".sidebar");
  const sidebar_inverted = document.querySelector(".sidebar-inverted");
  const projectLinks = document.querySelectorAll(".project-link");
  const projects = document.querySelectorAll(".project-container");
  const section3 = document.querySelector(".section3");
  const scrollPosition = window.pageYOffset;

  let isWithinProjects = false;

  projects.forEach((project, index) => {
    const projectTop = project.offsetTop;
    const projectBottom = projectTop + project.offsetHeight;

    if (scrollPosition >= projectTop && scrollPosition < projectBottom) {
      isWithinProjects = true;
      projectLinks.forEach(link => link.classList.remove("active"));
      projectLinks[index].classList.add("active");
    }
  });

  const section3Top = section3.offsetTop;
  const section3Bottom = section3Top + section3.offsetHeight;

  // Show or hide the sidebar based on the user's scroll position

  const myElement = document.getElementById("inverse-sidebar-id");


  console.log("Section3 Top", section3Top);
  console.log("section3Bottom", section3Bottom);
  console.log("scrollPosition", scrollPosition);

  if (myElement.classList.contains("sidebar")) {
    const container = document.querySelector(".sidebar");
    const myElementHeight = container.offsetHeight;
    console.log("myElementHeight", myElementHeight);

    if (scrollPosition >= section3Top && scrollPosition < section3Bottom - myElementHeight*2) {
      sidebar.classList.add("visible");
    } else {
      sidebar.classList.remove("visible");
    }
  } else {
    const container = document.querySelector(".sidebar-inverted");
    const myElementHeight = container.offsetHeight;
    console.log("myElementHeight", myElementHeight);

    if (scrollPosition >= section3Top && scrollPosition < section3Bottom - myElementHeight*2) {
      sidebar_inverted.classList.add("visible");
    } else {
      sidebar_inverted.classList.remove("visible");
    }
  }


}
window.addEventListener("scroll", setActiveProjectLink);

/*
function setActiveProjectLink() {
  const sidebar = document.querySelector(".sidebar");
  const sidebar_inverted = document.querySelector(".sidebar-inverted");

  const projectLinks = document.querySelectorAll(".project-link");
  const projects = document.querySelectorAll(".project-container");
  const projectSection = document.querySelector("#project");
  const otherSection = document.querySelector("#other");
  const scrollPosition = window.pageYOffset;

  let isWithinProjects = false;

  projects.forEach((project, index) => {
    const projectTop = project.offsetTop;
    const projectBottom = projectTop + project.offsetHeight;

    if (scrollPosition >= projectTop && scrollPosition < projectBottom) {
      isWithinProjects = true;
      projectLinks.forEach(link => link.classList.remove("active"));
      projectLinks[index].classList.add("active");
    }
  });

  const projectSectionTop = projectSection.offsetTop;
  projectSectionTop = 1734
  const otherTop = otherSection.offsetTop;
  const otherBottom = otherTop + otherSection.offsetHeight;

  const isWithinOtherSection = scrollPosition >= otherTop && scrollPosition < otherBottom;

  // Show or hide the sidebar based on the user's scroll position

  const myElement = document.getElementById("inverse-sidebar-id");
  console.log(scrollPosition, projectSectionTop)
  if (myElement.classList.contains("sidebar")) {
    if (scrollPosition >= projectSectionTop && !isWithinOtherSection) {
      sidebar.classList.add("visible");
    } else {
      sidebar.classList.remove("visible");
    }
  } else {
    if (scrollPosition >= projectSectionTop && !isWithinOtherSection) {
      sidebar_inverted.classList.add("visible");
    } else {
      sidebar_inverted.classList.remove("visible");
    }
  }
}


window.addEventListener("scroll", setActiveProjectLink);
*/