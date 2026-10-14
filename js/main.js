/**
 * AKRAM ALI - PORTFOLIO INTERACTIVITY SCRIPT
 * Specialization: Web, Mobile, Desktop & AI Engineering
 * WhatsApp: +91 73639 81472
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Global Constants ---
  const WHATSAPP_PHONE = '917363981472';
  const DISPLAY_PHONE = '+91 73639 81472';

  // --- 1. Dynamic Typing Animation in Hero ---
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Full-Stack Web Architect',
      'Mobile App Engineer (iOS & Android)',
      'Cross-Platform Desktop Developer',
      'Generative AI & LLM Systems Builder',
      'Cloud & Autonomous Agent Specialist'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 35;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 75;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
      }

      setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
  }

  // --- 2. Navbar Scroll State & Section Highlighting ---
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky navbar effect
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Link Tracker
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // --- 3. Mobile Navigation Drawer ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // --- 4. 3D Tilt Effect on Akram's Picture Card (Desktop) ---
  const pictureCard = document.querySelector('.picture-card-frame');
  if (pictureCard && window.innerWidth > 992) {
    pictureCard.addEventListener('mousemove', (e) => {
      const rect = pictureCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      pictureCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    pictureCard.addEventListener('mouseleave', () => {
      pictureCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }

  // --- 5. Interactive Tech Stack Filter ---
  const techFilterBtns = document.querySelectorAll('.tech-filters .filter-btn');
  const techCards = document.querySelectorAll('.tech-card');

  techFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      techCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Featured Projects Filter & Data ---
  const projectFilterBtns = document.querySelectorAll('.project-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (category === 'all' || itemCategory === category || itemCategory.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Detailed Data for Modal
  const projectData = {
    'nexus-ai': {
      title: 'NexusAI Copilot & Multi-Agent Knowledge Hub',
      category: 'AI & Machine Learning / Web',
      image: 'assets/projects/nexus-ai.jpg',
      desc: 'An enterprise-grade autonomous AI copilot built with LangChain, LLaMA-3, and OpenAI GPT-4o. Features retrieval-augmented generation (RAG) over vector databases (Pinecone), automated task decomposition, real-time code generation, and multi-model routing to optimize latency and cost.',
      client: 'AI Tech Ventures',
      timeline: '8 Weeks',
      deliverables: 'Web App, AI Agent Pipeline, FastAPI Backend, RAG Engine',
      techs: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'React 18', 'Pinecone', 'Docker'],
      features: [
        'Multi-agent task collaboration with automatic tool execution',
        'Sub-second semantic search across 500k+ enterprise documents',
        'Interactive prompt engineering playground & live telemetry',
        'Streaming real-time responses via WebSocket connections'
      ],
      whatsappMsg: 'Hi Akram, I am interested in building an AI Copilot or RAG Agent system like NexusAI.'
    },
    'fitpulse-mobile': {
      title: 'FitPulse Pro - Biometric Mobile Telemetry App',
      category: 'Mobile App Development (iOS & Android)',
      image: 'assets/projects/fitpulse-mobile.jpg',
      desc: 'High-performance cross-platform mobile fitness ecosystem connecting with BLE smart wearables and Apple HealthKit / Google Fit. Provides real-time heart rate zone telemetry, sleep stage breakdown, custom audio coaching routines, and offline workout synchronization.',
      client: 'PulseFit Technologies',
      timeline: '10 Weeks',
      deliverables: 'iOS & Android App, BLE Wearable Bridge, Cloud Sync API',
      techs: ['React Native', 'TypeScript', 'Redux Toolkit', 'HealthKit', 'Node.js', 'PostgreSQL'],
      features: [
        'Low-latency Bluetooth Smart biometric telemetry tracking',
        'Offline-first SQLite local caching with seamless cloud syncing',
        'Fluid 60FPS biometric graph visualizations with Skia',
        'Gamified streak challenges and automated push notifications'
      ],
      whatsappMsg: 'Hi Akram, I am interested in building a high-performance Mobile App like FitPulse Pro.'
    },
    'studioflow-desktop': {
      title: 'StudioFlow Core - Cross-Platform Creative IDE',
      category: 'Desktop Software Development',
      image: 'assets/projects/studioflow-desktop.jpg',
      desc: 'Modern cross-platform desktop application designed for 3D technical artists and creative developers. Features an ultra-responsive node-based shader graph editor, code editor with syntax highlighting, sequence timeline, and native hardware GPU acceleration.',
      client: 'Synapse Creative Labs',
      timeline: '12 Weeks',
      deliverables: 'Desktop App for Windows, macOS & Linux (.exe, .dmg, .AppImage)',
      techs: ['Tauri', 'Rust', 'Electron', 'TypeScript', 'WebGL', 'C# .NET Engine'],
      features: [
        'Lightweight native footprint powered by Rust/Tauri with zero bloat',
        'Node-based visual shader editor with live preview viewport',
        'Multi-track timeline sequence engine with millisecond precision',
        'Cross-platform automatic self-updater and native installer packages'
      ],
      whatsappMsg: 'Hi Akram, I am looking to develop a Cross-Platform Desktop App like StudioFlow.'
    },
    'omnicommerce-web': {
      title: 'Luminaria Luxe 360 - Headless E-Commerce Platform',
      category: 'Web Development / Full-Stack SaaS',
      image: 'assets/projects/omnicommerce-web.jpg',
      desc: 'Next-generation headless luxury e-commerce platform built for high volume transactions. Achieved a 99/100 Google Lighthouse score with edge rendering, global inventory syncing, Stripe & WhatsApp automated order notifications, and an intuitive merchant analytics cockpit.',
      client: 'Luxe Brands Global',
      timeline: '6 Weeks',
      deliverables: 'Storefront Web App, Admin Cockpit, Stripe Checkout, Order Webhooks',
      techs: ['Next.js 14', 'TypeScript', 'Tailwind/CSS', 'Stripe API', 'GraphQL', 'Supabase'],
      features: [
        'Sub-100ms global page loads with Next.js edge caching and SSG',
        'Interactive real-time merchant analytics & revenue forecasting',
        'One-click WhatsApp customer support and dispatch alerts',
        'Multi-currency and localized tax compliance integration'
      ],
      whatsappMsg: 'Hi Akram, I want to develop a high-speed E-Commerce or Web Application like Luminaria Luxe.'
    },
    'visionguard-ai': {
      title: 'Sentinel Vision AI - Real-Time Surveillance & Detection',
      category: 'AI Computer Vision / Desktop & Cloud',
      image: 'assets/projects/visionguard-ai.jpg',
      desc: 'Enterprise security analytics platform leveraging custom-trained YOLOv9 computer vision models. Analyzes multi-channel CCTV feeds in real time for automated intrusion detection, vehicle license plate identification, occupancy heatmaps, and instant security alerting.',
      client: 'Global Logistics Center',
      timeline: '10 Weeks',
      deliverables: 'CV Inference Pipeline, Real-Time Monitoring Dashboard, Mobile Alert Bot',
      techs: ['Python', 'YOLOv9', 'OpenCV', 'PyTorch', 'FastAPI', 'WebRTC', 'React'],
      features: [
        'Concurrent multi-camera stream processing at 30+ FPS per channel',
        'Spatial tracking and dwell-time heatmap analytics',
        'Instant WhatsApp & Telegram alerts with intrusion snapshots',
        'On-premise GPU optimization with TensorRT acceleration'
      ],
      whatsappMsg: 'Hi Akram, I need an AI Computer Vision or Video Analytics solution like Sentinel Vision.'
    },
    'fintrack-mobile': {
      title: 'Zenith FinTrack - Next-Gen Banking & Crypto Portfolio',
      category: 'Mobile App Development (iOS & Android)',
      image: 'assets/projects/fintrack-mobile.jpg',
      desc: 'A secure, bank-grade mobile financial portfolio application uniting traditional debit/credit accounts and multi-chain cryptocurrency wallets. Features biometric FaceID authentication, automated expense categorization, and real-time exchange rates.',
      client: 'Zenith Financial Group',
      timeline: '8 Weeks',
      deliverables: 'iOS & Android App, Banking API Webhooks, AES-256 Encrypted Vault',
      techs: ['Flutter', 'Dart', 'Node.js', 'MongoDB', 'Firebase Auth', 'Web3.js'],
      features: [
        'AES-256 local encrypted storage for private financial credentials',
        'Interactive dynamic expense breakdown charts with animated slices',
        'Push notifications for price alerts and transaction receipts',
        'Real-time currency exchange rates with automated caching'
      ],
      whatsappMsg: 'Hi Akram, I would like to build a FinTech or Mobile Banking App like Zenith FinTrack.'
    }
  };

  // --- 7. Modal Handlers ---
  const modal = document.querySelector('.project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalBackdrop = document.querySelector('.modal-backdrop');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modal) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = data.title;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-client').textContent = data.client;
    document.getElementById('modal-timeline').textContent = data.timeline;
    document.getElementById('modal-deliverables').textContent = data.deliverables;

    // Tech Tags
    const techBox = document.getElementById('modal-techs');
    techBox.innerHTML = '';
    data.techs.forEach(t => {
      const span = document.createElement('span');
      span.className = 'project-tech-pill';
      span.textContent = t;
      techBox.appendChild(span);
    });

    // Features
    const featureBox = document.getElementById('modal-features');
    if (featureBox) {
      featureBox.innerHTML = '';
      data.features.forEach(f => {
        const li = document.createElement('li');
        li.className = 'service-feature-item';
        li.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${f}</span>
        `;
        featureBox.appendChild(li);
      });
    }

    // Modal WhatsApp Button with specific pre-filled message
    const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');
    if (modalWhatsappBtn) {
      const encodedMsg = encodeURIComponent(data.whatsappMsg);
      modalWhatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicked direct WhatsApp link, don't open modal
      if (e.target.closest('.project-whatsapp-discuss')) return;
      const projectId = card.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --- 8. Copy Phone Number Feature with Toast ---
  const copyBtn = document.getElementById('copy-phone-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(DISPLAY_PHONE).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2200);
      }).catch(err => {
        console.error('Clipboard copy error', err);
      });
    });
  }

  // --- 9. Interactive Contact Form -> Direct WhatsApp Forwarding ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('client-name').value.trim();
      const email = document.getElementById('client-email').value.trim();
      const projectType = document.getElementById('project-type').value;
      const budget = document.getElementById('project-budget').value;
      const message = document.getElementById('project-desc').value.trim();

      if (!name || !message) {
        alert('Please provide your name and project description.');
        return;
      }

      // Format professional WhatsApp message
      const text = `*New Project Inquiry for Akram Ali*%0A%0A` +
        `👤 *Client Name:* ${encodeURIComponent(name)}%0A` +
        `📧 *Email:* ${encodeURIComponent(email || 'Not provided')}%0A` +
        `💼 *Project Category:* ${encodeURIComponent(projectType)}%0A` +
        `💰 *Estimated Budget:* ${encodeURIComponent(budget)}%0A%0A` +
        `📝 *Project Overview:*%0A${encodeURIComponent(message)}%0A%0A` +
        `_Sent via Akram Ali Portfolio Website_`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Reset form and show confirmation
      contactForm.reset();
      const submitBtn = contactForm.querySelector('.btn-submit-form');
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Opening WhatsApp...</span>
      `;
      submitBtn.style.background = '#25D366';

      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
      }, 3500);
    });
  }

  // --- 10. Floating WhatsApp Widget Tooltip Dismiss & Toggle ---
  const floatingBubble = document.querySelector('.floating-whatsapp-bubble');
  const tooltipCard = document.querySelector('.whatsapp-tooltip-card');

  if (floatingBubble && tooltipCard) {
    // Only auto-show tooltip on desktop to prevent obscuring mobile content
    if (window.innerWidth > 768) {
      setTimeout(() => {
        tooltipCard.classList.add('active');
      }, 3500);

      // Auto hide after 9 seconds
      setTimeout(() => {
        tooltipCard.classList.remove('active');
      }, 9500);
    }
  }

  // --- 11. Smooth Back to Top Scroll ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
