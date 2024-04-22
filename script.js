let hoursArray =[];

for (let i = 0; i < 24; i++) {
    if (i <= 9) {
        hoursArray[i] = '0' + i + ':00';
    } else {
        hoursArray[i] = i + ':00';
    }
};

hoursArray.forEach(()=> {
    console.log(hoursArray)
})
// for (let i = 0; i < 24; i++) {
//     if (i.length == 0) {
//         hoursArray[i] = '0' + i + ':00';
//     } else {
//         hoursArray[i] = i + ':00';
//     }
// };

console.log(hoursArray)

const cells = document.querySelectorAll('.empty');
const buttons = document.querySelectorAll('#btn')
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.toggle('full');
    });
});

const blurElements = document.querySelectorAll('.can-blur')
const popupDivs = document.querySelectorAll('.popup-div')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        blurElements.forEach(blurElement => {
            blurElement.classList.toggle('blurred');
        })
        popupDivs.forEach(popupDiv => {
            popupDiv.classList.toggle('popup-div-display');
        })
    });
});