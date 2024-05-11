const calendarObject = {
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
            0: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            1: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            2: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            3: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
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
            0: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            1: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            2: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            3: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
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
            0: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            1: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            2: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            3: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
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
            0: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            1: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            2: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
            3: {
                Mandag: [],
                Tirsdag: [],
                Onsdag: [],
                Torsdag: [],
                Fredag: [],
                Lørdag: [],
                Søndag: [],
            },
        }
    }
};
const currentDate = new Date()
currentDate.setDate(13)
const weeks = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
let weekDifference = 0; //+1 is one week ahead. -1 is one week behind. 0 is current week.
let selectedItemArray = ['washingMachine', 'partyRoom', 'drill', 'vacumnCleaner'] //notice it uses the same names as calendarObject
let selectedItem = selectedItemArray[0]
const blurElements = document.querySelectorAll('.can-blur');
const popupDivs = document.querySelectorAll('.hidden-popup-div');
const activePopup = { //set to true when there's an active poup
    order: false,
    budget: false,
    settings: false,
    feedback: false,
    cancel: false,
};
let displayObject = { //used in cancelTimes and removePopup
    Mandag: '',
    Tirsdag: '',
    Onsdag: '',
    Fredag: '',
    Lørdag: '',
    Søndag: ''
}
const displayCancelledTimesElem = document.getElementById('display-cancelled-times')


navBtnsEventlistener()
invisiblePopupExitListener()
exitButtonListener();
document.getElementById("prev-week").addEventListener("click", () => {
    updateCalendarPreviousWeek()
});
document.getElementById("next-week").addEventListener("click", () => {
    updateCalendarNextWeek()
});
generateCalendar();
interactiveCells();
pushUserChangesToObj();
confirmOrder()
sharedButtonsClick();
closeCancel()
// document.addEventListener("DOMContentLoaded", () => {
    
// });


function orderTimes() {
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
    let displayString = '';
    for (let i = 0; i < calendarObject[selectedItem].currentUser[weekDifference].length; ++i) {
        selectedTimes[weeks[convertIndexToCoord(calendarObject[selectedItem].currentUser[weekDifference][i]).x]].push(convertIndexToCoord(calendarObject[selectedItem].currentUser[weekDifference][i]).y)
    }
    
    for (let weekDay in selectedTimes) {
        if (selectedTimes[weekDay].length !== 0) {
            const dateTemp = new Date();
            dateTemp.setDate(13)
            const dateDisplay = (dateTemp.getDate()+convertWeekDayToIndex(weekDay)+parseInt(weekDifference*7) + '/0' + (dateTemp.getMonth()+1))
            displayString += `<div style="margin-left: 10px">${weekDay + ' ' + dateDisplay +' (' + translateSharedItems(selectedItem) + ')'}:</div>`
            for (let i = 0; i < selectedTimes[weekDay].length; i++) {
                if (selectedTimes[weekDay][i] <= 9) {
                    selectedTimes[weekDay][i] = '   0' + selectedTimes[weekDay][i] + ':00';
                } else {
                    selectedTimes[weekDay][i] = '   '+ selectedTimes[weekDay][i] + ':00';
                }
            }
            displayString += `<div style="margin-left: 10px">${selectedTimes[weekDay]}</div>`;
        }
    }
    displayOrderedTimes.innerHTML = displayString



    
}

function translateSharedItems(sharedItem) {
    switch(sharedItem) {
        case 'washingMachine':
            return 'Vaskerum';
            break;
        case 'partyRoom':
            return 'Festlokale';
            break;
        case 'drill':
            return 'Boremaskine';
            break;
        case 'vacumnCleaner':
            return 'Støvsuger';
            break;
    }
}

function confirmOrder() {
    const confirmBtn = document.getElementById('confirm-btn-id')
    confirmBtn.addEventListener('click', () => {
        removeActivePopup();
        pushUserChangesToObj(true);
        calendarObject[selectedItem].currentUser[weekDifference] = []
        generateCalendar();
        interactiveCells(weekDifference);
    });
}

function closeCancel() {
    const closeCancelBtn = document.getElementById('close-cancel')
    closeCancelBtn.addEventListener('click', () => {
        removeActivePopup();
        // pushUserChangesToObj(true);
        // calendarObject[selectedItem].currentUser[weekDifference] = []
        // generateCalendar();
        // interactiveCells(weekDifference);
    });
}

