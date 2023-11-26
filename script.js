const leftButton = document.querySelector(".btn-left");
const rightButton = document.querySelector(".btn-right");
const sliderItems = document.querySelectorAll(".slider-item");
const fade = document.querySelector(".fade");

const setTranslateX = (item, position) => {
  // the first visible item is at position 3. 2 items to the left are invisible. And any number of items to the right.
  item.style.transform = `translateX(${100 * (position - 2)}%)`;
};


const toggleAnimation = (item, position) => {
    const animatedPositions = [1,2,3,4,5];
  // the animation must be on only the visible items and two invisible items on sides
  if (!animatedPositions.includes(position)) {
    item.classList.add("no-transition");
  } else {
    item.classList.remove("no-transition");
  }
};

const toggleSmallClass = (item, position) => {
    const smallPositions = [2,4];
    if(smallPositions.includes(position)){
        item.classList.add('small-slider-item');
    }else{
        item.classList.remove('small-slider-item');
    }
}


sliderItems.forEach((item, index) => {
    // Initial setup

  item.dataset.position = index;
  setTranslateX(item, index);
  toggleAnimation(item, index);
  toggleSmallClass(item, index);


    item.addEventListener('click', () => {
        // Setting up the enlargement of items on click

        if(!item.classList.contains('large-slider-item')){
            item.style.removeProperty('transform'); // transform must be removed because it is used to center the large picture
            item.classList.add('large-slider-item');
            fade.classList.add('fade-shown');

        }else{
            item.classList.remove('large-slider-item');
            const position = +item.dataset.position;
            setTranslateX(item, position); // setting translate back
            fade.classList.remove('fade-shown');
        }
    })

});

leftButton.addEventListener("click", () => {
  console.log("left");
  sliderItems.forEach((item) => {
    let position = +item.dataset.position;
    console.log(position + 1);

    position--;

    if (position < 0) {
      position = sliderItems.length - 1;
    }

    item.dataset.position = position;

  

    setTranslateX(item, position);

    toggleSmallClass(item, position);

    toggleAnimation(item, position);
  });
});

rightButton.addEventListener("click", () => {
  sliderItems.forEach((item) => {
    let position = +item.dataset.position;

    position++;

    if (position > sliderItems.length - 1) {
      position = 0;
      //   item.classList.add('no-transition');
    }

    item.dataset.position = position;

    

    setTranslateX(item, position);

    toggleSmallClass(item, position);

    toggleAnimation(item, position);

    // item.classList.remove('no-transition');
  });
});
