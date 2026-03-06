// Disease database
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
    { name: "Sleep Apnea", symptoms: ["loud snoring", "pauses in breathing during sleep", "daytime sleepiness"] },
    { name: "Insomnia", symptoms: ["difficulty falling asleep", "difficulty staying asleep", "waking up too early"] },
    { name: "Cataracts", symptoms: ["cloudy or blurry vision", "sensitivity to light", "difficulty seeing at night"] },
    { name: "Glaucoma", symptoms: ["gradual loss of peripheral vision", "eye pain", "blurred vision"] },
    { name: "Gout", symptoms: ["joint pain", "swelling", "redness"] },
    { name: "Kidney Stones", symptoms: ["severe pain in the side or back", "blood in urine", "frequent urination"] },
];

// Check symptoms function
function checkSymptoms() {
    const symptomsInput = document.getElementById("symptoms")?.value;
    const resultDiv = document.getElementById("result");
    const tableDiv = document.getElementById("disease-table");
    const tableBody = document.querySelector("#disease-table tbody");

    if (!symptomsInput || !resultDiv || !tableDiv || !tableBody) return;

    const inputSymptoms = symptomsInput.toLowerCase().split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (inputSymptoms.length === 0) {
        showNotification('Please enter at least one symptom', 'warning');
        return;
    }

    // Match diseases
    const matchedDiseases = [];

    diseases.forEach(disease => {
        const matchedSymptoms = inputSymptoms.filter(symptom => 
            disease.symptoms.some(ds => ds.toLowerCase().includes(symptom) || symptom.includes(ds.toLowerCase()))
        );

        if (matchedSymptoms.length > 0) {
            const probability = (matchedSymptoms.length / disease.symptoms.length) * 100;
            matchedDiseases.push({ 
                name: disease.name, 
                probability: probability.toFixed(2),
                matchedCount: matchedSymptoms.length,
                totalSymptoms: disease.symptoms.length
            });
        }
    });

    // Sort by probability (highest first)
    matchedDiseases.sort((a, b) => b.probability - a.probability);

    // Display results
    if (matchedDiseases.length > 0) {
        resultDiv.innerHTML = `Found ${matchedDiseases.length} possible condition(s) based on your symptoms:`;
        tableDiv.style.display = "block";

        // Clear previous results
        tableBody.innerHTML = '';

        // Populate table
        matchedDiseases.slice(0, 10).forEach(matchedDisease => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td><strong>${matchedDisease.name}</strong></td>
                <td>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" 
                             style="width: ${matchedDisease.probability}%; background-color: ${getProbabilityColor(matchedDisease.probability)}"
                             aria-valuenow="${matchedDisease.probability}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                            ${matchedDisease.probability}%
                        </div>
                    </div>
                </td>
            `;
        });

        // Add disclaimer
        const disclaimer = document.createElement('div');
        disclaimer.className = 'alert alert-warning mt-3';
        disclaimer.innerHTML = `
            <strong>Disclaimer:</strong> This is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation and treatment.
        `;
        tableDiv.parentNode.appendChild(disclaimer);
        
        // Remove previous disclaimer if exists
        const oldDisclaimer = tableDiv.parentNode.querySelector('.alert-warning:last-child');
        if (oldDisclaimer && oldDisclaimer !== disclaimer) {
            oldDisclaimer.remove();
        }
    } else {
        resultDiv.innerHTML = "No matching conditions found. Please consult with a healthcare professional for proper evaluation.";
        tableDiv.style.display = "none";
    }
}

// Get color based on probability
function getProbabilityColor(probability) {
    if (probability >= 70) return '#dc3545'; // danger
    if (probability >= 40) return '#ffc107'; // warning
    return '#28a745'; // success
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Make function globally available
window.checkSymptoms = checkSymptoms;