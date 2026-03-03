import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Meal = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [mealPlan, setMealPlan] = useState(null);

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

  const calculateBMI = () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert('Please enter valid values for weight and height');
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    let category = '';
    if (bmiValue < 18.5) {
      category = 'underweight';
    } else if (bmiValue < 25) {
      category = 'normal';
    } else if (bmiValue < 30) {
      category = 'overweight';
    } else {
      category = 'obese';
    }
    setBmiCategory(category);
    setMealPlan(mealData[category]);
  };

  const getCategoryColor = () => {
    switch(bmiCategory) {
      case 'underweight': return '#fff3cd';
      case 'normal': return '#d4edda';
      case 'overweight': return '#fff3cd';
      case 'obese': return '#f8d7da';
      default: return 'white';
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4" style={{ color: '#04364a', fontFamily: 'Cabin, sans-serif' }}>
        Nutritional Meal Planning
      </h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mb-4" style={{ backgroundColor: '#d2e0fb' }}>
            <div className="card-body">
              <h5 className="card-title mb-3">Calculate Your BMI</h5>
              <div className="mb-3">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  step="0.1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height"
                  step="0.1"
                />
              </div>
              <button className="btn btn-primary w-100" onClick={calculateBMI}>
                Calculate BMI
              </button>
            </div>
          </div>

          {bmi && (
            <div className="card shadow mb-4" style={{ backgroundColor: getCategoryColor() }}>
              <div className="card-body text-center">
                <h5>Your BMI: {bmi}</h5>
                <p className="mb-0">
                  Category: <strong>{bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1)}</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {mealPlan && (
        <div className="mt-4">
          <h3 className="text-center mb-4" style={{ color: '#363062' }}>Your Personalized Meal Plan</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover shadow">
              <thead className="table-primary">
                <tr>
                  <th>Day / Meal</th>
                  {meals.map(meal => <th key={meal}>{meal}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day}>
                    <th className="table-secondary">{day}</th>
                    {meals.map(meal => (
                      <td key={`${day}-${meal}`} style={{ backgroundColor: getCategoryColor() }}>
                        {mealPlan[day]?.[meals.indexOf(meal)] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meal;