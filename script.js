// script.js
// Simple dashboard logic with dummy data & mock AI chatbot

// Utility: generate dummy time series data
function generateData(points) {
  const labels = [];
  const data = [];
  const now = new Date();
  for (let i = points - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i * 7); // weekly points
    labels.push(d.toLocaleDateString('ar-EG'));
    data.push(Math.round(60 + Math.random() * 40)); // 60‑100 range
  }
  return { labels, data };
}

function createChart(ctx, title) {
  const { labels, data } = generateData(12);
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: title,
        data,
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0,191,255,0.2)',
        tension: 0.4,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: title, color: '#fff' }
      },
      scales: {
        x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        y: { min: 0, max: 120, ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    }
  });
}

// Initialize risk analysis chart
const chartRisk = createChart(document.getElementById('chartRisk'), 'مؤشر تحليل المخاطر');

// Update risk analysis using (placeholder) AI API
async function updateRiskAnalysis(){
  // In a real implementation you would call the AI service with AI_API_KEY.
  // Here we simulate a response with dummy data.
  const dummyData = generateData(12);
  chartRisk.data.labels = dummyData.labels;
  chartRisk.data.datasets[0].data = dummyData.data.map(v=> v*0.8); // simulated risk score
  chartRisk.update();
  addMessage('تم تحديث تحليل المخاطر بناءً على البيانات الحالية.', 'bot');
}

document.getElementById('updateRiskBtn').addEventListener('click', updateRiskAnalysis);


// Filter handling (simple re‑draw with new dummy data)
function applyFilters() {
  // In a real app you would fetch data based on selected filters.
  chartStrategic.data = generateData(12);
  chartStrategic.update();
  chartOperational.data = generateData(12);
  chartOperational.update();
  chartFinancial.data = generateData(12);
  chartFinancial.update();
}

document.getElementById('timeRange').addEventListener('change', applyFilters);
document.getElementById('department').addEventListener('change', applyFilters);

// Mock AI chatbot – very simple rule‑based responses
const messagesEl = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, from) {
  const div = document.createElement('div');
  div.className = 'msg ' + (from === 'user' ? 'user' : 'bot');
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function mockBotResponse(question) {
  const q = question.toLowerCase();
  if (q.includes('ما هو الأداء الاستراتيجي')) return 'الأداء الاستراتيجي هو ... (معلومات تجريبية)';
  if (q.includes('كيف أغير الفلتر')) return 'يمكنك تغيير الفلتر من القائمة العليا فوق المخططات.';
  return 'أنا روبوت بسيط، سأتدرب لاحقًا لتقديم إجابات أكثر دقة.';
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  userInput.value = '';
  // Simulate async AI response
  setTimeout(() => {
    const reply = mockBotResponse(text);
    addMessage(reply, 'bot');
  }, 600);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

// Optional: file upload for data refresh (placeholder UI)
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.json,.csv';
fileInput.style.display = 'none';
fileInput.addEventListener('change', () => {
  addMessage('تم تحميل الملف، سيتم تحديث البيانات قريبًا.', 'bot');
  // In a real implementation you would parse and refresh charts.
});

const uploadBtn = document.createElement('button');
uploadBtn.textContent = 'تحميل بيانات';
uploadBtn.style.marginTop = '0.5rem';
uploadBtn.onclick = () => fileInput.click();

document.querySelector('.chatbot .chat-window').appendChild(uploadBtn);
document.querySelector('.chatbot .chat-window').appendChild(fileInput);
