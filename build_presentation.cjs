const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

console.log('Generating PowerPoint presentation...');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches (or 13.33 x 7.5 depending on pptxgen standard)

const crescentLogoPath = path.resolve('report/images/crescent_logo.jpg');
const thiranexCertPath = path.resolve('report/images/thiranex_certificate.jpg');

// Color Palette matching Crescent and professional corporate presentation
const NAVY = '1E3A8A';
const GOLD = 'C5A880';
const DARK_GRAY = '1F2937';
const LIGHT_GRAY = 'F3F4F6';
const BORDER_GRAY = 'E5E7EB';
const WHITE = 'FFFFFF';
const CRESCENT_BLUE = '0C2340';

// Helper to add standard slide header & Crescent logo
function setupSlide(slide, titleText) {
  // Top header bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.12,
    fill: { color: NAVY },
    line: { color: NAVY }
  });

  // Slide Heading
  if (titleText) {
    slide.addText(titleText, {
      x: 0.8,
      y: 0.45,
      w: 8.5,
      h: 0.65,
      fontSize: 22,
      fontFace: 'Arial',
      bold: true,
      color: CRESCENT_BLUE
    });

    // Thin accent line under heading
    slide.addShape(pres.ShapeType.line, {
      x: 0.8,
      y: 1.15,
      w: 11.7,
      h: 0,
      line: { color: GOLD, width: 2 }
    });
  }

  // Crescent Logo in bottom right
  if (fs.existsSync(crescentLogoPath)) {
    slide.addImage({
      path: crescentLogoPath,
      x: 10.6,
      y: 6.2,
      w: 2.1,
      h: 0.95
    });
  }

  // Subtle bottom footer line
  slide.addShape(pres.ShapeType.line, {
    x: 0.8,
    y: 6.35,
    w: 9.5,
    h: 0,
    line: { color: BORDER_GRAY, width: 1 }
  });

  // Footer text
  slide.addText('B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE', {
    x: 0.8,
    y: 6.45,
    w: 9.5,
    h: 0.4,
    fontSize: 9,
    fontFace: 'Arial',
    color: '6B7280'
  });
}

// =========================================================================
// SLIDE 1: Title of the Internship
// =========================================================================
{
  const s = pres.addSlide();
  
  // Top Accent Bar
  s.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.2,
    fill: { color: NAVY }
  });

  // Department banner
  s.addText('DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING', {
    x: 0.8,
    y: 0.6,
    w: 11.7,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    bold: true,
    color: NAVY,
    letterSpacing: 2
  });

  // Title of the Internship
  s.addText('SHOPWAVE: FULL-STACK E-COMMERCE\nPRODUCT CATALOG PLATFORM', {
    x: 0.8,
    y: 1.2,
    w: 11.7,
    h: 1.5,
    fontSize: 28,
    fontFace: 'Arial',
    bold: true,
    color: CRESCENT_BLUE,
    lineSpacingMultiple: 1.15
  });

  s.addText('INTERNSHIP TRAINING PRESENTATION', {
    x: 0.8,
    y: 2.85,
    w: 11.7,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Arial',
    bold: true,
    color: GOLD
  });

  // Details Container Box
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 3.5,
    w: 7.5,
    h: 2.3,
    fill: { color: LIGHT_GRAY },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Submitted by:\n', options: { bold: true, fontSize: 11, color: '6B7280' } },
    { text: 'ASHIEQ AHAMED S A\n', options: { bold: true, fontSize: 16, color: CRESCENT_BLUE } },
    { text: 'RRN: 230071601031\n', options: { bold: true, fontSize: 13, color: DARK_GRAY } },
    { text: 'Branch & Year: B.Tech Computer Science and Engineering (4th Year)\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: 'Host Organization: Thiranex (Skill Development & Future Tech), Chennai\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: 'Internship Period: 18th August 2026 – 17th September 2026', options: { fontSize: 11, color: '4B5563' } }
  ], {
    x: 1.1,
    y: 3.65,
    w: 7.0,
    h: 2.0,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });

  // Large Crescent Logo on the right
  if (fs.existsSync(crescentLogoPath)) {
    s.addImage({
      path: crescentLogoPath,
      x: 9.0,
      y: 3.6,
      w: 3.5,
      h: 1.6
    });
  }

  s.addText('B.S. Abdur Rahman Crescent Institute of Science and Technology\n(Deemed to be University u/s 3 of the UGC Act, 1956) • Vandalur, Chennai – 600 048', {
    x: 0.8,
    y: 6.4,
    w: 11.7,
    h: 0.5,
    fontSize: 10,
    fontFace: 'Arial',
    color: '6B7280',
    align: 'center'
  });
}

