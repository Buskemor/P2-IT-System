weekDifference = 0; //+1 is one week ahead. -1 is one week behind. 0 is current week.
const weekDifferenceAndFullCells = { //THE SAME AS fullCells
    washingMachine: {
        otherUsers: {
            0: [50,57,60,63,67,70,86,93,94,99,101,105,106,110,112,117,143,147,148,150,153,154,155,160],
            1: [92,93,98,99,100,105],
            2: [],
            3: [],
        },
        currentUser: {
            0: [],
            1: [],
            2: [],
            3: [],
        },
        currentUserLocked: {
            0: [],
            1: [],
            2: [],
            3: [],
        }
    },
    partyRoom: {
        otherUsers: {
            0: [66,73,80,87,94,99,101,106,113,120,127,134,141,148,155],
            1: [110,111,117,118,124,125,131,132,138,139,145,146,152,153,159,160,166,167,5,6,12,13,19,20,26,27],
            2: [],
            3: [],
        },
        currentUser: {
            0: [],
            1: [],
            2: [],
            3: [],
        },
        currentUserLocked: {
            0: [],
            1: [],
            2: [],
            3: [],
        }
    },
    drill: {
        otherUsers: {
            0: [55, 63, 71, 77, 89, 99, 112, 121, 125, 137],
            1: [95, 97, 102, 105, 109, 112],
            2: [],
            3: [],
        },
        currentUser: {
            0: [],
            1: [],
            2: [],
            3: [],
        },
        currentUserLocked: {
            0: [],
            1: [],
            2: [],
            3: [],
        }
    },
    vacumnCleaner: {
        otherUsers: {
            0: [45, 52, 59, 62, 65, 72, 84, 95, 97, 101, 102, 107, 109, 113, 116, 119, 140, 144, 149, 152, 155, 157, 162],
            1: [90, 94, 97, 100, 103, 106],
            2: [],
            3: [],
        },
        currentUser: {
            0: [],
            1: [],
            2: [],
            3: [],
        },
        currentUserLocked: {
            0: [],
            1: [],
            2: [],
            3: [],
        }
    }
};

let selectedItemArray = ['washingMachine', 'partyRoom', 'drill', 'vacumnCleaner']
let selectedItem = selectedItemArray[0]
const blurElements = document.querySelectorAll('.can-blur');
const popupDivs = document.querySelectorAll('.hidden-popup-div');
const activePopup = {
    order: false,
    budget: false,
    settings: false,
    feedback: false,
    support: false,
};

activatePopup(activePopup, blurElements, popupDivs)
deActivatePopup(activePopup, popupDivs)
exitPopup(activePopup);

