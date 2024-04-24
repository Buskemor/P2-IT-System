const loginBtn = document.getElementById("loginBtn");
const page2Div = document.getElementById("page2");
const page3Div = document.getElementById("page3");
const textbox1 = document.getElementById("textbox1");
const textbox2 = document.getElementById("textbox2");


loginBtn.addEventListener("click", function() {
    if (areTextBoxesFilled()) {
        window.location.href = "main.html";
    } else {
        alert("Brugernavn eller adganskode er forkert");
    }
    
});

const combinations = [
    { text1: "arni", text2: "gruppe3" },
    { text1: "elias", text2: "gruppe3" },
    { text1: "lærke", text2: "gruppe3" },
    { text1: "mikkel", text2: "gruppe3"},
    { text1: "nichlas", text2: "gruppe3"},
    { text1: "rahmo", text2: "gruppe3"},
    { text1: "viranat", text2: "gruppe3"},
];

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
    const text1 = textbox1.value.toLowerCase().trim();
    const text2 = textbox2.value.toLowerCase().trim();

    // Check if any combination is satisfied by one word from each text box
    return combinations.some(({ text1: word1, text2: word2 }) => {
        const word1Found = text1.includes(word1);
        const word2Found = text2.includes(word2);
        return word1Found && word2Found;
    });
}

// Function to check if the combination is valid
function isCombinationValid() {
    const text1 = textbox1.value.toLowerCase().trim();
    const text2 = textbox2.value.toLowerCase().trim();

    // Check if the current combination is valid
    return combinations.some(({ text1: word1, text2: word2 }) => {
        const word1Found = text1.includes(word1);
        const word2Found = text2.includes(word2);
        return word1Found && word2Found;
    });
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
