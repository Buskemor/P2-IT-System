function convertNumber(number) {
    const result = {index: 0, i: 0}
    if (number <= 6) {
        result.i = 0;
    } else {
        result.i = Math.floor(number / 7);
    }
    // console.log(result.i * 7)
    // console.log('num: ' + Math.floor((9 + 5) / 7))
    let steps = -1;
    for (let i = 6; i >= 0; i--) {
        steps++;
    // for (let i = 0; i < 7; i++) {
        console.log(i)
        console.log(`first ${i}`)
        console.log(`second ${result.i * 7 + 1}`)

        if ((number - i) === (result.i * 7)) {
            console.log(steps)
            result.index = steps;
            // result.index = i - (result.i * 7)
            // break;
        }
    }
    return result
}





// function convertNumber(number) {
//     const result = {i: 0, index: 0}
//     if (number <= 6) {
//         result.index = 0;
//     } else {
//         result.index = Math.floor(number / 7);
//     }
//     let steps = -1;
//     for (let i = 6; i >= 0; i--) {
//         steps++;
//         if ((number - i) === (result.i * 7)) {
//             result.i = steps;
//             break;
//         }
//     }
//     return result
// }