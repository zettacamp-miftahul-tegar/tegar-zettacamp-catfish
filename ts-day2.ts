type data = (string | number)[] // alias

let Case1:data =  [1, "data", "3", "result"]
let Case2:data = ["Bejo", "has", "4", "sport", "car"]

const printz = (text:data):string => {
    // metode join() mengembalikan array sebagai string.
    return text.join(" ")
}

console.log(printz(Case1));
console.log(printz(Case2));

//--------------------------------------------------------

// array
let array:number[];
array = [1,2,3,4,5]

// tuple
let biodata: [string, number, string];
biodata = ["jogja",123, "111"]

// object
type User = {
    name: string,
    age: number
    alamat: string
};

let user: User = {
    name: "tegar",
    age: 21,
    alamat: "aaaa"
}

// any
let hero:any = "batman"

hero = 20;
hero = [];
hero = {};
hero = true || false

// enum (numeric)
// enum month {
//     jan = 1,
//     feb,
//     mar,
//     apr,
//     mei,
//     jun,
//     jul
// }
// console.log(month);

// enum (string)
enum month {
    jan = "januari",
    feb = "february",
    mar = "maret",
    apr = "april",
    mei = "mei",
    jun = "juni",
    jul = "july"
}
console.log(month);

// literal
// let a =  "laki-laki" | "perempuan"

// let b = "laki-laki"
// let c = "perempuan"

// union
let phone: number | string;
phone = 62811111;
phone = "085728669512";
