let weekDifferenceAndFullCells = undefined;
let selectedItem = undefined;
let weekDifference = undefined;
let currentDate = undefined;
let weeks = undefined;
export function generateCalendar(weekDifferenceAndFullCellsParam, selectedItemParam, weekDifferenceParam, currentDateParam, weeksParam) {
    weekDifferenceAndFullCells = weekDifferenceAndFullCellsParam;
    selectedItem = selectedItemParam;
    weekDifference = weekDifferenceParam;
    currentDate = currentDateParam;
    weeks = weeksParam;

    document.getElementById("cal-start").innerHTML = ""; //reset the old html before generating the new one
   
    const timeHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
    timeHeader.className = "time-header";
    
    setWeekHeaderHtml(timeHeader)
    let hoursArray = generateHoursArray();
    setHoursOfDayHtml(hoursArray);
    setCellsHtml();
    setDayHeadersHtml()
}

function addLockedOrFullCells(fullCellsArray, lockedOrFull, i, index, dayCell) {
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
    const fullCellsArrayOtherUsers = weekDifferenceAndFullCells[selectedItem].otherUsers[weekDifference];
    const fullCellsArrayCurrentUser = weekDifferenceAndFullCells[selectedItem].currentUser[weekDifference];
    const fullCellsArrayCurrentUserLocked = weekDifferenceAndFullCells[selectedItem].currentUserLocked[weekDifference];
    const timeElements = document.querySelectorAll(".time");
    // console.log(convertNumber(0).x, convertNumber(0).y)
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

function setDayHeadersHtml() {
    let currentDayIndex = currentDate.getDay();

    for (let i = 0; i < weeks.length; i++) {
        const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
        dayHeader.className = "day-header";
        let dayIndex = (currentDayIndex + i -1) % 7; //converting js dates into
        dayHeader.textContent = weeks[dayIndex];

        const dateForDay = new Date(currentDate);
        dateForDay.setDate(dateForDay.getDate() + i); // Adjust date to represent previous weeks

        const dateDisplay = document.createElement("div");
        dateDisplay.className = "date";
        dateDisplay.textContent = ("0" + dateForDay.getDate()).slice(-2) + "/" + ("0" + (dateForDay.getMonth() + 1)).slice(-2); //because months start at 0 in js..
        dayHeader.appendChild(dateDisplay);
    }
}