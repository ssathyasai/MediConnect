import React, { useState } from 'react';
import NavigationBar from './Navbar';
import '../styles/symptom.css';

const Symptom = ({ isLoggedIn, user, onLogout }) => {
    const [symptoms, setSymptoms] = useState('');
    const [matchedDiseases, setMatchedDiseases] = useState([]);
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
        { name: "Rheumatoid Arthritis", symptoms: ["joint pain", "morning stiffness", "swelling"] },
        { name: "Lupus", symptoms: ["joint pain", "skin rash", "fatigue"] },
        { name: "Osteoarthritis", symptoms: ["joint pain", "stiffness", "limited range of motion"] },
        { name: "Celiac Disease", symptoms: ["abdominal pain", "bloating", "diarrhea"] },
        { name: "Crohn's Disease", symptoms: ["abdominal pain", "diarrhea", "weight loss"] },
        { name: "Ulcerative Colitis", symptoms: ["bloody stools", "abdominal pain", "diarrhea"] },
        { name: "Hepatitis", symptoms: ["jaundice", "fatigue", "abdominal pain"] },
        { name: "Anemia", symptoms: ["fatigue", "weakness", "pale skin"] },
        { name: "Epilepsy", symptoms: ["seizures", "confusion", "uncontrollable movements"] },
        { name: "Parkinson's Disease", symptoms: ["tremors", "stiffness", "difficulty walking"] },
        { name: "Alzheimer's Disease", symptoms: ["memory loss", "confusion", "difficulty performing familiar tasks"] },
        { name: "Depression", symptoms: ["persistent sadness", "loss of interest", "changes in appetite"] },
        { name: "Generalized Anxiety Disorder", symptoms: ["excessive worry", "restlessness", "fatigue"] },
        { name: "Panic Disorder", symptoms: ["sudden and intense fear", "chest pain", "shortness of breath"] },
        { name: "Sleep Apnea", symptoms: ["loud snoring", "pauses in breathing during sleep", "daytime sleepiness"] },
        { name: "Insomnia", symptoms: ["difficulty falling asleep", "difficulty staying asleep", "waking up too early"] },
        { name: "Cataracts", symptoms: ["cloudy or blurry vision", "sensitivity to light", "difficulty seeing at night"] },
        { name: "Glaucoma", symptoms: ["gradual loss of peripheral vision", "eye pain", "blurred vision"] },
        { name: "Gout", symptoms: ["joint pain", "swelling", "redness"] },
        { name: "Kidney Stones", symptoms: ["severe pain in the side or back", "blood in urine", "frequent urination"] },
        { name: "Prostate Cancer", symptoms: ["frequent urination", "difficulty starting or stopping urination", "blood in urine"] },
        { name: "Breast Cancer", symptoms: ["lump in the breast", "changes in breast size or shape", "nipple discharge"] },
        { name: "Colon Cancer", symptoms: ["changes in bowel habits", "blood in stool", "abdominal discomfort"] },
    ];

    const checkSymptoms = () => {
        const symptomsInput = symptoms.toLowerCase();
        const symptomsList = symptomsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
        
        const matched = [];

        diseases.forEach(disease => {
            const matchedSymptoms = symptomsList.filter(symptom => 
                disease.symptoms.some(ds => ds.includes(symptom) || symptom.includes(ds))
            );

            if (matchedSymptoms.length > 0) {
                const probability = (matchedSymptoms.length / disease.symptoms.length) * 100;
                matched.push({ 
                    name: disease.name, 
                    probability: probability.toFixed(2),
                    matchedCount: matchedSymptoms.length,
                    totalSymptoms: disease.symptoms.length
                });
            }
        });

        matched.sort((a, b) => b.probability - a.probability);
        setMatchedDiseases(matched.slice(0, 10)); // Show top 10 matches
        setShowResults(true);
    };

    return (
        <>
            <NavigationBar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
            
            <div id="symptom-checker" className="symptom-checker-container">
                <h1>Symptom Checker</h1>
                <p>Enter your symptoms below to receive personalized health insights.</p>
                
                <label htmlFor="symptoms">Symptoms (separated by commas):</label>
                <input
                    type="text"
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="e.g., fever, cough, headache"
                />
                
                <button onClick={checkSymptoms} className="check-btn">
                    Check Symptoms
                </button>

                {showResults && (
                    <div className="results-container">
                        {matchedDiseases.length > 0 ? (
                            <>
                                <p className="result-message">
                                    Based on the provided symptoms, possible conditions are:
                                </p>
                                <table id="disease-table" className="disease-table">
                                    <thead>
                                        <tr>
                                            <th>Condition</th>
                                            <th>Match Probability</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {matchedDiseases.map((disease, index) => (
                                            <tr key={index}>
                                                <td>{disease.name}</td>
                                                <td>{disease.probability}%</td>
                                                <td>
                                                    <small>
                                                        {disease.matchedCount}/{disease.totalSymptoms} symptoms matched
                                                    </small>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <div className="disclaimer">
                                    <strong>⚠️ Important Disclaimer:</strong>
                                    <p>
                                        This tool is for informational purposes only and is not a substitute for 
                                        professional medical advice, diagnosis, or treatment. Always seek the advice 
                                        of your physician or other qualified health provider with any questions you 
                                        may have regarding a medical condition.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="no-results">
                                No matching conditions found. Please try different symptoms or consult a healthcare professional.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Symptom;