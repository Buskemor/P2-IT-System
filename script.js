let hoursArray =[];

for (let i = 0; i < 24; i++) {
    if (i <= 9) {
        hoursArray[i] = '0' + i + ':00';
    } else {
        hoursArray[i] = i + ':00';
    }
};

const weeks = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag']
// later the weeks can be rotating, so the first is replaced by the last when each day passes by
//

document.addEventListener("DOMContentLoaded", () => {
    const timeHeader = document.getElementById("cal-start").appendChild(document.createElement("div"))
    timeHeader.className = "time-header"
    timeHeader.textContent = "Uge xxx"
    for (let i = 0; i < hoursArray.length; i++) {
        const timeDiv = document.getElementById("cal-start").appendChild(document.createElement("div"))
        timeDiv.className = "time";
        timeDiv.textContent = hoursArray[i]
    }

    const timeElements = document.querySelectorAll(".time");
    
    timeElements.forEach((timeElement)=> {
        for (let i = 0; i < weeks.length; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.className = "cell";
            timeElement.parentNode.insertBefore(emptyCell, timeElement.nextSibling);
        }
    })
    
    for (let i = 0; i < weeks.length; i++) {
        const dayHeader = document.getElementById("cal-start").appendChild(document.createElement("div"))
        dayHeader.className = "day-header";
        dayHeader.textContent = weeks[i];
    }


    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('full');
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


    const navButtons = document.querySelectorAll('.nav-btn')
    const exitButton = document.querySelectorAll('.exit-popup')

    exitButton.forEach(exitButton => {
        exitButton.addEventListener('click', () => {
            blurElements.forEach(blurElement => {
                blurElement.classList.toggle('blurred');
            })
            popupDivs.forEach(popupDiv => {
                popupDiv.classList.toggle('popup-div-display');
            })
        });
    });
    const blurElements = document.querySelectorAll('.can-blur')
    const popupDivs = document.querySelectorAll('.hidden-popup-div')
    
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', () => {
            blurElements.forEach(blurElement => {
                blurElement.classList.toggle('blurred');
            })
            popupDivs.forEach(popupDiv => {
                popupDiv.classList.toggle('popup-div-display');
            })
            if (document.getElementById("budget-btn")) {
                popupDiv.classList.toggle('')
            }
        });
    });






    // const hiddenExits = document.querySelectorAll('#hidden-exit')
    // navButtons.forEach(navButton => {
        
    // });    
    // document.getElementById('hidden-exit').addEventListener('click', () => {
    //     console.log('WHAHAAT')
    // });
})
// Get references to the buttons and page divs
const page1Btn = document.getElementById("page1Btn");
const page2Btn = document.getElementById("page2Btn");
const page3Btn = document.getElementById("page3Btn");
const page1Div = document.getElementById("page1");
const page2Div = document.getElementById("page2");
const page3Div = document.getElementById("page3");
const textbox1 = document.getElementById("textbox1");
const textbox2 = document.getElementById("textbox2");

// Add click event listeners to the buttons
page1Btn.addEventListener("click", function() {
    showPage(page1Div);
    hidePage(page2Div);
    hidePage(page3Div);
    hideButton(page1Btn); // Hide the clicked button
    showButton(page2Btn); // Show the other buttons
    if (areTextBoxesFilled()) {
        showButton(page3Btn);
    } else {
        hideButton(page3Btn);
    }
});

page2Btn.addEventListener("click", function() {
    showPage(page2Div);
    hidePage(page1Div);
    hidePage(page3Div);
    hideButton(page2Btn); // Hide the clicked button
    showButton(page1Btn); // Show the other buttons
    showButton(page3Btn);
    showTextBoxes(); // Show the text boxes when going to Page 2
    if (areTextBoxesFilled()) {
        showButton(page3Btn);
    } else {
        hideButton(page3Btn);
    }
});

page3Btn.addEventListener("click", function() {
    if (areTextBoxesFilled()) {
        showPage(page3Div);
        hidePage(page1Div);
        hidePage(page2Div);
        hideButton(page3Btn); // Hide the clicked button
        showButton(page1Btn); // Show the other buttons
        showButton(page2Btn);
    }
});

// Function to show a page
function showPage(page) {
    page.style.display = "block";
}

// Function to hide a page
function hidePage(page) {
    page.style.display = "none";
}

// Function to show a button
function showButton(button) {
    button.classList.remove("hidden");
}

// Function to hide a button
function hideButton(button) {
    button.classList.add("hidden");
}

// Function to show the text boxes
function showTextBoxes() {
    textbox1.style.display = "block";
    textbox2.style.display = "block";
}

// Function to check if both text boxes are filled out
function areTextBoxesFilled() {
    return textbox1.value.trim() !== "" && textbox2.value.trim() !== "";
}

// Add event listeners to the text boxes to enable/disable page 3 button dynamically
textbox1.addEventListener("input", togglePage3Button);
textbox2.addEventListener("input", togglePage3Button);

// Function to toggle Page 3 button based on text boxes content
function togglePage3Button() {
    if (areTextBoxesFilled()) {
        showButton(page3Btn);
    } else {
        hideButton(page3Btn);
    }
}
