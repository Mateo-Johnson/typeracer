const targetWPM = 200;
const wordsPerMinute = targetWPM;
const charactersPerMinute = wordsPerMinute * 5;
const baseTypingInterval = (60 / charactersPerMinute) * 1000;
const intervalVariance = 10;
const minTypingInterval = 30;

const spans = document.querySelectorAll("span[unselectable='on']");
const inputField = document.querySelector(".txtInput");

if (!inputField) {
    console.error("Input field not found! Please check the selector for .txtInput.");
} else {
    let textToType = Array.from(spans).map(span => span.textContent).join(" ");
    let currentCharIndex = 0;
    let initialTypingDone = false;

    function typeCharacter() {
        if (currentCharIndex < textToType.length) {
            const nextChar = textToType[currentCharIndex];

            if (!initialTypingDone && currentCharIndex === 0 && nextChar === ' ') {
                currentCharIndex++;
            } else {
                inputField.value += nextChar;
                const inputEvent = new Event("input", { bubbles: true });
                inputField.dispatchEvent(inputEvent);

                currentCharIndex++;
                initialTypingDone = true;

                if (nextChar === ' ' && currentCharIndex < textToType.length) {
                    setTimeout(() => {
                        inputField.value = inputField.value.slice(0, -1);
                        const backspaceEvent = new Event("input", { bubbles: true });
                        inputField.dispatchEvent(backspaceEvent);
                    }, 50);
                }
            }

            const randomizedInterval = Math.max(baseTypingInterval + (Math.random() * 2 - 1) * intervalVariance, minTypingInterval);
            setTimeout(typeCharacter, randomizedInterval);
        }
    }

    setTimeout(typeCharacter, 1000);
}
	