// =========================================================================
// SLIDE 2: About the company
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'About the company');

  // Left Column Card: Brief Overview, Mission & Vision
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Brief Overview of the Organization\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• Company: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'THIRANEX (Skill Development & Future Tech)\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Headquarters: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Chennai, Tamil Nadu (Recognized by MSME, Govt. of India)\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Leadership: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Founded & led by Hariharan M (Founder & CEO)\n\n', options: { fontSize: 11, color: DARK_GRAY } },
    
    { text: 'Mission and Vision\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• Vision: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'To become a recognized center of excellence in future-ready technologies, empowering engineers with production-grade coding standards.\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Mission: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'To deliver project-centric industrial training on contemporary stacks (React, Node.js, Express, Cloud CI/CD) and build scalable solutions.', options: { fontSize: 11, color: DARK_GRAY } }
  ], {
    x: 1.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });

  // Right Column Card: Key services/products & Values and principles
  s.addShape(pres.ShapeType.rect, {
    x: 6.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Key Services and Products\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• Full-Stack Web Engineering: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Modern SPAs, decoupled microservices, and reactive user interfaces.\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Cloud & DevOps Enablement: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Continuous integration, containerized deployments, and cloud hosting.\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Future Tech & AI: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Intelligent automation, predictive algorithms, and analytics workflows.\n\n', options: { fontSize: 11, color: DARK_GRAY } },

    { text: 'Values and Principles\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• Clean Code Architecture: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Emphasis on maintainable, modular, and self-documenting code.\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Collaborative Development: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Strict adherence to Git branching, peer code reviews, and agile sprints.\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• User-Centric Design: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Prioritizing performance, accessibility (a11y), and intuitive UX.', options: { fontSize: 11, color: DARK_GRAY } }
  ], {
    x: 7.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });
}

// =========================================================================
// SLIDE 3: About the internship
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'About the internship');

  // Left Card: Learning Objectives
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Learning Objectives\n\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '1. Practical Exposure to Specific Technologies:\n', options: { bold: true, fontSize: 11, color: NAVY } },
    { text: '   • Deep-dive into React 19 functional components, custom hooks, and Context API.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Building RESTful web APIs using Node.js and Express 5.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Modular bundling and hot-reloading with Vite 8.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Implementing glassmorphic CSS, design tokens, and local persistence.\n\n', options: { fontSize: 10.5, color: DARK_GRAY } },

    { text: '2. Understanding Industry-Standard Practices:\n', options: { bold: true, fontSize: 11, color: NAVY } },
    { text: '   • Agile Scrum methodology, daily standups, and sprint milestones.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Git feature branching and conventional commit standards (feat, fix, docs).\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Production performance auditing (Core Web Vitals) and cloud CI/CD deployment.', options: { fontSize: 10.5, color: DARK_GRAY } }
  ], {
    x: 1.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.25
  });

  // Right Card: Personal Goals
  s.addShape(pres.ShapeType.rect, {
    x: 6.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Personal Goals\n\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '1. Skill Enhancement:\n', options: { bold: true, fontSize: 11, color: NAVY } },
    { text: '   • Bridging the gap between classroom theory and real-world full-stack development.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Mastering client-side state architecture without external heavy libraries.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Writing resilient code with graceful offline fallbacks and error handling.\n\n', options: { fontSize: 10.5, color: DARK_GRAY } },

    { text: '2. Networking and Professional Growth:\n', options: { bold: true, fontSize: 11, color: NAVY } },
    { text: '   • Direct mentorship under Thiranex engineering leads and founder.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Developing communication and technical presentation skills for team deliverables.\n', options: { fontSize: 10.5, color: DARK_GRAY } },
    { text: '   • Gaining confidence to architect and deploy modern cloud web applications.', options: { fontSize: 10.5, color: DARK_GRAY } }
  ], {
    x: 7.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.25
  });
}

// =========================================================================
// SLIDE 4: Internship Offer letter
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'Internship Offer letter');

  // Left Side: Structured Offer Details
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: LIGHT_GRAY },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'OFFICIAL INTERNSHIP APPOINTMENT\n\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: 'Organization:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'Thiranex (Skill Development & Future Tech), Chennai\n\n', options: { bold: true, fontSize: 11.5, color: DARK_GRAY } },

    { text: 'Candidate Name:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'ASHIEQ AHAMED S A (RRN: 230071601031)\n\n', options: { bold: true, fontSize: 11.5, color: CRESCENT_BLUE } },

    { text: 'Designated Role:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'Full-Stack Web Development Intern\n\n', options: { bold: true, fontSize: 11.5, color: NAVY } },

    { text: 'Internship Tenure:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: '18th August 2026 to 17th September 2026 (One Month)\n\n', options: { bold: true, fontSize: 11.5, color: DARK_GRAY } },

    { text: 'Certificate & Verification ID:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'THX-AUG1826-071\n\n', options: { bold: true, fontSize: 11.5, color: GOLD } },

    { text: 'Primary Mentor / Reporting Authority:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'Hariharan M (Founder & CEO, Thiranex)', options: { fontSize: 11, color: DARK_GRAY } }
  ], {
    x: 1.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.15
  });

  // Right Side: Highlights / Scope Card
  s.addShape(pres.ShapeType.rect, {
    x: 6.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Offer Scope & Terms of Engagement\n\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• Project Deliverable: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Design, implement, and deploy ShopWave, a production-level full-stack e-commerce catalog platform.\n\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Core Technical Stack: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'React 19, Vite 8, Node.js, Express 5, Context API, CSS Glassmorphism, and Render cloud hosting.\n\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Agile Governance: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Four weekly development sprints with continuous code integration via GitHub.\n\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: '• Institutional Alignment: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Carried out in partial fulfillment of B.Tech CSE degree requirements at B.S. Abdur Rahman Crescent Institute of Science and Technology.', options: { fontSize: 11, color: DARK_GRAY } }
  ], {
    x: 7.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.25
  });
}

// =========================================================================
// SLIDE 5: Roles and Responsiblities
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'Roles and Responsiblities');

  // 3 Horizontal/Grid Cards
  // Card 1: Front-end Development
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 3.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Front-End Development\n\n', options: { bold: true, fontSize: 12.5, color: NAVY } },
    { text: '• Component Architecture:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Decomposed UI into modular React 19 functional components (Navbar, ProductCard, ProductGrid, CartDrawer).\n\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '• Custom UI Controls:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Engineered dependency-free glassmorphic CustomSelect dropdown with keyboard accessibility and ARIA roles.\n\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '• Responsive Styling:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Implemented dark luxury theme using CSS design tokens, Grid, and mobile-friendly drawer overlays.', options: { fontSize: 10, color: '4B5563' } }
  ], {
    x: 1.0,
    y: 1.6,
    w: 3.3,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });

  // Card 2: Back-end Development & Integration
  s.addShape(pres.ShapeType.rect, {
    x: 4.8,
    y: 1.4,
    w: 3.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Back-End & API Integration\n\n', options: { bold: true, fontSize: 12.5, color: NAVY } },
    { text: '• RESTful API Endpoints:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Constructed Express.js routes for catalog queries (/api/products) and order transactions (/api/orders).\n\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '• State & Data Persistence:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Integrated React Context API with LocalStorage synchronization for persistent shopping cart and wishlist.\n\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '• Resilient Fallback:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Implemented dual-layer data fetching to keep the catalog responsive during server cold starts.', options: { fontSize: 10, color: '4B5563' } }
  ], {
    x: 5.0,
    y: 1.6,
    w: 3.3,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });

  // Card 3: Teamwork & Enhancements
  s.addShape(pres.ShapeType.rect, {
    x: 8.8,
    y: 1.4,
    w: 3.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Collaboration & Enhancements\n\n', options: { bold: true, fontSize: 12.5, color: NAVY } },
    { text: '• Agile Sprints & Git Workflow:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Pushed isolated feature branches on GitHub using conventional commits and participated in code reviews.\n\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '• Simulated Payment Gateway:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Engineered in-app simulated payment gateway (UPI QR, Card, NetBanking, COD) with tax invoice printing.\n\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '• Cloud Deployment:\n', options: { bold: true, fontSize: 10.5, color: DARK_GRAY } },
    { text: '  Configured continuous cloud deployment on Render with unified client-server production bundle.', options: { fontSize: 10, color: '4B5563' } }
  ], {
    x: 9.0,
    y: 1.6,
    w: 3.3,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });
}

