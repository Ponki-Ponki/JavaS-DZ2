// let regExp = new RegExp('expression', 'flags');
// let regExp = /expression/flags;

// i - поиск без учета регистра
// g - множественный поиск
// m - многострочный поиск

let str = 'Язык JavaScript называется так из-за популярности языка Java';
// let regExp = new RegExp('java', 'i');
// let searchStr = 'some';
// let regExp = /`${searchStr}`/;
// let regExp = new RegExp(searchStr, 'i');

// console.log(regExp);

// search
// console.log(str.search(/java/ig));

// match
// console.log(str.match(/java/ig));

// replace
// console.log('+7 (000)000-00-00'.replace(/-/g, ':'));

// let name = 'Snow, John';

// console.log(name.replace(/([a-z]+), ([a-z]+)/i, '$2 $1'));
// console.log(name.replace(/([a-z]+), ([a-z]+)/i, 'Было: $&\nСтало: $2 $1'));

// Классы
// \d - [0123456789] - [0-9]
// \D - [^0123456789] - [^0-9]
// \w - [a-z0-9_]
// \W
// \s - space, tab, \n
// \S
// \b - граница слова
// \B

// Квантификаторы
// {m} - строго m раз
// {m,n} - от m до n раз
// {m,} - от m до бесконечности
// {,n} - от 0 до n раз

// for rus [а-яА-ЯёЁ]
// + - {1,}
// * - {0,}
// ? - {0,1}

// console.log('+7-(000) 000:00-00'.replace(/\D/g, '')) // 70000000000
// console.log('+7-(000) 000:00-00'.match(/\d+/g).join('')) // 70000000000

// console.log('color colour'.match(/colou?r/g));
// console.log('color colour colotr'.match(/colo[ut]?r/g));

// console.log('Язык JavaScript это не Java вам =)'.match(/\bjava\b/i));

// console.log('JavaScript это не Java'.match(/^java/i));
// console.log('JavaScript это не Java'.match(/java$/i));

// console.log('Chapter 7.2 7f2'.match(/\d\.\d/g));

// test
// console.log(/java/i.test(str));

// exec
let result;
let regExp = /java/ig;

console.log(`Начальный индекс lastIndex ${regExp.lastIndex}`);
while(result = regExp.exec(str)) {
    console.log(result);
    console.log(`Текущий lastIndex ${regExp.lastIndex}`);
}
console.log(`Конечный lastIndex ${regExp.lastIndex}`);