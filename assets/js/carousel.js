const carousel = document.querySelector('.carousel')
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

let currentIndex = 0;
const totalItems = carouselItems.length;

//1154 x 327.5
console.log(carousel.offsetWidth)
console.log(carousel.offsetHeight)

function updateCarousel(currentIndex) {
    const trueWidth = carouselItems.offsetWidth;
    const containerWidth = carouselInner.offsetWidth;
    const itemWidth = carouselItems[currentIndex].offsetWidth;
    const itemHeight = carouselItems[currentIndex].offsetHeight;

    console.log(itemWidth)

    const translateX = (itemWidth) / 2 - currentIndex * itemWidth;
    //const translateY = (itemHeight) / 2 -currentIndex * itemHeight;
    const translateY = 0;

    //carouselInner.style.transform = `translate(${translateX}px, ${translateY}px)`;
    carouselInner.style.transform = `translateX(${translateX}px)`;

    carouselItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    carouselItems.forEach((item, index) => {
      const iframe = item.querySelector('iframe');
      if (iframe) {
        iframe.style.width = item.offsetWidth + 'px';
        iframe.style.height = item.offsetHeight + 'px';
      }
      if (index === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('resize', () => {
    updateCarousel(currentIndex);
  });

  updateCarousel(currentIndex); // update carousel with current index
  
  previousButton.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    updateCarousel(currentIndex); // update carousel with new index
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel(currentIndex); // update carousel with new index
  });
  
//247.59
const fullscreenButtons = document.querySelectorAll('.fullscreen');

fullscreenButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const itemContent = carouselItems[index].querySelector('.item-content');
    const gameFrame = itemContent.querySelector('iframe');
    openFullscreen(gameFrame || itemContent);
  });
});


function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
}