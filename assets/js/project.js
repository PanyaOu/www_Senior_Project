function setActiveProjectLink() {
  const sidebar = document.querySelector(".sidebar");
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
  const otherTop = otherSection.offsetTop;
  const otherBottom = otherTop + otherSection.offsetHeight;

  const isWithinOtherSection = scrollPosition >= otherTop && scrollPosition < otherBottom;

  // Show or hide the sidebar based on the user's scroll position
  if (scrollPosition >= projectSectionTop && !isWithinOtherSection) {
    sidebar.classList.add("visible");
  } else {
    sidebar.classList.remove("visible");
  }
}
window.addEventListener("scroll", setActiveProjectLink);