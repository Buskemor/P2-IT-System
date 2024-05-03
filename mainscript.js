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
    // later the weeks can be rotating, so the first is replaced by the last when each day passes by

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
        firstHeldClickCell.classList.toggle('full')
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

        
      

    // const savedCells = {person: {nichlas: {optaget: [0,7,14,21]}}}
    // for (let i = 0; i < savedCells.person.nichlas.optaget.length; i++) {
    //     cells[savedCells.person.nichlas.optaget[i]].classList.add('full');
    // }

    // cells[0].classList.add('full');
    // ^this is for making certain cells
    // it should rotate with the weeks
    // set date in JSON and compare with current date to do math


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

    const exitButton = document.querySelectorAll('.exit-popup');
    const submitButtons = document.querySelectorAll('.submit-btn')
    submitButtons.forEach(submitButton => {
        submitButton.addEventListener('click', () => {

                document.getElementById(`feedback-div`).classList.toggle('display-none');
                activePopup.feedback = false;
            blurElements.forEach(blurElement => {
                blurElement.classList.toggle('blurred');
            });
            popupDivs.forEach(popupDiv => {
                popupDiv.classList.toggle('popup-div-display');
            });
        });
    });
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
    // document.getElementById('feedback-btn').addEventListener('click', () => {
    //     document.getElementById('feedback-div').classList.toggle("none");
    // })

    // const hiddenExits = document.querySelectorAll('#hidden-exit')
    // navButtons.forEach(navButton => {
        
    // });    
    // document.getElementById('hidden-exit').addEventListener('click', () => {
    //     console.log('testing hidden exit')
    // });
})

function showDiv(div) {
    div.classList.remove("hidden");
}

function hideDiv(div) {
    div.classList.add("hidden");
} 

function submitFeedback() {

    let message = document.getElementById("message-box").value;

    console.log("Feedback Message:", message);
    document.getElementById("message-box").value = "";
    document.getElementById("popup-message").classList.toggle('display-none');
    let popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = "Tak for din feeback";
    popupMessage.style.display = "block";

    setTimeout(function(){
        popupMessage.style.display = "none";
    }, 3000); 

    // alert("Tak for din feedback!");
}
function Sentfunction() {
    let message2 = document.getElementById("message-box").value;

    console.log("Send Message2:", message2);
    document.getElementById("message-box2").value = "";
    document.getElementById("support-div").classList.toggle('display-none');
    
}
   


// document.getElementById("submit-button").addEventListener("click", submitFeedback);