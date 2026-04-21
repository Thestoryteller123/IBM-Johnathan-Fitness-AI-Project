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
        var response = "The Publishers of the Standard Novels, in selecting Frankenstein for one of their series, expressed a wish that I should furnish them  with some account of the origin of the story. I am the more willing to comply, because I shall thus give a general answer to the  question, so very frequently asked me—”How I, when a young girl,  came to think of, and to dilate upon, so very hideous an idea?” It is true that I am very averse to bringing myself forward in print; but as my account will only appear as an appendage to a former production, and as it will be confined to such topics as have connection with my authorship alone, I can scarcely accuse myself of a personal intrusion.  ";
        var array = response.split("");
        var loopTimer;

        responseBox.innerHTML += '<br><br>' + "<span style = 'color : #F00'>" + question + "</span>" + '<br><br>' //Change color later to Match Nathan's
        //Is there a better way to distinguish between user and AI? Maybe. Oh well. 

        // Simulate a delay so it feels like an AI is "thinking"
        setTimeout(() => {

            function frameLooper() {
                if (array.length > 0){
                    responseBox.innerHTML += array.shift();
                }
                else{
                    clearTimeout(loopTimer);            //Idk saw it in the vid
                    return false;
                }
                loopTimer = setTimeout(frameLooper,15); //Bolsters the illusion of data processing 
            }

            frameLooper();
            
            inputField.value = ''; // Clear the input box after submitting
        }, 1200);
    });
});