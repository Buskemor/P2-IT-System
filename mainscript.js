document.addEventListener("DOMContentLoaded", () => {
    let currentDate
    let initialWeekNumber

    function generateCalendar() {
        document.getElementById("cal-start").innerHTML = "";
        currentDate = currentDate || new Date();
        const currentDay = currentDate.getDay();
    
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
    
        const startDate = new Date(currentDate);
        let startDay;
        if (currentWeek === getWeekNumber(new Date())) {
            // Set startDay to the current date's day
            startDay = currentDate.getDate();
        } else if (currentWeek < initialWeekNumber) {
            startDay = currentDate.getDate() - 7 + currentDayIndex;
        } else {
            // Otherwise, adjust start date to represent Monday of the next week
            startDay = currentDate.getDate() + (7 - currentDayIndex);
        }
    
        for (let i = 0; i < hoursArray.length; i++) {
            const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"));
            timeDiv.className = "time";
            timeDiv.textContent = hoursArray[i];
        }
    
        const timeElements = document.querySelectorAll(".time");
    
        timeElements.forEach((timeElement) => {
            for (let i = 0; i < weeks.length; i++) {
                const dayCell = document.createElement("div");
                dayCell.className = "cell";
                timeElement.parentNode.insertBefore(dayCell, timeElement.nextSibling);
            }
        });
    
        for (let i = 0; i < weeks.length; i++) {
            const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
            dayHeader.className = "day-header";
            let dayIndex = (currentDayIndex + i - 1) % 7;
            if (dayIndex < 0) dayIndex += 7; // Handling negative indices
    
            dayHeader.textContent = weeks[dayIndex];
    
            const dateForDay = new Date(startDate);
            dateForDay.setDate(dateForDay.getDate() + i); // Adjust date to represent previous weeks
    
            const formattedDate = ("0" + dateForDay.getDate()).slice(-2) + "/" + ("0" + (dateForDay.getMonth() + 1)).slice(-2);
    
            const dateSpan = document.createElement("span");
            dateSpan.className = "date";
            dateSpan.textContent = formattedDate;
            dayHeader.appendChild(dateSpan);
    
            // Highlight the current day
            if (currentWeek === getWeekNumber(new Date()) && i === currentDayIndex - 1) {
                dateSpan.classList.add("current-day");
            }
        }
    
        const cells = document.querySelectorAll('.cell');
    
        const currentHour = currentDate.getHours();
        const currentSlotIndex = currentHour < 10 ? currentHour : currentHour - 1;
        cells[currentSlotIndex].classList.add('current-time');
    
        let isMouseDown = false;
        let firstHeldClickCell;
    
        cells.forEach(cell => {
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
                    firstHeldClickCell.classList.toggle('full');
                }
                firstHeldClickCell = undefined;
            })
            cell.addEventListener('mouseup', () => {
                isMouseDown = false;
            });
        });
    }
    
    function updateCalendarPreviousWeek() {
        currentDate.setDate(currentDate.getDate() - 7); // Update the current date to the previous week
        initialWeekNumber = getWeekNumber(currentDate); // Update the initial week number
        generateCalendar(); // Refresh the calendar
    }
    
    function updateCalendarNextWeek() {
        currentDate.setDate(currentDate.getDate() + 7); // Update the current date to the next week
        initialWeekNumber = getWeekNumber(currentDate); // Update the initial week number
        generateCalendar(); // Refresh the calendar
    }

    function updateCalendar() {
        /* console.log("Updating  Calendar");*/
        generateCalendar();
    }

    generateCalendar();

    document.getElementById("prev-week").addEventListener("click", updateCalendarPreviousWeek);
    document.getElementById("next-week").addEventListener("click", updateCalendarNextWeek);

    setInterval(updateCalendar, 60 * 1000);

    function getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000; // 86400000 is how many milliseconds in a day
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
});


const navButtons = document.querySelectorAll('.nav-btn');
const blurElements = document.querySelectorAll('.can-blur');
const popupDivs = document.querySelectorAll('.hidden-popup-div');

const activePopup = {
    budget: false,
    settings: false,
    feedback: false,
    support: false,
};

navButtons.forEach(navButton => {
    navButton.addEventListener('click', () => {
        switch (navButton.id) {
            case 'budget-btn':
                document.getElementById('budget-div').classList.toggle('display-none');
                document.getElementById('popup').classList.add('display-none');
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
                return; 
        };
        blurElements.forEach(blurElement => {
            blurElement.classList.toggle('blurred');
        });
        popupDivs.forEach(popupDiv => {
            popupDiv.classList.toggle('popup-div-display');
        });
    });
});


              
    // const savedCells = {person: {nichlas: {optaget: [0,7,14,21]}}}
    // for (let i = 0; i < savedCells.person.nichlas.optaget.length; i++) {
    //     cells[savedCells.person.nichlas.optaget[i]].classList.add('full');
    // }

const exitButton = document.querySelectorAll('.exit-popup');

