document.addEventListener('DOMContentLoaded', function() {

    let score = 0;
    let currentQuestionIndex = 0;
    let quizData = [];

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
        console.log("currentQuestionIndex:", currentQuestionIndex); // Add this line
    
        if (currentQuestionIndex >= quizData.length) {
            alert('Quiz finished!');
            return;
        }
    }
    

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

    document.getElementById('check-answer').addEventListener('click', function() {
        // ... (rest of the code remains unchanged)
    });

    document.getElementById('check-answer').addEventListener('click', function() {
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
        } else {
            score = Math.max(score - 1/3, 0);
            alert('Incorrect. The correct answer is: ' + questionData.answers.map(answerIndex => questionData.options[answerIndex]).join(', '));
        }
    
        document.getElementById('score').textContent = 'Score: ' + score;
    
        currentQuestionIndex++;
        displayQuizQuestion();
    });
    

    document.getElementById('next-question').addEventListener('click', function() {
        if (!hasAnswerSelected()) {
            alert('Please select an answer before moving to the next question.');
            return;
        }

        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            displayQuizQuestion();
        } else {
            alert('This is the last question');
        }
    });

    loadQuizData();
});
