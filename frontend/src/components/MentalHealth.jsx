import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MentalHealth = () => {
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
    "How would you rate your self-esteem?",
  ];

  const options = ['Not at all', 'Sometimes', 'Often', 'Always'];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    let answeredCount = 0;

    Object.values(answers).forEach(answer => {
      answeredCount++;
      switch(answer) {
        case 'Not at all': totalScore += 0; break;
        case 'Sometimes': totalScore += 1; break;
        case 'Often': totalScore += 2; break;
        case 'Always': totalScore += 3; break;
        default: break;
      }
    });

    const maxPossibleScore = answeredCount * 3;
    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

    let resultMsg = '';
    let resourcesMsg = '';

    if (percentage <= 25) {
      resultMsg = "Your mental health appears to be in a good state.";
      resourcesMsg = "Continue practicing self-care and mindfulness. It's always beneficial to maintain healthy habits and stay connected with your support network.";
    } else if (percentage <= 50) {
      resultMsg = "You may be experiencing some mild stress or challenges.";
      resourcesMsg = "Consider incorporating more self-care practices into your routine, such as regular exercise, adequate sleep, and relaxation techniques. Talking to friends or family about your feelings can also be helpful.";
    } else if (percentage <= 75) {
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
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: '#04364a', fontFamily: 'Cabin, sans-serif' }}>
        Mental Health Assessment
      </h1>

      {/* Welcome Section */}
      <section className="mb-5 p-4 rounded" style={{ backgroundColor: '#d2e0fb' }}>
        <h2 className="text-center mb-3" style={{ color: '#d81b60' }}>Welcome to Your Mental Health Hub</h2>
        <p className="lead" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.3rem' }}>
          Your source for information, support, and wellness. Your Mental Health Hub is a compassionate and informative space dedicated to supporting your well-being. We understand that mental health is an integral part of overall health, and our goal is to provide resources and assistance to help you navigate your journey towards mental well-being.
        </p>
      </section>

      {/* Quiz Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4" style={{ color: '#d81b60' }}>Take the Mental Health Quiz</h2>
        
        {!quizStarted && !showResults && (
          <div className="text-center">
            <button 
              className="btn btn-lg px-5" 
              style={{ backgroundColor: '#ff69b4', color: 'white' }}
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          </div>
        )}

        {quizStarted && !showResults && (
          <div className="card shadow" style={{ backgroundColor: '#fff0f5' }}>
            <div className="card-body p-4">
              <div className="progress mb-4" style={{ height: '10px' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ 
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    backgroundColor: '#ff69b4'
                  }}
                ></div>
              </div>
              
              <h4 className="mb-4">Question {currentQuestion + 1} of {questions.length}</h4>
              <p className="fs-5 mb-4">{questions[currentQuestion]}</p>
              
              <div className="row g-3">
                {options.map((option, index) => (
                  <div key={index} className="col-md-6">
                    <button
                      className="btn w-100 py-3"
                      style={{ 
                        backgroundColor: '#ff69b4', 
                        color: 'white',
                        border: 'none'
                      }}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showResults && result && (
          <div className="card shadow" style={{ backgroundColor: '#fff0f5' }}>
            <div className="card-body p-4 text-center">
              <h3 className="mb-4" style={{ color: '#d81b60' }}>Your Mental Health Assessment</h3>
              <p className="fs-5 mb-4">{result.message}</p>
              <p className="mb-4">{result.resources}</p>
              <button 
                className="btn px-4" 
                style={{ backgroundColor: '#ff69b4', color: 'white' }}
                onClick={restartQuiz}
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Personal Stories Section */}
      <section className="mt-5">
        <h2 className="text-center mb-4" style={{ color: '#04364a' }}>Personal Stories and Testimonials</h2>
        <p className="text-center mb-5">Discover the inspiring journeys of individuals who have faced mental health challenges and emerged stronger.</p>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" 
                className="card-img-top rounded-circle p-3" 
                alt="Sarah's story"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">From Darkness to Light</h5>
                <p className="card-text">Sarah shares her journey of battling depression and anxiety, and how seeking help transformed her life.</p>
                <p className="fst-italic">"Reaching out for help was the hardest, but most rewarding, decision I ever made."</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <img 
                src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=400" 
                className="card-img-top rounded-circle p-3" 
                alt="John's story"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Breaking the Silence</h5>
                <p className="card-text">John opens up about living with bipolar disorder and the importance of building a strong support system.</p>
                <p className="fst-italic">"Sharing my story is my way of letting others know that they are not alone."</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <img 
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400" 
                className="card-img-top rounded-circle p-3" 
                alt="Emily's story"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Finding Strength in Vulnerability</h5>
                <p className="card-text">Emily shares her journey of overcoming anxiety and panic attacks through therapy and self-discovery.</p>
                <p className="fst-italic">"Accepting my vulnerabilities was the turning point in my journey."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentalHealth;