document.addEventListener('DOMContentLoaded', function() {

    let score = 0;
    let currentQuestionIndex = 0;
    let quizData = [];
    let correctAnswers = 0;
    let wrongAnswers = 0;

    function loadQuizData() {
        fetch('quiz_questions.json')
            .then(response => response.json())
            .then(data => {
                quizData = data;
                displayQuizQuestion();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function displayQuizQuestion() {
        console.log("currentQuestionIndex:", currentQuestionIndex);

        if (currentQuestionIndex >= quizData.length) {
            let finalScore = score - Math.floor(wrongAnswers / 3);
            console.log("Before alert");
            alert(`Quiz finished!
            Total Score: ${finalScore}
            Total Correct Answers: ${correctAnswers}
            Total Wrong Answers: ${wrongAnswers}
            Note: Every 3 wrong answers deduct 1 from the score.`);
            console.log("After alert");
            return;
        }
        

        let questionData = quizData[currentQuestionIndex];
        let questionText = document.getElementById('question-text');
        questionText.textContent = `Question ${currentQuestionIndex + 1}: ${questionData.question}`;

        let optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';

        questionData.options.forEach((option, index) => {
            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = 'option' + index;
            checkBox.value = index;

            let label = document.createElement('label');
            label.htmlFor = 'option' + index;
            label.appendChild(document.createTextNode(option));

            optionsDiv.appendChild(checkBox);
            optionsDiv.appendChild(label);
            optionsDiv.appendChild(document.createElement('br'));
        });
    }

    document.getElementById('next-question').addEventListener('click', function() {

        if (!hasAnswerSelected()) {
            alert('Please select an answer before moving to the next question.');
            return;
        }
    
        // Check the answer and update the score
        let questionData = quizData[currentQuestionIndex];
        let selectedOptions = [];
    
        questionData.options.forEach((option, index) => {
            let checkBox = document.getElementById('option' + index);
            if (checkBox.checked) {
                selectedOptions.push(index);
            }
        });
    
        if (JSON.stringify(selectedOptions) === JSON.stringify(questionData.answers)) {
            score++;
            correctAnswers++;
        } else {
            score = Math.max(score - 1/3, 0); // This logic deducts 1/3 from the score for a wrong answer
            wrongAnswers++;
        }
    
        currentQuestionIndex++;
    
        if (currentQuestionIndex < quizData.length) {
            displayQuizQuestion();
        } else {
            alert('This is the last question');
            // Optionally, you can reset the quiz or navigate to a results page here.
        }
    });
        

    function hasAnswerSelected() {
        let questionData = quizData[currentQuestionIndex];
        let selectedOptions = [];

        questionData.options.forEach((option, index) => {
            let checkBox = document.getElementById('option' + index);
            if (checkBox.checked) {
                selectedOptions.push(index);
            }
        });

        return selectedOptions.length > 0;
    }

   /* document.getElementById('check-answer').addEventListener('click', function() {
        let questionData = quizData[currentQuestionIndex];
        let selectedOptions = [];

        questionData.options.forEach((option, index) => {
            let checkBox = document.getElementById('option' + index);
            if (checkBox.checked) {
                selectedOptions.push(index);
            }
        });

        if (JSON.stringify(selectedOptions) === JSON.stringify(questionData.answers)) {
            score++;
            correctAnswers++;
        } else {
            score = Math.max(score - 1/3, 0);
            wrongAnswers++;
        }        

        document.getElementById('score').textContent = 'Score: ' + score;

        currentQuestionIndex++;
        displayQuizQuestion();
    });
    */

    document.getElementById('display-score').addEventListener('click', function() {
        let questionData = quizData[currentQuestionIndex];
        let selectedOptions = [];
    
        questionData.options.forEach((option, index) => {
            let checkBox = document.getElementById('option' + index);
            if (checkBox.checked) {
                selectedOptions.push(index);
            }
        });
    
        // Check if the selected answer is correct or not
        if (JSON.stringify(selectedOptions) === JSON.stringify(questionData.answers)) {
            correctAnswers++;
        } else if (selectedOptions.length > 0) { // Only increment wrongAnswers if an answer was selected
            wrongAnswers++;
        }
    
        let finalScore = score + correctAnswers - Math.floor(wrongAnswers / 3); // Adjusted score calculation
        alert(`Current Score: ${finalScore}
        Total Correct Answers: ${correctAnswers}
        Total Wrong Answers: ${wrongAnswers}
        Note: Every 3 wrong answers deduct 1 from the score.`);
    });
        
        

    loadQuizData();
});
