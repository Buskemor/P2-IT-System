weekDifference = 0; //+1 is one week ahead. -1 is one week behind. 0 is current week.
const weekDifferenceAndFullCells = {
    otherUsers: {
        0: [30, 37, 44],
        1: [50,57,64],
    },
    currentUser: {
        0: [10, 17, 24],
        1: [],
        2: [],
        3: [],
    }
};

// setInterval(() => {
//     console.log('0: '+weekDifferenceAndFullCells.currentUser[0])
//     console.log('1:' +weekDifferenceAndFullCells.currentUser[1])
// }, 3000)
document.addEventListener("DOMContentLoaded", () => {
    let currentDate
    let initialWeekNumber

    generateCalendar(weekDifferenceAndFullCells, weekDifference);

    document.getElementById("prev-week").addEventListener("click", updateCalendarPreviousWeek);
    document.getElementById("next-week").addEventListener("click", updateCalendarNextWeek);
    interactiveCells(weekDifferenceAndFullCells, weekDifference);

    changes(weekDifferenceAndFullCells, weekDifference);

    function changes(fullCells, weekDifference) {
        console.log('0: '+weekDifferenceAndFullCells.currentUser[0])
        console.log('1:' +weekDifferenceAndFullCells.currentUser[1])
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            try {
                pushNewFullToCellArray(cell, index, fullCells, weekDifference);
            } catch(error) {
                console.log('THIS ERROR IS TOTALLY INTENTIONAL: ' +error)
            }   
        })
    }

    function pushNewFullToCellArray(cell, index, fullCells, weekDifference) {
        if (cell.classList.contains('full')) {
            if (fullCells.currentUser[weekDifference].includes(index)) { //the index works here because the cells in the forEach loop is a nodeList
            } else {
                fullCells.currentUser[weekDifference].push(index)
            }
        } else {
            for (let i = fullCells.currentUser[weekDifference].length - 1; i >= 0; i--) {
                if (fullCells.currentUser[weekDifference].includes(index)) {
                    fullCells.currentUser[weekDifference].splice(i, 1)
                    console.log(fullCells.currentUser[weekDifference][i])
                }
            }
        }
    }
    function updateCalendarPreviousWeek() {
        weekDifference--;
        currentDate.setDate(currentDate.getDate() - 7); // Update the current date to the previous week
        initialWeekNumber = getWeekNumber(currentDate); // Update the initial week number
        changes(weekDifferenceAndFullCells, weekDifference+1);
        console.log('week diff: ' + weekDifference)
        generateCalendar(weekDifferenceAndFullCells, weekDifference); // Refresh the calendar
        interactiveCells(weekDifferenceAndFullCells, weekDifference);
        
    }
    
    function updateCalendarNextWeek() {
        weekDifference++;
        currentDate.setDate(currentDate.getDate() + 7); // Update the current date to the next week
        initialWeekNumber = getWeekNumber(currentDate); // Update the initial week number
        changes(weekDifferenceAndFullCells, weekDifference-1)
        console.log('week diff: ' + weekDifference)
        generateCalendar(weekDifferenceAndFullCells, weekDifference); // Refresh the calendar
        interactiveCells(weekDifferenceAndFullCells, weekDifference);
        
    }

    function getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000; // 86400000 is how many milliseconds in a day
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    function generateCalendar(fullCells, weekDifference) {
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

        addTimeElements(fullCells.otherUsers[weekDifference], fullCells.currentUser[weekDifference]) //note: this isn't an array, it's an object using bracket notation 

        function addTimeElements(fullCellsArrayOtherUsers, fullCellsArrayCurrentUser) { //an array of full cells from top left to bottom right in reading order.
            const timeElements = document.querySelectorAll(".time");
            timeElements.forEach((timeElement, index) => {
                
                for (let i = 0; i < weeks.length; i++) {
                    const dayCell = document.createElement("div");
                    dayCell.className = "cell";
                    addLockedOrFullCells(fullCellsArrayCurrentUser, 'full')
                    addLockedOrFullCells(fullCellsArrayOtherUsers, 'locked')
                    function addLockedOrFullCells(userCellArray, lockedOrFull) {
                        if (userCellArray) { //only runs if there are cells in the week that has
                            for (let j = 0; j < userCellArray.length; j++) {
                                if (i == convertNumber(userCellArray[j]).i && index == convertNumber(userCellArray[j]).index) {
                                    dayCell.classList.add(lockedOrFull);
                                }
                            }
                        }
                    }
                    timeElement.parentNode.insertBefore(dayCell, timeElement.nextSibling);
                }
            });
            function convertNumber(number) { //lowest number is 0. Highest is 167. 
                //this function converts one number into an object with two numbers; i and index.
                //the calendars row starts at 0 (from the top), and goes up to 23. This is result.i.
                //the calendars column starts at 6 (from the left) and goes down to 0. This is result.index.
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

        let allCells = document.querySelectorAll('.cell');
        let allCellArray = [];
        allCells.forEach(cell => {
            let fullCell = cell.classList.contains('full');
            allCellArray.push(fullCell)
        });
        // console.log(allCellArray);
    }

    function interactiveCells() {
        const cells = document.querySelectorAll('.cell');
    
        let isMouseDown = false;
        let firstHeldClickCell;
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                cell.classList.toggle('full')
                console.log(firstHeldClickCell, index)
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
                        //the -7 is there because this one has some weird behavior. Uncomment the console log if you want to see. It does not work perfectly right now, but close.
                        // console.log(firstHeldClickCell, index)
                    }
                }
                firstHeldClickCell = undefined
            })
            cell.addEventListener('mouseup', () => {
                isMouseDown = false;
            });
        })

    }
});


const activePopup = {
    budget: false,
    settings: false,
    feedback: false,
    support: false,
};

const navButtons = document.querySelectorAll('.nav-btn');
const blurElements = document.querySelectorAll('.can-blur');
const popupDivs = document.querySelectorAll('.hidden-popup-div');

navButtons.forEach(navButton => {
    navButton.addEventListener('click', () => {
        switch (navButton.id) {
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

const exitButton = document.querySelectorAll('.exit-popup');

exitButton.forEach(exitButton => {
    exitButton.addEventListener('click', () => {
        removeActivePopup(activePopup)
    });
});

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

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) { //Keycode 27 = is the number of Escape on a keyboard
        removeActivePopup(activePopup)
    }
})

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