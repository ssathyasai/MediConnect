const supabase = require('../config/supabase');

class HealthData {
  static async create(data) {
    const { userId, weight, bloodPressure, heartRate, sleepPatterns } = data;
    
    const { data: result, error } = await supabase
      .from('health_data')
      .insert([
        {
          user_id: userId,
          weight,
          blood_pressure: bloodPressure,
          heart_rate: heartRate,
          sleep_patterns: sleepPatterns
        }
      ])
      .select();
      
    if (error) throw error;
    return result[0];
  }
  
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('health_data')
      .select('*')
      .eq('user_id', userId)
      .order('recorded_at', { ascending: false });
      
    if (error) throw error;
    return data;
  }
  
  static async getLatestByUserId(userId) {
    const { data, error } = await supabase
      .from('health_data')
      .select('*')
      .eq('user_id', userId)
      .order('recorded_at', { ascending: false })
      .limit(1);
      
    if (error) throw error;
    return data[0] || null;
  }
  
  static async deleteById(id, userId) {
    const { error } = await supabase
      .from('health_data')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
      
    if (error) throw error;
    return true;
  }
}

module.exports = HealthData;