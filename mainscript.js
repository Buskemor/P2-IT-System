let weekDifference = 0; //+1 is one week ahead. -1 is one week behind. 0 is current week.
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
                Mandag: [0],
                Tirsdag: [1],
                Onsdag: [2],
                Torsdag: [3],
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
                Mandag: [0],
                Tirsdag: [1],
                Onsdag: [2],
                Torsdag: [3],
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

// calendarObject.sharedItem.user[weekDifference].weekDay

// console.log(calendarObject.washingMachine.currentUserLocked[0].Mandag)

//runs through all days
const calendarObjectWeekLength = Object.keys(calendarObject.washingMachine.currentUserLocked[0]).length

// for (let i = calendarObjectWeekLength - 1; i >= 0; i--) {
//     console.log(i)
// }

const currentDate = new Date()
const weeks = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
let selectedItemArray = ['washingMachine', 'partyRoom', 'drill', 'vacumnCleaner'] //notice it uses the same names as calendarObject
let selectedItem = selectedItemArray[0]
const blurElements = document.querySelectorAll('.can-blur');
const popupDivs = document.querySelectorAll('.hidden-popup-div');
const activePopup = { //set to true when there's an active poup
    order: false,
    budget: false,
    settings: false,
    feedback: false,
    support: false,
    cancel: false,
};
let displayObject = {
    Mandag: '',
    Tirsdag: '',
    Onsdag: '',
    Fredag: '',
    Lørdag: '',
    Søndag: ''
} //used cancelTimes and removePopup
const displayCancelledTimesElem = document.getElementById('display-cancelled-times')

// console.log(calendarObject[selectedItem].currentUserLocked[weekDifference])
navBtnsEventlistener()
invisiblePopupExitListener()
exitButtonListener();
sharedButtonsClick();
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







