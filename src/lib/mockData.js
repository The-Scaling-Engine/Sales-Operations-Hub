// Mock data for Sales Operations Hub

export const mockSalesReps = [
  {
    id: '1',
    full_name: 'Sarah Johnson',
    position: 'Senior Closer',
    hire_date: '2023-01-15',
    status: 'Active',
    target_revenue: 500000,
    current_revenue: 425000,
  },
  {
    id: '2',
    full_name: 'Michael Chen',
    position: 'Lead Setter',
    hire_date: '2023-03-20',
    status: 'Active',
    target_revenue: 300000,
    current_revenue: 275000,
  },
  {
    id: '3',
    full_name: 'Emily Rodriguez',
    position: 'Closer',
    hire_date: '2023-06-10',
    status: 'Active',
    target_revenue: 400000,
    current_revenue: 380000,
  },
  {
    id: '4',
    full_name: 'David Kim',
    position: 'Setter',
    hire_date: '2024-01-05',
    status: 'Onboarding',
    target_revenue: 250000,
    current_revenue: 125000,
  },
  {
    id: '5',
    full_name: 'Jessica Taylor',
    position: 'Closer',
    hire_date: '2022-11-01',
    status: 'Active',
    target_revenue: 450000,
    current_revenue: 510000,
  },
  {
    id: '6',
    full_name: 'Robert Martinez',
    position: 'Setter',
    hire_date: '2023-08-15',
    status: 'Active',
    target_revenue: 280000,
    current_revenue: 240000,
  },
];

