"use strict";

const elForm = document.querySelector('form');
const listInput = Array.prototype.slice.call(elForm.querySelectorAll('input'));
listInput.push(document.querySelector('textarea'));
elForm.addEventListener('submit', event => {
   // for (let item of listInput) {
   //    if (item.value === '') {
   //       item.classList.add('error');
   //       event.preventDefault();
   //    }
   // }
   // /java/i.test(str)
   if (listInput[0].value !== /[а-яА-ЯёЁ]/,g){console.log('ok');}
   if (listInput[1].value !== /\+7(\d*3)\d*3-\d*4/){console.log('ok1');}
   if (listInput[2].value !== /my[.-]?mail@mail.ru/,g){console.log('ok2');}
   if (listInput[3].value !== ''){console.log('ok3');}
});

elForm.addEventListener('input', event => {
   if (event.target.value === '') {
      event.target.classList.add('error');
      return;
   }
   event.target.classList.remove('error');
});


   