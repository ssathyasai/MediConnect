const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { firstName, lastName, email, password } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password_hash: passwordHash
        }
      ])
      .select('id, email, first_name, last_name, created_at');
      
    if (error) throw error;
    return data[0];
  }
  
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
  
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, created_at')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password_hash);
  }
}

module.exports = User;