export const mockCalls = [
  // Successful Demos (Closed_Won)
  { id: '1', sales_rep_id: '1', sales_rep_name: 'Sarah Johnson', status: 'Closed_Won', call_date: '2025-10-01', booked_date: '2025-10-02', close_date: '2025-10-05', deal_value: 25000, client_name: 'Acme Corp' },
  { id: '2', sales_rep_id: '1', sales_rep_name: 'Sarah Johnson', status: 'Closed_Won', call_date: '2025-10-03', booked_date: '2025-10-04', close_date: '2025-10-07', deal_value: 35000, client_name: 'TechStart Inc' },
  { id: '3', sales_rep_id: '3', sales_rep_name: 'Emily Rodriguez', status: 'Closed_Won', call_date: '2025-10-02', booked_date: '2025-10-03', close_date: '2025-10-06', deal_value: 42000, client_name: 'Global Solutions' },
  { id: '4', sales_rep_id: '5', sales_rep_name: 'Jessica Taylor', status: 'Closed_Won', call_date: '2025-10-04', booked_date: '2025-10-05', close_date: '2025-10-08', deal_value: 28000, client_name: 'Innovation Labs' },
  { id: '5', sales_rep_id: '3', sales_rep_name: 'Emily Rodriguez', status: 'Closed_Won', call_date: '2025-10-05', booked_date: '2025-10-06', close_date: '2025-10-09', deal_value: 31000, client_name: 'Startup Hub' },
  { id: '6', sales_rep_id: '1', sales_rep_name: 'Sarah Johnson', status: 'Closed_Won', call_date: '2025-10-06', booked_date: '2025-10-07', close_date: '2025-10-10', deal_value: 38000, client_name: 'Enterprise Co' },
  { id: '7', sales_rep_id: '5', sales_rep_name: 'Jessica Taylor', status: 'Closed_Won', call_date: '2025-10-07', booked_date: '2025-10-08', close_date: '2025-10-11', deal_value: 45000, client_name: 'MegaCorp' },
  { id: '8', sales_rep_id: '3', sales_rep_name: 'Emily Rodriguez', status: 'Closed_Won', call_date: '2025-10-08', booked_date: '2025-10-09', close_date: '2025-10-12', deal_value: 29000, client_name: 'Tech Ventures' },
  
  // Completed (Follow-up Scheduled)
  { id: '9', sales_rep_id: '1', sales_rep_name: 'Sarah Johnson', status: 'Completed', call_date: '2025-10-05', booked_date: '2025-10-06', close_date: null, deal_value: 0, client_name: 'Future Client 1' },
  { id: '10', sales_rep_id: '3', sales_rep_name: 'Emily Rodriguez', status: 'Completed', call_date: '2025-10-06', booked_date: '2025-10-07', close_date: null, deal_value: 0, client_name: 'Future Client 2' },
  { id: '11', sales_rep_id: '5', sales_rep_name: 'Jessica Taylor', status: 'Completed', call_date: '2025-10-07', booked_date: '2025-10-08', close_date: null, deal_value: 0, client_name: 'Future Client 3' },
  { id: '12', sales_rep_id: '1', sales_rep_name: 'Sarah Johnson', status: 'Completed', call_date: '2025-10-08', booked_date: '2025-10-09', close_date: null, deal_value: 0, client_name: 'Future Client 4' },
  
  // Booked (No Answer)
  { id: '13', sales_rep_id: '2', sales_rep_name: 'Michael Chen', status: 'Booked', call_date: '2025-10-05', booked_date: '2025-10-06', close_date: null, deal_value: 0, client_name: 'Prospect 1' },
  { id: '14', sales_rep_id: '2', sales_rep_name: 'Michael Chen', status: 'Booked', call_date: '2025-10-06', booked_date: '2025-10-07', close_date: null, deal_value: 0, client_name: 'Prospect 2' },
  { id: '15', sales_rep_id: '6', sales_rep_name: 'Robert Martinez', status: 'Booked', call_date: '2025-10-07', booked_date: '2025-10-08', close_date: null, deal_value: 0, client_name: 'Prospect 3' },
  { id: '16', sales_rep_id: '4', sales_rep_name: 'David Kim', status: 'Booked', call_date: '2025-10-08', booked_date: '2025-10-09', close_date: null, deal_value: 0, client_name: 'Prospect 4' },
  { id: '17', sales_rep_id: '2', sales_rep_name: 'Michael Chen', status: 'Booked', call_date: '2025-10-09', booked_date: '2025-10-10', close_date: null, deal_value: 0, client_name: 'Prospect 5' },
  { id: '18', sales_rep_id: '6', sales_rep_name: 'Robert Martinez', status: 'Booked', call_date: '2025-10-09', booked_date: '2025-10-10', close_date: null, deal_value: 0, client_name: 'Prospect 6' },
  
  // Set (Not Interested)
  { id: '19', sales_rep_id: '2', sales_rep_name: 'Michael Chen', status: 'Set', call_date: '2025-10-01', booked_date: null, close_date: null, deal_value: 0, client_name: 'Cold Lead 1' },
  { id: '20', sales_rep_id: '4', sales_rep_name: 'David Kim', status: 'Set', call_date: '2025-10-02', booked_date: null, close_date: null, deal_value: 0, client_name: 'Cold Lead 2' },
  { id: '21', sales_rep_id: '6', sales_rep_name: 'Robert Martinez', status: 'Set', call_date: '2025-10-03', booked_date: null, close_date: null, deal_value: 0, client_name: 'Cold Lead 3' },
  { id: '22', sales_rep_id: '2', sales_rep_name: 'Michael Chen', status: 'Set', call_date: '2025-10-04', booked_date: null, close_date: null, deal_value: 0, client_name: 'Cold Lead 4' },
  { id: '23', sales_rep_id: '4', sales_rep_name: 'David Kim', status: 'Set', call_date: '2025-10-05', booked_date: null, close_date: null, deal_value: 0, client_name: 'Cold Lead 5' },
  
  // Closed_Lost
  { id: '24', sales_rep_id: '1', sales_rep_name: 'Sarah Johnson', status: 'Closed_Lost', call_date: '2025-10-01', booked_date: '2025-10-02', close_date: '2025-10-05', deal_value: 0, client_name: 'Lost Deal 1' },
  { id: '25', sales_rep_id: '3', sales_rep_name: 'Emily Rodriguez', status: 'Closed_Lost', call_date: '2025-10-02', booked_date: '2025-10-03', close_date: '2025-10-06', deal_value: 0, client_name: 'Lost Deal 2' },
  { id: '26', sales_rep_id: '5', sales_rep_name: 'Jessica Taylor', status: 'Closed_Lost', call_date: '2025-10-04', booked_date: '2025-10-05', close_date: '2025-10-08', deal_value: 0, client_name: 'Lost Deal 3' },
];

// Simulate async data fetching
export const fetchSalesReps = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSalesReps);
    }, 500);
  });
};

export const fetchCalls = async () => {
  // Try to fetch from API first, fallback to mock data if backend is unavailable
  try {
    const { fetchCallsFromAPI, checkBackendHealth } = await import('./api.js');
    
    // Check if backend is available
    const isBackendAvailable = await checkBackendHealth();
    
    if (isBackendAvailable) {
      console.log('✅ Fetching data from backend API');
      return await fetchCallsFromAPI();
    } else {
      console.log('⚠️ Backend unavailable, using mock data');
      return getMockCalls();
    }
  } catch (error) {
    console.log('⚠️ Error connecting to backend, using mock data:', error.message);
    return getMockCalls();
  }
};

// Helper function to return mock data
function getMockCalls() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Add date field for filtering compatibility
      const callsWithDates = mockCalls.map(call => ({
        ...call,
        date: call.call_date,
        created_at: call.call_date,
        timestamp: call.call_date
      }))
      resolve(callsWithDates);
    }, 500);
  });
}

