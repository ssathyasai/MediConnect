import React, { useState } from 'react';
import NavigationBar from './Navbar';
import '../styles/mentalhealth.css';

const MentalHealth = ({ isLoggedIn, user, onLogout }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState(null);

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
        "How would you rate your self-esteem?"
    ];

    const options = ['Not at all', 'Sometimes', 'Often', 'Always'];

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [currentQuestion]: value });
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateResults();
        }
    };

    const calculateResults = () => {
        let score = 0;
        let answeredQuestions = 0;

        for (let i = 0; i < questions.length; i++) {
            const answer = answers[i];
            if (answer) {
                answeredQuestions++;
                switch(answer) {
                    case 'Not at all': score += 0; break;
                    case 'Sometimes': score += 1; break;
                    case 'Often': score += 2; break;
                    case 'Always': score += 3; break;
                    default: break;
                }
            }
        }

        const maxPossibleScore = answeredQuestions * 3;
        const scorePercentage = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;

        let resultMsg = '';
        let resourcesMsg = '';

        if (scorePercentage <= 25) {
            resultMsg = "Your mental health appears to be in a good state.";
            resourcesMsg = "Continue practicing self-care and mindfulness. It's always beneficial to maintain healthy habits and stay connected with your support network.";
        } else if (scorePercentage <= 50) {
            resultMsg = "You may be experiencing some mild stress or challenges.";
            resourcesMsg = "Consider incorporating more self-care practices into your routine, such as regular exercise, adequate sleep, and relaxation techniques. Talking to friends or family about your feelings can also be helpful.";
        } else if (scorePercentage <= 75) {
            resultMsg = "Your responses suggest you might be facing moderate challenges affecting your mental wellbeing.";
            resourcesMsg = "Consider reaching out to a mental health professional for support. Remember that seeking help is a sign of strength, not weakness. In the meantime, focus on self-care activities and connect with supportive people in your life.";
        } else {
            resultMsg = "Your responses indicate you may be experiencing significant challenges.";
            resourcesMsg = "We strongly recommend connecting with a mental health professional who can provide appropriate support and guidance. Remember, you don't have to face these challenges alone, and help is available.";
        }

        setResult({ message: resultMsg, resources: resourcesMsg });
        setShowResults(true);
    };

    const restartQuiz = () => {
        setQuizStarted(false);
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        setResult(null);
    };

    return (
        <>
            <NavigationBar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
            
            <div className="mental-health-container">
                <section id="home" className="welcome-section">
                    <h2>Welcome to Your Mental Health Hub</h2>
                    <p className="paa">
                        Your source for information, support, and wellness. Your Mental Health Hub is a compassionate 
                        and informative space dedicated to supporting your well-being. We understand that mental health 
                        is an integral part of overall health, and our goal is to provide resources and assistance to 
                        help you navigate your journey towards mental well-being.
                    </p>
                </section>

                <div className="quiz-section">
                    <h1>Mental Health Quiz</h1>
                    <h2>Take the Mental Health Quiz</h2>
                    <p className="quiz-description">
                        This quiz is designed to help you assess your mental health. Answer the following questions 
                        honestly to help us understand where you are in your mental health journey.
                    </p>

                    {!quizStarted && !showResults && (
                        <button onClick={() => setQuizStarted(true)} className="start-quiz-btn">
                            Start Quiz
                        </button>
                    )}

                    {quizStarted && !showResults && (
                        <div className="quiz-container">
                            <div className="progress-bar-container">
                                <div 
                                    className="progress-bar" 
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>

                            <div className="question-container">
                                <h3>Question {currentQuestion + 1} of {questions.length}</h3>
                                <p className="question">{questions[currentQuestion]}</p>
                                
                                <div className="options">
                                    {options.map(option => (
                                        <label key={option} className="option-label">
                                            <input
                                                type="radio"
                                                name={`q${currentQuestion}`}
                                                value={option}
                                                onChange={() => handleAnswer(option)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {showResults && result && (
                        <div className="result-container">
                            <h2>Your Mental Health Assessment</h2>
                            <p className="result-message">{result.message}</p>
                            <p className="resources-message">{result.resources}</p>
                            <button onClick={restartQuiz} className="retake-quiz-btn">
                                Retake Quiz
                            </button>
                        </div>
                    )}
                </div>

                <section className="stories-section">
                    <h2>Personal Stories and Testimonials</h2>
                    <p>
                        Discover the inspiring journeys of individuals who have faced mental health challenges 
                        and emerged stronger. These personal stories aim to break down the stigma associated 
                        with mental health and offer hope and support to those on a similar path.
                    </p>

                    <div className="story-grid">
                        <div className="story-card">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" alt="Sarah" />
                            <h3>From Darkness to Light</h3>
                            <p>Meet Sarah, a courageous individual who battled depression and anxiety for years...</p>
                            <blockquote>
                                "Reaching out for help was the hardest, but most rewarding, decision I ever made."
                            </blockquote>
                        </div>

                        <div className="story-card">
                            <img src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=400&h=400&fit=crop" alt="John" />
                            <h3>Breaking the Silence</h3>
                            <p>John's story is one of resilience and strength. Having faced bipolar disorder...</p>
                            <blockquote>
                                "Sharing my story is my way of letting others know that they are not alone."
                            </blockquote>
                        </div>

                        <div className="story-card">
                            <img src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&h=400&fit=crop" alt="Emily" />
                            <h3>Finding Strength in Vulnerability</h3>
                            <p>Emily shares her journey of overcoming anxiety and panic attacks through therapy...</p>
                            <blockquote>
                                "Accepting my vulnerabilities was the turning point in my mental health journey."
                            </blockquote>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default MentalHealth;