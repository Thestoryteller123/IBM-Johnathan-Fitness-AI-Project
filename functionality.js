        document.addEventListener('DOMContentLoaded', () => {
            const inputField = document.getElementById('question-input');
            const submitBtn = document.getElementById('submit-btn');
            const responseBox = document.getElementById('ai-response');
            const pillBtns = document.querySelectorAll('.pill-btn');

            // 1. Make the "Common Question" pills clickable
            pillBtns.forEach((btn, index) => {
                // I've added some sample questions so they actually do something when clicked!
                const sampleQuestions = [
                    "What's a good routine for chest?",
                    "How much protein should I eat?",
                    "What are the best stretches for runners?"
                ];
                
                btn.addEventListener('click', () => {
                    inputField.value = sampleQuestions[index];
                });
            });

            // 2. Handle the "Submit" button click
            submitBtn.addEventListener('click', () => {
                const question = inputField.value.trim();
                
                if (question === "") {
                    responseBox.innerHTML = "Please enter a question first!";
                    return;
                }

                // Show a loading state
                responseBox.innerHTML = "Processing your fitness query...";

                // Simulate a delay so it feels like an AI is "thinking"
                setTimeout(() => {
                    responseBox.innerHTML = `<strong>You asked:</strong><br>"${question}"<br><br><strong>AI Response:</strong><br>In a fully built app, your LLM (like Gemini) would return the fitness advice right here!`;
                    inputField.value = ''; // Clear the input box after submitting
                }, 1200);
            });
        });