// =========================================================================
// SLIDE 6: About work / projects
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'About work / projects');

  // Left Card: Project Overview & Key Contributions
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Project: ShopWave Atelier Platform\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: 'Full-Stack E-Commerce Product Catalog Platform\n\n', options: { fontSize: 10.5, color: GOLD, bold: true } },

    { text: '• Primary Objective:\n', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: '  Build a luxury, high-velocity catalog featuring instant client-side filtering, state persistence, and realistic checkout.\n\n', options: { fontSize: 10.5, color: '4B5563' } },

    { text: '• Key Contributions & Skills Used:\n', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: '  - Curated 30 lifestyle products across 6 luxury apparel categories.\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '  - Implemented real-time search, price range filtering, and custom sorting.\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '  - Optimized bundle with Vite (builds in ~600ms, FCP: 0.8s, LCP: 1.2s).\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '  - Designed member login portal with order tracking and saved preferences.', options: { fontSize: 10, color: '4B5563' } }
  ], {
    x: 1.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });

  // Right Card: Challenges Faced & Solutions Implemented
  s.addShape(pres.ShapeType.rect, {
    x: 6.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Challenges Faced & Engineering Solutions\n\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },

    { text: '1. Challenge: Browser Select Control Limitations\n', options: { bold: true, fontSize: 10.5, color: NAVY } },
    { text: '   Native <select> elements cannot support custom blur or dark themes.\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '   Solution: Engineered CustomSelect with React refs, click-outside detection, and ARIA listbox accessibility.\n\n', options: { fontSize: 10, color: DARK_GRAY } },

    { text: '2. Challenge: API Latency & Cold Starts\n', options: { bold: true, fontSize: 10.5, color: NAVY } },
    { text: '   Free cloud tiers experience 30-50s cold starts on sleep.\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '   Solution: Implemented dual-layer data resilience—frontend serves local static catalog immediately while syncing with live API.\n\n', options: { fontSize: 10, color: DARK_GRAY } },

    { text: '3. Challenge: Live Payment Demonstration in Viva\n', options: { bold: true, fontSize: 10.5, color: NAVY } },
    { text: '   Live merchant gateways require KYC, bank approval, and paid webhooks.\n', options: { fontSize: 10, color: '4B5563' } },
    { text: '   Solution: Built an in-app simulated gateway (UPI QR, Card, NetBanking, COD) with printable GST tax invoices.', options: { fontSize: 10, color: DARK_GRAY } }
  ], {
    x: 7.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.2
  });
}

