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


    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('full');
        });
    });

    // const savedCells = {person: {nichlas: {optaget: [0,7,14,21]}}}
    // for (let i = 0; i < savedCells.person.nichlas.optaget.length; i++) {
    //     cells[savedCells.person.nichlas.optaget[i]].classList.add('full');
    // }
    
    // cells[0].classList.add('full');
    // ^this is for making certain cells
    // it should rotate with the weeks
    // set date in JSON and compare with current date to do math


    const navButtons = document.querySelectorAll('.nav-btn')
    const exitButton = document.querySelectorAll('.exit-popup')

    exitButton.forEach(exitButton => {
        exitButton.addEventListener('click', () => {
            blurElements.forEach(blurElement => {
                blurElement.classList.toggle('blurred');
            })
            popupDivs.forEach(popupDiv => {
                popupDiv.classList.toggle('popup-div-display');
            })
        });
    });
    const blurElements = document.querySelectorAll('.can-blur')
    const popupDivs = document.querySelectorAll('.hidden-popup-div')
    
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', () => {
            blurElements.forEach(blurElement => {
                blurElement.classList.toggle('blurred');
            })
            popupDivs.forEach(popupDiv => {
                popupDiv.classList.toggle('popup-div-display');
            })
            if (document.getElementById("budget-btn")) {
                popupDiv.classList.toggle('')
            }
        });
    });






    // const hiddenExits = document.querySelectorAll('#hidden-exit')
    // navButtons.forEach(navButton => {
        
    // });    
    // document.getElementById('hidden-exit').addEventListener('click', () => {
    //     console.log('WHAHAAT')
    // });
})