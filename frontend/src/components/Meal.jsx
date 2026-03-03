import React, { useState } from 'react';
import NavigationBar from './Navbar';
import '../styles/meal.css';

const Meal = ({ isLoggedIn, user, onLogout }) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiResult, setBmiResult] = useState('');
    const [bmiCategory, setBmiCategory] = useState('');
    const [showMealPlan, setShowMealPlan] = useState(false);

    const bmiData = {
        normal: 'Normal weight',
        overweight: 'Overweight',
        underweight: 'Underweight',
        obese: 'Obese',
    };

    const mealData = {
        normal: {
            Monday: ['Oats with Fruits', 'Grilled Chicken Salad', 'Brown Rice with Vegetables'],
            Tuesday: ['Greek Yogurt with Berries', 'Quinoa Bowl', 'Baked Fish with Broccoli'],
            Wednesday: ['Whole Grain Toast with Avocado', 'Lentil Soup', 'Turkey Wrap'],
            Thursday: ['Smoothie Bowl', 'Chickpea Salad', 'Grilled Salmon with Asparagus'],
            Friday: ['Scrambled Eggs with Spinach', 'Vegetable Stir-fry', 'Chicken Breast with Quinoa'],
            Saturday: ['Pancakes with Maple Syrup', 'Tuna Sandwich', 'Vegetable Curry'],
            Sunday: ['Fruit Salad', 'Omelette', 'Roasted Chicken with Vegetables']
        },
        overweight: {
            Monday: ['Quinoa Pulao', 'Grilled Chicken Salad', 'Steamed Broccoli'],
            Tuesday: ['Sweet Potato Chaat', 'Baked Fish Tacos', 'Cucumber Raita'],
            Wednesday: ['Brown Rice Poha', 'Chickpea Salad', 'Multigrain Roti'],
            Thursday: ['Egg White Omelette', 'Lentil and Vegetable Soup', 'Quinoa Roti'],
            Friday: ['Mixed Berry Smoothie', 'Turkey Lettuce Wrap', 'Vegetable Stir-Fry'],
            Saturday: ['Low-Fat Greek Yogurt', 'Vegetable Quinoa Bowl', 'Grilled Chicken Breast'],
            Sunday: ['Whole Wheat Paratha', 'Palak Chicken', 'Mixed Berry Lassi']
        },
        underweight: {
            Monday: ['Masoor Dal Khichdi', 'Chicken Curry', 'Mixed Sprouts Salad'],
            Tuesday: ['Ragi Dosa', 'Paneer Bhurji', 'Whole Wheat Chapati'],
            Wednesday: ['Moong Dal Chilla', 'Veggie Wrap', 'Sweet Potato Wedges'],
            Thursday: ['Banana Walnut Smoothie', 'Chickpea Salad Wrap', 'Peanut Butter Sandwich'],
            Friday: ['Hummus and Veggie Sandwich', 'Dal Tadka', 'Brown Rice'],
            Saturday: ['Cottage Cheese Salad', 'Quinoa Khichdi', 'Almond Milkshake'],
            Sunday: ['Potato and Peas Paratha', 'Boiled Egg Bhurji', 'Mango Lassi']
        },
        obese: {
            Monday: ['Cauliflower Rice Pulao', 'Grilled Turkey Burger', 'Stir-fried Brussels Sprouts'],
            Tuesday: ['Kale Salad with Grilled Chicken', 'Baked Salmon', 'Zucchini Noodles'],
            Wednesday: ['Vegan Lentil Soup', 'Cauliflower Steak', 'Multigrain Roti'],
            Thursday: ['Eggplant and Chickpea Stew', 'Turkey Lettuce Wraps', 'Broccoli Rice'],
            Friday: ['Detox Green Smoothie', 'Vegetarian Quinoa Stir-Fry', 'Grilled Turkey Breast'],
            Saturday: ['Chia Seed Pudding', 'Roasted Vegetable Quinoa Bowl', 'Grilled Chicken Breast'],
            Sunday: ['Whole Wheat Veggie Wrap', 'Baked Cod Fish', 'Mixed Berry Smoothie']
        }
    };

    const calculateBMI = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (isNaN(weightNum) || isNaN(heightNum) || heightNum <= 0 || weightNum <= 0) {
            alert('Please enter valid values for weight and height.');
            return;
        }

        const bmi = weightNum / ((heightNum / 100) * (heightNum / 100));
        let category;

        if (bmi < 18.5) {
            category = 'underweight';
        } else if (bmi < 24.9) {
            category = 'normal';
        } else if (bmi < 29.9) {
            category = 'overweight';
        } else {
            category = 'obese';
        }

        setBmiResult(`Your BMI: ${bmi.toFixed(2)} - ${bmiData[category]}`);
        setBmiCategory(category);
        setShowMealPlan(true);
    };

    const getMealForDay = (day, mealType) => {
        if (!bmiCategory || !mealData[bmiCategory] || !mealData[bmiCategory][day]) return 'N/A';
        const meals = mealData[bmiCategory][day];
        switch(mealType) {
            case 'breakfast': return meals[0];
            case 'lunch': return meals[1];
            case 'dinner': return meals[2];
            default: return 'N/A';
        }
    };

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <>
            <NavigationBar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
            
            <div className="meal-container">
                <h1>Nutritional Meal Planning</h1>
                
                <div className="bmi-form">
                    <h2>Calculate Your BMI</h2>
                    <div className="form-group">
                        <label htmlFor="weight">Weight (kg):</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter your weight"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="height">Height (cm):</label>
                        <input
                            type="number"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter your height"
                            required
                        />
                    </div>

                    <button onClick={calculateBMI} className="calculate-btn">
                        Calculate BMI
                    </button>

                    {bmiResult && <div className="bmi-result">{bmiResult}</div>}
                </div>

                {showMealPlan && bmiCategory && (
                    <div className="meal-plan">
                        <h2>Your Personalized Meal Plan</h2>
                        <p className="meal-note">Based on your BMI category: {bmiData[bmiCategory]}</p>
                        
                        <table className="meal-table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Breakfast</th>
                                    <th>Lunch</th>
                                    <th>Dinner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {daysOfWeek.map(day => (
                                    <tr key={day}>
                                        <td><strong>{day}</strong></td>
                                        <td className={bmiCategory}>{getMealForDay(day, 'breakfast')}</td>
                                        <td className={bmiCategory}>{getMealForDay(day, 'lunch')}</td>
                                        <td className={bmiCategory}>{getMealForDay(day, 'dinner')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className="meal-tips">
                            <h3>Healthy Eating Tips:</h3>
                            <ul>
                                <li>Drink plenty of water throughout the day</li>
                                <li>Include fruits and vegetables in every meal</li>
                                <li>Limit processed foods and sugar intake</li>
                                <li>Practice portion control</li>
                                <li>Eat mindfully and avoid distractions</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Meal;