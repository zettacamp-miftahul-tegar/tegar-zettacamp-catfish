type data = (string | number)[] // alias

let Case1:data =  [1, "data", "3", "result"]
let Case2:(string)[] = ["Bejo", "has", "4", "sport", "car"]

const printz = (text:data):string => {
    // metode join() mengembalikan array sebagai string.
    return text.join(" ")
}

console.log(printz(Case1));
console.log(printz(Case2));

// --------------- Type Data ---------------

// object
type User = {
    name: string,
    age: number
    alamat?: string
};

let user: User = {
    name: "tegar",
    age: 21,
}

// array
let array:number[];
array = [1,2,3]

// tuple
let biodata: [string, number, string];
biodata = ["jogja",123, "111"]

// enum (numeric)
enum month {
    jan = 1,
    feb,
    mar,
    apr,
    mei,
    jun,
    jul
}
console.log(month[3]);

const bulan:month=4
console.log(month[bulan]);

// enum (string)
// enum month {
//     jan = "januari",
//     feb = "february",
//     mar = "maret",
//     apr = "april",
//     mei = "mei",
//     jun = "juni",
//     jul = "july"
// }

// const bulan:month = januari
// console.log(month[bulan]);

// console.log(month);

// any
let hero:any = "batman"

hero = 20;
hero = [];
hero = {};
hero = true || false

// union
let phone: number | string;
phone = 62811111;
phone = "085728669512"

// literal
type Phone = "Iphone" | "Samsung" | "Xiaomi"

function myPhone(phone: Phone): string {
    return `My Phone is ${phone}`
}

myPhone("Iphone")
myPhone("Samsung")
myPhone("Xiaomi")

let a:Phone = "Iphone"
// myPhone("hello")