var Case1 = [1, "data", "3", "result"];
var Case2 = ["Bejo", "has", "4", "sport", "car"];
var printz = function (text) {
    // metode join() mengembalikan array sebagai string.
    return text.join(" ");
};
console.log(printz(Case1));
console.log(printz(Case2));
var user = {
    name: "tegar",
    age: 21,
    alamat: "aaaa"
};
// array
var array;
array = [1, 2, 3];
// tuple
var biodata;
biodata = ["jogja", 123, "111"];
// enum (numeric)
var month;
(function (month) {
    month[month["jan"] = 1] = "jan";
    month[month["feb"] = 2] = "feb";
    month[month["mar"] = 3] = "mar";
    month[month["apr"] = 4] = "apr";
    month[month["mei"] = 5] = "mei";
    month[month["jun"] = 6] = "jun";
    month[month["jul"] = 7] = "jul";
})(month || (month = {}));
// console.log(month[3]);
var bulan = 4;
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
// console.log(month);
// any
var hero = "batman";
hero = 20;
hero = [];
hero = {};
hero = true || false;
// union
var phone;
phone = 62811111;
phone = "085728669512";
function myPhone(phone) {
    return "My Phone is ".concat(phone);
}
myPhone("Iphone");
myPhone("Samsung");
myPhone("Xiaomi");