exitButton.forEach(exitButton => {
    exitButton.addEventListener('click', () => {
        for (let key in activePopup) {
            if (activePopup[key] === true) {
                document.getElementById(`${key}-div`).classList.toggle('display-none');
                activePopup[key] = false;
            }
        }
        blurElements.forEach(blurElement => {
            blurElement.classList.toggle('blurred');
        });
        popupDivs.forEach(popupDiv => {
            popupDiv.classList.toggle('popup-div-display');
        });
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
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) { //Keycode 27 = is the number of Escape on a keyboard
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
})

    // document.getElementById('feedback-btn').addEventListener('click', () => {
    //     document.getElementById('feedback-div').classList.toggle("none");
    // })

    // const hiddenExits = document.querySelectorAll('#hidden-exit')
    // navButtons.forEach(navButton => {
        
    // });    
    // document.getElementById('hidden-exit').addEventListener('click', () => {
    //     console.log('testing hidden exit')
    // });

   

// Næste måned 
function næsteMåned() {
    var måneder = ['Maj', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'December', 'Januar', 'Februar', 'Marts', 'April'];
    var nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    var næsteMånedsIndex = (nuværendeMånedsIndex + 1) % måneder.length;
    document.getElementById('current-month').textContent = måneder[næsteMånedsIndex];
    rotermåneder(måneder[næsteMånedsIndex]);
}

// Forrige måned
function forrigeMåned() {
    var måneder = ['Maj', 'Juni','Juli', 'August', 'September', 'Oktober', 'November', 'December', 'Januar', 'Februar', 'Marts', 'April'];
    var nuværendeMånedsIndex = måneder.indexOf(document.getElementById('current-month').textContent);
    var forrigeMånedsIndex = (nuværendeMånedsIndex - 1 + måneder.length) % måneder.length;
    document.getElementById('current-month').textContent = måneder[forrigeMånedsIndex];
    rotermåneder(måneder[forrigeMånedsIndex]);
}


function rotermåneder(måned) {
    var tekst = "";
    switch (måned) {
        case 'Maj':
            tekst = "2/05/2024: Vaskemaskine 16 kr.  3/05/2024: Tøretumbler 8 kr. 9/05/2024: Vaskemaskine 8 kr. Tøretumbler 16 kr. 16/05/2024: Vaskemaskine 16 kr. 21/05/2024: Tøretumbler 8 kr.";
            break;
        case 'Juni':
            tekst = "5/06/2024: Vaskemaskine 32 kr. 10/06/2024: Tøretumbler 16 kr. 15/06/2024: Vaskemaskine 16 kr. 20/06/2024: Tøretumbler 8 kr. 28/06/2024: Depositum for festlokale 1000 kr. ";
            break;
        case 'Juli':
            tekst = "3/07/2024: Depositium for festlokale 1000 kr. 15/07/2024: Vaskemaskine 16 kr. 22/07/2024: Tøretumbler 16 kr. 29/07/2024: Vaskemaskine 16 kr.";
            break;
        case 'August':
            tekst = "8/08/2024: Vaskemaskine 8 kr. 20/08/2024: Tøretumbler 16 kr. 25/08/2024: Vaskemaskine 16 kr.";
            break;
        case 'September':
            tekst = "5/09/2024: Vaskemaskine 16 kr. 18/09/2024: Tøretumbler 8 kr.";
            break;
        case 'Oktober':
            tekst = "10/10/2024: Tøretumbler 32 kr. 15/10/2024: Vaskemaskine 8 kr. 20/10/2024: Tøretumbler 16 kr. 25/10/2024: Vaskemaskine 16 kr.";
            break;
        case 'November':
            tekst = "3/11/2024: Vaskemaskine 32 kr. 15/11/2024: Tøretumbler 8 kr. 20/11/2024: Vaskemaskine 32 kr.";
            break;
        case 'December':
            tekst = "3/12/2024: Depositium for festlokale 1000 kr. 20/12/2024: Vaskemaskine 16 kr. 29/12/2024: Tøretumbler 8 kr. ";
            break;
        case 'Januar':
            tekst = "7/01/2025: Vaskemaskine 16 kr. 18/01/2024: Tøretumbler 8 kr. 20/01/2024: Vaskemaskine 16 kr. Tøretumbler 16 kr. 28/01/2024: Vaskemaksine 16 kr.";
            break;
        case 'Februar':
            tekst = "2/02/2025: Vaskemaskine 16 kr. 14/02/2024: Tøretumbler 8 kr. 18/02/2024: Depositum for festlokale 1000 kr. 24/02/2024: Vaskemakine 8 kr. Tøretumbler 16 kr.";
            break;
        case 'Marts':
            tekst = "8/03/2025: Vaskemaskine 8 kr. 2/03/2024: Tøretumbler 16 kr. 14/03/2024: Vaskemaskine 16 kr. 25/03/2024: Vaskemaskine 8 kr. Tøretumbler 16 kr.";
            break;
        case 'April':
            tekst = "5/04/2024: Vaskemaskine 16 kr. 16/04/2025: Vaskemaskine 8 kr. Tøretumbler 8 kr. 28/04/2024: Vaskemaskine 16 kr.";
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











function  showHistory() {

    document.getElementById('popup').classList.toggle ('display-none');

}





