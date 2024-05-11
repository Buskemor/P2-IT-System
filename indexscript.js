const loginBtn = document.getElementById("loginBtn");
const usernameElem = document.getElementById("username");
const passwordElem = document.getElementById("password");


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
    { text1: "john", text2: "aldi"},
];

function areTextBoxesFilled() {
    const text1 = usernameElem.value.toLowerCase().trim();
    const text2 = passwordElem.value.toLowerCase().trim();
    
    return combinations.some(({ text1: word1, text2: word2 }) => {
        const word1Found = text1.includes(word1);
        const word2Found = text2.includes(word2);
        return word1Found && word2Found;
    });
}

function isCombinationValid() {
    const text1 = usernameElem.value.toLowerCase().trim();
    const text2 = passwordElem.value.toLowerCase().trim();

    return combinations.some(({ text1: word1, text2: word2 }) => {
        const word1Found = text1.includes(word1);
        const word2Found = text2.includes(word2);
        return word1Found && word2Found;
    });
}

usernameElem.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        passwordElem.focus();
    }
})

passwordElem.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        if (areTextBoxesFilled()) {
            window.location.href = "main.html";
        } else {
            alert("Brugernavn eller adganskode er forkert");
            // loginBtn.focus();
        }
    }
});