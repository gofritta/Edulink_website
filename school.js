
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const direction = btn.id === "left" ? -1 : 1;
        carousel.scrollLeft += direction * firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const InfiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", InfiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

function adjustCarouselContent() {
    const currentScroll = carousel.scrollLeft;
    const currentIndex = Math.round(currentScroll / firstCardWidth);
    const lastIndex = carouselChildrens.length - cardPerView;

    if (currentIndex === 0) {
        // Déplacer les derniers éléments au début
        const lastElems = carouselChildrens.slice(lastIndex);
        lastElems.forEach(elem => {
            carousel.prepend(elem.cloneNode(true));
            carousel.removeChild(elem);
        });
        carousel.scrollLeft += firstCardWidth * lastElems.length;
    } else if (currentIndex >= lastIndex) {
        // Déplacer les premiers éléments à la fin
        const firstElems = carouselChildrens.slice(0, cardPerView);
        firstElems.forEach(elem => {
            carousel.appendChild(elem.cloneNode(true));
            carousel.removeChild(elem);
        });
        carousel.scrollLeft -= firstCardWidth * firstElems.length;
    }
}

carousel.addEventListener("scroll", adjustCarouselContent);
=======
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const direction = btn.id === "left" ? -1 : 1;
        carousel.scrollLeft += direction * firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const InfiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", InfiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

function adjustCarouselContent() {
    const currentScroll = carousel.scrollLeft;
    const currentIndex = Math.round(currentScroll / firstCardWidth);
    const lastIndex = carouselChildrens.length - cardPerView;

    if (currentIndex === 0) {
        // Déplacer les derniers éléments au début
        const lastElems = carouselChildrens.slice(lastIndex);
        lastElems.forEach(elem => {
            carousel.prepend(elem.cloneNode(true));
            carousel.removeChild(elem);
        });
        carousel.scrollLeft += firstCardWidth * lastElems.length;
    } else if (currentIndex >= lastIndex) {
        // Déplacer les premiers éléments à la fin
        const firstElems = carouselChildrens.slice(0, cardPerView);
        firstElems.forEach(elem => {
            carousel.appendChild(elem.cloneNode(true));
            carousel.removeChild(elem);
        });
        carousel.scrollLeft -= firstCardWidth * firstElems.length;
    }
}

carousel.addEventListener("scroll", adjustCarouselContent);

