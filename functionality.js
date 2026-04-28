  // This section sets up the connection details for IBM Watson Orchestrate,
// which is an AI service that helps answer fitness-related questions.
// Think of it like configuring a phone to call a specific number.
// These settings are unique to our project and won't change unless we update the AI setup.
window.wxOConfiguration = {
    orchestrationID: "234beb26dec84ecca0b9a427da6b9af9_0bb48932-0768-4604-80b3-5198295e1e67",
    hostURL: "https://eu-gb.watson-orchestrate.cloud.ibm.com/",
    rootElementID: "root",
    deploymentPlatform: "ibmcloud",
    crn: "crn:v1:bluemix:public:watsonx-orchestrate:eu-gb:a/234beb26dec84ecca0b9a427da6b9af9:0bb48932-0768-4604-80b3-5198295e1e67::",
    chatOptions: {
        agentId: "3bf901ab-9412-46a4-ac69-8fc1f3380115", 
        agentEnvironmentId: "099509e8-a8d8-4ebf-8828-b296f7807474",
 'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE',  // Or 'apikey: YOUR_API_KEY'
    },
};

// This part loads the chat widget from IBM Watson.
// It's like downloading and starting a chat app on the webpage.
// The setTimeout with 0 means it runs as soon as possible after the page starts loading.
setTimeout(() => {
    // Create a new script element to load the chat code
    const script = document.createElement('script');
    // Set the source URL to the Watson chat loader
    script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
    // When the script finishes loading, initialize the chat widget
    script.addEventListener('load', () => {
        wxoLoader.init();
    });
    // Add the script to the page's head section so it loads
    document.head.appendChild(script);
}, 0);

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
        // Get the question from the input field and remove extra spaces
        const question = inputField.value.trim();

        // If no question was entered, show a message asking for one
        if (question === "") {
            responseBox.innerHTML = "Please enter a question first!";
            return;
        }

        // Show "Loading..." while waiting for the AI response
        responseBox.innerHTML = "Loading...";

        try {
            // Send the question to the Watson AI service
            const response = await fetch(
                `${window.wxOConfiguration.hostURL}/wxochat/message`,
                {
                    method: 'POST', // This means we're sending data
                    headers: {
                        'Content-Type': 'application/json', // Telling the server we're sending JSON data
                    },
                    body: JSON.stringify({ // Convert the data to JSON format
                        message: question, // The user's question
                        agentId: window.wxOConfiguration.chatOptions.agentId, // Which AI agent to use
                        environmentId: window.wxOConfiguration.chatOptions.agentEnvironmentId, // Which environment the agent runs in
                    })
                }
            );

            // Get the response from the AI and convert it from JSON
            const data = await response.json();
            // Display the AI's answer in the response box
            responseBox.innerHTML = data.reply;
            // Clear the input field for the next question
            inputField.value = '';
        } catch (error) {
            // If something goes wrong, show the error message
            responseBox.innerHTML = `Error: ${error.message}`;
        }
    });
});
