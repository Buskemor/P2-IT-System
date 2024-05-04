const loginBtn = document.getElementById("loginBtn");
const textbox1 = document.getElementById("textbox1");
const textbox2 = document.getElementById("textbox2");


loginBtn.addEventListener("click", function() {
    if (areTextBoxesFilled()) {
        window.location.href = "main.html";
    } else {
        alert("Brugernavn eller adganskode er forkert");
        loginBtn.focus();
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

function areTextBoxesFilled() {
    const text1 = textbox1.value.toLowerCase().trim();
    const text2 = textbox2.value.toLowerCase().trim();
    
    return combinations.some(({ text1: word1, text2: word2 }) => {
        const word1Found = text1.includes(word1);
        const word2Found = text2.includes(word2);
        return word1Found && word2Found;
    });
}


function isCombinationValid() {
    const text1 = textbox1.value.toLowerCase().trim();
    const text2 = textbox2.value.toLowerCase().trim();

    return combinations.some(({ text1: word1, text2: word2 }) => {
        const word1Found = text1.includes(word1);
        const word2Found = text2.includes(word2);
        return word1Found && word2Found;
    });
}


textbox1.addEventListener("input", togglePage3Button);
textbox2.addEventListener("input", togglePage3Button);

textbox1.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        textbox2.focus();
    }
})

function togglePage3Button() {
    if (areTextBoxesFilled()) {
        showButton(loginBtn);
    } else {
        hideButton(loginBtn);
    }
}


textbox2.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        if (areTextBoxesFilled()) {
            window.location.href = "main.html";
        } else {
            alert("Brugernavn eller adganskode er forkert");
            // loginBtn.focus();
        }
    }
});