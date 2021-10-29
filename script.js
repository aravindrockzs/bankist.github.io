'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const navLinks = document.querySelector('.nav__links');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  const { x, y } = section.getBoundingClientRect();

  //old school way
  // window.scrollTo({
  //   left: x + window.scrollX,
  //   top: y + window.scrollY,
  //   behavior: 'smooth',
  // });

  //new way
  section.scrollIntoView({ behavior: 'smooth' });
});

//event bubbling examples;

// document.querySelector('.nav__link').addEventListener('click', e => {
//   console.log('nav__link', e.target);
// });

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  const el = e.target;

  if (el.classList.contains('nav__link')) {
    const id = el.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//building a tabbed component

// console.log(tabs, tabContainer, tabContent);

tabContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');

  const content = clicked.dataset.tab;

  tabs.forEach(tab => {
    tab.classList.remove('operations__content--active');
  });

  tabContent.forEach(el => el.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${content}`)
    .classList.add('operations__content--active');
});

//Menu fade Animation

const handleHover = function (e) {
  // console.log(e.target);
  // console.log(e.currentTarget);
  // console.log(this);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const links = navLinks.querySelectorAll('.nav__link');

    links.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

navLinks.addEventListener('mouseover', handleHover.bind(0.5));

navLinks.addEventListener('mouseout', handleHover.bind(1));