function orderTimes() {
    const displayOrderedTimes = document.getElementById('display-ordered-times')
    if (activePopup.order === false) {
        return    
    }

    // console.log(calendarObject[selectedItem].currentUserLocked[weekDifference])
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
            displayString += `<div>${weekDay + ' (' + translateSharedItems(selectedItem) + ')'}:</div>`
            for (let i = 0; i < selectedTimes[weekDay].length; i++) {
                if (selectedTimes[weekDay][i] <= 9) {
                    selectedTimes[weekDay][i] = '   0' + selectedTimes[weekDay][i] + ':00';
                } else {
                    selectedTimes[weekDay][i] = '   '+ selectedTimes[weekDay][i] + ':00';
                }
            }
            displayString += `<div>${selectedTimes[weekDay]}</div>`;
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
// document.getElementById('cancel-div').classList.remove('display-none');
activePopup.cancel = true;// just here to test
cancelTimes();
function cancelTimes () {

    if (activePopup.cancel === false) {
        return;
    }

    // let displayObjectPerma = {}
    let displayString = ''
    
    for (let sharedItem in calendarObject) {
        let selectedTimesLocked = calendarObject[sharedItem].currentUserLocked[weekDifference]
        const selectedTimeTemp = structuredClone(selectedTimesLocked)
        // console.log(selectedTimesLocked)
        
        
        console.log(selectedTimeTemp)
        for (let weekDay in selectedTimeTemp) {
            if (selectedTimeTemp[weekDay].length !== 0) {
                // displayString += `${sharedItem} ` + selectedTimeTemp[weekDay] + ' ' + weekDay + '<br></br>';
                function displayHours() {
                    return selectedTimeTemp[weekDay]

                }
                displayString += `<div class="${sharedItem+'-'+weekDay+'-can-line-through'}">${weekDay + ' (' + translateSharedItems(sharedItem) + ') ' + displayHours(selectedTimeTemp)}</div>`;
                displayString += `<button class="cancel-weekday-btn" id="${sharedItem+'-'+weekDay+'-cancel-btn'}">Aflys</button> <br></br>` //washingMachine-Mandag-cancel-btn
            }
            displayCancelledTimesElem.innerHTML = displayString
            // console.log(displayCancelledTimesElem.innerHTML)
            // console.log(document.getElementById(`${sharedItem}-${weekDay}-cancel-btn`))
            
            // const cancelBtn = document.getElementById(`${sharedItem}-${weekDay}-cancel-btn`);
            // if (cancelBtn != null) {
            //     cancelBtn.addEventListener('click', () => {
            //         console.log(`${sharedItem}-${weekDay}-cancel-btn`)
            //     })
            //     console.log(document.getElementById(`${sharedItem}-${weekDay}-cancel-btn`))
            // }
        }
        // selectedTimeTemp = {}
    }
    
    // i would prefer not making the same for loops as earlier, but for some reason i couldn't find a solution that worked while up there
    document.querySelectorAll('.cancel-weekday-btn').forEach(cancelWeekDayButton => {
        cancelWeekDayButton.addEventListener('click', () => {
            for (let sharedItem in calendarObject) {
                for (let weekDay in calendarObject[sharedItem].currentUserLocked[weekDifference]) { //
                    if (cancelWeekDayButton.id == `${sharedItem}-${weekDay}-cancel-btn`) {
                        console.log(`${sharedItem}-${sharedItem+'-'+weekDay}-cancel-btn`)
                        document.querySelectorAll(`.${sharedItem+'-'+weekDay}-can-line-through`).forEach(textDisplayElement => {
                            textDisplayElement.classList.add('line-through')
                        })
                        
                        for (let i = calendarObject[sharedItem].currentUserLocked[weekDifference][weekDay].length - 1; i >= 0; i--) {
                            // selectedTimesLocked[weeks[convertIndexToCoord(calendarObject[sharedItem].currentUserLocked[weekDifference][weekDay][i]).x]].push(convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).y);
                            if (convertIndexToCoord(calendarObject[sharedItem].currentUserLocked[weekDifference][weekDay][i]).x == convertWeekDayToIndex(weekDay)) {
                                calendarObject[sharedItem].currentUserLocked[weekDifference][weekDay].splice(i, 1)
                            }
                        }
        
                        for (let i = calendarObject[sharedItem].currentUserLocked[weekDifference][weekDay].length - 1; i >= 0 ; i--) {
                            // selectedTimesLocked[weeks[convertIndexToCoord(calendarObject[sharedItem].currentUserLocked[weekDifference][weekDay][i]).x]].push(convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).y);
                            if (convertIndexToCoord(calendarObject[sharedItem].currentUserLocked[weekDifference][i]).x == convertWeekDayToIndex(weekDay)) {
                                calendarObject[sharedItem].currentUserLocked[weekDifference].splice(i, 1)
                            }
                        }
                        generateCalendar()
                        interactiveCells()
                    }
                }
            }
            // console.log(`i want to cancel the times on ${weekDay}`)
        });
    })

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



    return;
    for (let sharedItem in calendarObject) {
        let selectedTimesLocked = calendarObject[sharedItem].currentUserLocked[weekDifference]
        const selectedTimeTemp = structuredClone(selectedTimesLocked)
        // console.log(selectedTimeTemp)
        // console.log(selectedTimesLocked.Mandag)
        
        for (let weekDay in selectedTimesLocked) {
            
            // if (selectedTimesLocked[weekDay].length !== 0) {
            //     console.log(selectedTimesLocked)
            // }
            
            // console.log(displayObjectPerma[weekDay])
            // displayObjectPerma = ''
            if (selectedTimesLocked[weekDay].length !== 0) {
                // console.log(weekDay)
                // console.log(selectedTimesLocked[weekDay])
                displayObject[weekDay] = ''
                
                
                // console.log(displayObject[weekDay])
                displayObject[weekDay] = `<div class="${weekDay+'-can-line-through'}">${sharedItem+' '+weekDay}:</div>`;
                for (let i = 0; i < selectedTimesLocked[weekDay].length; i++) {
                    if (selectedTimesLocked[weekDay][i] <= 9) {
                        selectedTimeTemp[weekDay][i] = '0' + convertIndexToCoord(selectedTimesLocked[weekDay][i]).y + ':00';
                    } else {
                        selectedTimeTemp[weekDay][i] = ''+ convertIndexToCoord(selectedTimesLocked[weekDay][i]).y + ':00';
                    }
                }
                console.log(selectedTimeTemp[weekDay])
                selectedTimeTemp[weekDay] = `<div class="${weekDay+'-can-line-through'}">${selectedTimeTemp[weekDay]}</div>`;
                selectedTimeTemp[weekDay] += `<button class="cancel-weekday-btn" id="${weekDay+'-cancel-btn'}">Aflys</button> <br></br>`;
                // displayObject[weekDay] += `<div class="${weekDay+'-can-line-through'}">${selectedTimeTemp[weekDay]}</div>`;
                // displayObject[weekDay] += `<button class="cancel-weekday-btn" id="${weekDay+'-cancel-btn'}">Aflys</button> <br></br>`;
                // displayObjectPerma[weekDay] += displayObject[weekDay]
                // console.log(displayObject)
                // console.log(JSON.stringify(displayObjectPerma))
                // console.log(displayObjectPerma[weekDay])
                // console.log(displayObjectPerma[weekDay])
                // console.log(displayObject)
                let displayString = ''
                displayCancelledTimesElem.innerHTML = displayString += selectedTimeTemp[weekDay];
            }
            
        }
        return;
        // let displayString = ''
        // // console.log(displayObjectPerma)
        // // for (let weekDay in selectedTimeTemp) {
        //     console.log(selectedTimeTemp[weekDay])
        //     // console.log(displayObject)
        //     // console.log(displayObject[weekDay])
        //     if (selectedTimeTemp[weekDay] !== undefined) {
        //         // console.log(displayObject)
                
        //         displayCancelledTimesElem.innerHTML = displayString += selectedTimeTemp[weekDay];
        //     }
        //     return;
            document.querySelectorAll('.cancel-weekday-btn').forEach(cancelWeekDayButton => {
                cancelWeekDayButton.addEventListener('click', () => {
                    switch (cancelWeekDayButton.id) {
                        case 'Mandag-cancel-btn':
                            weekDayCase(0, 'Mandag', cancelWeekDayButton)
                            console.log('cancel Mandag');
                            break;
                        case 'Tirsdag-cancel-btn':
                            weekDayCase(1, 'Tirsdag', cancelWeekDayButton)
                            console.log('cancel Tirsdag');
                            break;
                        case 'Onsdag-cancel-btn':
                            weekDayCase(2, 'Onsdag', cancelWeekDayButton)
                            console.log('cancel Onsdag');
                            break;
                        case 'Torsdag-cancel-btn':
                            weekDayCase(3, 'Torsdag', cancelWeekDayButton)
                            console.log('cancel Torsdag');
                            break;
                        case 'Fredag-cancel-btn':
                            weekDayCase(4, 'Fredag', cancelWeekDayButton)
                            console.log('cancel Fredag');
                            break;
                        case 'Lørdag-cancel-btn':
                            weekDayCase(5, 'Lørdag', cancelWeekDayButton)
                            console.log('cancel Lørdag');
                            break;
                        case 'Søndag-cancel-btn':
                            weekDayCase(6, 'Søndag', cancelWeekDayButton)
                            console.log('cancel Søndag');
                            break;
                    }
                    
                    // console.log(`i want to cancel the times on ${weekDay}`)
                });
            })
            function weekDayCase(weekDayIndex, weekDay, cancelWeekDayButton) {
                document.querySelectorAll(`.${weekDay}-can-line-through`).forEach(textDisplayElement => {
                    textDisplayElement.classList.add('line-through')
                    // textDisplayElement.classList.add('awaiting-deletion')
                })
    
                for (let weekDay in calendarObject[selectedItem].currentUserLocked[weekDifference]) {
                    for (let i = 0; i < calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay].length; i++) {
                        // selectedTimesLocked[weeks[convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).x]].push(convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).y);
                        if (convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).x == weekDayIndex) {
                            calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay].splice(i, 1)
                        }
                    }
    
                    for (let i = calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay].length - 1; i >= 0 ; i--) {
                        // selectedTimesLocked[weeks[convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).x]].push(convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).y);
                        if (convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][i]).x == weekDayIndex) {
                            calendarObject[selectedItem].currentUserLocked[weekDifference].splice(i, 1)
                        }
                    }
                }
                //old 1
                // for (let i = 0; i < calendarObject[selectedItem].currentUserLocked[weekDifference].length; i++) {
                //     if (convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][i]).x == weekDayIndex) {
                //         calendarObject[selectedItem].currentUserLocked[weekDifference].splice(i, 1)
                //     }
                // }
    
                //old 2
                // for (let i = calendarObject[selectedItem].currentUserLocked[weekDifference].length -1; i >= 0; i--) {
                //     if (convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][i]).x == weekDayIndex) {
                //         calendarObject[selectedItem].currentUserLocked[weekDifference].splice(i, 1)
                //     }
                // }
    
                generateCalendar()
                interactiveCells()
                cancelWeekDayButton.disabled = true;
                cancelWeekDayButton.textContent = 'Aflyst'
                displayObject.weekDay = ''
            }
        // }




    }



}
// document.querySelector(`.${weekDay}-cancel-btn`).addEventListener('click', () => {
//     console.log(`i want to cancel the times on ${weekDay}`)
// });

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
    
    setWeekHeaderHtml(timeHeader);
    let hoursArray = generateHoursArray();
    setHoursOfDayHtml(hoursArray);
    setCellsHtml();
    setDayHeadersHtml();
}

