// BMI Categories
const bmiData = {
    normal: 'Normal weight',
    overweight: 'Overweight',
    underweight: 'Underweight',
    obese: 'Obese',
};

// Meal data based on BMI category
const mealData = {
    normal: {
        Monday: ['Brown Rice Khichdi', 'Grilled Chicken', 'Mixed Vegetables'],
        Tuesday: ['Quinoa Salad', 'Baked Fish', 'Stir-fried Tofu'],
        Wednesday: ['Oats Upma', 'Chickpea Curry', 'Whole Wheat Roti'],
        Thursday: ['Veggie Omelette', 'Lentil Soup', 'Cauliflower Rice'],
        Friday: ['Fruit Smoothie Bowl', 'Turkey Wrap', 'Vegetarian Stir-Fry'],
        Saturday: ['Greek Yogurt Parfait', 'Pasta Primavera', 'Grilled Shrimp'],
        Sunday: ['Avocado Toast', 'Vegetable Wrap', 'Salmon Fillet'],
    },
    overweight: {
        Monday: ['Quinoa Pulao', 'Grilled Chicken Salad', 'Steamed Broccoli'],
        Tuesday: ['Sweet Potato Chaat', 'Baked Fish Tacos', 'Cucumber Raita'],
        Wednesday: ['Brown Rice Poha', 'Chickpea Salad', 'Multigrain Roti'],
        Thursday: ['Egg White Omelette', 'Lentil and Vegetable Soup', 'Quinoa Roti'],
        Friday: ['Mixed Berry Smoothie', 'Turkey Lettuce Wrap', 'Vegetable Stir-Fry'],
        Saturday: ['Low-Fat Greek Yogurt', 'Vegetable Quinoa Bowl', 'Grilled Chicken Breast'],
        Sunday: ['Whole Wheat Paratha', 'Palak Chicken', 'Mixed Berry Lassi'],
    },
    underweight: {
        Monday: ['Masoor Dal Khichdi', 'Chicken Curry', 'Mixed Sprouts Salad'],
        Tuesday: ['Ragi Dosa', 'Paneer Bhurji', 'Whole Wheat Chapati'],
        Wednesday: ['Moong Dal Chilla', 'Veggie Wrap', 'Sweet Potato Wedges'],
        Thursday: ['Banana Walnut Smoothie', 'Chickpea Salad Wrap', 'Peanut Butter Sandwich'],
        Friday: ['Hummus and Veggie Sandwich', 'Dal Tadka', 'Brown Rice'],
        Saturday: ['Cottage Cheese Salad', 'Quinoa Khichdi', 'Almond Milkshake'],
        Sunday: ['Potato and Peas Paratha', 'Boiled Egg Bhurji', 'Mango Lassi'],
    },
    obese: {
        Monday: ['Cauliflower Rice Pulao', 'Grilled Turkey Burger', 'Stir-fried Brussels Sprouts'],
        Tuesday: ['Kale Salad with Grilled Chicken', 'Baked Salmon', 'Zucchini Noodles'],
        Wednesday: ['Vegan Lentil Soup', 'Cauliflower Steak', 'Multigrain Roti'],
        Thursday: ['Eggplant and Chickpea Stew', 'Turkey Lettuce Wraps', 'Broccoli Rice'],
        Friday: ['Detox Green Smoothie', 'Vegetarian Quinoa Stir-Fry', 'Grilled Turkey Breast'],
        Saturday: ['Chia Seed Pudding with Berries', 'Roasted Vegetable Quinoa Bowl', 'Grilled Chicken Breast'],
        Sunday: ['Whole Wheat Veggie Wrap', 'Baked Cod Fish', 'Mixed Berry Smoothie'],
    },
};

// Calculate BMI
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight')?.value);
    const height = parseFloat(document.getElementById('height')?.value);

    if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
        showNotification('Please enter valid values for weight and height', 'warning');
        return;
    }

    const bmi = weight / ((height / 100) * (height / 100));
    let bmiCategory;

    if (bmi < 18.5) {
        bmiCategory = 'underweight';
    } else if (bmi < 24.9) {
        bmiCategory = 'normal';
    } else if (bmi < 29.9) {
        bmiCategory = 'overweight';
    } else {
        bmiCategory = 'obese';
    }

    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = `Your BMI: ${bmi.toFixed(2)} - ${bmiData[bmiCategory]}`;
    }
    
    generateMealPlan(bmiCategory);
}

// Generate meal plan table
function generateMealPlan(bmiCategory) {
    const mealPlanContainer = document.getElementById('meal-plan-container');
    if (!mealPlanContainer) return;
    
    mealPlanContainer.innerHTML = '';
    
    if (!bmiCategory || !mealData[bmiCategory]) {
        mealPlanContainer.innerHTML = '<p class="text-center">Please calculate your BMI first</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-bordered';
    
    const daysOfWeek = ['Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create body
    const tbody = document.createElement('tbody');
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    
    meals.forEach(meal => {
        const row = document.createElement('tr');
        
        // Meal type column
        const mealCell = document.createElement('td');
        mealCell.textContent = meal;
        mealCell.style.fontWeight = 'bold';
        mealCell.style.backgroundColor = 'var(--primary-color)';
        mealCell.style.color = 'white';
        row.appendChild(mealCell);

        // Meal for each day
        daysOfWeek.slice(1).forEach(day => {
            const cell = document.createElement('td');
            const mealList = mealData[bmiCategory][day] || [];
            const mealIndex = meals.indexOf(meal);
            cell.textContent = mealList[mealIndex] || 'N/A';
            
            // Add BMI-specific class
            cell.classList.add(`${bmiCategory}-bmi`);
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    mealPlanContainer.appendChild(table);
    
    // Add recommendation
    const recommendation = document.createElement('div');
    recommendation.className = 'alert alert-info mt-4';
    recommendation.innerHTML = `
        <h5>Recommendations for ${bmiData[bmiCategory]}:</h5>
        <ul>
            ${getRecommendations(bmiCategory)}
        </ul>
    `;
    mealPlanContainer.appendChild(recommendation);
}

// Get recommendations based on BMI category
function getRecommendations(category) {
    const recommendations = {
        underweight: `
            <li>Increase calorie intake with nutrient-dense foods</li>
            <li>Include healthy fats like nuts, avocados, and olive oil</li>
            <li>Eat frequent, small meals throughout the day</li>
            <li>Include protein-rich foods in every meal</li>
            <li>Consult a dietitian for personalized advice</li>
        `,
        normal: `
            <li>Maintain your current balanced diet</li>
            <li>Continue regular physical activity</li>
            <li>Stay hydrated with 8-10 glasses of water daily</li>
            <li>Include a variety of fruits and vegetables</li>
            <li>Monitor your weight regularly</li>
        `,
        overweight: `
            <li>Focus on portion control</li>
            <li>Increase fiber intake through vegetables and whole grains</li>
            <li>Limit processed foods and added sugars</li>
            <li>Include regular cardiovascular exercise</li>
            <li>Consider consulting a nutritionist</li>
        `,
        obese: `
            <li>Consult with a healthcare provider for a personalized plan</li>
            <li>Focus on gradual, sustainable weight loss</li>
            <li>Increase physical activity gradually</li>
            <li>Keep a food diary to track intake</li>
            <li>Consider joining a weight loss support group</li>
        `
    };
    
    return recommendations[category] || '';
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
window.calculateBMI = calculateBMI;