document.addEventListener("DOMContentLoaded", () => {
    let currentDate
    let initialWeekNumber

    generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);

    document.getElementById("prev-week").addEventListener("click", updateCalendarPreviousWeek);
    document.getElementById("next-week").addEventListener("click", updateCalendarNextWeek);
    interactiveCells(weekDifferenceAndFullCells, weekDifference);

    pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem);
    sharedButtonsClick();

    function updateCalendarPreviousWeek() {
        weekDifference--;
        currentDate.setDate(currentDate.getDate() - 7); // Update the current date to the previous week
        initialWeekNumber = getWeekNumber(currentDate); // Update the initial week number
        console.log('week diff: ' + weekDifference)
        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference+1, selectedItem);
        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem); // Refresh the calendar
        interactiveCells(weekDifferenceAndFullCells, weekDifference);
    }
    
    function updateCalendarNextWeek() {
        weekDifference++;
        currentDate.setDate(currentDate.getDate() + 7); // Update the current date to the next week
        initialWeekNumber = getWeekNumber(currentDate); // Update the initial week number
        
        console.log('week diff: ' + weekDifference)
        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference-1, selectedItem)
        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem); // Refresh the calendar
        interactiveCells(weekDifferenceAndFullCells, weekDifference);
    }

    function getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000; // 86400000 is how many milliseconds in a day
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    function generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem) {
        document.getElementById("cal-start").innerHTML = "";
        currentDate = currentDate || new Date(); // in case we already set a date, it doesn't make a new one
        let hoursArray = [];
        for (let i = 0; i < 24; i++) {
            if (i <= 9) {
                hoursArray[i] = '0' + i + ':00';
            } else {
                hoursArray[i] = i + ':00';
            }
        }
    
        const weeks = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    
        const timeHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
        timeHeader.className = "time-header";
        const currentWeek = getWeekNumber(currentDate);
        if (!initialWeekNumber) initialWeekNumber =  currentWeek;
        timeHeader.textContent = "Uge " + currentWeek;
        
        let currentDayIndex = currentDate.getDay();
    
        if (currentDayIndex === 0) {
            currentDayIndex = 7;
        }
    
    
        for (let i = 0; i < hoursArray.length; i++) {
            const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"));
            timeDiv.className = "time";
            timeDiv.textContent = hoursArray[i];
        }

        addTimeElements(weekDifferenceAndFullCells[selectedItem].otherUsers[weekDifference], weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference]) //note: this isn't an array, it's an object using bracket notation 

        function addTimeElements(fullCellsArrayOtherUsers, fullCellsArrayCurrentUser) { //an array of full cells from top left to bottom right in reading order.
            const timeElements = document.querySelectorAll(".time");
            timeElements.forEach((timeElement, index) => {
                for (let i = 0; i < weeks.length; i++) {
                    const dayCell = document.createElement("div");
                    dayCell.className = "cell";
                    addLockedOrFullCells(fullCellsArrayCurrentUser, 'full') //not using this currently
                    addLockedOrFullCells(fullCellsArrayOtherUsers, 'locked') //important: we know whether or not to lock them because we know everything in the array needs to be locked (thats the point of the  array)
                    function addLockedOrFullCells(fullCellsArray, lockedOrFull) {
                        if (fullCellsArray) { //only runs if there are cells in the array. Not actually sure if it works or if we need it
                            for (let j = 0; j < fullCellsArray.length; j++) { //running through all the cells in the array 
                                if (i == convertNumber(fullCellsArray[j]).i && index == convertNumber(fullCellsArray[j]).index) { //checks if a specific cell should be locked
                                    dayCell.classList.add(lockedOrFull);
                                }
                            }
                        }
                    }
                    timeElement.parentNode.insertBefore(dayCell, timeElement.nextSibling);
                }
            });
        }

        for (let i = 0; i < weeks.length; i++) {
            const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
            dayHeader.className = "day-header";
            let dayIndex = (currentDayIndex + i - 1) % 7;
            if (dayIndex < 0) dayIndex += 7; // Handling negative indices
    
            dayHeader.textContent = weeks[dayIndex];

            const dateForDay = new Date(currentDate);
            dateForDay.setDate(dateForDay.getDate() + i); // Adjust date to represent previous weeks
    
            const formattedDate = ("0" + dateForDay.getDate()).slice(-2) + "/" + ("0" + (dateForDay.getMonth() + 1 /*because months start at 0 in js..*/)).slice(-2);
    
            const dateDisplay = document.createElement("div");
            dateDisplay.className = "date";
            dateDisplay.textContent = formattedDate;
            dayHeader.appendChild(dateDisplay);
        }
    }

    function interactiveCells(weekDifference) {
        const cells = document.querySelectorAll('.cell');
    
        let isMouseDown = false;
        let firstHeldClickCell;
        cells.forEach((cell, index) => {
            if (!cell.classList.contains('locked') || (weekDifference < 0)) { //if it's locked or from last week then we can't edit it
                cell.addEventListener('click', () => {
                    cell.classList.toggle('full')
                    // console.log(firstHeldClickCell, index)
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
            } else {

            }
  
            cell.addEventListener('mouseup', () => {
                isMouseDown = false;
            });
        })

    }
    
    function sharedButtonsClick () {
        const sharedButtons = document.querySelectorAll('.shared-items-btn')
        
        sharedButtons.forEach(sharedButton => {
            sharedButton.addEventListener('click', () => {
                switch (sharedButton.id) {
                    case 'washing-machine-btn':
                        console.log('wash')
                        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        selectedItem = selectedItemArray[0] //vaskerum
                        
                        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        interactiveCells(weekDifferenceAndFullCells, weekDifference);
                        break
                    case 'party-room-btn':
                        console.log('party')
                        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        selectedItem = selectedItemArray[1] //festlokale
                        
                        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        interactiveCells(weekDifferenceAndFullCells, weekDifference);
                        break
                    case 'drill-btn':
                        console.log('drill')
                        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        selectedItem = selectedItemArray[2] //boremaskine
                        
                        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        interactiveCells(weekDifferenceAndFullCells, weekDifference);
                        break
                    case 'vacumn-cleaner-btn':
                        console.log('vacumn')
                        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        selectedItem = selectedItemArray[3] //støvsuger
                        
                        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);
                        interactiveCells(weekDifferenceAndFullCells, weekDifference);
                        break
                }
            })
        })
    }
});

