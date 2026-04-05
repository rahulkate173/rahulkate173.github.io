/* ============================================
   RAHUL KATE — PORTFOLIO SCRIPTS
   Skills filter, Projects, Nav, Resume check
   ============================================ */

// ==========================================
// 1. SKILLS DATA & FILTER
// ==========================================
(function initSkills() {
  const filterContainer = document.getElementById('skills-filter');
  const tagsContainer = document.getElementById('skills-tags');
  const countEl = document.getElementById('skills-count');
  if (!filterContainer || !tagsContainer) return;

  // Skill icon mapping
  const skillIcons = {
    'PyTorch': 'fas fa-fire',
    'Transformers': 'fas fa-robot',
    'LSTM / GRU': 'fas fa-brain',
    'Vision Transformers': 'fas fa-eye',
    'cuML': 'fas fa-microchip',
    'Data Pipelines': 'fas fa-stream',
    'Scikit-Learn': 'fas fa-cogs',
    'NumPy': 'fas fa-calculator',
    'Pandas': 'fas fa-table',
    'Matplotlib': 'fas fa-chart-bar',
    'FastAPI': 'fas fa-bolt',
    'Flask': 'fas fa-flask',
    'Selenium': 'fas fa-globe',
    'BeautifulSoup': 'fas fa-spider',
    'MLflow': 'fas fa-chart-line',
    'DVC': 'fas fa-code-branch',
    'Airflow': 'fas fa-wind',
    'lakeFS': 'fas fa-database',
    'W&B': 'fas fa-chart-area',
    'SQL': 'fas fa-database',
    'Grafana': 'fas fa-tachometer-alt',
    'Python': 'fab fa-python',
    'R': 'fas fa-registered',
    'C / C++': 'fas fa-code',
    'JavaScript': 'fab fa-js-square',
    'HTML': 'fab fa-html5',
    'CSS': 'fab fa-css3-alt',
    'EDA': 'fas fa-search',
    'Statistical Modeling': 'fas fa-chart-pie',
    'ML Algorithms': 'fas fa-project-diagram',
    'Feature Engineering': 'fas fa-wrench',
    'Time-Series Forecasting': 'fas fa-clock',
    'Git / GitHub': 'fab fa-git-alt',
    'Jupyter': 'fas fa-book-open',
    'Google Colab': 'fas fa-cloud',
    'VS Code': 'fas fa-laptop-code',
    'Docker': 'fab fa-docker',
  };

  const skills = {
    'AI/ML/DL': [
      'Scikit-Learn', 'PyTorch', 'Transformers', 'LSTM / GRU',
      'Vision Transformers', 'cuML', 'ML Algorithms', 'Feature Engineering',
      'Time-Series Forecasting', 'Statistical Modeling', 'EDA', 'Data Pipelines'
    ],
    'Python Libs': [
      'NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn',
      'FastAPI', 'Flask', 'Selenium', 'BeautifulSoup'
    ],
    'MLOps': [
      'MLflow', 'DVC', 'Airflow', 'lakeFS', 'W&B', 'Docker', 'Grafana'
    ],
    'Languages': [
      'Python', 'R', 'C / C++', 'SQL', 'JavaScript', 'HTML', 'CSS'
    ],
    'Tools': [
      'Git / GitHub', 'Jupyter', 'Google Colab', 'VS Code',
      'Grafana', 'Docker'
    ]
  };

  // Get unique skills
  const allSkillsSet = new Set();
  Object.values(skills).forEach(arr => arr.forEach(s => allSkillsSet.add(s)));
  const allSkills = Array.from(allSkillsSet);

  // Build filter buttons
  const categories = [
    { key: 'all', label: 'All Skills', count: allSkills.length, icon: 'fas fa-layer-group' },
    { key: 'AI/ML/DL', label: 'AI/ML/DL', count: skills['AI/ML/DL'].length, icon: 'fas fa-brain' },
    { key: 'Python Libs', label: 'Python Libs', count: skills['Python Libs'].length, icon: 'fab fa-python' },
    { key: 'MLOps', label: 'MLOps', count: skills['MLOps'].length, icon: 'fas fa-server' },
    { key: 'Languages', label: 'Languages', count: skills['Languages'].length, icon: 'fas fa-code' },
    { key: 'Tools', label: 'Tools', count: skills['Tools'].length, icon: 'fas fa-wrench' },
  ];

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat.key === 'all' ? ' active' : '');
    btn.dataset.filter = cat.key;
    btn.innerHTML = `<i class="${cat.icon}"></i> ${cat.label} <span class="filter-count">${cat.count}</span>`;
    btn.addEventListener('click', () => filterSkills(cat.key));
    filterContainer.appendChild(btn);
  });

  // Build skill chips
  allSkills.forEach(skill => {
    const chip = document.createElement('span');
    chip.className = 'skill-chip show';
    // Find categories this skill belongs to
    const cats = [];
    Object.entries(skills).forEach(([key, arr]) => {
      if (arr.includes(skill)) cats.push(key);
    });
    chip.dataset.categories = cats.join(',');
    const icon = skillIcons[skill] || 'fas fa-circle';
    chip.innerHTML = `<i class="${icon}"></i> ${skill}`;
    tagsContainer.appendChild(chip);
  });

  updateCount(allSkills.length);

  function filterSkills(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');

    const chips = document.querySelectorAll('.skill-chip');
    let visibleCount = 0;

    chips.forEach(chip => {
      const cats = chip.dataset.categories.split(',');
      if (category === 'all' || cats.includes(category)) {
        chip.classList.remove('hide');
        chip.classList.add('show');
        visibleCount++;
      } else {
        chip.classList.remove('show');
        chip.classList.add('hide');
      }
    });

    updateCount(visibleCount);
  }

  function updateCount(count) {
    countEl.textContent = `Showing ${count} total skills`;
  }
})();


