import {weekDifferenceAndFullCells as weekDifferenceAndFullCells} from "./calendarObject.js";
import {generateCalendar as generateCalendar} from "./generateCalendar.js";

let weekDifference = 0; //+1 is one week ahead. -1 is one week behind. 0 is current week.
const currentDate = new Date()
const weeks = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
let selectedItemArray = ['washingMachine', 'partyRoom', 'drill', 'vacumnCleaner'] //notice it uses the same names as weekDifferenceAndFullCells
let selectedItem = selectedItemArray[0]
const blurElements = document.querySelectorAll('.can-blur');
const popupDivs = document.querySelectorAll('.hidden-popup-div');
const activePopup = { //set to true when there's an active poup
    order: false,
    budget: false,
    settings: false,
    feedback: false,
    support: false,
};

activatePopup()
deActivatePopup()
exitPopup();

document.addEventListener("DOMContentLoaded", () => {
    console.log('selceted: ' + selectedItem)
    generateCalendar(weekDifferenceAndFullCells, selectedItem, weekDifference, currentDate, weeks);
    
    sharedButtonsClick();
   
    document.getElementById("prev-week").addEventListener("click", () => {
        updateCalendarPreviousWeek()
    });
    document.getElementById("next-week").addEventListener("click", () => {
        updateCalendarNextWeek()
    });
    interactiveCells(weekDifference);
    pushUserChangesToObj();

    
    confirmOrder()
});

function orderTimes() {
    console.log('orderTimes '+weekDifference + ' ' + selectedItem)
    const displayOrderedTimes = document.getElementById('display-ordered-times')
    if (activePopup.order === false) {
        return
    }
    pushUserChangesToObj();

    const selectedTimes = {
        Mandag: [],
        Tirsdag: [],
        Onsdag: [],
        Torsdag: [],
        Fredag: [],
        Lørdag: [],
        Søndag: []
    }
    // console.log(JSON.stringify(selectedTimes))
    let displayString = ''
    for (let i = 0; i < weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].length; i++) {
        selectedTimes[weeks[convertNumber(weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference][i]).x]].push(convertNumber(weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference][i]).y)
    }
    for (let weekDay in selectedTimes) {
        if (selectedTimes[weekDay].length !== 0) {
            displayString += `<div>${weekDay}:</div>`
            for (let i = 0; i < selectedTimes[weekDay].length; i++) {
                if (selectedTimes[weekDay][i] <= 9) {
                    selectedTimes[weekDay][i] = '   0' + selectedTimes[weekDay][i] + ':00';
                } else {
                    selectedTimes[weekDay][i] = '   '+ selectedTimes[weekDay][i] + ':00';
                }
            }
            displayString += `<div>${selectedTimes[weekDay]}</div>`
        }
    }
    displayOrderedTimes.innerHTML = displayString

}

function confirmOrder() {
    const confirmBtn = document.getElementById('confirm-btn-id')
    confirmBtn.addEventListener('click', () => {
        removeActivePopup(activePopup);
        pushUserChangesToObj(true);
        weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference] = []
        generateCalendar(weekDifferenceAndFullCells, selectedItem, weekDifference, currentDate, weeks);
        interactiveCells();
    });
}

function updateCalendarPreviousWeek() {
    currentDate.setDate(currentDate.getDate() - 7); //change the date of currentDate to what last week would look like (hence -7)
    pushUserChangesToObj(); //+1 because it needs to save the current week, not the one we are going to
    weekDifference--;
    generateCalendar(weekDifferenceAndFullCells, selectedItem, weekDifference, currentDate, weeks); // Refresh the calendar
    interactiveCells();
}

function updateCalendarNextWeek() {
    currentDate.setDate(currentDate.getDate() + 7); //change the date of currentDate to what next week would look like (hence +7)
    pushUserChangesToObj() //-1 because it needs to save the current week, not the one we are going to
    weekDifference++;
    generateCalendar(weekDifferenceAndFullCells, selectedItem, weekDifference, currentDate, weeks); // Refresh the calendar
    interactiveCells();
}

function interactiveCells() {

    const cells = document.querySelectorAll('.cell');

    let isMouseDown = false;
    let firstHeldClickCell;
    cells.forEach((cell) => {
        if (weekDifference < 0) { //add a class that removes functionality from cells when it's too old
            cell.classList.toggle('oldcell')
            return;
        }
        if (!cell.classList.contains('locked') && (!cell.classList.contains('self-locked'))) { //if the cell isn't locked, allow interaction
            cell.addEventListener('click', () => {
                cell.classList.toggle('full')
            });
            cell.addEventListener('mousedown', () => {
                isMouseDown = true;
                firstHeldClickCell = cell;
            })
            cell.addEventListener('mouseover', () => {
                if (isMouseDown) {
                    cell.classList.toggle('full');
                    if (firstHeldClickCell) {
                        firstHeldClickCell.classList.toggle('full');
                    }
                }
                firstHeldClickCell = undefined
            })
        }
        cell.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
    });
};

function sharedButtonsClick () {
    const sharedButtons = document.querySelectorAll('.shared-items-btn');
    sharedButtons.forEach(sharedButton => {
        sharedButton.addEventListener('click', () => {

            console.log('IM BEING PRESSED OMG')
            switch (sharedButton.id) {
                case 'washing-machine-btn':
                    sharedButtonsCase(0)
                    break;
                case 'party-room-btn':
                    sharedButtonsCase(1)
                    break;
                case 'drill-btn':
                    sharedButtonsCase(2)
                    break;
                case 'vacumn-cleaner-btn':
                    sharedButtonsCase(3)
                    break;
            }
        });
    });
}

