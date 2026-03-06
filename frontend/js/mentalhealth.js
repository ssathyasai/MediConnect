// Quiz Questions
const questions = [
    "How often do you feel overwhelmed by daily tasks?",
    "Do you experience changes in appetite or weight?",
    "How would you rate your quality of sleep?",
    "Do you often feel fatigued or lacking in energy?",
    "Have you noticed changes in your concentration or decision-making ability?",
    "How often do you experience feelings of sadness or hopelessness?",
    "Do you find less pleasure in activities that you used to enjoy?",
    "How would you describe your overall mood?",
    "Have you had thoughts of self-harm or suicide?",
    "How would you rate your level of stress?",
    "Do you find it easy to relax and unwind?",
    "How often do you engage in physical activity?",
    "How satisfied are you with your personal relationships?",
    "Do you have a support system in place (friends, family, etc.)?",
    "How would you rate your work-life balance?",
    "Do you practice any mindfulness or relaxation techniques?",
    "How often do you engage in activities that bring you joy?",
    "Have you experienced a traumatic event recently?",
    "How would you rate your self-esteem?",
    "Do you feel anxious about the future?"
];

let currentQuestionIndex = 0;
let answers = [];

// Initialize quiz
function initQuiz() {
    currentQuestionIndex = 0;
    answers = [];
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const startButton = document.getElementById('start-quiz');
    const resultContainer = document.getElementById('result-container');
    
    if (!quizContainer) return;
    
    // Hide start button and result container
    if (startButton) startButton.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
    
    // Clear and rebuild quiz container
    quizContainer.innerHTML = '';
    quizContainer.style.display = 'block';
    
    // Add progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = 'progress-bar';
    progressContainer.appendChild(progressBar);
    quizContainer.appendChild(progressContainer);
    
    // Update progress
    updateProgress();
    
    // Show current question
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

// Show a specific question
function showQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    
    // Create question element
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<p>${index + 1}. ${questions[index]}</p>`;
    
    const options = ['Not at all', 'Sometimes', 'Often', 'Always'];
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';

    options.forEach((option, optIndex) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `q${index}`;
        radio.value = option;
        radio.dataset.score = optIndex;
        
        // Check if already answered
        if (answers[index] === optIndex) {
            radio.checked = true;
        }
        
        radio.addEventListener('change', function() {
            answers[index] = optIndex;
            // Auto advance after 300ms
            setTimeout(() => {
                if (index < questions.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion();
                } else {
                    showResults();
                }
            }, 300);
        });
        
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
    
    // Add navigation buttons
    const navDiv = document.createElement('div');
    navDiv.className = 'd-flex justify-content-between mt-4';
    
    if (index > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn btn-secondary';
        prevBtn.textContent = 'Previous';
        prevBtn.onclick = () => {
            currentQuestionIndex--;
            displayQuestion();
        };
        navDiv.appendChild(prevBtn);
    }
    
    if (index < questions.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = 'Skip';
        nextBtn.onclick = () => {
            currentQuestionIndex++;
            displayQuestion();
        };
        navDiv.appendChild(nextBtn);
    } else {
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-success';
        submitBtn.textContent = 'Submit Quiz';
        submitBtn.onclick = showResults;
        navDiv.appendChild(submitBtn);
    }
    
    quizContainer.appendChild(navDiv);
}

// Update progress bar
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const progress = ((currentQuestionIndex + (answers[currentQuestionIndex] !== undefined ? 1 : 0)) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Show quiz results
function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const resourcesMessage = document.getElementById('resources-message');

    if (!quizContainer || !resultContainer) return;

    // Calculate score
    let totalScore = 0;
    let answeredCount = 0;
    
    answers.forEach((answer, index) => {
        if (answer !== undefined) {
            totalScore += answer; // 0-3 scale
            answeredCount++;
        }
    });

    const averageScore = answeredCount > 0 ? (totalScore / (answeredCount * 3)) * 100 : 0;

    // Generate result message
    let resultMsg = '';
    let resourcesMsg = '';
    let severity = '';

    if (averageScore <= 25) {
        resultMsg = "Your mental health appears to be in a good state.";
        resourcesMsg = "Continue practicing self-care and mindfulness. It's always beneficial to maintain healthy habits and stay connected with your support network.";
        severity = 'low';
    } else if (averageScore <= 50) {
        resultMsg = "You may be experiencing some mild stress or challenges.";
        resourcesMsg = "Consider incorporating more self-care practices into your routine, such as regular exercise, adequate sleep, and relaxation techniques. Talking to friends or family about your feelings can also be helpful.";
        severity = 'mild';
    } else if (averageScore <= 75) {
        resultMsg = "Your responses suggest you might be facing moderate challenges affecting your mental wellbeing.";
        resourcesMsg = "Consider reaching out to a mental health professional for support. Remember that seeking help is a sign of strength, not weakness. In the meantime, focus on self-care activities and connect with supportive people in your life.";
        severity = 'moderate';
    } else {
        resultMsg = "Your responses indicate you may be experiencing significant challenges.";
        resourcesMsg = "We strongly recommend connecting with a mental health professional who can provide appropriate support and guidance. Remember, you don't have to face these challenges alone, and help is available.";
        severity = 'high';
    }

    // Add helpline information for severe cases
    if (severity === 'high') {
        resourcesMsg += " If you're having thoughts of self-harm, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741.";
    }

    // Add note about unanswered questions
    if (answeredCount < questions.length) {
        resourcesMsg += " Note: You skipped some questions. For a more accurate assessment, consider retaking the quiz and answering all questions.";
    }

    // Display results
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultMessage.textContent = resultMsg;
    resourcesMessage.textContent = resourcesMsg;
    
    // Add severity-based styling
    resultContainer.className = `alert alert-${severity === 'low' ? 'success' : severity === 'mild' ? 'info' : severity === 'moderate' ? 'warning' : 'danger'}`;
}

// Retake quiz
function retakeQuiz() {
    const resultContainer = document.getElementById('result-container');
    if (resultContainer) {
        resultContainer.style.display = 'none';
    }
    initQuiz();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-quiz');
    const retakeBtn = document.getElementById('retake-quiz');
    
    if (startBtn) {
        startBtn.addEventListener('click', initQuiz);
    }
    
    if (retakeBtn) {
        retakeBtn.addEventListener('click', retakeQuiz);
    }
});

// Make functions globally available
window.retakeQuiz = retakeQuiz;