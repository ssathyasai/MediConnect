const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Save health data
exports.saveHealthData = async (req, res) => {
    try {
        const { weight, bloodPressure, heartRate, sleepPatterns, date } = req.body;
        const userId = req.userId;

        const { data, error } = await supabase
            .from('health_data')
            .insert([
                {
                    user_id: userId,
                    weight,
                    blood_pressure: bloodPressure,
                    heart_rate: heartRate,
                    sleep_patterns: sleepPatterns,
                    date: date || new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: 'Health data saved successfully',
            entry: data
        });
    } catch (error) {
        console.error('Error saving health data:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all health data for user
exports.getHealthData = async (req, res) => {
    try {
        const userId = req.userId;

        const { data, error } = await supabase
            .from('health_data')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        // Transform data to match frontend format
        const transformedData = data.map(entry => ({
            weight: entry.weight,
            bloodPressure: entry.blood_pressure,
            heartRate: entry.heart_rate,
            sleepPatterns: entry.sleep_patterns,
            date: entry.date,
            createdAt: entry.created_at
        }));

        res.status(200).json(transformedData);
    } catch (error) {
        console.error('Error fetching health data:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get latest health data
exports.getLatestHealthData = async (req, res) => {
    try {
        const userId = req.userId;

        const { data, error } = await supabase
            .from('health_data')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        res.status(200).json(data || null);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};