function cancelTimes () {
    if (activePopup.cancel === false) {
        return;
    }
    let displayString = ''
    for (let sharedItem in calendarObject) {
        for (let weekDifferenceKeys in calendarObject[sharedItem].currentUserLocked) {
            let selectedTimesLocked = calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys]
            const selectedTimeTemp = structuredClone(selectedTimesLocked)
            // console.log(selectedTimesLocked)        
            // console.log(selectedTimeTemp)
            
            for (let weekDay in selectedTimeTemp) {
                if (selectedTimeTemp[weekDay].length !== 0) {
                    // displayStringWeeks += `<div>UGE: ${weekDifferenceKeys}</div>`
                    // displayString += `${sharedItem} ` + selectedTimeTemp[weekDay] + ' ' + weekDay + '<br></br>';
                    function displayHours() {
                        let hoursArray = [];
                        for (let i = 0; i < selectedTimeTemp[weekDay].length; i++) {
                            if (i <= 10) {
                                hoursArray[i] = ' 0' + convertIndexToCoord(selectedTimeTemp[weekDay][i]).y + ':00';
                            } else {
                                hoursArray[i] = convertIndexToCoord(selectedTimeTemp[weekDay][i]).y + ':00 ';
                            }
                        }
                        return hoursArray;
                    }
                    const lineThroughCSSclass = `class="f${weekDifferenceKeys+'-'+sharedItem+'-'+weekDay+'-can-line-through'}"` //the f is there because it can't start with a number
                    const buttonCancelCSSclassid = `class="cancel-weekday-btn" id="${weekDifferenceKeys+'-'+sharedItem+'-'+weekDay+'-cancel-btn'}`
                    const dateTemp = new Date();
                    dateTemp.setDate(13)
                    const dateDisplay = (dateTemp.getDate()+convertWeekDayToIndex(weekDay)+parseInt(weekDifferenceKeys*7) + '/0' + (dateTemp.getMonth()+1))
                    displayString += `<div ${lineThroughCSSclass}">${weekDay + ' ' + dateDisplay + ' (' + translateSharedItems(sharedItem) + '):'}</div>`; 
                    displayString += `<div ${lineThroughCSSclass}}">${displayHours(selectedTimeTemp)}</div>`
                    displayString += `<button ${buttonCancelCSSclassid}">Aflys</button> <br></br>` //washingMachine-Mandag-cancel-btn
                }
                displayCancelledTimesElem.innerHTML = displayString
            }
        }
    }
    
    // i would prefer not making the same for loops as earlier, but for some reason i couldn't find a solution that worked while up there
    document.querySelectorAll('.cancel-weekday-btn').forEach(cancelWeekDayButton => {
        cancelWeekDayButton.addEventListener('click', () => {
            for (let sharedItem in calendarObject) {
                for (let weekDifferenceKeys in calendarObject[sharedItem].currentUserLocked) {
                    for (let weekDay in calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys]) {
                        if (cancelWeekDayButton.id == `${weekDifferenceKeys+'-'+sharedItem+'-'+weekDay}-cancel-btn`) {
                            cancelWeekDayButton.disabled = true;
                            cancelWeekDayButton.innerHTML = 'Aflyst'
                            removeLockedCells(weekDifferenceKeys, sharedItem, weekDay)
                        }
                    }
                }
            }
        });
    })
}

function cancelAllTimes () {
    for (let sharedItem in calendarObject) {
        for (let weekDifferenceKeys in calendarObject[sharedItem].currentUserLocked) {
            for (let weekDay in calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys]) {
                document.querySelectorAll('.cancel-weekday-btn').forEach(cancelWeekDayButton => {
                    cancelWeekDayButton.disabled = true;
                    cancelWeekDayButton.innerHTML = 'Aflyst'
                })
                removeLockedCells(weekDifferenceKeys, sharedItem, weekDay)
            }
        }
    }
}

function removeLockedCells(weekDifferenceKeys, sharedItem, weekDay) {
    document.querySelectorAll(`.f${weekDifferenceKeys+'-'+sharedItem+'-'+weekDay}-can-line-through`).forEach(textDisplayElement => { //the f is there because it can't start with a number
        textDisplayElement.classList.add('line-through')
    })
    
    for (let i = calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys][weekDay].length - 1; i >= 0; i--) {
        if (convertIndexToCoord(calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys][weekDay][i]).x == convertWeekDayToIndex(weekDay)) {
            calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys][weekDay].splice(i, 1)
        }
    }

    for (let i = calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys][weekDay].length - 1; i >= 0 ; i--) {
        if (convertIndexToCoord(calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys][i]).x == convertWeekDayToIndex(weekDay)) {
            calendarObject[sharedItem].currentUserLocked[weekDifferenceKeys].splice(i, 1)
        }
    }
    generateCalendar()
    interactiveCells()
}

function convertWeekDayToIndex(weekDay) {
    switch(weekDay) {
        case 'Mandag':
            return 0;
            break;
        case 'Tirsdag':
            return 1;
            break;
        case 'Onsdag':
            return 2;
            break;
        case 'Torsdag':
            return 3;
            break;
        case 'Fredag':
            return 4;
            break;
        case 'Lørdag':
            return 5;
            break;
        case 'Søndag':
            return 6;
            break;
    }
}

function updateCalendarPreviousWeek() {
    currentDate.setDate(currentDate.getDate() - 7); //change the date of currentDate to what last week would look like (hence -7)
    pushUserChangesToObj(); //+1 because it needs to save the current week, not the one we are going to
    weekDifference--;
    generateCalendar();
    interactiveCells();
}

function updateCalendarNextWeek() {
    currentDate.setDate(currentDate.getDate() + 7); //change the date of currentDate to what next week would look like (hence +7)
    pushUserChangesToObj() //-1 because it needs to save the current week, not the one we are going to
    weekDifference++;
    generateCalendar();
    interactiveCells();
}
function generateCalendar() {
    document.getElementById("cal-start").innerHTML = ""; //reset the old html before generating the new one
   
    const timeHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
    timeHeader.className = "time-header";
    timeHeader.textContent = "Dato/Tid"
    
    let hoursArray = generateHoursArray();
    setHoursOfDayHtml(hoursArray);
    setCellsHtml();
    setDayHeadersHtml();
}


function generateHoursArray() {
    const lessThanTen = 9;
    const hoursInDay = 24
    let hoursArray = [];
    for (let i = 0; i < hoursInDay; i++) {
        if (i <= lessThanTen) {
            hoursArray[i] = '0' + i + ':00';
        } else {
            hoursArray[i] = i + ':00';
        }
    }
    return hoursArray;
}

function setHoursOfDayHtml(hoursArray) {
    for (let i = 0; i < hoursArray.length; i++) {
        const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"));
        timeDiv.className = "time";
        timeDiv.textContent = hoursArray[i];
    } 
}

function setCellsHtml() {
    const fullCellsArrayOtherUsers = calendarObject[selectedItem].otherUsers[weekDifference];
    const fullCellsArrayCurrentUser = calendarObject[selectedItem].currentUser[weekDifference];
    const fullCellsArrayCurrentUserLocked = concatCalendarUserLocked()
    const timeElements = document.querySelectorAll(".time");

    timeElements.forEach((timeElement, index) => {
        for (let i = weeks.length -1; i >= 0; i--) { //reversed so the x coordinate is easier to read for us humans (it goes from left to right now)
            //dont actually know why exactly it works :I
            const dayCell = document.createElement("div");
            dayCell.className = "cell";
            addLockedOrFullCells(fullCellsArrayCurrentUser, 'full', i, index, dayCell) //not using this currently
            addLockedOrFullCells(fullCellsArrayCurrentUserLocked, 'self-locked', i, index, dayCell) //for the user times
            addLockedOrFullCells(fullCellsArrayOtherUsers, 'locked', i, index, dayCell) //important: we know whether or not to lock them because we know everything in the array needs to be locked (thats the point of the  array)
            timeElement.parentNode.insertBefore(dayCell, timeElement.nextSibling);
        }
    });
}

function addLockedOrFullCells(fullCellsArray, lockedOrFull, i, index, dayCell) {
    if (fullCellsArray) { //only runs if there are cells in the array. Not actually sure if it works or if we need it
        for (let j = 0; j < fullCellsArray.length; j++) { //running through all the cells in the array 
            if (i == convertIndexToCoord(fullCellsArray[j]).x && index == convertIndexToCoord(fullCellsArray[j]).y) { //checks if a specific cell should be locked
                //i is weeks, j is the nodeList and index is the index of a timeElement (e.g 00:00, 12:00, 20:00)
                dayCell.classList.add(lockedOrFull); //for more context find the function convertIndexToCoord()
            }
        }
    }
}

function concatCalendarUserLocked() {
    let currentUserLockedArray = []
    for (let weekDay in calendarObject[selectedItem].currentUserLocked[weekDifference]) {
        currentUserLockedArray = currentUserLockedArray.concat(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay])
    }
    return currentUserLockedArray;
}

function setDayHeadersHtml() {
    let currentDayIndex = currentDate.getDay();

    for (let i = 0; i < weeks.length; i++) {
        const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
        dayHeader.className = "day-header";
        let dayIndex = (currentDayIndex + i -1) % 7;
        dayHeader.textContent = weeks[dayIndex];

        const dateForDay = new Date(currentDate);
        dateForDay.setDate(dateForDay.getDate() + i); // Adjust date to represent previous weeks

        const dateDisplay = document.createElement("div");
        dateDisplay.className = "date";
        dateDisplay.textContent = ("0" + dateForDay.getDate()).slice(-2) + "/" + ("0" + (dateForDay.getMonth() + 1)).slice(-2);
        dayHeader.appendChild(dateDisplay);
    }
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
    document.getElementById('washing-machine-btn').classList.add("hover-class")
    const sharedButtons = document.querySelectorAll('.shared-items-btn');
    sharedButtons.forEach(sharedButton => {
        sharedButton.addEventListener('click', () => {
            switch (sharedButton.id) {
                case 'washing-machine-btn':
                    document.getElementById('selected-header').innerText = 'Vaskerum'
                    
                    sharedButtonsCase(0,'washing-machine-btn', sharedButtons)
                    break; //early return so no need to write else
                    
                    // if (calendarObject[selectedItem].currentUser[weekDifference].length === 0) {
                    //     // document.getElementById('washing-machine-btn').style = 'background-color: red'
                    //     sharedButtonsCase(0)
                    //     break; //early return so no need to write else
                    // }
                    alert('YOU ARE TROLLING')
                case 'party-room-btn':
                    document.getElementById('selected-header').innerText = 'Festlokale'
                    sharedButtonsCase(1,'party-room-btn', sharedButtons)
                    break;
                case 'drill-btn':
                    document.getElementById('selected-header').innerText = 'Boremaskine'
                    sharedButtonsCase(2,'drill-btn', sharedButtons)
                    break;
                case 'vacumn-cleaner-btn':
                    document.getElementById('selected-header').innerText = 'Støvsuger'
                    sharedButtonsCase(3,'vacumn-cleaner-btn', sharedButtons)
                    break;
            }
        });
    });
}
// pushUserChangesToObj(); //+1 because it needs to save the current week, not the one we are going to
// weekDifference--;
// generateCalendar();
// interactiveCells();

function sharedButtonsCase(index, caseString, sharedButtons) {
    sharedButtons.forEach(sharedButton => {
        sharedButton.classList.remove("hover-class")
    })
    
    
    document.getElementById(caseString).classList.add("hover-class")

    currentDate.setDate(currentDate.getDate() - parseInt(weekDifference*7)) //parseint makes me be able to do math with getDate idk
    weekDifference = 0;
    pushUserChangesToObj();
    selectedItem = selectedItemArray[index];
    generateCalendar();
    interactiveCells();
}

function navBtnsEventlistener() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', () => {
            switch (navButton.id) {
                case 'order-btn':
                    document.getElementById('order-div').classList.remove('display-none');
                    activePopup.order = true;
                    let tutorialString = `<div style="margin-left: 10px">Du har ikke valgt nogle tider. Tryk på de grønne celler i kalenderen for at vælge tidspunkter.</div>"` + `<img style="margin-left: 10px"src="tutorialGIF.gif">.`
                    document.getElementById('order-div').classList.remove('display-none');
                    pushUserChangesToObj();
                    // console.log(weekDifferenceAndFullCells[selectedItem])
                    if (calendarObject[selectedItem].currentUser[weekDifference].length === 0) {
                        document.getElementById('display-ordered-times').innerHTML = tutorialString
                        activePopup.order = true;
                        break;
                    } else {
                        activePopup.order = true;
                        orderTimes();
                        break;
                    }
                    orderTimes();
                    break;
                case 'budget-btn':
                    document.getElementById('budget-div').classList.remove('display-none'); // Remove display-none class
                    activePopup.budget = true;
                    break;
                case 'settings-btn':
                    document.getElementById('settings-div').classList.remove('display-none'); // Remove display-none class
                    activePopup.settings = true;
                    break;
                case 'feedback-btn':
                    document.getElementById('feedback-div').classList.remove('display-none'); // Remove display-none class
                    activePopup.feedback = true;
                    break;
                case 'cancel-btn':
                    document.getElementById('cancel-div').classList.remove('display-none');
                    activePopup.cancel = true;
                    cancelTimes()
                    break;
                case 'logout-btn':
                    console.log('logout')
                    window.location.href = "index.html";
                    return;
            }
            blurElements.forEach(blurElement => {
                blurElement.classList.add('blurred');
            });
            popupDivs.forEach(popupDiv => {
                popupDiv.classList.add('popup-div-display');
            });
        });
    });
}

