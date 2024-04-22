let hoursArray =[];

for (let i = 0; i < 24; i++) {
    if (i <= 9) {
        hoursArray[i] = '0' + i + ':00';
    } else {
        hoursArray[i] = i + ':00';
    }
};

const weeks = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag']
// later the weeks can be rotating, so the first is replaced by the last when each day passes by
//

document.addEventListener("DOMContentLoaded", () => {
    const timeHeader = document.getElementById("cal-start").appendChild(document.createElement("div"))
    timeHeader.className = "time-header"
    timeHeader.textContent = "Uge xxx"
    for (let i = 0; i < hoursArray.length; i++) {
        const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"))
        timeDiv.className = "time";
        timeDiv.textContent = hoursArray[i]
    }

    const timeElements = document.querySelectorAll(".time");
    
    timeElements.forEach((timeElement)=> {
        for (let i = 0; i < weeks.length; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "cell";
            timeElement.parentNode.insertBefore(emptyCell, timeElement.nextSibling);
        }
    })
    
    for (let i = 0; i < weeks.length; i++) {
        const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"))
        dayHeader.className = "day-header";
        dayHeader.textContent = weeks[i];
    }

    // cells[0].classList.add('full');
    // ^this is for making certain cells
    // it should rotate with the weeks
    // set date in JSON and compare with current date to do math

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('full');
        });
    });
    const buttons = document.querySelectorAll('#btn')
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
})