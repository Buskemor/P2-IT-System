const cells = document.querySelectorAll('.empty');
const buttons = document.querySelectorAll('#btn')
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.toggle('full');
    });
    // cell.addEventListener('mouseover', () => {
    //     cell.classList.add('tempred');
    // });
    // cell.addEventListener('mouseleave', () => {
    //     cell.classList.remove('tempred');
    // });
});

const blurElements = document.querySelectorAll('.blur')
const popupDivs = document.querySelectorAll('.popup-div')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('works')
        // popupDivs.classList.toggle('popup-div-display');
        // document.body.classList.toggle('blur');

        blurElements.forEach(blurElement => {
            blurElement.classList.toggle('blurred');
        })
        popupDivs.forEach(popupDiv => {
            popupDiv.classList.toggle('popup-div-display');
        })
    });
});

