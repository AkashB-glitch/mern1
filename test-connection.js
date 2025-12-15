// Connection test script
import axios from 'axios';

const testConnection = async () => {
  console.log('🔍 Testing Community Forum Connection...\n');
  
  // Test backend health
  try {
    const healthResponse = await axios.get('http://localhost:5001/api/health');
    console.log('✅ Backend server is running');
    console.log('   Status:', healthResponse.data.status);
  } catch (error) {
    console.log('❌ Backend server connection failed');
    if (error.code === 'ECONNREFUSED') {
      console.log('   → Start backend: cd backend && npm run dev');
    }
    return;
  }
  
  // Test database connection by fetching posts
  try {
    const postsResponse = await axios.get('http://localhost:5001/api/posts');
    console.log('✅ Database connection working');
    console.log('   Posts in database:', postsResponse.data?.length || 0);
  } catch (error) {
    console.log('❌ Database connection failed');
    console.log('   Error:', error.response?.data?.message || error.message);
  }
  
  // Test user profile endpoint
  try {
    const profileResponse = await axios.get('http://localhost:5001/api/users/profile');
    console.log('✅ User profile endpoint working');
    console.log('   User:', profileResponse.data?.username || 'Unknown');
  } catch (error) {
    console.log('❌ User profile endpoint failed');
    console.log('   Error:', error.response?.data?.message || error.message);
  }
  
  console.log('\n🚀 Ready to start frontend: cd communityforum && npm run dev');
};

testConnection();