 /***********      Использование Enums         ***********/
 ////////////      Численные значения enums

 enum Weekdays {
   Monday = 1,
   Tuesday,
   Wednesday,
   Thursday,
   Friday,
   Saturday,
   Sunday
 }
 console.log(Weekdays.Friday);            //  5
 console.log(Weekdays[5]);                // Friday

 // Функция без enum :
 function convertTemperature(temp: number, fromTo: string): number {
   return ('FtoC' === fromTo) ? (temp - 32) * 5.0 / 9.0 : temp * 0.9 / 5.0 + 32;
 }

 console.log(`70F is ${convertTemperature(70, 'FtoC')}C`)
 console.log(`21C is ${convertTemperature(21, 'CtoF')}C`)
 console.log(`35C is ${convertTemperature(35, 'ABCD')}C`)
 // Функция c enum :
 enum Direction {
      FtoC,
      CtoF
 }
 function convertTemperatureEnum(temp: number, fromTo: Direction): number {
  return (Direction.FtoC === fromTo) ? (temp - 32) * 5.0 / 9.0 : temp * 0.9 / 5.0 + 32;
}
console.log(`70F is ${convertTemperatureEnum(70, Direction.FtoC)}C`)
console.log(`21C is ${convertTemperatureEnum(21, Direction.CtoF)}C`)
 ////////////      Строковые значения enums  
 enum Direction {
   Up = "UP",
   Down = "DOWN",
   Left = "LEFT",
   Right = "RIGHT"
 }
 function move (where: Direction) {
   if(where === Direction.Down){
     //Do something
   }
 }
 move ("Norht") //error
 // альтернативы
 function move1 (direction: 'Up' | 'Down' | 'Left' | 'Right') {}

 type Direction1 = 'Up' | 'Down' | 'Left' | 'Right';
 function move2 ( direction: Direction1){}

 //Использование перечислений const
 //Если использовать ключевое слово const при объявлении enum, то его значение будут встроены и код JS сгенерирован НЕ будет
 //ПРИМИЧАНИЕ Врезка "Обратное отобразение численных enums (*Weekdays)" не возможна для const enum, т.к. они не сгенерированны в js

 ////////  Использование обобщений
 class Person {
   name: string;
 }
 class Employee extends Person {
   department: number;
 }
class Animal {
  breed: string;
}

const workers: Array<Person> = [];
workers[0] = new Person();
workers[1] = new Employee();
workers[2] = new Animal(); // error тип Animal не является Person или его поддтипом

//Создание собственных обобщений типов
interface Comparator <T> {
  compareTo(value: T): number;
}

class Rectangle implements Comparator<Rectangle> {
  constructor(private width: number, private height: number){}
  compareTo(value: Rectangle): number {
      return this.width * this.height - value.width * value.height;
  }
}
const rect1: Rectangle = new Rectangle(2, 5);
const rect2:Rectangle = new Rectangle(2, 3)

rect1.compareTo(rect2) > 0 ? console.log("rect 1 is bigger") : rect1.compareTo(rect2) === 0 ? console.log("Rectangles are equal") : console.log('rect 1 is smaller')


class Programmer implements Comparator<Programmer> {
  constructor(public name: string, private salary: number){}
  compareTo(value: Programmer): number {
    return this.salary - value.salary;
  }
}

const prog1: Programmer = new Programmer("John", 20000);
const prog2: Programmer = new Programmer("Alex", 30000);

prog1.compareTo(prog2) > 0 ? console.log(`${prog1.name} is richer`) : prog1.compareTo(prog2) === 0 ? console.log(`${prog1.name} and ${prog2.name} earn the same amounts`) : console.log(`${prog1.name} is richer`);
///// Создание обобщенный функций
function printMe<T> (content: T) {
  console.log(content);
  return content;
}
const a = printMe("Hello");

class Person1 { 
  constructor (public name: string){}
}
const b = printMe(new Person1("Joe"))
//стрелочная функция
const printMe1 = <T> (content: T): T => {
  console.log(content);
  return content;
}
const a1 = printMe/*<string>*/("hello"); // использование явных типов здесь не требуется
//
class Pair<K, V> {
  constructor (public key: K, public value: V) {}
}
function compare <K, V> (pair1: Pair<K, V>, pair2: Pair<K, V>): boolean {
  return pair1.key === pair2.key && pair1.value === pair2.value;
}
let p1: Pair<number, string> =new Pair(1, "Apple");
let p2 = new Pair(1, "Orange");
console.log(compare<number, string>(p1, p2)); // print false

let p3 = new Pair("first", "Orange");
let p4 = new Pair("first", "Orange");
console.log(compare(p3, p4));  // prints true
console.log(compare(p3, p1));  // compile error
//
interface User { 
  name: string;
  role: UserRole;
}

enum UserRole {  
  Administrator = 'admin',
  Manager = 'manager'
}

function loadUser<T>(): T {  
  return JSON.parse('{ "name": "john", "role": "admin" }');
}

const user = loadUser<User>(); 

switch (user.role) {  
  case UserRole.Administrator: console.log('Show control panel'); break;
  case UserRole.Manager: console.log('Hide control panel'); break;
}
///  Обеспечение возвращаемого типа функции высшего порядка
const outerFunc = (someValue: number) => (multiplier: number) => someValue * multiplier;

const innerFunc = outerFunc(10);
let result = innerFunc(5);
console.log(result)
 ///
 type numFunc<T> = (arg: T) => (c: number) => number;

const noArgFunc: numFunc<void> = () => (c: number) => c + 5;
const numArgFunc: numFunc<number> = (someValue: number) => (multiplier: number) => someValue * multiplier;
const stringArgFunc: numFunc<string> = (someText: string) => (padding: number) => someText.length + padding;

const createSumString: numFunc<number> = () => (x: number) => 'Hello'; //error

