const loginBtn = document.getElementById("loginBtn");
const page2Div = document.getElementById("page2");
const page3Div = document.getElementById("page3");
const textbox1 = document.getElementById("textbox1");
const textbox2 = document.getElementById("textbox2");


loginBtn.addEventListener("click", function() {
    window.location.href = "main.html"; //temporary just for development :P
    if (areTextBoxesFilled()) {
        window.location.href = "main.html";
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
        showButton(loginBtn);
    } else {
        hideButton(loginBtn);
    }
}
