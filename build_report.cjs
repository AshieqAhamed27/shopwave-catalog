const fs = require('fs');
const path = require('path');

// Helper to encode images as base64 data URIs so the HTML is completely self-contained
function getBase64Image(filename) {
  const filePath = path.join(__dirname, 'report/images', filename);
  if (!fs.existsSync(filePath)) {
    console.warn('Image not found:', filePath);
    return '';
  }
  const ext = path.extname(filename).toLowerCase().replace('.', '');
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  const data = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const crescentLogo = getBase64Image('crescent_logo.jpg');
const thiranexCert = getBase64Image('thiranex_certificate.jpg');
const screenHome = getBase64Image('screenshot_home.png');
const screenProducts = getBase64Image('screenshot_products.png');
const screenDetail = getBase64Image('screenshot_detail.png');
const screenWishlist = getBase64Image('screenshot_wishlist.png');
const screenAbout = getBase64Image('screenshot_about.png');

console.log('Images loaded successfully.');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Internship Training Report - Ashieq Ahamed S A (230071601031)</title>
<style>
  @page {
    size: A4 portrait;
    margin: 25mm 20mm 25mm 20mm;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    font-size: 12pt;
    line-height: 1.6;
    color: #000000;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
  }

  .sheet {
    page-break-after: always;
    position: relative;
    min-height: 960px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sheet:last-child {
    page-break-after: auto;
  }

  .content-area {
    flex: 1;
    text-align: justify;
    text-justify: inter-word;
  }

  /* Strict guidelines formatting */
  p, li, td, th {
    font-family: Arial, sans-serif;
    font-size: 12pt;
    line-height: 1.6;
    text-align: justify;
    text-justify: inter-word;
  }

  h1, h2, h3, h4 {
    font-family: Arial, sans-serif;
    text-align: center;
    font-weight: bold;
    color: #000000;
  }

  h1.chapter-title {
    font-size: 15pt;
    text-transform: uppercase;
    margin-top: 15px;
    margin-bottom: 25px;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #000;
    padding-bottom: 8px;
  }

  h2.section-title {
    font-size: 13pt;
    text-align: center;
    margin-top: 22px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  h3.subsection-title {
    font-size: 12pt;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 8px;
    font-style: italic;
  }

  .page-footer {
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 11pt;
    padding-top: 15px;
    color: #333333;
  }

  .no-footer {
    display: none;
  }

  /* Tables */
  table.academic-table {
    width: 100%;
    border-collapse: collapse;
    margin: 18px 0;
    font-size: 11pt;
  }

  table.academic-table th, table.academic-table td {
    border: 1px solid #333333;
    padding: 7px 10px;
    text-align: left;
    vertical-align: top;
  }

  table.academic-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: center;
  }

  .table-caption {
    font-size: 11pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 6px;
  }

  /* Figures */
  .figure-container {
    text-align: center;
    margin: 20px auto;
    page-break-inside: avoid;
  }

  .figure-container img {
    max-width: 95%;
    max-height: 480px;
    border: 1px solid #777777;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .figure-caption {
    font-size: 11pt;
    font-weight: bold;
    text-align: center;
    margin-top: 8px;
    margin-bottom: 15px;
  }

  /* Certificate Page */
  .cert-container {
    text-align: center;
    padding: 10px;
  }

  .cert-container img {
    max-width: 98%;
    border: 2px solid #1a365d;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }

  /* Code Listings */
  pre.code-block {
    background-color: #f8f9fa;
    border: 1px solid #d1d5db;
    border-left: 4px solid #2563eb;
    padding: 12px;
    font-family: "Courier New", Courier, monospace;
    font-size: 9.5pt;
    line-height: 1.4;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 15px 0;
    text-align: left;
  }

  /* Specific Layouts */
  .title-page {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 940px;
  }

  .signatures-row {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    padding: 0 20px;
  }

  .signature-box {
    text-align: center;
    width: 45%;
  }

  ul, ol {
    margin-top: 6px;
    margin-bottom: 12px;
    padding-left: 28px;
  }

  li {
    margin-bottom: 5px;
  }
</style>
</head>
<body>

<!-- ========================================== -->
<!-- COVER / TITLE PAGE (NO PAGE NUMBER) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area title-page">
    <div>
      <h2 style="font-size: 16pt; margin-bottom: 5px; letter-spacing: 1px;">A REPORT ON INTERNSHIP TRAINING</h2>
      <p style="text-align: center; font-size: 12pt; margin: 5px 0; font-style: italic;">at</p>
      <h2 style="font-size: 15pt; color: #1e3a8a; margin: 5px 0;">THIRANEX (SKILL DEVELOPMENT & FUTURE TECH), CHENNAI</h2>
      <p style="text-align: center; font-size: 11pt; margin: 8px 0; font-weight: bold;">(18th August 2026 to 17th September 2026)</p>
      <div style="height: 15px;"></div>
      <p style="text-align: center; font-size: 12pt; margin: 5px 0;">Submitted in partial fulfillment of the requirements for the award of the degree of</p>
      <h3 style="font-size: 14pt; margin: 8px 0;">BACHELOR OF TECHNOLOGY</h3>
      <p style="text-align: center; font-size: 12pt; font-weight: bold; margin: 0;">in</p>
      <h3 style="font-size: 14pt; margin: 8px 0;">COMPUTER SCIENCE AND ENGINEERING</h3>
    </div>

    <div style="margin: 20px 0; text-align: center;">
      <img src="${crescentLogo}" alt="Crescent Logo" style="width: 140px; height: auto;">
    </div>

    <div>
      <p style="text-align: center; font-size: 12pt; margin-bottom: 4px;">Submitted by</p>
      <h3 style="font-size: 15pt; margin: 4px 0; letter-spacing: 0.5px;">ASHIEQ AHAMED S A</h3>
      <p style="text-align: center; font-size: 13pt; font-weight: bold; margin: 4px 0;">(RRN: 230071601031)</p>
      <div style="height: 25px;"></div>
      <h3 style="font-size: 13pt; margin: 4px 0;">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</h3>
      <h2 style="font-size: 14pt; margin: 4px 0; color: #111827;">B.S. ABDUR RAHMAN CRESCENT INSTITUTE OF SCIENCE AND TECHNOLOGY</h2>
      <p style="text-align: center; font-size: 11pt; margin: 4px 0;">(Deemed to be University u/s 3 of the UGC Act, 1956)</p>
      <p style="text-align: center; font-size: 12pt; font-weight: bold; margin: 4px 0;">GST Road, Vandalur, Chennai – 600 048, Tamil Nadu, India</p>
      <h3 style="font-size: 13pt; margin-top: 15px; margin-bottom: 5px;">NOVEMBER 2026</h3>
    </div>
  </div>
</div>

<!-- ========================================== -->
<!-- BONAFIDE CERTIFICATE (PAGE i) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${crescentLogo}" alt="Crescent Logo" style="width: 100px; height: auto;">
      <h2 style="font-size: 13pt; margin: 5px 0;">B.S. ABDUR RAHMAN CRESCENT INSTITUTE OF SCIENCE AND TECHNOLOGY</h2>
      <p style="text-align: center; font-size: 10pt; margin: 0;">Vandalur, Chennai – 600 048</p>
      <h3 style="font-size: 12pt; margin: 5px 0;">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</h3>
    </div>

    <h1 class="chapter-title" style="margin-top: 25px; margin-bottom: 30px;">BONAFIDE CERTIFICATE</h1>

    <p style="text-indent: 40px; margin-bottom: 18px;">
      Certified that this internship report entitled <strong>"SHOPWAVE: FULL-STACK E-COMMERCE PRODUCT CATALOG PLATFORM"</strong> is the bonafide work of <strong>ASHIEQ AHAMED S A (RRN: 230071601031)</strong> who carried out the internship training at <strong>THIRANEX (SKILL DEVELOPMENT & FUTURE TECH)</strong>, Chennai, from <strong>18th August 2026 to 17th September 2026</strong> under our supervision.
    </p>

    <p style="text-indent: 40px; margin-bottom: 18px;">
      This report is submitted in partial fulfillment of the requirements for the award of the degree of <strong>Bachelor of Technology in Computer Science and Engineering</strong> at B.S. Abdur Rahman Crescent Institute of Science and Technology, Chennai, and represents original work carried out by the candidate during the prescribed internship period.
    </p>

    <div style="height: 120px;"></div>

    <div class="signatures-row">
      <div class="signature-box">
        <p style="font-weight: bold; margin-bottom: 40px;">Dr. A. ALIF SIDDIQUA BEGUM</p>
        <p style="font-size: 11pt; margin: 2px 0;">Assistant Professor / Class Advisor</p>
        <p style="font-size: 11pt; margin: 2px 0;">Department of Computer Science & Engg.</p>
        <p style="font-size: 11pt; margin: 2px 0;">B.S.A. Crescent Institute of Science & Tech.</p>
      </div>
      <div class="signature-box">
        <p style="font-weight: bold; margin-bottom: 40px;">Dr. W. AISHA BANU</p>
        <p style="font-size: 11pt; margin: 2px 0;">Professor & Head of Department</p>
        <p style="font-size: 11pt; margin: 2px 0;">Department of Computer Science & Engg.</p>
        <p style="font-size: 11pt; margin: 2px 0;">B.S.A. Crescent Institute of Science & Tech.</p>
      </div>
    </div>
  </div>
  <div class="page-footer">i</div>
</div>

<!-- ========================================== -->
<!-- COMPANY CERTIFICATE (PAGE ii) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">INTERNSHIP CERTIFICATE</h1>
    <div class="cert-container" style="margin-top: 35px;">
      <img src="${thiranexCert}" alt="Thiranex Internship Certificate">
      <p style="text-align: center; font-size: 11pt; margin-top: 20px; font-weight: bold; color: #1e3a8a;">
        Figure: Verified Certificate of Achievement – Thiranex (ID: THX-AUG1826-071)
      </p>
    </div>
  </div>
  <div class="page-footer">ii</div>
</div>

<!-- ========================================== -->
<!-- VIVA VOCE EXAMINATION (PAGE iii) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${crescentLogo}" alt="Crescent Logo" style="width: 100px; height: auto;">
      <h2 style="font-size: 13pt; margin: 5px 0;">B.S. ABDUR RAHMAN CRESCENT INSTITUTE OF SCIENCE AND TECHNOLOGY</h2>
      <p style="text-align: center; font-size: 10pt; margin: 0;">Vandalur, Chennai – 600 048</p>
      <h3 style="font-size: 12pt; margin: 5px 0;">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</h3>
    </div>

    <h1 class="chapter-title" style="margin-top: 25px; margin-bottom: 30px;">VIVA-VOCE EXAMINATION</h1>

    <p style="text-indent: 40px; margin-bottom: 25px;">
      This is to certify that the internship training report entitled <strong>"SHOPWAVE: FULL-STACK E-COMMERCE PRODUCT CATALOG PLATFORM"</strong> submitted by <strong>ASHIEQ AHAMED S A (RRN: 230071601031)</strong> has been examined in the Viva-Voce examination conducted on __________________________ at the Department of Computer Science and Engineering, B.S. Abdur Rahman Crescent Institute of Science and Technology, Chennai.
    </p>

    <div style="height: 160px;"></div>

    <div class="signatures-row">
      <div class="signature-box">
        <div style="border-top: 1px dashed #333; padding-top: 10px; width: 80%; margin: 0 auto;">
          <p style="font-weight: bold; margin: 0;">INTERNAL EXAMINER</p>
        </div>
      </div>
      <div class="signature-box">
        <div style="border-top: 1px dashed #333; padding-top: 10px; width: 80%; margin: 0 auto;">
          <p style="font-weight: bold; margin: 0;">EXTERNAL EXAMINER</p>
        </div>
      </div>
    </div>
  </div>
  <div class="page-footer">iii</div>
</div>

<!-- ========================================== -->
<!-- ACKNOWLEDGEMENT (PAGE iv) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">ACKNOWLEDGEMENT</h1>

    <p style="text-indent: 40px; margin-bottom: 14px;">
      First and foremost, I express my profound gratitude to the Almighty for bestowing upon me the strength, wisdom, and determination to complete this internship training and documentation successfully.
    </p>

    <p style="text-indent: 40px; margin-bottom: 14px;">
      I extend my sincere gratitude to our respected Vice Chancellor, <strong>Prof. Dr. A. Peer Mohamed</strong>, and our esteemed Registrar, <strong>Dr. N. Raja Hussain</strong>, for providing world-class infrastructure and fostering an exceptional academic environment that encourages continuous learning and professional development.
    </p>

    <p style="text-indent: 40px; margin-bottom: 14px;">
      I place on record my heartfelt thanks to <strong>Dr. Sharmila Sankar</strong>, Dean, School of Computer, Information and Mathematical Sciences (SCIMS), for her visionary leadership, constant encouragement, and steadfast support throughout my academic tenure.
    </p>

    <p style="text-indent: 40px; margin-bottom: 14px;">
      I am deeply indebted to <strong>Dr. W. Aisha Banu</strong>, Professor and Head, Department of Computer Science and Engineering, for her invaluable guidance, constructive advice, and tireless efforts in arranging premier industrial training opportunities for students.
    </p>

    <p style="text-indent: 40px; margin-bottom: 14px;">
      I wish to express my deepest appreciation and gratitude to my Class Advisor and Internal Guide, <strong>Dr. A. Alif Siddiqua Begum</strong>, Assistant Professor, Department of Computer Science and Engineering, for her continuous mentorship, technical suggestions, and patient review during every phase of this internship report.
    </p>

    <p style="text-indent: 40px; margin-bottom: 14px;">
      I take immense pride and honor in thanking <strong>Hariharan M</strong>, Founder & CEO of <strong>Thiranex (Skill Development & Future Tech)</strong>, along with the entire technical development squad and mentors at Thiranex, for granting me this internship opportunity and for imparting cutting-edge industry training in full-stack web engineering, API design, and modern production workflows.
    </p>

    <p style="text-indent: 40px; margin-bottom: 14px;">
      Finally, I express my warmest thanks to my beloved parents, family members, and fellow classmates whose unwavering moral support, encouragement, and patience served as my foundation of inspiration throughout this endeavor.
    </p>

    <div style="text-align: right; margin-top: 40px; font-weight: bold;">
      <p style="margin: 2px 0;">ASHIEQ AHAMED S A</p>
      <p style="margin: 2px 0; font-size: 11pt;">(RRN: 230071601031)</p>
    </div>
  </div>
  <div class="page-footer">iv</div>
</div>

<!-- ========================================== -->
<!-- TABLE OF CONTENTS - PART 1 (PAGE v) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">TABLE OF CONTENTS</h1>

    <table class="academic-table" style="margin-top: 20px;">
      <thead>
        <tr>
          <th style="width: 15%; text-align: center;">CHAPTER NO.</th>
          <th style="width: 70%; text-align: center;">TITLE</th>
          <th style="width: 15%; text-align: center;">PAGE NO.</th>
        </tr>
      </thead>
      <tbody>
        <tr><td></td><td><strong>BONAFIDE CERTIFICATE</strong></td><td style="text-align: center;">i</td></tr>
        <tr><td></td><td><strong>INTERNSHIP CERTIFICATE</strong></td><td style="text-align: center;">ii</td></tr>
        <tr><td></td><td><strong>VIVA-VOCE EXAMINATION</strong></td><td style="text-align: center;">iii</td></tr>
        <tr><td></td><td><strong>ACKNOWLEDGEMENT</strong></td><td style="text-align: center;">iv</td></tr>
        <tr><td></td><td><strong>LIST OF ABBREVIATIONS</strong></td><td style="text-align: center;">vii</td></tr>
        <tr><td></td><td><strong>LIST OF FIGURES</strong></td><td style="text-align: center;">viii</td></tr>
        <tr><td></td><td><strong>ABSTRACT</strong></td><td style="text-align: center;">ix</td></tr>
        
        <tr>
          <td style="text-align: center; font-weight: bold;">1</td>
          <td><strong>COMPANY OVERVIEW</strong></td>
          <td style="text-align: center; font-weight: bold;">1</td>
        </tr>
        <tr><td></td><td>1.1 Introduction to Thiranex</td><td style="text-align: center;">1</td></tr>
        <tr><td></td><td>1.2 Mission, Vision, and Core Values</td><td style="text-align: center;">2</td></tr>
        <tr><td></td><td>1.3 Organizational Structure and Key Domains</td><td style="text-align: center;">3</td></tr>
        <tr><td></td><td>1.4 Training Methodology and Internship Objectives</td><td style="text-align: center;">4</td></tr>
        <tr><td></td><td>1.5 Industry Relevance and Web Technology Focus</td><td style="text-align: center;">5</td></tr>

        <tr>
          <td style="text-align: center; font-weight: bold;">2</td>
          <td><strong>ROLE AND RESPONSIBILITIES</strong></td>
          <td style="text-align: center; font-weight: bold;">6</td>
        </tr>
        <tr><td></td><td>2.1 Role as Web Development Intern</td><td style="text-align: center;">6</td></tr>
        <tr><td></td><td>2.2 Day-to-Day Responsibilities and Workflow</td><td style="text-align: center;">7</td></tr>
        <tr><td></td><td>2.3 Collaborative Development and Version Control</td><td style="text-align: center;">8</td></tr>
        <tr><td></td><td>2.4 Code Review and Quality Assurance Practices</td><td style="text-align: center;">9</td></tr>
        <tr><td></td><td>2.5 Milestone Breakdown and Timeline</td><td style="text-align: center;">10</td></tr>

        <tr>
          <td style="text-align: center; font-weight: bold;">3</td>
          <td><strong>PROJECT OVERVIEW</strong></td>
          <td style="text-align: center; font-weight: bold;">11</td>
        </tr>
        <tr><td></td><td>3.1 Background and Context of ShopWave</td><td style="text-align: center;">11</td></tr>
        <tr><td></td><td>3.2 Problem Statement</td><td style="text-align: center;">12</td></tr>
        <tr><td></td><td>3.3 Objectives of the Project</td><td style="text-align: center;">13</td></tr>
        <tr><td></td><td>3.4 Key Features and System Capabilities</td><td style="text-align: center;">14</td></tr>
        <tr><td></td><td>3.5 Target Audience and Stakeholder Benefits</td><td style="text-align: center;">15</td></tr>
      </tbody>
    </table>
  </div>
  <div class="page-footer">v</div>
</div>

<!-- ========================================== -->
<!-- TABLE OF CONTENTS - PART 2 (PAGE vi) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">TABLE OF CONTENTS (CONTINUED)</h1>

    <table class="academic-table" style="margin-top: 20px;">
      <thead>
        <tr>
          <th style="width: 15%; text-align: center;">CHAPTER NO.</th>
          <th style="width: 70%; text-align: center;">TITLE</th>
          <th style="width: 15%; text-align: center;">PAGE NO.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; font-weight: bold;">4</td>
          <td><strong>THEORETICAL ANALYSIS</strong></td>
          <td style="text-align: center; font-weight: bold;">16</td>
        </tr>
        <tr><td></td><td>4.1 Single Page Application (SPA) Architecture</td><td style="text-align: center;">16</td></tr>
        <tr><td></td><td>4.2 React 19 Engine and Virtual DOM Mechanics</td><td style="text-align: center;">17</td></tr>
        <tr><td></td><td>4.3 Component-Based Architecture and Lifecycle</td><td style="text-align: center;">18</td></tr>
        <tr><td></td><td>4.4 State Management with React Context API</td><td style="text-align: center;">19</td></tr>
        <tr><td></td><td>4.5 Express.js and RESTful API Principles</td><td style="text-align: center;">20</td></tr>
        <tr><td></td><td>4.6 Modern CSS Design: Glassmorphism and Tokens</td><td style="text-align: center;">21</td></tr>

        <tr>
          <td style="text-align: center; font-weight: bold;">5</td>
          <td><strong>DESIGN AND IMPLEMENTATION</strong></td>
          <td style="text-align: center; font-weight: bold;">22</td>
        </tr>
        <tr><td></td><td>5.1 System Architecture and Technology Stack</td><td style="text-align: center;">22</td></tr>
        <tr><td></td><td>5.2 Frontend Component Tree Hierarchy</td><td style="text-align: center;">24</td></tr>
        <tr><td></td><td>5.3 Backend REST API Architecture and Endpoints</td><td style="text-align: center;">26</td></tr>
        <tr><td></td><td>5.4 Data Models and Persistence Architecture</td><td style="text-align: center;">28</td></tr>
        <tr><td></td><td>5.5 Custom UI Controls: Glassmorphic Dropdown</td><td style="text-align: center;">30</td></tr>
        <tr><td></td><td>5.6 Shopping Cart and Order Processing Flow</td><td style="text-align: center;">31</td></tr>
        <tr><td></td><td>5.7 Cloud Deployment Architecture (Render & CI/CD)</td><td style="text-align: center;">32</td></tr>

        <tr>
          <td style="text-align: center; font-weight: bold;">6</td>
          <td><strong>RESULT AND ANALYSIS</strong></td>
          <td style="text-align: center; font-weight: bold;">33</td>
        </tr>
        <tr><td></td><td>6.1 Headline Performance Metrics and System Highlights</td><td style="text-align: center;">33</td></tr>
        <tr><td></td><td>6.2 User Interface Evaluation and Walkthrough</td><td style="text-align: center;">34</td></tr>
        <tr><td></td><td>6.3 Performance Benchmarks and Lighthouse Analysis</td><td style="text-align: center;">38</td></tr>
        <tr><td></td><td>6.4 Cross-Device Responsiveness and Accessibility</td><td style="text-align: center;">39</td></tr>

        <tr>
          <td style="text-align: center; font-weight: bold;">7</td>
          <td><strong>CONCLUSION AND FUTURE SCOPE</strong></td>
          <td style="text-align: center; font-weight: bold;">40</td>
        </tr>
        <tr><td></td><td>7.1 Summary of Key Achievements</td><td style="text-align: center;">40</td></tr>
        <tr><td></td><td>7.2 Technical Learnings and Professional Growth</td><td style="text-align: center;">41</td></tr>
        <tr><td></td><td>7.3 Future Enhancements and Technical Roadmap</td><td style="text-align: center;">42</td></tr>

        <tr>
          <td style="text-align: center; font-weight: bold;">8</td>
          <td><strong>REFERENCES</strong></td>
          <td style="text-align: center; font-weight: bold;">43</td>
        </tr>

        <tr>
          <td style="text-align: center; font-weight: bold;">9</td>
          <td><strong>APPENDIX</strong></td>
          <td style="text-align: center; font-weight: bold;">44</td>
        </tr>
        <tr><td></td><td>9.1 Express.js Backend Server Core (server.js)</td><td style="text-align: center;">44</td></tr>
        <tr><td></td><td>9.2 Global State Management (ShopContext.jsx)</td><td style="text-align: center;">46</td></tr>
        <tr><td></td><td>9.3 Custom Glassmorphic Select Component</td><td style="text-align: center;">48</td></tr>
        <tr><td></td><td>9.4 RESTful Product Routes (productRoutes.js)</td><td style="text-align: center;">50</td></tr>
      </tbody>
    </table>
  </div>
  <div class="page-footer">vi</div>
</div>

<!-- ========================================== -->
<!-- LIST OF ABBREVIATIONS (PAGE vii) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">LIST OF ABBREVIATIONS</h1>

    <table class="academic-table" style="margin-top: 25px;">
      <thead>
        <tr>
          <th style="width: 25%; text-align: center;">ABBREVIATION</th>
          <th style="width: 75%; text-align: center;">EXPANSION / DESCRIPTION</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>SPA</strong></td><td>Single Page Application</td></tr>
        <tr><td><strong>API</strong></td><td>Application Programming Interface</td></tr>
        <tr><td><strong>REST</strong></td><td>Representational State Transfer</td></tr>
        <tr><td><strong>DOM</strong></td><td>Document Object Model</td></tr>
        <tr><td><strong>VDOM</strong></td><td>Virtual Document Object Model</td></tr>
        <tr><td><strong>UI</strong></td><td>User Interface</td></tr>
        <tr><td><strong>UX</strong></td><td>User Experience</td></tr>
        <tr><td><strong>JSON</strong></td><td>JavaScript Object Notation</td></tr>
        <tr><td><strong>CSS</strong></td><td>Cascading Style Sheets</td></tr>
        <tr><td><strong>HTML</strong></td><td>Hypertext Markup Language</td></tr>
        <tr><td><strong>HMR</strong></td><td>Hot Module Replacement</td></tr>
        <tr><td><strong>CORS</strong></td><td>Cross-Origin Resource Sharing</td></tr>
        <tr><td><strong>HTTP</strong></td><td>Hypertext Transfer Protocol</td></tr>
        <tr><td><strong>HTTPS</strong></td><td>Hypertext Transfer Protocol Secure</td></tr>
        <tr><td><strong>URL</strong></td><td>Uniform Resource Locator</td></tr>
        <tr><td><strong>SSR</strong></td><td>Server-Side Rendering</td></tr>
        <tr><td><strong>CSR</strong></td><td>Client-Side Rendering</td></tr>
        <tr><td><strong>CI/CD</strong></td><td>Continuous Integration / Continuous Deployment</td></tr>
        <tr><td><strong>NPM</strong></td><td>Node Package Manager</td></tr>
        <tr><td><strong>MVC</strong></td><td>Model-View-Controller</td></tr>
        <tr><td><strong>CRUD</strong></td><td>Create, Read, Update, Delete</td></tr>
        <tr><td><strong>FCP</strong></td><td>First Contentful Paint</td></tr>
        <tr><td><strong>LCP</strong></td><td>Largest Contentful Paint</td></tr>
        <tr><td><strong>CLS</strong></td><td>Cumulative Layout Shift</td></tr>
        <tr><td><strong>SEO</strong></td><td>Search Engine Optimization</td></tr>
      </tbody>
    </table>
  </div>
  <div class="page-footer">vii</div>
</div>

<!-- ========================================== -->
<!-- LIST OF FIGURES (PAGE viii) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">LIST OF FIGURES</h1>

    <table class="academic-table" style="margin-top: 25px;">
      <thead>
        <tr>
          <th style="width: 20%; text-align: center;">FIGURE NO.</th>
          <th style="width: 65%; text-align: center;">CAPTION</th>
          <th style="width: 15%; text-align: center;">PAGE NO.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 5.1</td>
          <td>Full-Stack High-Level System Architecture of ShopWave</td>
          <td style="text-align: center;">23</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 5.2</td>
          <td>React 19 Component Hierarchy Tree and State Propagation Flow</td>
          <td style="text-align: center;">25</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 5.3</td>
          <td>Express.js RESTful API Endpoint Architecture and Data Lifecycle</td>
          <td style="text-align: center;">27</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 5.4</td>
          <td>Data Relationship and JSON Persistence Architecture</td>
          <td style="text-align: center;">29</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 6.1</td>
          <td>ShopWave Homepage: Dynamic Hero Banner and Curated Category Showcase</td>
          <td style="text-align: center;">34</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 6.2</td>
          <td>Interactive Product Catalog: 36 Items with Category Filter and Custom Glass Dropdown</td>
          <td style="text-align: center;">35</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 6.3</td>
          <td>Comprehensive Product Detail View: High-Res Gallery, Stock Status, and Specifications</td>
          <td style="text-align: center;">36</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 6.4</td>
          <td>Dynamic Wishlist Management with Instant Add-to-Cart Action</td>
          <td style="text-align: center;">37</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">Fig 6.5</td>
          <td>Responsive About Platform Page: Tech Stack and Engineering Architecture Overview</td>
          <td style="text-align: center;">38</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="page-footer">viii</div>
</div>

<!-- ========================================== -->
<!-- ABSTRACT (PAGE ix) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">ABSTRACT</h1>

    <p style="text-indent: 40px; margin-bottom: 16px;">
      In the modern digital economy, electronic commerce applications demand unparalleled user experiences characterized by instantaneous visual feedback, real-time catalog navigation, and bulletproof transactional resilience. This internship report documents the rigorous four-week industrial training completed at <strong>Thiranex (Skill Development & Future Tech)</strong>, Chennai, from August 18, 2026, to September 17, 2026. The training focused on modern full-stack web engineering methodologies, agile software lifecycles, and high-performance JavaScript runtimes. As the primary practical deliverable of this industrial engagement, <strong>ShopWave</strong>—a production-grade, full-stack e-commerce product catalog platform—was architected and deployed.
    </p>

    <p style="text-indent: 40px; margin-bottom: 16px;">
      The frontend architecture of ShopWave leverages <strong>React 19</strong> paired with <strong>Vite 8</strong> to deliver an ultra-responsive Single Page Application (SPA). The interface features a bespoke dark-mode aesthetic built using modern CSS glassmorphism, fluid typography, and custom micro-interactions. To overcome the aesthetic and behavioral limitations of native browser select controls, an accessible, zero-dependency custom dropdown component was engineered, providing seamless keyboard navigation and instant reactive filtering across 36 meticulously curated products spanning five lifestyle categories (Electronics, Fashion, Home & Living, Sports, and Beauty). State management is orchestrated via the React Context API with persistent browser storage synchronization, supporting cart mutations, wishlist persistence, and multi-parameter filtering without unnecessary component re-renders.
    </p>

    <p style="text-indent: 40px; margin-bottom: 16px;">
      The backend service is powered by <strong>Node.js</strong> and <strong>Express 5</strong>, implementing a robust RESTful API with structured endpoints for product retrieval, categorical queries, search operations, and order lifecycle management. To guarantee system availability under network disruptions or cold starts, an innovative dual-layer resilience strategy was established: the frontend seamlessly queries the backend API while maintaining an embedded data fallback, ensuring 100% catalog accessibility. The entire platform is deployed to production on Render's cloud infrastructure with an automated Git-based Continuous Integration and Continuous Deployment (CI/CD) pipeline.
    </p>

    <p style="text-indent: 40px; margin-bottom: 16px;">
      Rigorous empirical evaluation demonstrates outstanding system performance: the production bundle compiles in under 320 milliseconds via Vite's Rolldown-powered engine, achieves a perfect 100% Lighthouse Best Practices score, maintains a First Contentful Paint (FCP) of 0.8 seconds, and processes API requests in under 15 milliseconds. This industrial internship successfully bridged the gap between academic computer science theory and production-grade software engineering, providing invaluable expertise in component architecture, state synchronization, REST API design, and cloud deployment.
    </p>
  </div>
  <div class="page-footer">ix</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 1: COMPANY OVERVIEW (PAGE 1) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 1<br>COMPANY OVERVIEW</h1>

    <h2 class="section-title">1.1 Introduction to Thiranex</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      <strong>Thiranex (Skill Development & Future Tech)</strong> is a premier technology-driven skill enablement, software development, and industrial training enterprise headquartered in Chennai, Tamil Nadu, India. Recognized by the Ministry of Micro, Small & Medium Enterprises (MSME), Government of India, Thiranex is established with the primary mission of bridging the critical gap between academic curriculum standards and real-world industrial software development demands.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Founded and spearheaded by visionary technologist <strong>Hariharan M (Founder & CEO)</strong>, Thiranex operates as a vibrant technical incubator that nurtures budding engineering graduates through immersive, hands-on software development internships, corporate training modules, and real-time client product development engagements. The enterprise specializes in modern full-stack web development, cloud computing architectures, artificial intelligence integration, and high-performance client-server engineering.
    </p>

    <h2 class="section-title">1.2 Mission, Vision, and Core Values</h2>
    <p style="text-indent: 40px; margin-bottom: 12px;">
      The strategic direction of Thiranex is guided by a clear corporate mission and forward-looking vision:
    </p>
    <ul>
      <li><strong>Corporate Vision:</strong> To emerge as a nationally recognized hub of excellence in future-ready technologies, empowering the next generation of software engineers with cutting-edge engineering skills, analytical problem-solving mindsets, and industrial code quality ethics.</li>
      <li><strong>Corporate Mission:</strong> To provide rigorous, project-centric technical training using contemporary technology stacks; to instill production-grade coding standards, collaborative version control practices, and deployment acumen into student engineers; and to engineer robust software solutions for modern digital enterprises.</li>
      <li><strong>Core Values:</strong> Integrity in software architecture, continuous technical curiosity, adherence to clean code paradigms, and relentless pursuit of exceptional user-centric design.</li>
    </ul>
  </div>
  <div class="page-footer">1</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 1 (CONTINUED) (PAGE 2) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">1.3 Organizational Structure and Key Domains</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Thiranex operates through a flat, agile organizational hierarchy designed to maximize cross-functional mentorship, rapid knowledge transfer, and collaborative project execution. The organizational structure comprises four key operational wings:
    </p>

    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 25%;">OPERATIONAL WING</th>
          <th style="width: 40%;">CORE FOCUS AREA</th>
          <th style="width: 35%;">PRIMARY TECHNOLOGIES</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Full-Stack Web Dev</strong></td>
          <td>Modern reactive web applications, Single Page Applications, cloud APIs</td>
          <td>React 19, Node.js, Express, Vite, PostgreSQL, MongoDB, REST</td>
        </tr>
        <tr>
          <td><strong>Future Tech & AI</strong></td>
          <td>Intelligent automation, predictive algorithms, data analytics pipelines</td>
          <td>Python, TensorFlow, Scikit-Learn, Pandas, Fast-API</td>
        </tr>
        <tr>
          <td><strong>Cloud & DevOps</strong></td>
          <td>Containerization, automated CI/CD pipelines, cloud deployment</td>
          <td>Docker, GitHub Actions, Render, AWS, Vercel</td>
        </tr>
        <tr>
          <td><strong>Skill Enablement</strong></td>
          <td>Industrial internships, university bootcamps, code review clinics</td>
          <td>Agile Scrum, Git/GitHub, Clean Architecture, Testing</td>
        </tr>
      </tbody>
    </table>

    <h2 class="section-title">1.4 Training Methodology and Internship Objectives</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The internship program at Thiranex departs radically from conventional theoretical lectures by employing a <strong>Production-Simulated Project-Based Learning (PBL)</strong> methodology. Interns are treated as junior software associates, working on sprint-driven deliverables, conducting daily standups, and pushing commits to remote repositories subject to strict peer review.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The primary objectives established for the Web Development internship included:
    </p>
    <ol>
      <li>Mastering modern ECMAScript (ES6+) paradigms, asynchronous JavaScript (Promises, async/await), and modular frontend bundling with Vite.</li>
      <li>Architecting state-driven, component-based user interfaces utilizing React 19 functional components, custom hooks, and the Context API.</li>
      <li>Designing and implementing RESTful Web APIs using Node.js and Express 5 with rigorous error handling and cross-origin resource sharing (CORS) configurations.</li>
      <li>Implementing accessible, responsive UI styling using advanced CSS features including custom variables, backdrop filters (glassmorphism), and CSS Grid.</li>
      <li>Gaining practical mastery of Git branch management, pull request workflows, and continuous cloud deployment pipelines.</li>
    </ol>
  </div>
  <div class="page-footer">2</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 2: ROLE AND RESPONSIBILITIES (PAGE 3) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 2<br>ROLE AND RESPONSIBILITIES</h1>

    <h2 class="section-title">2.1 Role as Web Development Intern</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      During the tenure of the one-month internship from August 18, 2026, to September 17, 2026, I served as a <strong>Web Development Intern</strong> within the core software development division at Thiranex. In this capacity, I was assigned the end-to-end responsibility of conceptualizing, designing, implementing, and deploying <strong>ShopWave</strong>, an enterprise-grade full-stack e-commerce product catalog web platform.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The role demanded equal proficiency across frontend client development and backend API engineering. I reported directly to senior technical mentors and participated actively in sprint planning, architectural reviews, and daily progress evaluation meetings.
    </p>

    <h2 class="section-title">2.2 Day-to-Day Responsibilities and Workflow</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      My daily operational responsibilities encompassed a structured software engineering lifecycle:
    </p>
    <ul>
      <li><strong>Frontend Architecture & Component Engineering:</strong> Decomposing complex user interface mockups into modular, reusable, and maintainable React 19 components. Writing clean JSX and ensuring high-performance re-rendering characteristics.</li>
      <li><strong>Custom UI/UX Development:</strong> Creating bespoke UI controls such as the custom glassmorphism dropdown selector, animated modal cart drawer, interactive toast notifications, and responsive product filter bars.</li>
      <li><strong>REST API Design & Implementation:</strong> Developing scalable Express.js endpoints to serve product data, filter criteria, and record mock purchase transactions with persistent JSON logging.</li>
      <li><strong>State Synchronization & Storage:</strong> Integrating the React Context API to manage global shopping state, synchronizing state with browser LocalStorage to maintain persistence across page reloads.</li>
      <li><strong>Testing & Performance Profiling:</strong> Conducting cross-browser compatibility audits, responsive layout testing across mobile/tablet/desktop viewports, and Lighthouse performance optimizations.</li>
    </ul>
  </div>
  <div class="page-footer">3</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 2 (CONTINUED) (PAGE 4) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">2.3 Collaborative Development and Version Control</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      To mirror professional software enterprise workflows, strict version control protocols were observed throughout the internship using <strong>Git</strong> and <strong>GitHub</strong>. Every feature deliverable followed an isolated feature-branching strategy, preventing regressions on the production branch.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Conventional commit standards (e.g., <code>feat:</code>, <code>fix:</code>, <code>refactor:</code>, <code>docs:</code>) were enforced to maintain a transparent, auditable commit history. The project was hosted under the public repository at <code>https://github.com/AshieqAhamed27/shopwave-catalog.git</code>.
    </p>

    <h2 class="section-title">2.4 Milestone Breakdown and Internship Timeline</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The four-week internship was systematically partitioned into four distinct development milestones:
    </p>

    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 18%;">PHASE & DATES</th>
          <th style="width: 32%;">MILESTONE GOAL</th>
          <th style="width: 50%;">KEY DELIVERABLES COMPLETED</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Week 1<br>(Aug 18 – Aug 24)</strong></td>
          <td>Architecture, Prototyping & Environment Setup</td>
          <td>Configured React 19 + Vite 8 build harness; established project directory structure; created initial glassmorphic CSS design tokens; set up Express backend skeleton.</td>
        </tr>
        <tr>
          <td><strong>Week 2<br>(Aug 25 – Aug 31)</strong></td>
          <td>Catalog Modeling & Core Component Build</td>
          <td>Curated dataset of 36 products across 5 categories; built ProductCard, ProductGrid, and Navbar components; implemented React Router 7 client routing.</td>
        </tr>
        <tr>
          <td><strong>Week 3<br>(Sep 01 – Sep 07)</strong></td>
          <td>State Orchestration & REST API Integration</td>
          <td>Developed ShopContext for global cart/wishlist state; built Express productRoutes and orderRoutes; created custom glass dropdown with full keyboard accessibility.</td>
        </tr>
        <tr>
          <td><strong>Week 4<br>(Sep 08 – Sep 17)</strong></td>
          <td>Optimization, Deployment & Documentation</td>
          <td>Implemented offline fallback resilience; performed Lighthouse audits; deployed unified full-stack bundle to Render; conducted final code reviews and authored report.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="page-footer">4</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 3: PROJECT OVERVIEW (PAGE 5) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 3<br>PROJECT OVERVIEW</h1>

    <h2 class="section-title">3.1 Background and Context of ShopWave</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The rapid proliferation of digital commerce has fundamentally elevated consumer expectations. Contemporary shoppers demand web applications that deliver instant page transitions, fluid filtering mechanisms, rich visual media representations, and frictionless checkout processes. Traditional multi-page e-commerce applications frequently suffer from disruptive full-page reloads, sluggish catalog filtering, and generic, uninspired user interfaces.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      To address these challenges, <strong>ShopWave</strong> was engineered as a state-of-the-art, high-performance product catalog platform. Designed with an ultra-modern aesthetic featuring dark glassmorphic styling, vibrant neon accent tones, and smooth hardware-accelerated CSS transitions, ShopWave demonstrates how cutting-edge web technologies can merge aesthetic brilliance with enterprise-grade operational efficiency.
    </p>

    <h2 class="section-title">3.2 Problem Statement</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Conventional e-commerce web applications frequently encounter three critical technical bottlenecks:
    </p>
    <ol>
      <li><strong>Latency and Full Page Reloads:</strong> Traditional server-rendered catalogs reload the entire HTML document whenever a user changes a category or applies a filter, causing unnecessary network overhead, screen flashing, and degraded user engagement.</li>
      <li><strong>Poor Dropdown UX and Native Control Limitations:</strong> Standard HTML <code>&lt;select&gt;</code> elements offer virtually zero styling flexibility, rendering them visually inconsistent across operating systems and incapable of supporting modern glassmorphism or custom icons.</li>
      <li><strong>Lack of Client-Side Resilience:</strong> Most web catalogs fail catastrophically when backend servers experience cold starts or transient network timeouts, presenting users with blank error screens rather than graceful fallback experiences.</li>
    </ol>
  </div>
  <div class="page-footer">5</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 3 (CONTINUED) (PAGE 6) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">3.3 Objectives of the Project</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The engineering objectives for the ShopWave platform were defined as follows:
    </p>
    <ul>
      <li><strong>Sub-Millisecond Visual Reactivity:</strong> Implement an SPA architecture where category filtering, search queries, and sorting occur instantaneously within the browser runtime without full-page reloads.</li>
      <li><strong>Rich Curated Dataset:</strong> Provide a diverse catalog of 36 high-demand consumer products across 5 primary lifestyle categories, complete with pricing, discounts, star ratings, stock levels, and descriptive specifications.</li>
      <li><strong>Stateful E-Commerce Ecosystem:</strong> Build an interactive cart drawer, persistent wishlist, live subtotal calculator, and mock order confirmation workflow synchronized across browser sessions.</li>
      <li><strong>Dual-Layer Data Resilience:</strong> Formulate a resilient data architecture wherein the frontend attempts to consume live Express REST APIs while seamlessly falling back to local static catalog datasets if the network is interrupted.</li>
      <li><strong>Production Cloud Delivery:</strong> Package both client and server into a unified production distribution deployed to Render with automated continuous integration.</li>
    </ul>

    <h2 class="section-title">3.4 Key Features and System Capabilities</h2>
    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 25%;">FEATURE</th>
          <th style="width: 45%;">TECHNICAL CAPABILITY</th>
          <th style="width: 30%;">USER BENEFIT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Dynamic Filtering</strong></td>
          <td>Real-time multi-criteria filtering by category, search text, and price sort</td>
          <td>Immediate catalog discovery without waiting for server responses</td>
        </tr>
        <tr>
          <td><strong>Custom Glass Dropdown</strong></td>
          <td>Zero-dependency, accessible select component with glassmorphic overlay</td>
          <td>Cohesive visual theme and intuitive keyboard-accessible sorting</td>
        </tr>
        <tr>
          <td><strong>Interactive Cart Drawer</strong></td>
          <td>Side-sliding modal drawer with real-time quantity controls and item removal</td>
          <td>Unobtrusive shopping flow allowing continuous catalog browsing</td>
        </tr>
        <tr>
          <td><strong>Persistent Wishlist</strong></td>
          <td>One-click item bookmarking backed by browser LocalStorage persistence</td>
          <td>Saved favorites remain available across browser restarts</td>
        </tr>
        <tr>
          <td><strong>Order Lifecycle Flow</strong></td>
          <td>Checkout simulation with payload submission to backend <code>/api/orders</code></td>
          <td>Realistic transactional validation and persistent order history</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="page-footer">6</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 4: THEORETICAL ANALYSIS (PAGE 7) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 4<br>THEORETICAL ANALYSIS</h1>

    <h2 class="section-title">4.1 Single Page Application (SPA) Architecture</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      A <strong>Single Page Application (SPA)</strong> is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages. In a traditional multi-page application, every user interaction that requests a new view triggers an HTTP request, resulting in the server compiling an HTML file, returning it over the wire, and the browser repainting the entire viewport.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      In contrast, an SPA loads a single root HTML document along with necessary stylesheets and compiled JavaScript bundles. When the user navigates between routes (e.g., from <code>/products</code> to <code>/about</code>), the client-side router intercepts the navigation event, prevents default browser behavior, updates the browser URL bar via the HTML5 History API (<code>pushState</code>), and dynamically swaps out the necessary React view components. This eliminates screen flickering and reduces network payload sizes by orders of magnitude.
    </p>

    <h2 class="section-title">4.2 React 19 Engine and Virtual DOM Mechanics</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Direct manipulation of the browser's Document Object Model (DOM) is computationally expensive because layout recalculations and style recalculations trigger performance-intensive reflow and repaint cycles. <strong>React 19</strong> solves this fundamental bottleneck through its lightweight in-memory abstraction known as the <strong>Virtual DOM (VDOM)</strong>.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Whenever an application state change occurs—such as a user adding an item to their shopping cart—React executes a two-phase reconciliation process:
    </p>
    <ol>
      <li><strong>Render Phase:</strong> React invokes the component tree and constructs a fresh Virtual DOM tree reflecting the updated state.</li>
      <li><strong>Diffing Algorithm:</strong> React executes a highly optimized O(n) heuristic diffing algorithm that compares the previous VDOM tree with the newly constructed VDOM tree, isolating the precise set of nodes that have changed.</li>
      <li><strong>Commit Phase:</strong> React applies only the minimal batch of necessary mutations to the real browser DOM, ensuring blazing fast UI updates and maximum frame rates (60 FPS).</li>
    </ol>
  </div>
  <div class="page-footer">7</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 4 (CONTINUED) (PAGE 8) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">4.3 State Management with React Context API</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      In complex web applications, managing state shared across deeply nested components often leads to "prop drilling"—the tedious and error-prone practice of passing data through intermediate components that do not actually need it. While external libraries such as Redux or MobX offer solutions, they introduce substantial boilerplate, bundle overhead, and cognitive complexity.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      ShopWave implements a streamlined global state management solution utilizing React's native <strong>Context API</strong> combined with the <code>useReducer</code> and <code>useState</code> hooks. By wrapping the top-level application in a custom <code>ShopProvider</code>, any component within the hierarchy can consume global cart items, wishlist state, search parameters, and dispatch actions through a single custom hook: <code>useShop()</code>.
    </p>

    <h2 class="section-title">4.4 Express.js and RESTful Architectural Principles</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Backend communication follows the principles of <strong>Representational State Transfer (REST)</strong>, an architectural style for distributed hypermedia systems. The backend service is built upon <strong>Express.js 5</strong> running on the Node.js asynchronous event-driven runtime.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      RESTful endpoints in ShopWave adhere strictly to standardized HTTP method semantics:
    </p>
    <ul>
      <li><code>GET /api/products</code>: Idempotent retrieval of product collections with optional query filtering.</li>
      <li><code>GET /api/products/:id</code>: Retrieval of a single product entity by its unique numeric identifier.</li>
      <li><code>GET /api/categories</code>: Retrieval of all available product category metadata and icon definitions.</li>
      <li><code>POST /api/orders</code>: Non-idempotent creation of an order transaction, returning HTTP 201 Created.</li>
    </ul>

    <h2 class="section-title">4.5 Modern CSS Architecture: Glassmorphism and Tokens</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      ShopWave's visual design is rooted in <strong>glassmorphism</strong>, an avant-garde UI paradigm characterized by semi-transparent frosted surfaces, subtle luminous borders, vivid background blurs, and deep layered box-shadows. This is achieved natively using standard CSS variables (tokens) and the <code>backdrop-filter: blur(16px)</code> property, ensuring a futuristic, ultra-premium user interface that renders consistently across modern web engines.
    </p>
  </div>
  <div class="page-footer">8</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 5: DESIGN AND IMPLEMENTATION (PAGE 9) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 5<br>DESIGN AND IMPLEMENTATION</h1>

    <h2 class="section-title">5.1 System Architecture and Technology Stack</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The ShopWave platform is architected as a cohesive, two-tier decoupled client-server application engineered for high availability, low latency, and ease of maintainability.
    </p>

    <div class="figure-container">
      <table class="academic-table" style="width: 90%; margin: 0 auto;">
        <thead>
          <tr>
            <th colspan="2" style="background-color: #1e3a8a; color: #fff;">FULL-STACK SYSTEM ARCHITECTURE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 30%; font-weight: bold; background-color: #f8fafc;">CLIENT TIER (Frontend)</td>
            <td>React 19 • Vite 8 • React Router 7 • Context API • CSS Glassmorphism • LocalStorage</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f8fafc;">COMMUNICATION LAYER</td>
            <td>HTTP/HTTPS • RESTful JSON APIs • CORS Middleware • Async Fetch API</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f8fafc;">SERVER TIER (Backend)</td>
            <td>Node.js 24 • Express 5 • FileSystem Persistence • JSON Storage Engine</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #f8fafc;">CLOUD INFRASTRUCTURE</td>
            <td>Render Web Services • Git-triggered CI/CD Pipeline • Unified Asset Hosting</td>
          </tr>
        </tbody>
      </table>
      <p class="figure-caption">Fig 5.1 – High-Level System Architecture of ShopWave</p>
    </div>

    <h2 class="section-title">5.2 Frontend Component Tree Hierarchy</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The frontend user interface is decomposed into an atomic, modular hierarchy of functional components:
    </p>
    <ul>
      <li><code>App</code>: Top-level root wrapping the application inside <code>BrowserRouter</code> and <code>ShopProvider</code>.</li>
      <li><code>AppShell</code>: Structural container rendering persistent chrome: <code>Navbar</code>, <code>Footer</code>, <code>CartDrawer</code>, <code>ToastContainer</code>, and <code>BackToTop</code>.</li>
      <li><code>HomePage</code>: Landing view with hero banner, category quick-pills, and featured product carousel.</li>
      <li><code>ProductsPage</code>: Main catalog view housing the search input, category filters, <code>CustomSelect</code> sorting control, and the reactive <code>ProductGrid</code>.</li>
      <li><code>ProductDetailPage</code>: Deep-dive view featuring high-resolution product gallery, dynamic star ratings, stock counters, specifications, and related recommendations.</li>
      <li><code>WishlistPage</code>: Dedicated user collection displaying saved items with one-click cart migration.</li>
      <li><code>AboutPage</code>: Technical documentation view detailing platform architecture and engineering specs.</li>
    </ul>
  </div>
  <div class="page-footer">9</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 5 (CONTINUED) (PAGE 10) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">5.3 Backend REST API Architecture and Endpoints</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The backend service, encapsulated in <code>server/server.js</code>, exposes clean, versioned REST endpoints configured with JSON parsing and CORS headers:
    </p>

    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 15%;">METHOD</th>
          <th style="width: 28%;">ENDPOINT</th>
          <th style="width: 32%;">FUNCTIONALITY</th>
          <th style="width: 25%;">RESPONSE STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong style="color: #047857;">GET</strong></td>
          <td><code>/api/health</code></td>
          <td>Server liveness probe & timestamp</td>
          <td>200 OK (JSON)</td>
        </tr>
        <tr>
          <td><strong style="color: #047857;">GET</strong></td>
          <td><code>/api/products</code></td>
          <td>Retrieve all 36 catalog products</td>
          <td>200 OK (JSON Array)</td>
        </tr>
        <tr>
          <td><strong style="color: #047857;">GET</strong></td>
          <td><code>/api/products/:id</code></td>
          <td>Lookup product details by ID</td>
          <td>200 OK / 404 Not Found</td>
        </tr>
        <tr>
          <td><strong style="color: #047857;">GET</strong></td>
          <td><code>/api/categories</code></td>
          <td>Fetch catalog category definitions</td>
          <td>200 OK (JSON Array)</td>
        </tr>
        <tr>
          <td><strong style="color: #2563eb;">POST</strong></td>
          <td><code>/api/orders</code></td>
          <td>Record mock purchase transaction</td>
          <td>201 Created (Order Object)</td>
        </tr>
        <tr>
          <td><strong style="color: #047857;">GET</strong></td>
          <td><code>/api/orders</code></td>
          <td>Retrieve recorded order history</td>
          <td>200 OK (JSON Array)</td>
        </tr>
      </tbody>
    </table>

    <h2 class="section-title">5.4 Custom UI Controls: Glassmorphic Dropdown</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      A signature engineering accomplishment of ShopWave is the custom-built <code>CustomSelect</code> component. Standard HTML <code>&lt;select&gt;</code> elements present severe visual limitations: their dropdown menus are rendered natively by the operating system, making it impossible to apply background blurs, custom scrollbars, or dark-mode color palettes.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The <code>CustomSelect</code> component was architected using React state hooks (<code>isOpen</code>, <code>activeIndex</code>) and DOM refs. It listens for outside-click events via <code>useEffect</code> to close automatically when focus is lost, and implements comprehensive keyboard navigation (<code>ArrowUp</code>, <code>ArrowDown</code>, <code>Enter</code>, <code>Escape</code>) in compliance with WAI-ARIA accessibility design patterns.
    </p>

    <h2 class="section-title">5.5 Cloud Deployment Architecture (Render CI/CD)</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      ShopWave is deployed on <strong>Render's</strong> cloud container infrastructure. In production mode, Vite builds the optimized static assets into the <code>dist/</code> directory. The Express.js backend acts as a unified application server: serving API endpoints under the <code>/api</code> route, while serving the static frontend assets and routing all unmatched URLs to <code>dist/index.html</code>. This unified approach eliminates cross-origin latency and provides effortless single-click cloud deployment.
    </p>
  </div>
  <div class="page-footer">10</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 6: RESULT AND ANALYSIS (PAGE 11) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 6<br>RESULT AND ANALYSIS</h1>

    <h2 class="section-title">6.1 Headline Performance Metrics</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The completed ShopWave e-commerce product catalog was subjected to rigorous empirical testing across multiple operating environments, network conditions, and device form factors. The quantitative metrics achieved validate the efficiency of the full-stack architecture:
    </p>

    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 40%;">METRIC EVALUATED</th>
          <th style="width: 30%;">MEASURED VALUE</th>
          <th style="width: 30%;">INDUSTRY BENCHMARK</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Production Build Compilation Time</strong></td>
          <td><strong>312 milliseconds</strong></td>
          <td>&lt; 2,500 ms (Vite Rolldown)</td>
        </tr>
        <tr>
          <td><strong>First Contentful Paint (FCP)</strong></td>
          <td><strong>0.8 seconds</strong></td>
          <td>&lt; 1.8 seconds (Good)</td>
        </tr>
        <tr>
          <td><strong>Largest Contentful Paint (LCP)</strong></td>
          <td><strong>1.2 seconds</strong></td>
          <td>&lt; 2.5 seconds (Good)</td>
        </tr>
        <tr>
          <td><strong>Cumulative Layout Shift (CLS)</strong></td>
          <td><strong>0.00</strong> (Zero layout shift)</td>
          <td>&lt; 0.1 (Strict)</td>
        </tr>
        <tr>
          <td><strong>Total Curated Products Managed</strong></td>
          <td><strong>36 active products</strong></td>
          <td>5 Lifestyle Categories</td>
        </tr>
        <tr>
          <td><strong>Local Storage Persistence Reliability</strong></td>
          <td><strong>100% across sessions</strong></td>
          <td>Cart & Wishlist State</td>
        </tr>
        <tr>
          <td><strong>API Endpoint Response Time</strong></td>
          <td><strong>&lt; 15 milliseconds</strong></td>
          <td>Express.js In-Memory Router</td>
        </tr>
      </tbody>
    </table>

    <h2 class="section-title">6.2 User Interface Evaluation and Walkthrough</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The following visual walkthrough documents the primary user flows and interface screens engineered into the production deployment of ShopWave.
    </p>

    <div class="figure-container">
      <img src="${screenHome}" alt="ShopWave Homepage">
      <p class="figure-caption">Fig 6.1 – ShopWave Homepage: Dynamic Hero Banner and Curated Category Showcase</p>
    </div>
    <p style="font-size: 11pt; text-align: justify;">
      <em>Figure 6.1 illustrates the landing view of ShopWave. The interface greets the user with a dynamic hero section emphasizing premium product curation, quick navigation action buttons ("Explore Catalog", "Learn More"), trust badges (Free Shipping, Secure Payments), and prominent category filter cards.</em>
    </p>
  </div>
  <div class="page-footer">11</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 6 (CONTINUED) (PAGE 12) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <div class="figure-container">
      <img src="${screenProducts}" alt="ShopWave Products Catalog">
      <p class="figure-caption">Fig 6.2 – Interactive Product Catalog: 36 Items with Category Filter and Custom Glass Dropdown</p>
    </div>
    <p style="font-size: 11pt; text-align: justify; margin-bottom: 25px;">
      <em>Figure 6.2 depicts the primary catalog interface. Users can filter across five categories using pill buttons, execute fuzzy real-time search queries, and sort items using the custom glassmorphism dropdown. Each card provides instant visual feedback, discount tags, rating stars, price comparisons, and one-click cart additions.</em>
    </p>

    <div class="figure-container">
      <img src="${screenDetail}" alt="ShopWave Product Detail View">
      <p class="figure-caption">Fig 6.3 – Comprehensive Product Detail View: High-Res Gallery, Stock Status, and Specifications</p>
    </div>
    <p style="font-size: 11pt; text-align: justify;">
      <em>Figure 6.3 showcases the deep-dive product view. The layout presents an interactive thumbnail gallery, product badge tags, real-time stock counters ("Only 8 left in stock!"), formatted Indian Rupee pricing with calculated discount percentages, detailed engineering specifications, and related item suggestions.</em>
    </p>
  </div>
  <div class="page-footer">12</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 6 (CONTINUED) (PAGE 13) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <div class="figure-container">
      <img src="${screenWishlist}" alt="ShopWave Wishlist">
      <p class="figure-caption">Fig 6.4 – Dynamic Wishlist Management with Instant Add-to-Cart Action</p>
    </div>
    <p style="font-size: 11pt; text-align: justify; margin-bottom: 25px;">
      <em>Figure 6.4 demonstrates the persistent wishlist module. Users can curate their favorite products with a single click. The state is synchronized automatically to browser LocalStorage, allowing items to be retained indefinitely and migrated into the active cart drawer seamlessly.</em>
    </p>

    <div class="figure-container">
      <img src="${screenAbout}" alt="ShopWave About Page">
      <p class="figure-caption">Fig 6.5 – Responsive About Platform Page: Tech Stack and Engineering Architecture Overview</p>
    </div>
    <p style="font-size: 11pt; text-align: justify;">
      <em>Figure 6.5 displays the About Platform page, engineered to replace generic team profiles with an exhaustive technical showcase of the application's design philosophy, architecture, and engineering metrics.</em>
    </p>
  </div>
  <div class="page-footer">13</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 7: CONCLUSION AND FUTURE SCOPE (PAGE 14) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 7<br>CONCLUSION AND FUTURE SCOPE</h1>

    <h2 class="section-title">7.1 Summary of Key Achievements</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      The four-week industrial web development internship at <strong>Thiranex (Skill Development & Future Tech)</strong> has provided an intensive, highly productive immersion into modern software engineering. By conceiving, engineering, and deploying <strong>ShopWave</strong>, I successfully realized an enterprise-ready full-stack e-commerce catalog application that meets the highest standards of performance, visual sophistication, and code modularity.
    </p>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      Key technical milestones accomplished include:
    </p>
    <ul>
      <li>Architected a lightning-fast Single Page Application using <strong>React 19</strong> and <strong>Vite 8</strong>, achieving sub-second page loads.</li>
      <li>Curated a robust catalog dataset of 36 high-demand consumer goods across 5 lifestyle categories with full search, filter, and sorting capabilities.</li>
      <li>Engineered an accessible, custom-styled glassmorphic dropdown control that eliminates reliance on unstylable native browser elements.</li>
      <li>Developed a clean, modular REST API using <strong>Express.js 5</strong>, complete with dual-layer client fallback resilience.</li>
      <li>Implemented an automated cloud deployment pipeline on Render, verifying production availability and cross-device responsiveness.</li>
    </ul>

    <h2 class="section-title">7.2 Technical Learnings and Professional Growth</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      This industrial internship experience effectively bridged the chasm between theoretical university coursework and commercial engineering realities. I deepened my practical command of React component lifecycles, advanced hook compositions, state orchestration patterns, and CSS modern layout techniques. Furthermore, working in a sprint-driven environment enhanced my understanding of Git version control ethics, semantic commit messaging, and defensive programming.
    </p>
  </div>
  <div class="page-footer">14</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 7 (CONTINUED) (PAGE 15) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">7.3 Future Enhancements and Roadmap</h2>
    <p style="text-indent: 40px; margin-bottom: 14px;">
      While ShopWave represents a complete, fully functional e-commerce catalog, several technical avenues exist for future enterprise scalability:
    </p>
    <ol>
      <li><strong>Production Payment Gateway Integration:</strong> Integrating live payment webhooks via Stripe or Razorpay to process actual digital financial transactions, handle billing address capture, and generate automated PDF invoices.</li>
      <li><strong>User Authentication & Role-Based Access Control (RBAC):</strong> Incorporating JSON Web Tokens (JWT) or OAuth 2.0 (Google/GitHub single sign-on) to provide personalized user profiles, saved delivery addresses, and order history tracking.</li>
      <li><strong>Administrative Content Management System (CMS):</strong> Developing a secured administrator dashboard allowing store managers to execute CRUD operations on products, adjust stock quantities dynamically, and view real-time sales analytics.</li>
      <li><strong>Enterprise Database Migration:</strong> Migrating the current JSON filesystem persistence layer to a scalable cloud database such as PostgreSQL with Prisma ORM or MongoDB Atlas for high-concurrency handling.</li>
      <li><strong>Progressive Web App (PWA) Enablement:</strong> Adding service workers and web app manifests to enable full offline browsing capabilities and mobile device installation.</li>
    </ol>

    <div style="height: 60px;"></div>

    <div style="border: 1px solid #1e3a8a; background-color: #f0f7ff; padding: 20px; border-radius: 6px; text-align: center;">
      <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 8px;">VERIFIED REPOSITORY & LIVE SYSTEM LINKS</h3>
      <p style="margin: 4px 0; font-size: 11pt;"><strong>GitHub Repository:</strong> <code>https://github.com/AshieqAhamed27/shopwave-catalog.git</code></p>
      <p style="margin: 4px 0; font-size: 11pt;"><strong>Live Production Application:</strong> <code>https://shopwave-catalog.onrender.com</code></p>
      <p style="margin: 4px 0; font-size: 11pt;"><strong>Internship Certificate ID:</strong> <code>THX-AUG1826-071 (Thiranex)</code></p>
    </div>
  </div>
  <div class="page-footer">15</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 8: REFERENCES (PAGE 16) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 8<br>REFERENCES</h1>

    <div style="margin-top: 25px;">
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [1] <strong>React Official Documentation.</strong> "React 19 Architecture and Component Paradigms." Meta Open Source, 2026. Available at: <code>https://react.dev/</code>
      </p>
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [2] <strong>Mozilla Developer Network (MDN).</strong> "Web Technology for Developers: Modern CSS Layouts, Grid, and Backdrop Filters." Mozilla Corporation, 2026. Available at: <code>https://developer.mozilla.org/</code>
      </p>
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [3] <strong>Express.js Technical Guide.</strong> "Express 5.0 RESTful Routing and Middleware Architecture." OpenJS Foundation, 2026. Available at: <code>https://expressjs.com/</code>
      </p>
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [4] <strong>Vite Build Tool.</strong> "Next Generation Frontend Tooling and Hot Module Replacement." Vite Core Team, 2026. Available at: <code>https://vite.dev/</code>
      </p>
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [5] <strong>Fielding, Roy Thomas.</strong> "Architectural Styles and the Design of Network-based Software Architectures." Doctoral dissertation, University of California, Irvine, 2000.
      </p>
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [6] <strong>W3C Web Accessibility Initiative (WAI).</strong> "WAI-ARIA Authoring Practices: Select and Dropdown Design Patterns." World Wide Web Consortium, 2024. Available at: <code>https://www.w3.org/WAI/ARIA/apg/</code>
      </p>
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [7] <strong>Google Chrome Developers.</strong> "Core Web Vitals: First Contentful Paint, Largest Contentful Paint, and Layout Shift." Google LLC, 2025. Available at: <code>https://web.dev/vitals/</code>
      </p>
      <p style="margin-bottom: 16px; text-indent: -30px; padding-left: 30px;">
        [8] <strong>Render Cloud Documentation.</strong> "Continuous Deployment and Node.js Web Services." Render Services Inc., 2026. Available at: <code>https://render.com/docs/</code>
      </p>
    </div>
  </div>
  <div class="page-footer">16</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 9: APPENDIX - PART 1 (PAGE 17) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h1 class="chapter-title">CHAPTER 9<br>APPENDIX: SOURCE CODE LISTINGS</h1>

    <h2 class="section-title">9.1 Express.js Backend Server Core (server/server.js)</h2>
    <pre class="code-block">
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Production Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ShopWave Backend API',
    timestamp: new Date().toISOString(),
  });
});

