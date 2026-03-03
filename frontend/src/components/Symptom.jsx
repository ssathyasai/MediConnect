import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Symptom = () => {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const diseases = [
    { name: "Common Cold", symptoms: ["runny nose", "sneezing", "cough"] },
    { name: "Influenza", symptoms: ["fever", "body aches", "fatigue"] },
    { name: "Allergies", symptoms: ["itchy eyes", "sneezing", "nasal congestion"] },
    { name: "COVID-19", symptoms: ["fever", "cough", "shortness of breath", "loss of taste or smell"] },
    { name: "Pneumonia", symptoms: ["high fever", "chest pain", "difficulty breathing"] },
    { name: "Bronchitis", symptoms: ["persistent cough", "shortness of breath", "chest discomfort"] },
    { name: "Asthma", symptoms: ["wheezing", "shortness of breath", "chest tightness"] },
    { name: "Gastroenteritis", symptoms: ["nausea", "vomiting", "diarrhea", "abdominal pain"] },
    { name: "Urinary Tract Infection", symptoms: ["burning sensation during urination", "frequent urination", "lower abdominal pain"] },
    { name: "Migraine", symptoms: ["severe headache", "sensitivity to light", "nausea"] },
    { name: "Hypertension", symptoms: ["headache", "dizziness", "chest pain"] },
    { name: "Diabetes", symptoms: ["excessive thirst", "frequent urination", "fatigue"] },
    { name: "Anemia", symptoms: ["fatigue", "weakness", "pale skin"] },
    { name: "Depression", symptoms: ["persistent sadness", "loss of interest", "changes in appetite"] },
    { name: "Anxiety", symptoms: ["excessive worry", "restlessness", "fatigue"] },
  ];

  const checkSymptoms = () => {
    if (!symptoms.trim()) {
      alert('Please enter your symptoms');
      return;
    }

    const symptomList = symptoms.toLowerCase().split(',').map(s => s.trim());
    const matchedDiseases = [];

    diseases.forEach(disease => {
      const matchedSymptoms = symptomList.filter(symptom => 
        disease.symptoms.some(ds => ds.includes(symptom) || symptom.includes(ds))
      );

      if (matchedSymptoms.length > 0) {
        const probability = (matchedSymptoms.length / disease.symptoms.length) * 100;
        matchedDiseases.push({
          name: disease.name,
          probability: probability.toFixed(1),
          matchedCount: matchedSymptoms.length,
          totalSymptoms: disease.symptoms.length
        });
      }
    });

    matchedDiseases.sort((a, b) => b.probability - a.probability);
    setResults(matchedDiseases);
    setShowResults(true);
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 70) return 'danger';
    if (probability >= 40) return 'warning';
    return 'info';
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow" style={{ backgroundColor: '#d2e0fb' }}>
            <div className="card-body p-4">
              <h1 className="text-center mb-4" style={{ color: '#04364a', fontFamily: 'Cabin, sans-serif' }}>
                Symptom Checker
              </h1>
              
              <p className="text-center mb-4">
                Enter your symptoms below to receive personalized health insights.
              </p>
              
              <div className="mb-4">
                <label className="form-label fw-bold">Symptoms (separated by commas):</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g., fever, cough, headache"
                ></textarea>
              </div>
              
              <div className="text-center">
                <button 
                  className="btn btn-success btn-lg px-5"
                  onClick={checkSymptoms}
                >
                  Check Symptoms
                </button>
              </div>

              {showResults && (
                <div className="mt-5">
                  <h3 className="text-center mb-4">Possible Conditions</h3>
                  
                  {results.length === 0 ? (
                    <div className="alert alert-info text-center">
                      No matching diseases found. Please consult a healthcare professional for proper diagnosis.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-primary">
                          <tr>
                            <th>Disease/Condition</th>
                            <th>Match Probability</th>
                            <th>Matched Symptoms</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((disease, index) => (
                            <tr key={index}>
                              <td className="fw-bold">{disease.name}</td>
                              <td>
                                <span className={`badge bg-${getProbabilityColor(disease.probability)} px-3 py-2`}>
                                  {disease.probability}%
                                </span>
                              </td>
                              <td>{disease.matchedCount} of {disease.totalSymptoms} symptoms</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  <div className="alert alert-warning mt-4">
                    <strong>Disclaimer:</strong> This symptom checker is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptom;