function add(n1, n2, showResult, phrase) {
    var filter = phrase.slice(n1, n2);
    if (showResult) {
        console.log(filter);
    }
    else {
        return filter;
    }
}
var number1 = 9;
var number2 = 19;
var printResult = true;
var resultPhrase = "Learning Typescript is different than Javascript";
add(number1, number2, printResult, resultPhrase);
