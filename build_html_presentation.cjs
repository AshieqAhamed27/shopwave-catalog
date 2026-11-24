const fs = require('fs');
const path = require('path');

function getBase64Image(filename) {
  const filePath = path.join(__dirname, 'report/images', filename);
  if (!fs.existsSync(filePath)) return '';
  const ext = path.extname(filename).toLowerCase().replace('.', '');
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
}

const crescentLogo = getBase64Image('crescent_logo.jpg');
const thiranexCert = getBase64Image('thiranex_certificate.jpg');

const slides = [
  // Slide 1: Title of the Internship
  `
  <div class="slide slide-title">
    <div class="accent-top"></div>
    <div class="dept-badge">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</div>
    <h1 class="main-title">SHOPWAVE: FULL-STACK E-COMMERCE<br>PRODUCT CATALOG PLATFORM</h1>
    <h2 class="sub-title">INTERNSHIP TRAINING PRESENTATION</h2>
    
    <div class="info-card">
      <div class="info-line"><span class="k">Submitted by:</span> <span class="v highlight">ASHIEQ AHAMED S A</span></div>
      <div class="info-line"><span class="k">RRN:</span> <span class="v">230071601031</span></div>
      <div class="info-line"><span class="k">Branch & Year:</span> <span class="v">B.Tech Computer Science & Engineering (4th Year)</span></div>
      <div class="info-line"><span class="k">Host Organization:</span> <span class="v">Thiranex (Skill Development & Future Tech), Chennai</span></div>
      <div class="info-line"><span class="k">Tenure:</span> <span class="v">18th August 2026 to 17th September 2026</span></div>
    </div>

    <div class="title-logo-wrap">
      <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-lg">
    </div>

    <div class="slide-footer-text">
      B.S. Abdur Rahman Crescent Institute of Science and Technology • Vandalur, Chennai – 600 048
    </div>
  </div>
  `,

  // Slide 2: About the company
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">About the company</h2>
      <div class="header-line"></div>
    </div>
    
    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Brief Overview of the Organization</h3>
        <ul class="bullet-list">
          <li><strong>Organization:</strong> THIRANEX (Skill Development & Future Tech)</li>
          <li><strong>Headquarters:</strong> Chennai, Tamil Nadu (Recognized by MSME, Govt. of India)</li>
          <li><strong>Leadership:</strong> Founded & led by Hariharan M (Founder & CEO)</li>
        </ul>
        <h3 class="card-title" style="margin-top: 1.2rem;">Mission and Vision</h3>
        <ul class="bullet-list">
          <li><strong>Vision:</strong> To become a premier center of excellence in future-ready software engineering, empowering graduates with production-grade development practices.</li>
          <li><strong>Mission:</strong> To provide rigorous, project-centric technical training using contemporary stacks (React, Node.js, Express, Cloud CI/CD) and build scalable solutions.</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Key Services and Products</h3>
        <ul class="bullet-list">
          <li><strong>Full-Stack Web Engineering:</strong> Modern responsive Single Page Applications, decoupled microservices, and REST APIs.</li>
          <li><strong>Cloud & DevOps Enablement:</strong> Automated CI/CD pipelines, containerization, and cloud deployment.</li>
          <li><strong>Future Tech & AI Integration:</strong> Intelligent automation, data analytics, and high-performance client-server engineering.</li>
        </ul>
        <h3 class="card-title" style="margin-top: 1.2rem;">Values and Principles</h3>
        <ul class="bullet-list">
          <li><strong>Clean Architecture:</strong> Prioritizing modular, maintainable, and self-documenting code.</li>
          <li><strong>Collaborative Workflows:</strong> Strict adherence to Git branching, peer code reviews, and agile sprints.</li>
          <li><strong>User-Centric Design:</strong> Ensuring performance, accessibility (a11y), and intuitive interactions.</li>
        </ul>
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 3: About the internship
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">About the internship</h2>
      <div class="header-line"></div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Learning Objectives</h3>
        <h4 class="sub-h">1. Practical Exposure to Specific Technologies:</h4>
        <ul class="bullet-list">
          <li>Mastering <strong>React 19</strong> functional component architecture, custom hooks, and Context API.</li>
          <li>Building RESTful web APIs using <strong>Node.js</strong> and <strong>Express 5</strong>.</li>
          <li>Modular frontend bundling and hot module replacement with <strong>Vite 8</strong>.</li>
          <li>Designing dark luxury UI using CSS design tokens, glassmorphism, and LocalStorage sync.</li>
        </ul>
        <h4 class="sub-h" style="margin-top: 1rem;">2. Understanding Industry-Standard Practices:</h4>
        <ul class="bullet-list">
          <li>Agile sprint planning, daily standups, and milestone deliveries.</li>
          <li>Git feature-branch workflow with conventional commits (feat, fix, docs).</li>
          <li>Core Web Vitals auditing and cloud continuous deployment on Render.</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Personal Goals</h3>
        <h4 class="sub-h">1. Skill Enhancement:</h4>
        <ul class="bullet-list">
          <li>Transitioning from classroom theoretical exercises to production-grade web development.</li>
          <li>Mastering client-side state architecture without external heavy libraries.</li>
          <li>Writing defensive code with graceful offline catalog fallbacks.</li>
        </ul>
        <h4 class="sub-h" style="margin-top: 1.2rem;">2. Networking and Professional Growth:</h4>
        <ul class="bullet-list">
          <li>Working under the direct guidance and mentorship of senior Thiranex engineering leads.</li>
          <li>Developing professional presentation, communication, and code walkthrough abilities.</li>
          <li>Gaining confidence to architect and deploy modern cloud web applications independently.</li>
        </ul>
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 4: Internship Offer letter
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">Internship Offer letter</h2>
      <div class="header-line"></div>
    </div>

    <div class="grid-2">
      <div class="card card-accent">
        <h3 class="card-title" style="color: #1e3a8a;">OFFICIAL APPOINTMENT RECORD</h3>
        <div class="meta-item"><span class="mk">Host Organization:</span> <span class="mv">Thiranex (Skill Development & Future Tech)</span></div>
        <div class="meta-item"><span class="mk">Candidate Name:</span> <span class="mv">ASHIEQ AHAMED S A</span></div>
        <div class="meta-item"><span class="mk">Student RRN:</span> <span class="mv">230071601031 (4th Year CSE)</span></div>
        <div class="meta-item"><span class="mk">Designated Role:</span> <span class="mv">Full-Stack Web Development Intern</span></div>
        <div class="meta-item"><span class="mk">Internship Tenure:</span> <span class="mv">18th August 2026 to 17th September 2026</span></div>
        <div class="meta-item"><span class="mk">Certificate & Ref ID:</span> <span class="mv gold">THX-AUG1826-071</span></div>
        <div class="meta-item"><span class="mk">Reporting Mentor:</span> <span class="mv">Hariharan M (Founder & CEO)</span></div>
      </div>

      <div class="card">
        <h3 class="card-title">Offer Scope & Key Stipulations</h3>
        <ul class="bullet-list">
          <li><strong>Assigned Deliverable:</strong> End-to-end design, implementation, and cloud deployment of the ShopWave e-commerce catalog platform.</li>
          <li><strong>Technology Mandate:</strong> React 19, Vite 8, Node.js, Express 5, Context API, CSS Glassmorphism, and Render hosting.</li>
          <li><strong>Agile Governance:</strong> Four weekly sprint milestones with peer code reviews and GitHub version control.</li>
          <li><strong>Academic Integration:</strong> Completed in partial fulfillment of the award of the degree of Bachelor of Technology in Computer Science & Engineering at Crescent Institute.</li>
        </ul>
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 5: Roles and Responsiblities
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">Roles and Responsiblities</h2>
      <div class="header-line"></div>
    </div>

    <div class="grid-3">
      <div class="card">
        <h3 class="card-title">Front-End Development</h3>
        <ul class="bullet-list">
          <li><strong>Component Hierarchy:</strong> Decomposed UI into reusable React 19 functional components (Navbar, ProductCard, ProductGrid, CartDrawer).</li>
          <li><strong>Custom UI Controls:</strong> Engineered dependency-free CustomSelect dropdown with keyboard accessibility and ARIA roles.</li>
          <li><strong>Responsive Design:</strong> Styled dark luxury theme using CSS design tokens, Grid, and mobile-friendly drawer overlays.</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Back-End & API Engineering</h3>
        <ul class="bullet-list">
          <li><strong>RESTful Endpoints:</strong> Constructed Express 5 routes for catalog queries (/api/products) and order transactions (/api/orders).</li>
          <li><strong>State Persistence:</strong> Integrated React Context API with LocalStorage sync for persistent shopping cart and wishlist.</li>
          <li><strong>Resilient Architecture:</strong> Implemented dual-layer data fetching to keep the catalog responsive during server cold starts.</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Collaboration & Enhancements</h3>
        <ul class="bullet-list">
          <li><strong>Agile Version Control:</strong> Pushed isolated feature branches on GitHub using conventional commit standards.</li>
          <li><strong>Simulated Payment Gateway:</strong> Engineered realistic in-app checkout (UPI QR, Card, NetBanking, COD) with tax invoice printing.</li>
          <li><strong>Cloud Deployment:</strong> Configured continuous deployment on Render with unified client-server production bundle.</li>
        </ul>
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 6: About work / projects
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">About work / projects</h2>
      <div class="header-line"></div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Project: ShopWave Atelier Platform</h3>
        <div style="font-weight: bold; color: #c5a880; font-size: 0.88rem; margin-bottom: 0.5rem;">Full-Stack E-Commerce Product Catalog Platform</div>
        <p style="font-size: 0.84rem; color: #4b5563; line-height: 1.5; margin-bottom: 0.8rem;">
          A high-performance modern e-commerce catalog featuring dark luxury aesthetics, client-side faceted filtering, persistent carts, and simulated checkout.
        </p>
        <h4 class="sub-h">Key Contributions & Skills Used:</h4>
        <ul class="bullet-list">
          <li>Curated 30 lifestyle products across 6 apparel departments.</li>
          <li>Real-time instant keyword search and custom price sorting.</li>
          <li>Vite 8 production build (compiles in ~600ms, FCP: 0.8s, LCP: 1.2s).</li>
          <li>Member login portal with order tracking and saved preferences.</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Challenges Faced & Engineering Solutions</h3>
        <div class="challenge-item">
          <strong>1. Unstylable Native HTML Select:</strong><br>
          <em>Challenge:</em> Browser selects cannot take custom blur or dark themes.<br>
          <span class="sol">Solution:</span> Built accessible CustomSelect with DOM refs, outside-click listener, and keyboard navigation.
        </div>
        <div class="challenge-item" style="margin-top: 0.6rem;">
          <strong>2. API Latency & Cloud Cold Starts:</strong><br>
          <em>Challenge:</em> Free cloud instances experience 30-50s cold sleeps.<br>
          <span class="sol">Solution:</span> Dual-layer data resilience—serves local static catalog immediately while syncing with live API.
        </div>
        <div class="challenge-item" style="margin-top: 0.6rem;">
          <strong>3. Live Payment Demonstration in Viva:</strong><br>
          <em>Challenge:</em> Real bank gateways require KYC, bank accounts, and paid webhooks.<br>
          <span class="sol">Solution:</span> Built an in-app simulated gateway (UPI QR, Card, NetBanking, COD) with printable GST tax invoices.
        </div>
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 7: Source code
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">Source code</h2>
      <div class="header-line"></div>
    </div>

    <div class="grid-3">
      <div class="code-card">
        <div class="code-title">server/server.js (Express 5)</div>
        <pre class="code-box"><code>// Production REST API
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
});</code></pre>
      </div>

      <div class="code-card">
        <div class="code-title">ShopContext.jsx (State Engine)</div>
        <pre class="code-box"><code>export function ShopProvider({ children }) {
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
}</code></pre>
      </div>

      <div class="code-card">
        <div class="code-title">CustomSelect.jsx (Accessible UI)</div>
        <pre class="code-box"><code>export default function CustomSelect({
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
    &lt;div ref={ref} className="select-wrap"&gt;
      &lt;button onClick={() => setIsOpen(!isOpen)}&gt;
        &lt;span&gt;{selected?.label}&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 8: Internship Certificate
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">Internship Certificate</h2>
      <div class="header-line"></div>
    </div>

    <div class="cert-grid">
      <div class="card card-accent" style="height: 100%;">
        <h3 class="card-title" style="color: #1e3a8a;">VERIFIED CERTIFICATE</h3>
        <div class="meta-item"><span class="mk">Recipient:</span> <span class="mv">ASHIEQ AHAMED S A</span></div>
        <div class="meta-item"><span class="mk">Student RRN:</span> <span class="mv">230071601031</span></div>
        <div class="meta-item"><span class="mk">Internship Domain:</span> <span class="mv">Web Development</span></div>
        <div class="meta-item"><span class="mk">Internship Period:</span> <span class="mv">18 Aug 2026 – 17 Sept 2026</span></div>
        <div class="meta-item"><span class="mk">Certificate ID:</span> <span class="mv gold">THX-AUG1826-071</span></div>
        <div class="meta-item"><span class="mk">Issuing Authority:</span> <span class="mv">Thiranex (Skill Development & Future Tech)</span></div>
        <div class="meta-item"><span class="mk">Authorized Signatory:</span> <span class="mv">Hariharan M (Founder & CEO)</span></div>
      </div>

      <div class="cert-image-card">
        <img src="${thiranexCert}" alt="Thiranex Certificate" class="cert-img-embed">
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 9: Conclusion
  `
  <div class="slide">
    <div class="accent-top"></div>
    <div class="slide-header">
      <h2 class="slide-heading">Conclusion</h2>
      <div class="header-line"></div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Summary of Overall Experience</h3>
        <ul class="bullet-list">
          <li><strong>Practical Bridging:</strong> Successfully transitioned classroom theoretical software concepts into production-grade full-stack engineering.</li>
          <li><strong>Full-Stack Competency:</strong> Mastered modern component architecture (React 19), REST API design (Express 5), and cloud deployment pipelines (Render).</li>
          <li><strong>Engineering Discipline:</strong> Gained hands-on maturity in agile sprint execution, defensive coding (offline resilience), and collaborative version control.</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Future Applications & Gratitude</h3>
        <h4 class="sub-h">Future Applications of Knowledge Gained:</h4>
        <ul class="bullet-list">
          <li>Applying component design and REST patterns to upcoming final-year capstone systems.</li>
          <li>Readiness for containerized deployments (Docker), database scaling (PostgreSQL/Prisma), and microservices.</li>
        </ul>
        <h4 class="sub-h" style="margin-top: 1rem;">Expression of Gratitude:</h4>
        <ul class="bullet-list">
          <li><strong>To Thiranex:</strong> Sincere thanks to Hariharan M and mentors for providing industrial training and guidance.</li>
          <li><strong>To Crescent Institute:</strong> Heartfelt gratitude to the Head of Department, faculty guides, and CSE department for continuous support.</li>
        </ul>
      </div>
    </div>

    <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-corner">
    <div class="slide-footer-note">B.S. Abdur Rahman Crescent Institute of Science and Technology • Department of CSE</div>
  </div>
  `,

  // Slide 10: Thank You
  `
  <div class="slide slide-thankyou">
    <div class="accent-top"></div>
    <h1 class="ty-title">THANK YOU</h1>
    <h2 class="ty-sub">Questions & Discussion</h2>

    <div class="ty-card">
      <div class="ty-name">ASHIEQ AHAMED S A</div>
      <div class="ty-rrn">RRN: 230071601031</div>
      <div class="ty-deg">Bachelor of Technology in Computer Science & Engineering</div>
      <div class="ty-col">B.S. Abdur Rahman Crescent Institute of Science and Technology</div>
      <div class="ty-git">GitHub: https://github.com/AshieqAhamed27/shopwave-catalog</div>
    </div>

    <div class="ty-logo-wrap">
      <img src="${crescentLogo}" alt="Crescent Logo" class="crescent-logo-center">
    </div>
  </div>
  `
];

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Internship Presentation - Ashieq Ahamed S A (230071601031)</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    background: #111827;
    font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #111827;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .slide-container {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .slide {
    width: 1200px;
    height: 675px;
    background: #ffffff;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    position: relative;
    padding: 35px 50px;
    overflow: hidden;
    page-break-after: always;
  }

  .accent-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: #1e3a8a;
  }

  .dept-badge {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: #1e3a8a;
    margin-top: 15px;
  }

  .main-title {
    font-size: 2.2rem;
    font-weight: 900;
    color: #0c2340;
    line-height: 1.25;
    margin: 20px 0 10px 0;
  }

  .sub-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #c5a880;
    letter-spacing: 0.08em;
    margin: 0 0 30px 0;
  }

  .info-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px 25px;
    max-width: 600px;
    margin-bottom: 25px;
  }

  .info-line {
    font-size: 0.95rem;
    margin-bottom: 6px;
  }
  .info-line .k {
    font-weight: 700;
    color: #6b7280;
    min-width: 140px;
    display: inline-block;
  }
  .info-line .v {
    font-weight: 600;
    color: #1f2937;
  }
  .info-line .v.highlight {
    color: #0c2340;
    font-size: 1.1rem;
    font-weight: 800;
  }

  .title-logo-wrap {
    position: absolute;
    right: 50px;
    top: 220px;
  }
  .crescent-logo-lg {
    width: 320px;
    height: auto;
  }

  .slide-footer-text {
    position: absolute;
    bottom: 25px;
    left: 50px;
    right: 50px;
    font-size: 0.82rem;
    color: #6b7280;
    text-align: center;
    border-top: 1px solid #e5e7eb;
    padding-top: 10px;
  }

  .slide-header {
    margin-bottom: 20px;
  }
  .slide-heading {
    margin: 0 0 8px 0;
    font-size: 1.7rem;
    font-weight: 800;
    color: #0c2340;
  }
  .header-line {
    height: 3px;
    width: 100%;
    background: #c5a880;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    height: calc(100% - 130px);
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    height: calc(100% - 130px);
  }

  .card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px 22px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }
  .card-accent {
    background: #f9fafb;
    border-left: 4px solid #1e3a8a;
  }

  .card-title {
    margin: 0 0 12px 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: #0c2340;
    border-bottom: 1px solid #f3f4f6;
    padding-bottom: 6px;
  }

  .bullet-list {
    margin: 0;
    padding-left: 18px;
    font-size: 0.88rem;
    line-height: 1.55;
    color: #374151;
  }
  .bullet-list li {
    margin-bottom: 6px;
  }

  .sub-h {
    margin: 0 0 6px 0;
    font-size: 0.92rem;
    font-weight: 700;
    color: #1e3a8a;
  }

  .meta-item {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  .meta-item .mk {
    font-size: 0.76rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #6b7280;
    display: block;
  }
  .meta-item .mv {
    font-weight: 700;
    color: #1f2937;
    font-size: 0.96rem;
  }
  .meta-item .mv.gold {
    color: #c5a880;
  }

  .crescent-logo-corner {
    position: absolute;
    bottom: 18px;
    right: 45px;
    width: 170px;
    height: auto;
  }

  .slide-footer-note {
    position: absolute;
    bottom: 22px;
    left: 50px;
    font-size: 0.78rem;
    color: #6b7280;
  }

  /* Code Card */
  .code-card {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  .code-title {
    color: #38bdf8;
    font-family: monospace;
    font-size: 0.85rem;
    font-weight: 700;
    border-bottom: 1px solid #1e293b;
    padding-bottom: 6px;
    margin-bottom: 10px;
  }
  .code-box {
    margin: 0;
    font-family: "Courier New", Courier, monospace;
    font-size: 0.74rem;
    color: #e2e8f0;
    line-height: 1.45;
    white-space: pre-wrap;
    flex: 1;
  }

  /* Certificate Grid */
  .cert-grid {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 25px;
    height: calc(100% - 130px);
  }
  .cert-image-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9fafb;
  }
  .cert-img-embed {
    max-width: 100%;
    max-height: 440px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Thank you slide */
  .slide-thankyou {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .ty-title {
    font-size: 3.2rem;
    font-weight: 900;
    color: #0c2340;
    margin: 0;
  }
  .ty-sub {
    font-size: 1.4rem;
    font-weight: 700;
    color: #c5a880;
    margin: 10px 0 30px 0;
  }
  .ty-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px 40px;
    margin-bottom: 25px;
  }
  .ty-name {
    font-size: 1.3rem;
    font-weight: 800;
    color: #0c2340;
  }
  .ty-rrn {
    font-size: 1.05rem;
    font-weight: 700;
    color: #4b5563;
    margin: 4px 0;
  }
  .ty-deg {
    font-size: 0.95rem;
    color: #374151;
  }
  .ty-col {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 3px 0 10px 0;
  }
  .ty-git {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e3a8a;
  }
  .crescent-logo-center {
    width: 220px;
    height: auto;
  }

  .challenge-item {
    font-size: 0.84rem;
    color: #4b5563;
    line-height: 1.45;
  }
  .sol {
    color: #059669;
    font-weight: bold;
  }

  @media print {
    body { background: transparent; }
    .slide-container { margin: 0; gap: 0; }
    .slide { box-shadow: none; }
  }
</style>
</head>
<body>
  <div class="slide-container">
    ${slides.join('\n')}
  </div>
</body>
</html>`;

const outHtml = path.resolve('report/presentation.html');
fs.writeFileSync(outHtml, htmlContent);
console.log('HTML presentation written successfully to:', outHtml);
console.log('File size:', fs.statSync(outHtml).size, 'bytes');
