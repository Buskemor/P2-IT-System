weekDifference = 0; //+1 is one week ahead. -1 is one week behind. 0 is current week.
const weekDifferenceAndFullCells = {
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
let currentUser = 'currentUser'
let otherUsers = 'otherUsers'
let currentUserLocked = 'currentUserLocked'

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

activatePopup(activePopup, blurElements, popupDivs)
deActivatePopup(activePopup, popupDivs)
exitPopup(activePopup);

function orderTimes(weekDifferenceAndFullCells, activePopup) {
    const displayOrderedTimes = document.getElementById('display-ordered-times')
    if (activePopup.order === true) {
        // let currentUserLocked = 'currentUserLocked'
        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem, currentUser);

        const selectedTimes = {
            Mandag: [],
            Tirsdag: [],
            Onsdag: [],
            Torsdag: [],
            Fredag: [],
            Lørdag: [],
            Søndag: []
        }
        console.log(JSON.stringify(selectedTimes))
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
}


document.addEventListener("DOMContentLoaded", () => {

    let currentDate

    generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);

    document.getElementById("prev-week").addEventListener("click", updateCalendarPreviousWeek);
    document.getElementById("next-week").addEventListener("click", updateCalendarNextWeek);
    interactiveCells(weekDifference);

    pushUserChangesToObj(weekDifference, selectedItem, currentUser);
    sharedButtonsClick();
    confirmOrder(weekDifferenceAndFullCells, weekDifference, selectedItem)
    function confirmOrder(weekDifferenceAndFullCells, weekDifference, selectedItem) {
        const confirmBtn = document.getElementById('confirm-btn-id')
        confirmBtn.addEventListener('click', () => {
            removeActivePopup(activePopup);
            pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem, currentUserLocked);
            weekDifferenceAndFullCells[selectedItem][currentUser][weekDifference] = []
            console.log(weekDifferenceAndFullCells[selectedItem][currentUser][weekDifference])
            generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);
            interactiveCells(weekDifference);
        });
    }

    function updateCalendarPreviousWeek() {
        weekDifference--;
        currentDate.setDate(currentDate.getDate() - 7); //change the date of currentDate to what last week would look like (hence -7)
        console.log('week diff: ' + weekDifference)
        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference+1, selectedItem, currentUser); //+1 because it needs to save the current week, not the one we are going to
        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem); // Refresh the calendar
        interactiveCells(weekDifference);
    }
    
    function updateCalendarNextWeek() {
        weekDifference++;
        currentDate.setDate(currentDate.getDate() + 7); //change the date of currentDate to what next week would look like (hence +7)
        console.log('week diff: ' + weekDifference)
        pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference-1, selectedItem, currentUser) //-1 because it needs to save the current week, not the one we are going to
        generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem); // Refresh the calendar
        interactiveCells(weekDifference);
    }



    function generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem) {
        document.getElementById("cal-start").innerHTML = ""; //reset the old html before generating the new one
        currentDate = currentDate || new Date(); // in case we already set a date, it doesn't make a new one
        

        generateWeekElement(currentDate)
        generateHourElements()
        genereateCellElements(weekDifferenceAndFullCells[selectedItem].otherUsers[weekDifference] /* <- explaining this*/, weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference], weekDifferenceAndFullCells[selectedItem].currentUserLocked[weekDifference])
        //weekDifferenceAndFullCells refers to the whole object (weekDifferenceAndFullCells)
        //[selectedItem] refers to what item is currently selected. Is is a a key in our object, and we find it using a string from our selectedItemArray on line 85.
        //.otherUsers refers to which user owns the cells. Can also be currentUser and currentUserLocked in the future, as you can see in the object
        //[weekDifference] refers to what week the data comes from. It is also a key in our object, and we find it using our weekDifference variable on line 1.
            //this is also the reason why it breaks when
        generateWeekDayElements(currentDate, weeks);
    
        function generateWeekElement(currentDate) {
            const timeHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
            timeHeader.className = "time-header";
            const currentWeek = getWeekNumber(currentDate);
            timeHeader.textContent = "Uge " + currentWeek;
            function getWeekNumber(date) {
                const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
                const pastDaysOfYear = (date - firstDayOfYear) / 86400000; // 86400000 is how many milliseconds in a day
                return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
            }
        }

        function generateHourElements () {
            let hoursArray = [];
            for (let i = 0; i <= 23; i++) {
                if (i <= 9) {
                    hoursArray[i] = '0' + i + ':00';
                } else {
                    hoursArray[i] = i + ':00';
                }
            }
            for (let i = 0; i < hoursArray.length; i++) {
                const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"));
                timeDiv.className = "time";
                timeDiv.textContent = hoursArray[i];
            }
        }

        function genereateCellElements(fullCellsArrayOtherUsers, fullCellsArrayCurrentUser, fullCellsArrayCurrentUserLocked) { //an array of full cells from top left to bottom right in reading order.
            const timeElements = document.querySelectorAll(".time");
            // console.log(convertNumber(0).x, convertNumber(0).y)
            timeElements.forEach((timeElement, index) => {
                for (let i = weeks.length -1; i >= 0; i--) { //reversed so the x coordinate is easier to read for us humans (it goes from left to right now)
                    //dont actually know why exactly it works :I
                    const dayCell = document.createElement("div");
                    dayCell.className = "cell";
                    addLockedOrFullCells(fullCellsArrayCurrentUser, 'full') //not using this currently
                    addLockedOrFullCells(fullCellsArrayCurrentUserLocked, 'self-locked') //for the user times
                    addLockedOrFullCells(fullCellsArrayOtherUsers, 'locked') //important: we know whether or not to lock them because we know everything in the array needs to be locked (thats the point of the  array)
                    function addLockedOrFullCells(fullCellsArray, lockedOrFull) {
                        if (fullCellsArray) { //only runs if there are cells in the array. Not actually sure if it works or if we need it
                            for (let j = 0; j < fullCellsArray.length; j++) { //running through all the cells in the array 
                                if (i == convertNumber(fullCellsArray[j]).x && index == convertNumber(fullCellsArray[j]).y) { //checks if a specific cell should be locked
                                    //i is weeks, j is the nodeList and index is a timeElement (e.g 00:00, 12:00, 20:00)
                                    // console.log(`(x,y) of userArray: ` + convertNumber(fullCellsArray[j]).x + ','+convertNumber(fullCellsArray[j]).y)
                                    dayCell.classList.add(lockedOrFull); //for more context find the convertNumber function
                                }
                            }
                        }
                    }
                    timeElement.parentNode.insertBefore(dayCell, timeElement.nextSibling);
                }
            });
        }

        function generateWeekDayElements (currentDate, weeks) {
            let currentDayIndex = currentDate.getDay();
            if (currentDayIndex === 0) {
                currentDayIndex = 7;
            }

            for (let i = 0; i < weeks.length; i++) {
                const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
                dayHeader.className = "day-header";
                let dayIndex = (currentDayIndex + i - 1) % 7; //converting js dates into
                if (dayIndex < 0) dayIndex += 7; // Handling negative indices
                dayHeader.textContent = weeks[dayIndex];
    
                const dateForDay = new Date(currentDate);
                dateForDay.setDate(dateForDay.getDate() + i); // Adjust date to represent previous weeks

                const dateDisplay = document.createElement("div");
                dateDisplay.className = "date";
                dateDisplay.textContent = ("0" + dateForDay.getDate()).slice(-2) + "/" + ("0" + (dateForDay.getMonth() + 1 /*because months start at 0 in js..*/)).slice(-2);
                dayHeader.appendChild(dateDisplay);
            }
        }

 
    } //generateCalendar() function ends-

    function interactiveCells(weekDifference) {
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
                switch (sharedButton.id) {
                    case 'washing-machine-btn':
                        selectedItem = sharedButtonsCase(0, 'wash', generateCalendar, interactiveCells, weekDifferenceAndFullCells, weekDifference, selectedItem) //it also runs the function
                        break;
                    case 'party-room-btn':
                        selectedItem = sharedButtonsCase(1, 'party', generateCalendar, interactiveCells, weekDifferenceAndFullCells, weekDifference, selectedItem, )
                        break;
                    case 'drill-btn':
                        selectedItem = sharedButtonsCase(2, 'drill', generateCalendar, interactiveCells, weekDifferenceAndFullCells, weekDifference, selectedItem)
                        break;
                    case 'vacumn-cleaner-btn':
                        selectedItem = sharedButtonsCase(3, 'vacumn', generateCalendar, interactiveCells, weekDifferenceAndFullCells, weekDifference, selectedItem)
                        break;
                };
            });
        });
    };
});