// ==========================================
// 2. PROJECTS
// ==========================================
(function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const projects = [
    {
      name: 'EDIPULSE',
      desc: 'An intelligent software for X12 files that reduces time overhead by pointing errors with Explainable AI.',
      url: 'https://github.com/rahulkate173/EDIPULSE',
      tags: ['Python', 'AI', 'Healthcare'],
      stars: 2
    },
    {
      name: 'Symbolic Regression',
      desc: 'Research project for ML4SCI — applying symbolic regression techniques for scientific discovery.',
      url: 'https://github.com/rahulkate173/Symbolic-Regression',
      tags: ['Python', 'ML', 'Research'],
      stars: 0
    },
    {
      name: 'Deep Learning Quest',
      desc: 'A comprehensive quest containing all deep learning stuff — from neural networks to advanced architectures.',
      url: 'https://github.com/rahulkate173/Deep-Learning-Quest-',
      tags: ['Jupyter', 'Deep Learning'],
      stars: 0
    },
    {
      name: 'FleetSync',
      desc: 'A web app that monitors fleet vehicles and navigates with full computation on Pathway engine.',
      url: 'https://github.com/rahulkate173/fleetSync',
      tags: ['Python', 'FastAPI', 'Pathway'],
      stars: 0
    },
    {
      name: 'Papers & Code',
      desc: 'Research paper implementations with detailed explanations — reproducing key ML/DL findings.',
      url: 'https://github.com/rahulkate173/papers-and-code',
      tags: ['Research', 'ML', 'Papers'],
      stars: 0
    },
    {
      name: 'Linear Attention ViT',
      desc: 'Implementation of Linear Attention Vision Transformer — efficient attention for computer vision.',
      url: 'https://github.com/rahulkate173/Linear-attention-Vision-Transformer-',
      tags: ['Vision Transformer', 'CV'],
      stars: 0
    },
    {
      name: 'Statistics Work',
      desc: 'Comprehensive statistics reference — probability distributions to hypothesis testing, visualized.',
      url: 'https://github.com/rahulkate173/Statistics-Work',
      tags: ['Statistics', 'Data Science'],
      stars: 0
    },
    {
      name: 'Digital Locker System',
      desc: 'A Python project — digital locker system with secure file management capabilities.',
      url: 'https://github.com/rahulkate173/Digital-Locker-System',
      tags: ['Python', 'Security'],
      stars: 1
    },
    {
      name: 'Decorators',
      desc: 'Complete decorators explanation — a comprehensive guide to Python decorators with examples.',
      url: 'https://github.com/rahulkate173/decorators',
      tags: ['Python', 'Tutorial'],
      stars: 1
    }
  ];

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.addEventListener('click', () => window.open(project.url, '_blank'));

    const starBadge = project.stars > 0
      ? `<span class="star-badge" title="${project.stars} stars"><i class="fas fa-star"></i></span>`
      : '';

    card.innerHTML = `
      <div class="project-card-title">${project.name} ${starBadge}</div>
      <p class="project-card-desc">${project.desc}</p>
      <div class="project-card-tags">
        ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
})();


// ==========================================
// 3. BOTTOM NAVIGATION
// ==========================================
(function initBottomNav() {
  const navItems = document.querySelectorAll('.bottom-nav-item[data-section]');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Active state on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    let found = false;

    // Iterate in reverse so the lowest visible section wins
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (scrollY >= section.offsetTop) {
        const id = section.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
        found = true;
        break;
      }
    }

    if (!found) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === 'home');
      });
    }
  });
})();


// ==========================================
// 4. MENU OVERLAY
// ==========================================
(function initMenu() {
  const toggleBtn = document.getElementById('menu-toggle-btn');
  const overlay = document.getElementById('menu-overlay');
  const closeBtn = document.getElementById('menu-close');
  const menuLinks = document.querySelectorAll('.menu-overlay-nav a');

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ==========================================
// 5. RESUME FILE CHECK
// ==========================================
(function initResumeCheck() {
  const resumeButtons = document.querySelectorAll('#hero-cv-link, #resume-download-btn');
  const noteEl = document.getElementById('resume-note');

  fetch('assets/resume.pdf', { method: 'HEAD' })
    .then(response => {
      if (!response.ok) {
        hideResume();
      }
    })
    .catch(() => {
      hideResume();
    });

  function hideResume() {
    resumeButtons.forEach(btn => {
      btn.style.display = 'none';
    });
    if (noteEl) {
      noteEl.textContent = 'Resume coming soon — check back later!';
    }
  }
})();


// ==========================================
// 6. SCROLL REVEAL
// ==========================================
(function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.section-heading, .about-content, .skills-filter, .skills-tags, .project-card, .education-item, .resume-info, .timeline, .contact-item'
  );

  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  elements.forEach(el => observer.observe(el));
})();


// ==========================================
// 7. SMOOTH SCROLL FOR ALL ANCHORS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
