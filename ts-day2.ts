type data = (string | number)[] // alias

let Case1:data =  [1, "data", "3", "result"]
let Case2:data = ["Bejo", "has", "4", "sport", "car"]

const hallo = (text:data):string => {
    // metode join() mengembalikan array sebagai string.
    return text.join(" ")
}

console.log(hallo(Case1));
console.log(hallo(Case2));