// =========================================================================
// SLIDE 7: Source code
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'Source code');

  // Snippet 1: Backend Server (server.js)
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 3.7,
    h: 4.6,
    fill: { color: '0F172A' },
    line: { color: '334155', width: 1 }
  });

  s.addText('server/server.js (Express 5)', {
    x: 1.0, y: 1.5, w: 3.3, h: 0.3,
    fontSize: 10.5, fontFace: 'Courier New', bold: true, color: '38BDF8'
  });

  s.addText(`// Production REST API
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

// Unified static hosting
const dist = path.join(__dirname, '../dist');
app.use(express.static(dist));

app.use((req, res, next) => {
  if (req.path.startsWith('/api'))
    return next();
  res.sendFile(
    path.join(dist, 'index.html')
  );
});

app.listen(PORT, () => {
  console.log('Server on ' + PORT);
});`, {
    x: 1.0, y: 1.9, w: 3.3, h: 3.9,
    fontSize: 8.5, fontFace: 'Courier New', color: 'E2E8F0', lineSpacingMultiple: 1.15
  });

  // Snippet 2: State Context (ShopContext.jsx)
  s.addShape(pres.ShapeType.rect, {
    x: 4.8,
    y: 1.4,
    w: 3.7,
    h: 4.6,
    fill: { color: '0F172A' },
    line: { color: '334155', width: 1 }
  });

  s.addText('ShopContext.jsx (Global State)', {
    x: 5.0, y: 1.5, w: 3.3, h: 0.3,
    fontSize: 10.5, fontFace: 'Courier New', bold: true, color: '38BDF8'
  });

  s.addText(`export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const s = localStorage.getItem('cart');
    return s ? JSON.parse(s) : [];
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i =>
        i.id === product.id ? {...i, qty: i.qty+1} : i
      );
      return [...prev, {...product, qty: 1}];
    });
  };
  // ... Context Provider Return
}`, {
    x: 5.0, y: 1.9, w: 3.3, h: 3.9,
    fontSize: 8.5, fontFace: 'Courier New', color: 'E2E8F0', lineSpacingMultiple: 1.15
  });

  // Snippet 3: Custom Select Dropdown
  s.addShape(pres.ShapeType.rect, {
    x: 8.8,
    y: 1.4,
    w: 3.7,
    h: 4.6,
    fill: { color: '0F172A' },
    line: { color: '334155', width: 1 }
  });

  s.addText('CustomSelect.jsx (Accessible UI)', {
    x: 9.0, y: 1.5, w: 3.3, h: 0.3,
    fontSize: 10.5, fontFace: 'Courier New', bold: true, color: '38BDF8'
  });

  s.addText(`export default function CustomSelect({
  options, value, onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const clickOut = (e) => {
      if (ref.current && !ref.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', clickOut);
    return () =>
      document.removeEventListener('mousedown', clickOut);
  }, []);

  return (
    <div ref={ref} className="select-wrap">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selected?.label}</span>
      </button>
      {/* ... Options List */}
    </div>
  );
}`, {
    x: 9.0, y: 1.9, w: 3.3, h: 3.9,
    fontSize: 8.5, fontFace: 'Courier New', color: 'E2E8F0', lineSpacingMultiple: 1.15
  });
}

// =========================================================================
// SLIDE 8: Internship Certificate
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'Internship Certificate');

  // Left Card: Verified Details
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 4.5,
    h: 4.6,
    fill: { color: LIGHT_GRAY },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'CERTIFICATE OF ACHIEVEMENT\n\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: 'Recipient:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'ASHIEQ AHAMED S A\n', options: { bold: true, fontSize: 14, color: CRESCENT_BLUE } },
    { text: 'RRN: 230071601031\n\n', options: { bold: true, fontSize: 11, color: DARK_GRAY } },

    { text: 'Internship Domain:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'Web Development & Full-Stack Engineering\n\n', options: { bold: true, fontSize: 12, color: NAVY } },

    { text: 'Training Period:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: '18 Aug 2026 to 17 Sept 2026\n\n', options: { fontSize: 11.5, color: DARK_GRAY } },

    { text: 'Certificate Verification ID:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'THX-AUG1826-071\n\n', options: { bold: true, fontSize: 12, color: GOLD } },

    { text: 'Issuing Organization:\n', options: { bold: true, fontSize: 10, color: '6B7280' } },
    { text: 'Thiranex (Skill Development & Future Tech)\n', options: { fontSize: 11, color: DARK_GRAY } },
    { text: 'Signed by: Hariharan M (Founder & CEO)', options: { fontSize: 10.5, color: '4B5563', italic: true } }
  ], {
    x: 1.1,
    y: 1.6,
    w: 3.9,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.15
  });

  // Right Side: Embedded Certificate Image
  if (fs.existsSync(thiranexCertPath)) {
    s.addImage({
      path: thiranexCertPath,
      x: 5.6,
      y: 1.4,
      w: 6.9,
      h: 4.6
    });
  }
}

