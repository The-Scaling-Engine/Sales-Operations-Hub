// API configuration and functions for connecting to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch all calls from the backend
 * @param {Object} filters - Optional filters (startDate, endDate, salesRep, outcome)
 * @returns {Promise<Array>} Array of call objects
 */
export const fetchCallsFromAPI = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.salesRep) queryParams.append('salesRep', filters.salesRep);
    if (filters.outcome) queryParams.append('outcome', filters.outcome);
    
    const url = `${API_BASE_URL}/api/webhooks/calls${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform MongoDB data to match the expected format
    return data.map(call => ({
      id: call._id,
      sales_rep_id: call.salesRepId,
      sales_rep_name: call.salesRep,
      status: mapOutcomeToStatus(call.outcome),
      call_date: call.callDate,
      booked_date: call.callDate, // Adjust based on your needs
      close_date: call.outcome === 'completed' ? call.callDate : null,
      deal_value: call.revenue,
      client_name: call.customerName,
      customer_phone: call.customerPhone,
      duration: call.duration,
      notes: call.notes,
      tags: call.tags,
      // Keep original MongoDB fields too
      ...call
    }));
  } catch (error) {
    console.error('Error fetching calls from API:', error);
    throw error;
  }
};

/**
 * Map MongoDB outcome to dashboard status
 */
function mapOutcomeToStatus(outcome) {
  const statusMap = {
    'completed': 'Completed',
    'qualified': 'Closed_Won',
    'not_qualified': 'Closed_Lost',
    'interested': 'Booked',
    'callback': 'Booked',
    'no_answer': 'Set',
    'voicemail': 'Set',
    'not_interested': 'Closed_Lost'
  };
  
  return statusMap[outcome] || 'Completed';
}

/**
 * Fetch recent EOCs from the backend
 * @param {number} limit - Number of EOCs to fetch (default: 10)
 * @returns {Promise<Array>} Array of EOC objects
 */
export const fetchEOCs = async (limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/webhooks/eocs?limit=${limit}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching EOCs:', error);
    throw error;
  }
};

/**
 * Fetch recent booked calls from the backend
 * @param {number} limit - Number of booked calls to fetch (default: 10)
 * @returns {Promise<Array>} Array of booked call objects
 */
export const fetchBookedCalls = async (limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/webhooks/booked-calls?limit=${limit}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching booked calls:', error);
    throw error;
  }
};

/**
 * Fetch dashboard statistics
 */
export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/webhooks/stats`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

/**
 * Test webhook endpoint (for testing GHL integration)
 */
export const testWebhook = async (testData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/webhooks/ghl-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error testing webhook:', error);
    throw error;
  }
};

/**
 * Check if backend is available
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

export default {
  fetchCallsFromAPI,
  fetchEOCs,
  fetchBookedCalls,
  fetchStats,
  testWebhook,
  checkBackendHealth
};



