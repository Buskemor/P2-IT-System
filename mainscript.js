document.addEventListener("DOMContentLoaded", () => {
    let currentDate;

    function generateCalendar() {
        document.getElementById("cal-start").innerHTML = "";

        currentDate = new Date();
        const currentDay = currentDate.getDay();

        let hoursArray =[];
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
        timeHeader.textContent = "Uge xxx";

        const currentDayIndex = currentDay === 0 ? 7 : currentDay;

        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - currentDayIndex + 1);


        for (let i = 0; i < hoursArray.length; i++) {
            const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"));
            timeDiv.className = "time";
            timeDiv.textContent = hoursArray[i];
        }

        const timeElements = document.querySelectorAll(".time");

        timeElements.forEach((timeElement) => {
            for (let i = 0; i < weeks.length; i++) {
                const emptyCell = document.createElement("div");
                emptyCell.className = "cell";
                timeElement.parentNode.insertBefore(emptyCell, timeElement.nextSibling);
            }
        });

        for (let i = 0; i < weeks.length; i++) {
            const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
            dayHeader.className = "day-header";
            const dayIndex = (currentDayIndex + i -1) % 7;
            dayHeader.textContent = weeks[dayIndex];
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
        /*console.log("Updateing calendar to previous week.."); */
        currentDate.setDate(currentDate.getDate() - 7);
        generateCalendar();
    }

    function updateCalendarNextWeek() {
       /* console.log("Updating Calendar to next week..");*/
        currentDate.setDate(currentDate.getDate() + 7);
        generateCalendar();
    }

    function updateCalendar() {
       /* console.log("Updating  Calendar");*/
        generateCalendar();
    }

    generateCalendar();

    document.getElementById("prev-week").addEventListener("click", updateCalendarPreviousWeek);
    document.getElementById("next-week").addEventListener("click", updateCalendarNextWeek);

    setInterval(updateCalendar, 60 * 1000);
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
        switch(navButton.id) {
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
                break;
            case 'contact-btn':
                window.location.href = "kontaktos.html";
                break;
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
