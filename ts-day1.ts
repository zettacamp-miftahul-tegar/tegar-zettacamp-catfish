function add(n1: number, n2: number, showResult: boolean, phrase: string) {

    const filter = phrase.slice(n1, n2);
    if (showResult) {
        console.log(filter);
    } else {
        return filter;
    }
}

const number1 = 9;
const number2 = 19;
const printResult = true;
const resultPhrase = "Learning Typescript is different than Javascript";

add(number1, number2, printResult , resultPhrase);