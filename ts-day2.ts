function pilter(n1: number, n2: number, showResult: boolean, text: string):string {

    const filter = text.slice(n1, n2);
    if (showResult) {
        return filter;
    } else {
        return 'Keyword error';
    }
}

const first = 9;
const last = 19;
const printResult = true;
const text = "Learning Typescript is different than Javascript";

const result = pilter(first, last, printResult , text);
console.log(result);