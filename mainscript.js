document.addEventListener("DOMContentLoaded", () => {
    let hoursArray =[];
    for (let i = 0; i < 24; i++) {
        if (i <= 9) {
            hoursArray[i] = '0' + i + ':00';
        } else {
            hoursArray[i] = i + ':00';
        }
    };

    const weeks = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];

    const timeHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
    timeHeader.className = "time-header";
    timeHeader.textContent = "Uge xxx";
    for (let i = 0; i < hoursArray.length; i++) {
        const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"));
        timeDiv.className = "time";
        timeDiv.textContent = hoursArray[i];
    };

    const timeElements = document.querySelectorAll(".time");

    timeElements.forEach((timeElement)=> {
        for (let i = 0; i < weeks.length; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "cell";
            timeElement.parentNode.insertBefore(emptyCell, timeElement.nextSibling);
        };
    });

    for (let i = 0; i < weeks.length; i++) {
        const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"));
        dayHeader.className = "day-header";
        dayHeader.textContent = weeks[i];
    }

    const cells = document.querySelectorAll('.cell');

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
});

function showDiv(div) {
    div.classList.remove("hidden");
}

function hideDiv(div) {
    div.classList.add("hidden");
}