function sharedButtonsCase(index) {
    // console.log(selectedItemArray[index]);
    pushUserChangesToObj();
    selectedItem = selectedItemArray[index];
    generateCalendar(weekDifferenceAndFullCells, selectedItem, weekDifference, currentDate, weeks);
    interactiveCells();
}

function activatePopup () {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', () => {
            switch (navButton.id) {
                case 'order-btn':
                    document.getElementById('order-div').classList.toggle('display-none');
                    activePopup.order = true;
                    orderTimes(activePopup);
                    break;
                case 'budget-btn':
                    document.getElementById('budget-div').classList.toggle('display-none');
                    activePopup.budget = true;
                    break;
                case 'settings-btn':
                    document.getElementById('settings-div').classList.toggle('display-none');
                    activePopup.settings = true;
                    break;
                case 'feedback-btn':
                    document.getElementById('feedback-div').classList.toggle('display-none');
                    activePopup.feedback = true;
                    break;
                case 'support-btn':
                    document.getElementById('support-div').classList.toggle('display-none');
                    activePopup.support = true;
                    break;
                case 'logout-btn':
                    window.location.href = "index.html";
                    return; //return so the popup doesn't flashbang you when you logout
            };
            blurElements.forEach(blurElement => {
                blurElement.classList.toggle('blurred');
            });
            popupDivs.forEach(popupDiv => {
                popupDiv.classList.toggle('popup-div-display');
            });
        });
    });
};

function deActivatePopup() {
    document.addEventListener('click', (event) => {
        const isPopupTrigger = event.target.classList.contains('nav-btn');
        const isPopupContent = event.target.classList.contains('popup-div');
        if (!isPopupTrigger && !isPopupContent) {
            let isInsidePopup = false;
            popupDivs.forEach(popupDiv => {
                if (popupDiv.contains(event.target)) {
                    isInsidePopup = true;
                };
            });
            if (!isInsidePopup) {
                removeActivePopup(activePopup);
            };
        };
    });
};


function pushUserChangesToObj(currentlyConfirmingOrder) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        try {
            pushNewFullToCellArray(cell, index, currentlyConfirmingOrder);
        } catch(error) {
            console.log('THIS ERROR IS TOTALLY INTENTIONAL: ' +error);
        }   
    })
}

function pushNewFullToCellArray(cell, index, currentlyConfirmingOrder) {
    if (cell.classList.contains('full')) {
        if (!weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].includes(index)) { //i can use index here because the cells in the forEach loop is a nodeList
            // console.log('full and no index' + JSON.stringcell)
            weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].push(index);
        }
        if (currentlyConfirmingOrder === true) {
            if (!weekDifferenceAndFullCells[selectedItem].currentUserLocked[weekDifference].includes(index)) {
                weekDifferenceAndFullCells[selectedItem].currentUserLocked[weekDifference].push(index);
            }
        }
    } else {
        for (let i = weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].length - 1; i >= 0; i--) {
            if (weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].includes(index)) {
                weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].splice(i, 1);
            }
        };
    };
};

function exitPopup(activePopup) {
    const exitButton = document.querySelectorAll('.exit-popup');
    exitButton.forEach(exitButton => {
        exitButton.addEventListener('click', () => {
            removeActivePopup(activePopup);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            removeActivePopup(activePopup);
        }
    })
}

function removeActivePopup(activePopup) {
    for (let key in activePopup) {
        if (activePopup[key] === true) {
            document.getElementById(`${key}-div`).classList.add('display-none');
            activePopup[key] = false;
        }
    }
    blurElements.forEach(blurElement => {
        blurElement.classList.remove('blurred');
    });
    popupDivs.forEach(popupDiv => {
        popupDiv.classList.remove('popup-div-display');
    });
}

function convertNumber(number) {
    const result = {x: 0, y: 0};
    result.x = number % 7;
    result.y = Math.floor(number / 7);
    return result;
}

function submitFeedback() {

    let message = document.getElementById("message-box").value;

    console.log("Feedback Message:", message);
    document.getElementById("message-box").value = "";
    document.getElementById("popup-message").classList.toggle('display-none');
    let popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = "Tak for din feeback";
    popupMessage.style.display = "block"; //so it displays something

    setTimeout(function(){
        popupMessage.style.display = "none";
    }, 3000); 
}
function Sentfunction() {
    let message2 = document.getElementById("message-box").value;

    console.log("Send Message2:", message2);
    document.getElementById("message-box2").value = "";
    document.getElementById("support-div").classList.toggle('display-none');
    
}

// Næste måned 
function næsteMåned() {
    let måneder = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    let nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    let næsteMånedsIndex = (nuværendeMånedsIndex + 1) % måneder.length;
    document.getElementById('current-month').textContent = måneder[næsteMånedsIndex];
}

// Forrige måned
function forrigeMåned() {
    let måneder = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    let nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    let forrigeMånedsIndex = (nuværendeMånedsIndex - 1 + måneder.length) % måneder.length;
    document.getElementById('current-month').textContent = måneder[forrigeMånedsIndex];
}