function sharedButtonsCase(index, log, generateCalendar, interactiveCells, weekDifferenceAndFullCells, weekDifference, selectedItem) {
    console.log(log);
    pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem, currentUser);
    selectedItem = selectedItemArray[index];
    generateCalendar(weekDifferenceAndFullCells, weekDifference, selectedItem);
    interactiveCells(weekDifference);
    return selectedItem; //returning this because we desperately need this variable to change
}

function activatePopup (activePopup, blurElements, popupDivs) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', () => {
            switch (navButton.id) {
                case 'order-btn':
                    document.getElementById('order-div').classList.toggle('display-none');
                    activePopup.order = true;
                    orderTimes(weekDifferenceAndFullCells, activePopup);
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

function deActivatePopup(activePopup, popupDivs) {
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


function pushUserChangesToObj(weekDifferenceAndFullCells, weekDifference, selectedItem, user) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        try {
            pushNewFullToCellArray(cell, index, weekDifferenceAndFullCells, weekDifference, selectedItem, user);
        } catch(error) {
            console.log('THIS ERROR IS TOTALLY INTENTIONAL: ' +error);
        }   
    })
}

function pushNewFullToCellArray(cell, index, weekDifferenceAndFullCells, weekDifference, selectedItem, user) {
    if (cell.classList.contains('full')) {
        if (!weekDifferenceAndFullCells[selectedItem][currentUser][weekDifference].includes(index)) { //i can use index here because the cells in the forEach loop is a nodeList
            weekDifferenceAndFullCells[selectedItem][currentUser][weekDifference].push(index);
        }
        if (!weekDifferenceAndFullCells[selectedItem][currentUserLocked][weekDifference].includes(index)) { //i can use index here because the cells in the forEach loop is a nodeList
            weekDifferenceAndFullCells[selectedItem][currentUserLocked][weekDifference].push(index);
        }
    } else {
        for (let i = weekDifferenceAndFullCells[selectedItem][currentUser][weekDifference].length - 1; i >= 0; i--) {
            if (weekDifferenceAndFullCells[selectedItem][currentUser][weekDifference].includes(index)) {
                weekDifferenceAndFullCells[selectedItem][currentUser][weekDifference].splice(i, 1);
            }
        };
    };
    // if (cell.classList.contains('self-locked')) {
    //     if (!weekDifferenceAndFullCells[selectedItem][currentUserLocked][weekDifference].includes(index)) { //i can use index here because the cells in the forEach loop is a nodeList
    //         weekDifferenceAndFullCells[selectedItem][currentUserLocked][weekDifference].push(index);
    //     }
    // } else {
    //     for (let i = weekDifferenceAndFullCells[selectedItem][currentUserLocked][weekDifference].length - 1; i >= 0; i--) {
    //         if (weekDifferenceAndFullCells[selectedItem][currentUserLocked][weekDifference].includes(index)) {
    //             weekDifferenceAndFullCells[selectedItem][currentUserLocked][weekDifference].splice(i, 1);
    //         }
    //     };
    // };
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