// =========================================================================
// SLIDE 9: Conclusion
// =========================================================================
{
  const s = pres.addSlide();
  setupSlide(s, 'Conclusion');

  // Left Card: Summary of Overall Experience
  s.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Summary of Overall Experience\n\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• Practical Industrial Bridging: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Successfully transitioned theoretical concepts from university coursework into production-grade software engineering.\n\n', options: { fontSize: 10.5, color: '4B5563' } },
    { text: '• Full-Stack Competency: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Gained hands-on proficiency across component architecture, custom hook lifecycle, REST API middleware, and cloud deployment pipelines.\n\n', options: { fontSize: 10.5, color: '4B5563' } },
    { text: '• Engineering Maturity: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Mastered agile sprint commitments, defensive programming (offline fallbacks), and code review etiquette.', options: { fontSize: 10.5, color: '4B5563' } }
  ], {
    x: 1.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.25
  });

  // Right Card: Future Applications & Gratitude
  s.addShape(pres.ShapeType.rect, {
    x: 6.8,
    y: 1.4,
    w: 5.7,
    h: 4.6,
    fill: { color: WHITE },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'Future Applications of Knowledge Gained\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• Capstone & Enterprise Projects: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Applying component design and REST patterns to upcoming senior engineering systems.\n', options: { fontSize: 10.5, color: '4B5563' } },
    { text: '• Cloud & Microservices Scaling: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Ready to integrate PostgreSQL/Prisma, Redis caching, and Docker containerization.\n\n', options: { fontSize: 10.5, color: '4B5563' } },

    { text: 'Expression of Gratitude\n', options: { bold: true, fontSize: 13, color: CRESCENT_BLUE } },
    { text: '• To Thiranex: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Deep gratitude to Hariharan M and mentors for providing industrial training and guidance.\n', options: { fontSize: 10.5, color: '4B5563' } },
    { text: '• To Crescent Institute: ', options: { bold: true, fontSize: 11, color: DARK_GRAY } },
    { text: 'Sincere thanks to the Head of Department, class advisors, and faculty of CSE for continuous support and encouragement.', options: { fontSize: 10.5, color: '4B5563' } }
  ], {
    x: 7.1,
    y: 1.6,
    w: 5.1,
    h: 4.1,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.25
  });
}

// =========================================================================
// SLIDE 10: Thank You & Discussion
// =========================================================================
{
  const s = pres.addSlide();
  
  // Top Accent Bar
  s.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.2,
    fill: { color: NAVY }
  });

  s.addText('THANK YOU', {
    x: 0.8,
    y: 1.5,
    w: 11.7,
    h: 1.0,
    fontSize: 40,
    fontFace: 'Arial',
    bold: true,
    color: CRESCENT_BLUE,
    align: 'center'
  });

  s.addText('Questions & Discussion', {
    x: 0.8,
    y: 2.5,
    w: 11.7,
    h: 0.5,
    fontSize: 18,
    fontFace: 'Arial',
    color: GOLD,
    bold: true,
    align: 'center'
  });

  // Candidate Credential Box
  s.addShape(pres.ShapeType.rect, {
    x: 3.4,
    y: 3.3,
    w: 6.5,
    h: 2.2,
    fill: { color: LIGHT_GRAY },
    line: { color: BORDER_GRAY, width: 1 }
  });

  s.addText([
    { text: 'ASHIEQ AHAMED S A\n', options: { bold: true, fontSize: 16, color: CRESCENT_BLUE } },
    { text: 'RRN: 230071601031\n', options: { bold: true, fontSize: 13, color: DARK_GRAY } },
    { text: 'Bachelor of Technology in Computer Science and Engineering\n', options: { fontSize: 11.5, color: DARK_GRAY } },
    { text: 'B.S. Abdur Rahman Crescent Institute of Science and Technology\n\n', options: { fontSize: 11, color: '4B5563' } },
    { text: 'GitHub: https://github.com/AshieqAhamed27/shopwave-catalog', options: { bold: true, fontSize: 10.5, color: NAVY } }
  ], {
    x: 3.6,
    y: 3.45,
    w: 6.1,
    h: 1.9,
    fontFace: 'Arial',
    align: 'center',
    lineSpacingMultiple: 1.2
  });

  if (fs.existsSync(crescentLogoPath)) {
    s.addImage({
      path: crescentLogoPath,
      x: 5.2,
      y: 5.8,
      w: 2.9,
      h: 1.3
    });
  }
}

// Write the PPTX file
const outPptx = path.resolve('report/Ashieq_Ahamed_Internship_Presentation_230071601031.pptx');
pres.writeFile({ fileName: outPptx })
  .then(() => {
    console.log('PowerPoint presentation written successfully to:', outPptx);
    console.log('File size:', fs.statSync(outPptx).size, 'bytes');
  })
  .catch(err => {
    console.error('Error generating PPTX:', err);
  });