function activatePopup (activePopup, blurElements, popupDivs) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', () => {
            switch (navButton.id) {
                case 'order-btn':
                    document.getElementById('order-div').classList.toggle('display-none');
                    activePopup.order = true;
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
}

function deActivatePopup(activePopup, popupDivs) {
    document.addEventListener('click', (event) => {
        const isPopupTrigger = event.target.classList.contains('nav-btn');
        const isPopupContent = event.target.classList.contains('popup-div');
        if (!isPopupTrigger && !isPopupContent) {
            let isInsidePopup = false;
            popupDivs.forEach(popupDiv => {
                if (popupDiv.contains(event.target)) {
                    isInsidePopup = true;
                }
            });
            if (!isInsidePopup) {
                removeActivePopup(activePopup)
            }
        }
    });
}


function pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        try {
            pushNewFullToCellArray(cell, index, weekDifferenceAndFullCells, weekDifference, selectedItem);
        } catch(error) {
            console.log('THIS ERROR IS TOTALLY INTENTIONAL: ' +error)
        }   
    })
}

function convertNumber(number) { //lowest number is 0. Highest is 167. 
    //this function converts one number into an object with two numbers; i and index.
    //the calendars row starts at 0 (from the top), and goes up to 23. This is result.index.
    //the calendars column starts at 6 (from the left) and goes down to 0. This is result.i.
    const result = {index: 0, i: 0}
    if (number <= 6) {
        result.index = 0;
    } else {
        result.index = Math.floor(number / 7);
    }
    let steps = -1;
    for (let i = 6; i >= 0; i--) {
        steps++;
        if ((number - i) === (result.index * 7)) {
            result.i = steps;
            break;
        }
    }
    return result
}

function pushNewFullToCellArray(cell, index, weekDifferenceAndFullCells, weekDifference, selectedItem) {
    if (cell.classList.contains('full')) {
        if (weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].includes(index)) { //the index works here because the cells in the forEach loop is a nodeList
        } else {
            weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].push(index)
        }
    } else {
        for (let i = weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].length - 1; i >= 0; i--) {
            if (weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].includes(index)) {
                weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference].splice(i, 1)
            }
        }
    }
}

function exitPopup(activePopup) {
    const exitButton = document.querySelectorAll('.exit-popup');

    exitButton.forEach(exitButton => {
        exitButton.addEventListener('click', () => {
            removeActivePopup(activePopup)
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) { //Keycode 27 = is the number of Escape on a keyboard
            removeActivePopup(activePopup)
        }
    })
}

function removeActivePopup(activePopup) {
    for (let key in activePopup) {
        if (activePopup[key] === true) {
            console.log(key)
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
    var måneder = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    var nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    var næsteMånedsIndex = (nuværendeMånedsIndex + 1) % måneder.length;
    document.getElementById('current-month').textContent = måneder[næsteMånedsIndex];
}

// Forrige måned
function forrigeMåned() {
    var måneder = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
    var nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    var forrigeMånedsIndex = (nuværendeMånedsIndex - 1 + måneder.length) % måneder.length;
    document.getElementById('current-month').textContent = måneder[forrigeMånedsIndex];
}