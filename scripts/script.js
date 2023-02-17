const navToggleElem = document.querySelector(".nav__toggle-icon");
const menuElem = document.querySelector(".menu");
const sections = document.querySelectorAll("main > section");
const menuLists = document.querySelectorAll(".menu__list");

navToggleElem.addEventListener("click", () => {
  menuElem.classList.toggle("menu--open");
});

let removeActiveClass = (className) => {
  document.querySelector(`.${className}`).classList.remove(className);
};

let observerHandler = (allSection) => {
  allSection.map((section) => {
    console.log(section);

    let sectionClassName = section.target.className;
    let sectionMenuItem = document.querySelector(
      `.menu__list[data-section=${sectionClassName}]`
    );
    if (section.isIntersecting) {
      sectionMenuItem.classList.add("menu__list--active");
    } else {
      sectionMenuItem.classList.remove("menu__list--active");
    }
  });
};

const observer = new IntersectionObserver(observerHandler, {
  threshold: 0.5,
});

sections.forEach((section) => {
  observer.observe(section);
});

menuLists.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    removeActiveClass("menu__list--active");
    item.classList.add("menu__list--active");

    let sectionClass = item.getAttribute("data-section");
    let sectionOffsetTop = document.querySelector(`.${sectionClass}`).offsetTop;

    window.scrollTo({
      top: sectionOffsetTop - 90,
      behavior: "smooth",
    });
  });
});
