// This part loads the chat widget from IBM Watson.
// It's like downloading and starting a chat app on the webpage.
// The setTimeout with 0 means it runs as soon as possible after the page starts loading.
// setTimeout(() => {
//     // Create a new script element to load the chat code
//     const script = document.createElement('script');
//     // Set the source URL to the Watson chat loader
//     script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
//     // When the script finishes loading, initialize the chat widget
//     script.addEventListener('load', () => {
//         wxoLoader.init();
//     });
//     // Add the script to the page's head section so it loads
//     document.head.appendChild(script);
// }, 0);
console.log("JS LOADED");
// This waits for the webpage to fully load before setting up the interactive parts.
// It's like waiting for all the furniture to be in place before arranging the room.
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the important parts of the webpage
    const inputField = document.getElementById('question-input'); // The text box where users type questions
    const submitBtn = document.getElementById('submit-btn'); // The button to send the question
    const responseBox = document.getElementById('ai-response'); // The area where AI answers appear
    const pillBtns = document.querySelectorAll('.pill-btn'); // The clickable suggestion buttons

    // Section 1: Make the suggestion buttons (pills) work
    // These are pre-written questions users can click instead of typing
    pillBtns.forEach((btn, index) => {
        // List of sample questions that match each button
        const sampleQuestions = [
            "how often should exercise", 
            "How much protein should I eat?",
            "What are the best stretches for runners?"
        ];
        
        // When a pill button is clicked, put the corresponding question in the input field
        btn.addEventListener('click', () => {
            inputField.value = sampleQuestions[index];
        });
    });

    // Section 2: Handle what happens when the Submit button is clicked
    submitBtn.addEventListener('click', async () => {
    const question = inputField.value.trim();

    if (!question) {
        responseBox.innerHTML = "Please enter a question first!";
        return;
    }

    responseBox.innerHTML = "Thinking...";

    try {
        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
headers: {
    "Content-Type": "application/json"
},
            body: JSON.stringify({
                message: question
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const reply = data.reply || "No response.";

        responseBox.innerHTML = reply;
        inputField.value = "";

    } catch (error) {
        console.error(error);
        responseBox.innerHTML = "Error: " + error.message;
    }
});
});
