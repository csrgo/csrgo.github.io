// tool-sections.js

function renderToolSections(toolName) {
  const data = window[toolName];
  if (!data) return;

  // HERO SECTION
  if (data.hero && document.getElementById('heroSection')) {
    document.getElementById('heroSection').innerHTML = `
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 rounded-2xl ${data.hero.iconBg} flex items-center justify-center animate-float">
          <i data-lucide="${data.hero.icon}" class="w-8 h-8 text-white"></i>
        </div>
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 animate-fade-in">
        <span class="gradient-logo-text">${data.hero.title}</span>
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-6 animate-fade-in">
        ${data.hero.subtitle}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        ${data.hero.features.map(f => `
          <div class="flex items-center gap-2 text-gray-600 justify-center">
            <i data-lucide="${f.icon}" class="w-6 h-6 ${f.color}"></i>
            <span class="text-base font-medium">${f.label}</span>
          </div>
        `).join('')}
      </div>
    `;
    lucide.createIcons();
  }

  // What is
  document.getElementById('whatIsSection').innerHTML = `
    <div class="container mx-auto max-w-4xl">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-10 md:w-12 aspect-square rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          <i data-lucide="info" class="w-6 h-6 text-white"></i>
        </div>
        <h2 class="text-3xl font-bold">${data.whatIs.title}</h2>
      </div>
      <div class="bg-gray-50 rounded-2xl p-8 shadow-sm">
        <p class="text-gray-600 text-lg leading-relaxed">${data.whatIs.content}</p>
      </div>
    </div>
  `;

  // Why Use
  document.getElementById('whyUseSection').innerHTML = `
    <div class="container mx-auto max-w-4xl">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-10 md:w-12 aspect-square rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          <i data-lucide="star" class="w-6 h-6 text-white"></i>
        </div>
        <h2 class="text-3xl font-bold">${data.whyUse.title}</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        ${data.whyUse.items.map((item, idx) => `
          <div class="bg-white p-6 rounded-xl shadow-sm card-hover">
            <div class="w-12 h-12 rounded-xl ${['bg-blue-50','bg-purple-50','bg-green-50','bg-yellow-50'][idx%4]} flex items-center justify-center mb-4">
              <i data-lucide="${item.icon || ['shield','settings','file-type','zap'][idx%4]}" class="w-6 h-6 ${['text-blue-600','text-purple-600','text-green-600','text-yellow-600'][idx%4]}"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
            <p class="text-gray-600">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // How to Use
  document.getElementById('howToUseSection').innerHTML = `
    <div class="container mx-auto max-w-4xl">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-10 md:w-12 aspect-square rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          <i data-lucide="help-circle" class="w-6 h-6 text-white"></i>
        </div>
        <h2 class="text-3xl font-bold">${data.howToUse.title}</h2>
      </div>
      <div class="space-y-6">
        ${data.howToUse.steps.map((step, i) => `
          <div class="flex gap-4 bg-gray-50 p-6 rounded-xl">
            <div class="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">${i+1}</div>
            <div>
              <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
                <i data-lucide="${step.icon || (i===0?'upload':i===1?'settings':'wand-2')}" class="w-5 h-5 text-blue-600"></i>
                ${step.title}
              </h3>
              <p class="text-gray-600">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Features
  document.getElementById('featuresSection').innerHTML = `
    <div class="container mx-auto max-w-4xl">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-10 md:w-12 aspect-square rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          <i data-lucide="list-checks" class="w-6 h-6 text-white"></i>
        </div>
        <h2 class="text-3xl font-bold">Features</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        ${data.features.map(f => `
          <div class="bg-white p-6 rounded-xl shadow-sm card-hover">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>
              </div>
              <span class="text-gray-600">${f}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // FAQ
  document.getElementById('faqSection').innerHTML = `
    <div class="container mx-auto max-w-4xl">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-10 md:w-12 aspect-square rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          <i data-lucide="help-circle" class="w-6 h-6 text-white"></i>
        </div>
        <h2 class="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div class="space-y-4">
        ${data.faq.map((item, i) => `
          <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
            <button class="w-full px-6 py-4 text-left flex items-center justify-between">
              <h3 class="text-xl font-semibold">${item.q}</h3>
              <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500 faq-icon transition-transform duration-300"></i>
            </button>
            <div class="faq-content overflow-hidden transition-all duration-300 ease-in-out" style="max-height: 0;">
              <div class="px-6 pb-4">
                <p class="text-gray-600">${item.a}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  lucide.createIcons();

  // FAQ toggle
  let activeFaq = null;
  document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('button');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');
    
    button.addEventListener('click', () => {
      // If clicking the active FAQ, close it
      if (activeFaq === item) {
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
        activeFaq = null;
        return;
      }

      // If there's an active FAQ, close it first
      if (activeFaq) {
        const activeContent = activeFaq.querySelector('.faq-content');
        const activeIcon = activeFaq.querySelector('.faq-icon');
        activeContent.style.maxHeight = '0';
        activeIcon.style.transform = 'rotate(0deg)';
      }

      // Open the clicked FAQ
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.style.transform = 'rotate(180deg)';
      activeFaq = item;
    });
  });
}

// On DOMContentLoaded, render sections if placeholders exist
window.addEventListener('DOMContentLoaded', () => {
  if (window.CSRGO_TOOL_NAME) {
    renderToolSections(window.CSRGO_TOOL_NAME);
  }
});

// Inject shared tool styles if not already present
(function() {
  if (!document.getElementById('csrgo-tool-shared-styles')) {
    const style = document.createElement('style');
    style.id = 'csrgo-tool-shared-styles';
    style.textContent = `
      .gradient-bg {
        background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
      }
      .card-hover {
        transition: all 0.3s ease;
      }
      .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      .drop-zone-active {
        border-color: #4F46E5;
        background-color: rgba(79, 70, 229, 0.05);
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `;
    document.head.appendChild(style);
  }
})(); 