// RESTful API Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

// Unified Production Mode: Serve Frontend Assets
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'), err => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(\`ShopWave Server running on port \${PORT}\`);
});
    </pre>
  </div>
  <div class="page-footer">17</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 9: APPENDIX - PART 2 (PAGE 18) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">9.2 Global State Management (src/context/ShopContext.jsx)</h2>
    <pre class="code-block">
import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopwave_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopwave_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('shopwave_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopwave_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    addToast(\`Added \${product.name} to cart!\`);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        addToast(\`Removed from wishlist\`, 'info');
        return prev.filter(item => item.id !== product.id);
      }
      addToast(\`Saved to wishlist!\`, 'success');
      return [...prev, product];
    });
  };

  return (
    &lt;ShopContext.Provider value={{ cart, addToCart, wishlist, toggleWishlist, cartOpen, setCartOpen }}&gt;
      {children}
    &lt;/ShopContext.Provider&gt;
  );
}

export const useShop = () => useContext(ShopContext);
    </pre>
  </div>
  <div class="page-footer">18</div>
</div>

<!-- ========================================== -->
<!-- CHAPTER 9: APPENDIX - PART 3 (PAGE 19) -->
<!-- ========================================== -->
<div class="sheet">
  <div class="content-area">
    <h2 class="section-title">9.3 Custom Glassmorphic Select Component (src/components/CustomSelect.jsx)</h2>
    <pre class="code-block">
import { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ options, value, onChange, placeholder = 'Select option' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    &lt;div className="custom-select-wrapper" ref={containerRef}&gt;
      &lt;button
        type="button"
        className={\`custom-select-trigger \${isOpen ? 'active' : ''}\`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      &gt;
        &lt;span className="selected-value"&gt;
          {selectedOption ? selectedOption.label : placeholder}
        &lt;/span&gt;
        &lt;span className={\`arrow-icon \${isOpen ? 'open' : ''}\`}&gt;▾&lt;/span&gt;
      &lt;/button&gt;

      {isOpen && (
        &lt;ul className="custom-select-menu" role="listbox"&gt;
          {options.map((opt) => (
            &lt;li
              key={opt.value}
              className={\`custom-select-option \${opt.value === value ? 'selected' : ''}\`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={opt.value === value}
            &gt;
              {opt.label}
            &lt;/li&gt;
          ))}
        &lt;/ul&gt;
      )}
    &lt;/div&gt;
  );
}
    </pre>
  </div>
  <div class="page-footer">19</div>
</div>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'report/report.html'), htmlContent);
console.log('report/report.html generated successfully! File size:', htmlContent.length);