function setWeekHeaderHtml(timeHeader) {
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000; // 86400000 is how many milliseconds in a day
    const currentWeek = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    timeHeader.textContent = "Uge " + currentWeek;
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
    // const fullCellsArrayCurrentUserLocked = calendarObject[selectedItem].currentUserLocked[weekDifference];
    const fullCellsArrayCurrentUserLocked = concatCalendarUserLocked() //temporary until i figure something else out ig? seems decent though.

    // for (let i = calendarObjectWeekLength - 1; i >= 0; i--) {
    //     console.log(i)
    // }
    const timeElements = document.querySelectorAll(".time");
    // console.log(convertIndexToCoord(0).x, convertIndexToCoord(0).y)
    timeElements.forEach((timeElement, index) => {
        for (let i = weeks.length -1; i >= 0; i--) { //reversed so the x coordinate is easier to read for us humans (it goes from left to right now)
            //dont actually know why exactly it works :I
            // console.log(i)
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
                //i is weeks, j is the nodeList and index is a timeElement (e.g 00:00, 12:00, 20:00)
                // console.log(`(x,y) of userArray: ` + convertIndexToCoord(fullCellsArray[j]).x + ','+convertIndexToCoord(fullCellsArray[j]).y)
                dayCell.classList.add(lockedOrFull); //for more context find the convertIndexToCoord function
            }
        }
    }
}