function removeActivePopup() {
    for (let key in activePopup) {
        if (activePopup[key] === true) {
            const navButtonId = key + '-btn';
            const navButton = document.getElementById(navButtonId);
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

function invisiblePopupExitListener() {
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
                removeActivePopup();
            };
        };
    });
};

function pushUserChangesToObj(currentlyConfirmingOrder) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        try {
            pushNewFullToCellArray(cell, index, currentlyConfirmingOrder);
        }
        catch(error) {
            console.log('THIS ERROR IS TOTALLY INTENTIONAL: ' +error);
        }   
    })
}

function pushNewFullToCellArray(cell, index, currentlyConfirmingOrder) {
    let currentUserLockedArray = concatCalendarUserLocked()
    if (cell.classList.contains('full')) {
        if (!calendarObject[selectedItem].currentUser[weekDifference].includes(index)) { //i can use index here because the cells in the forEach loop is a nodeList
            calendarObject[selectedItem].currentUser[weekDifference].push(index);
        } //should delete this if here and make sure it warns the user for having selected times that aren't added
        if (currentlyConfirmingOrder === true) {
            if (!currentUserLockedArray.includes(index)) {
                calendarObject[selectedItem].currentUserLocked[weekDifference][weeks[convertIndexToCoord(index).x]].push(index);
            }
        }
    } else {
        for (let i = calendarObject[selectedItem].currentUser[weekDifference].length - 1; i >= 0; i--) {
            if (calendarObject[selectedItem].currentUser[weekDifference].includes(index)) {
                calendarObject[selectedItem].currentUser[weekDifference].splice(i, 1);
            }
        };
    };
};

