// Simple script to test webhook endpoint locally
// Usage: node test-webhook.js

const testWebhookData = {
  id: 'test_call_' + Date.now(),
  user_name: 'Sarah Johnson',
  user_id: '1',
  contact_name: 'Test Customer',
  contact_phone: '+1234567890',
  call_status: 'completed',
  deal_value: 5000,
  call_date: new Date().toISOString(),
  duration: 300,
  notes: 'This is a test call from the test script',
  tags: ['test', 'demo']
};

fetch('http://localhost:5000/api/webhooks/ghl-call', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testWebhookData)
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ Webhook test successful!');
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('❌ Webhook test failed:', error.message);
    console.log('Make sure the server is running on http://localhost:5000');
  });



