function setActiveProjectLink() {
  const sidebar = document.querySelector(".sidebar");
  const sidebar_inverted = document.querySelector(".sidebar-inverted");
  const projectLinks = document.querySelectorAll(".project-link");
  const projects = document.querySelectorAll(".project-container");

  const calender = document.querySelector(".other-iframe"); // Get the calender element

  const scrollPosition = window.pageYOffset;

  let activeProjectIndex = null;
  let showSidebar = false;  // flag to track if the sidebar should be visible

  // Determine which project is currently in view
  projects.forEach((project, index) => {
    const projectTop = project.offsetTop;
    const projectBottom = projectTop + project.offsetHeight;

    if (scrollPosition >= projectTop && scrollPosition < projectBottom) {
      activeProjectIndex = index;
    }
  });

  // Update the active project link
  projectLinks.forEach((link, index) => {
    if (index === activeProjectIndex) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Check if user is on the title page (section2) or any project page
  const titlePage = document.querySelector('#section2');
  const titlePageTop = titlePage.offsetTop;
  const titlePageBottom = titlePageTop + titlePage.offsetHeight;

  if (scrollPosition >= titlePageTop && scrollPosition < titlePageBottom) {
    showSidebar = true;
  }

  // Show or hide the sidebar based on the user's scroll position
  if (showSidebar || activeProjectIndex !== null) {
    sidebar.classList.add("visible");
    sidebar_inverted.classList.add("visible");

    calender.style.marginLeft = "200px"; // Adjust the margin when sidebar is visible
  } else {
    sidebar.classList.remove("visible");
    sidebar_inverted.classList.remove("visible");

    calender.style.marginLeft = "0"; // Reset the margin when sidebar is hidden
  }
}

window.addEventListener("scroll", setActiveProjectLink);