function exitButtonListener() {
    const exitButton = document.querySelectorAll('.exit-popup');
    exitButton.forEach(exitButton => {
        exitButton.addEventListener('click', () => {
            removeActivePopup();
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            removeActivePopup();
        }
    })
}

function removeActivePopup() {
    for (let popup in activePopup) {
        if (activePopup[popup] === true) {
            document.getElementById(`${popup}-div`).classList.add('display-none');
            if (activePopup[popup] == activePopup.cancel) {
                console.log('end cancel')
                displayObject = {}
                displayCancelledTimesElem.innerText = ""
            }
            activePopup[popup] = false;
        }
    }
    blurElements.forEach(blurElement => {
        blurElement.classList.remove('blurred');
    });
    popupDivs.forEach(popupDiv => {
        popupDiv.classList.remove('popup-div-display');
    });
}

function convertIndexToCoord(number) {
    const result = {x: 0, y: 0};
    result.x = number % 7;
    result.y = Math.floor(number / 7);
    return result;
}
   
document.getElementById("next-month-btn").disabled = true;

// Næste måned 
function næsteMåned() {
    let måneder = ['Maj', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'December', 'Januar', 'Februar', 'Marts', 'April'];
    let nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    let næsteMånedsIndex = (nuværendeMånedsIndex + 1) % måneder.length;
    if(11 == måneder.indexOf(document.getElementById('current-month').textContent)) {
        document.getElementById("next-month-btn").disabled = true;
    } else {
        document.getElementById("next-month-btn").disabled = false;
    }
    console.log('hvad er '+måneder.indexOf(document.getElementById('current-month').textContent))
    document.getElementById('current-month').textContent = måneder[næsteMånedsIndex];
    rotermåneder(måneder[næsteMånedsIndex]);
}

// Forrige måned
function forrigeMåned() {
    let måneder = ['Maj', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'December', 'Januar', 'Februar', 'Marts', 'April'];
    let nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    let forrigeMånedsIndex = (nuværendeMånedsIndex - 1 + måneder.length) % måneder.length;
    if(0+1 == måneder.indexOf(document.getElementById('current-month').textContent)) {
        document.getElementById("next-month-btn").disabled = true;
    } else {
        document.getElementById("next-month-btn").disabled = false;
    }
    document.getElementById('current-month').textContent = måneder[forrigeMånedsIndex];
    rotermåneder(måneder[forrigeMånedsIndex]);
}


function rotermåneder(måned) {
    let tekst = "";
    switch (måned) {
        case 'Maj':
            tekst = "2/05/2024: Vaskemaskine: 16 kr. \r\n3/05/2024: Tøretumbler: 8 kr. \r\n9/05/2024: Vaskemaskine: 8 kr. & Tøretumbler: 16 kr. \r\n16/05/2024: Vaskemaskine: 16 kr. 21/05/2024: Tøretumbler: 8 kr.";
            break;
        case 'Juni':
            tekst = "5/06/2024: Vaskemaskine: 32 kr. \r\n10/06/2024: Tøretumbler: 16 kr. \r\n15/06/2024: Vaskemaskine: 16 kr. \r\n20/06/2024: Tøretumbler: 8 kr. \r\n28/06/2024: Depositum for festlokale: 1000 kr. ";
            break;
        case 'Juli':
            tekst = "3/07/2024: Depositium for festlokale: 1000 kr. \r\n15/07/2024: Vaskemaskine: 16 kr. \r\n22/07/2024: Tøretumbler: 16 kr. \r\n29/07/2024: Vaskemaskine: 16 kr.";
            break;
        case 'August':
            tekst = "8/08/2024: Vaskemaskine: 8 kr. \r\n20/08/2024: Tøretumbler: 16 kr. \r\n25/08/2024: Vaskemaskine: 16 kr.";
            break;
        case 'September':
            tekst = "5/09/2024: Vaskemaskine: 16 kr. \r\n18/09/2024: Tøretumbler: 8 kr.";
            break;
        case 'Oktober':
            tekst = "10/10/2024: Tøretumbler: 32 kr. \r\n15/10/2024: Vaskemaskine: 8 kr. \r\n20/10/2024: Tøretumbler: 16 kr. \r\n25/10/2024: Vaskemaskine: 16 kr.";
            break;
        case 'November':
            tekst = "3/11/2024: Vaskemaskine: 32 kr. \r\n15/11/2024: Tøretumbler: 8 kr. \r\n20/11/2024: Vaskemaskine: 32 kr.";
            break;
        case 'December':
            tekst = "3/12/2024: Depositium for festlokale: 1000 kr. \r\n20/12/2024: Vaskemaskine: 16 kr. \r\n29/12/2024: Tøretumbler: 8 kr. ";
            break;
        case 'Januar':
            tekst = "7/01/2024: Vaskemaskine: 16 kr. \r\n18/01/2024: Tøretumbler: 8 kr. \r\n20/01/2024: Vaskemaskine: 16 kr. & Tøretumbler: 16 kr. \r\n28/01/2024: Vaskemaksine: 16 kr.";
            break;
        case 'Februar':
            tekst = "2/02/2024: Vaskemaskine: 16 kr. \r\n14/02/2024: Tøretumbler: 8 kr. \r\n18/02/2024: Depositum for festlokale 1000: kr. \r\n24/02/2024: Vaskemakine: 8 kr. Tøretumbler: 16 kr.";
            break;
        case 'Marts':
            tekst = "8/03/2024: Vaskemaskine: 8 kr. \r\n2/03/2024: Tøretumbler: 16 kr. \r\n14/03/2024: Vaskemaskine: 16 kr. \r\n25/03/2024: Vaskemaskine: 8 kr. & Tøretumbler: 16 kr.";
            break;
        case 'April':
            tekst = "5/04/2024: Vaskemaskine: 16 kr. \r\n16/04/2024: Vaskemaskine: 8 kr. & Tøretumbler: 8 kr. 28/04/2024: Vaskemaskine: 16 kr.";
            break;
    }
    document.querySelector('textarea').value = tekst;
}

function setBudget() {
    document.getElementById("check-mark").style.display = "inline";
    setInterval(() => {
        removeChekmark()
    }, 3000)
}

function removeChekmark() {

 document.getElementById("check-mark").style.display = "none";

}

function showHistory() {
    document.getElementById('popup').classList.toggle ('display-none');
}

function submitFeedback() {
    // let message = document.getElementById("message-box").value;
    // console.log("Feedback Message:", message);
    removeActivePopup();
    document.getElementById("message-box").value = "";
    let popupMessage = document.getElementById("popup-message");
    popupMessage.classList.toggle('display-none');
    popupMessage.style.display = "block";
    // popupMessage.textContent = "Tak for din feedback!";
    

    setTimeout(function(){
        popupMessage.style.display = "none";
    }, 3000); 
    
    document.getElementById("message-box").value = "";
    document.getElementById('popup-message').classList.toggle('display-none');
}

darkmode()
function darkmode() {
    document.getElementId('farve').classList.add("mørk")
}