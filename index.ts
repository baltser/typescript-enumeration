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