function concatCalendarUserLocked() {
    let currentUserLockedArray = []
    for (let weekDay in calendarObject[selectedItem].currentUserLocked[weekDifference]) {
        // console.log(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay])
        currentUserLockedArray = currentUserLockedArray.concat(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay])
    }
    console.log(currentUserLockedArray)
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
        dateDisplay.textContent = ("0" + dateForDay.getDate()).slice(-2) + "/" + ("0" + (dateForDay.getMonth() + 1)).slice(-2); //because months start at 0 in js..
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
    const sharedButtons = document.querySelectorAll('.shared-items-btn');
    sharedButtons.forEach(sharedButton => {
        sharedButton.addEventListener('click', () => {
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
    pushUserChangesToObj();
    selectedItem = selectedItemArray[index];
    generateCalendar();
    interactiveCells();
}

// // not sure where to put this
// document.addEventListener('mousedown', function(event) {
//     const sharedItemsBtns = document.querySelectorAll('.shared-items-btn');
//     let isClickInside = false;
//     console.log(sharedItemsBtns[0])
//     sharedItemsBtns.forEach((button) => {
//         if (button.contains(event.target)) {
//             isClickInside = true;
//         }
//     });
//     const textarea = document.querySelector('textarea');
//     const input = document.querySelector('input');
//     console.log(!isClickInside)
//     if (!isClickInside && !event.target.closest('textarea') && event.target.tagName !== 'textarea' && !event.target.closest('input') && event.target.tagName !== 'INPUT') {
//         event.preventDefault();
//     }
// });

function navBtnsEventlistener() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', () => {
            switch (navButton.id) {
                case 'order-btn':
                    document.getElementById('order-div').classList.remove('display-none');
                    activePopup.order = true;
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
                case 'support-btn':
                    document.getElementById('support-div').classList.remove('display-none'); // Remove display-none class
                    activePopup.support = true;
                    break;
                case 'cancel-btn':
                    document.getElementById('cancel-div').classList.remove('display-none');
                    activePopup.cancel = true;
                    cancelTimes()
                    break;
                case 'logout-btn':
                    console.log('logout')
                    window.location.href = "index.html";
                    return; // Return so the popup doesn't flash
            }
            // Add focus style to the corresponding nav button
            // navButtons.forEach(btn => {
            //     btn.classList.remove('focused');
            // });
            // navButton.classList.add('focused');
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
            // if (navButton) {
            //     navButton.classList.remove('focused'); // Remove focus style from nav button
            // }
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
    // const navButtons = document.querySelectorAll('.nav-btn');
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
                // navButtons.forEach(btn => {
                //     btn.classList.remove('focused');
                // });
            };
        };
    });
};

function pushUserChangesToObj(currentlyConfirmingOrder) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        // pushNewFullToCellArray(cell, index, currentlyConfirmingOrder);
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
                // calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay].push(index); //USE SAME MATH AS IN CANCELORDERS TO CONVERT
                // for (let i = 0; i < currentUserLockedArray.length; i++) {
                    // for (let weekDay in calendarObject[selectedItem].currentUserLocked[weekDifference]) {
                    //     // console.log(weeks[convertIndexToCoord(index).x])
                        
                    //     // calendarObject[selectedItem].currentUserLocked[weekDifference][weeks[convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).x]].push(convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).y);
                    //     // calendarObject[selectedItem].currentUserLocked[weekDifference][weeks[convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).x]].push(convertIndexToCoord(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay][i]).y);
                    //     // console.log(calendarObject[selectedItem].currentUserLocked[weekDifference][weekDay])
                    // }
                // }
                // console.log(calendarObject[selectedItem].currentUserLocked[weekDifference])
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