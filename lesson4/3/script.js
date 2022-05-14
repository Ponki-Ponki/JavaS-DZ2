"use strict";

const elForm = document.querySelector('form');
const listInput = Array.prototype.slice.call(elForm.querySelectorAll('input'));
listInput.push(document.querySelector('textarea'));
elForm.addEventListener('submit', event => {
   if (/[^а-яА-ЯёЁ]/g.test(listInput[0].value)){
         listInput[0].classList.add('error');
         document.querySelector('#name').style.display = 'block';
         event.preventDefault();
   } else {
      document.querySelector('#name').style.display = 'none'
      listInput[0].classList.remove('error');
   };
   if (!/\+7\(\d+\)\d+-\d+/g.test(listInput[1].value)){
      listInput[1].classList.add('error');
      document.querySelector('#tel').style.display = 'block'
      event.preventDefault();
   } else {
      document.querySelector('#tel').style.display = 'none'
      listInput[0].classList.remove('error');
   };
   if (!/my[.-]?mail@mail.ru/g.test(listInput[2].value)){
      listInput[2].classList.add('error');
      document.querySelector('#email').style.display = 'block'
      event.preventDefault();
   } else {
      document.querySelector('#email').style.display = 'none'
      listInput[0].classList.remove('error');
   };
   if (listInput[3].value === ''){
      listInput[3].classList.add('error');
      document.querySelector('#area').style.display = 'block'
      event.preventDefault();
   } else {
      document.querySelector('#area').style.display = 'none'
      listInput[0].classList.remove('error');
   };
});

elForm.addEventListener('input', event => {
   if (event.target.value === '') {
      event.target.classList.add('error');
      return;
   }
   event.target.classList.remove('error');
   event.target.parentElement.nextElementSibling.style.display = 'none';
});


   