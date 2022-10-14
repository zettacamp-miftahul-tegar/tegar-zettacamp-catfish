function pilter(n1, n2, showResult, text) {
    var filter = text.slice(n1, n2);
    if (showResult) {
        return filter;
    }
    else {
        return 'Text Salah';
    }
}
var first = 9;
var last = 19;
var printResult = true;
var text = "Learning Typescript is different than Javascript";
var result = pilter(first, last, printResult, text);
console.log(result);
