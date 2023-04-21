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
  }


  updateCarousel(currentIndex); // update carousel with current index
  
  previousButton.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    updateCarousel(currentIndex); // update carousel with new index
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel(currentIndex); // update carousel with new index
  });

