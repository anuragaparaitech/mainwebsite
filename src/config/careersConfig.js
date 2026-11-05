// ============================================================================
// AparaiTech Careers & Google Sheets Integration Configuration
// ============================================================================
// INSTRUCTIONS FOR GOOGLE SHEETS:
// 1. Create a Google Sheet and deploy the Google Apps Script (see google-apps-script/Code.gs).
// 2. Paste your deployed Web App URL below into GOOGLE_SHEETS_SCRIPT_URL.
// ============================================================================

export const CAREERS_CONFIG = {
  // Replace this URL with your deployed Google Apps Script Web App URL:
  // e.g. "https://script.google.com/macros/s/AKfycbx.../exec"
  GOOGLE_SHEETS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbylDQVwnc77Gd9eyzUOVHy8Gk_aB1rr22FUggT1GAICX5l4kCStVn5Ny9-7OgaddSGh/exec',

  // Fallback recipient email displayed to users if submission fails
  HR_EMAIL: 'careers@aparaitech.com',
  HR_LOCATION: 'Pune Center of Excellence, India',
};

// Initial Job Openings list - you can edit, add, or remove openings here
export const JOB_OPENINGS = [
  {
    id: 'fs-eng-01',
    title: 'Senior Full-Stack Engineer (React / Node / Cloud)',
    department: 'Engineering',
    location: 'Pune (Hinjawadi) / Hybrid',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS / GCP', 'Microservices'],
    description:
      'Lead end-to-end development of high-throughput web applications and microservices for enterprise SaaS platforms. You will design scalable database schemas, optimize front-end bundle footprints, and implement resilient event-driven architectures.',
    responsibilities: [
      'Design, build, and maintain production-grade React applications and Node.js REST / GraphQL services.',
      'Collaborate with product designers to implement clean, high-performance UI components adhering to ISO 27001 data practices.',
      'Profile and optimize database queries, caching layers (Redis), and background message queues.',
      'Participate in architecture reviews, code reviews, and automated CI/CD pipeline improvements.',
    ],
    requirements: [
      '3+ years of professional full-stack development experience.',
      'Solid command over TypeScript/JavaScript, React, Node.js, and modern CSS frameworks (Tailwind CSS).',
      'Hands-on experience with relational databases (PostgreSQL/MySQL) and Docker containerization.',
      'Strong problem-solving mindset and clear technical communication skills.',
    ],
  },
  {
    id: 'ai-ml-02',
    title: 'AI / ML Solutions Engineer',
    department: 'AI & Data Intelligence',
    location: 'Pune / Bengaluru / Hybrid',
    type: 'Full-Time',
    experience: '2 - 5 Years',
    tags: ['Python', 'LLMs & RAG', 'LangChain', 'FastAPI', 'Vector DBs'],
    description:
      'Architect and deploy specialized LLM pipelines, autonomous AI agents, and retrieval-augmented generation (RAG) systems for enterprise clients requiring privacy-first local and cloud inference.',
    responsibilities: [
      'Implement custom RAG pipelines with hybrid keyword-vector search and re-ranking models.',
      'Build secure inference endpoints and orchestration flows using FastAPI, Python, and async tasks.',
      'Fine-tune domain-specific models and evaluate generation accuracy, latency, and token economics.',
      'Integrate AI workflows with enterprise tools, authentication layers, and operational data pipelines.',
    ],
    requirements: [
      '2+ years experience in Python and applied machine learning or generative AI development.',
      'Practical expertise with OpenAI / Claude / Gemini APIs or open-weight models (Llama, Mistral).',
      'Familiarity with vector stores (Chroma, Pinecone, Qdrant, pgvector) and embedding techniques.',
      'Understanding of software design principles, testing, and production monitoring.',
    ],
  },
  {
    id: 'cloud-devops-03',
    title: 'Cloud & DevOps Infrastructure Architect',
    department: 'Cloud Infrastructure',
    location: 'Pune / Remote (India)',
    type: 'Full-Time',
    experience: '4 - 8 Years',
    tags: ['Kubernetes', 'Terraform', 'AWS / Azure', 'CI/CD', 'Prometheus'],
    description:
      'Manage multi-cloud infrastructure, Kubernetes orchestration, zero-downtime deployment pipelines, and observability suites for enterprise systems operating at high concurrency.',
    responsibilities: [
      'Architect immutable cloud infrastructure using Terraform and Ansible.',
      'Manage production Kubernetes clusters (EKS/GKE), ingress controllers, and service meshes.',
      'Implement automated vulnerability scanning, IAM hardening, and disaster recovery failover automation.',
      'Establish comprehensive telemetry dashboards using Grafana, Prometheus, and OpenTelemetry.',
    ],
    requirements: [
      '4+ years managing production Linux and cloud environments (AWS, GCP, or Azure).',
      'In-depth knowledge of Kubernetes, Helm charts, Docker, and CI/CD pipelines (GitHub Actions, GitLab CI).',
      'Solid understanding of networking (DNS, TLS/SSL, VPC peering, VPNs) and security best practices.',
      'Certifications such as CKA, AWS Solutions Architect, or equivalent are preferred.',
    ],
  },
  {
    id: 'frontend-ui-04',
    title: 'UI/UX Frontend Specialist',
    department: 'Design & Frontend',
    location: 'Pune (Hinjawadi)',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    tags: ['React', 'Tailwind CSS', 'Figma', 'Web Performance', 'Micro-Interactions'],
    description:
      'Bridge the gap between design precision and front-end engineering. You will create responsive, pixel-perfect user interfaces, fluid animations, and accessible design system components.',
    responsibilities: [
      'Transform Figma designs into clean, responsive, and cross-browser compliant React interfaces.',
      'Optimize Web Vitals, page load velocity, and asset delivery across mobile and desktop breakpoints.',
      'Maintain and expand our internal design tokens, typography scales, and component libraries.',
      'Conduct usability checks, micro-interaction refinements, and screen accessibility audits.',
    ],
    requirements: [
      '2+ years experience building polished front-end web applications in React.',
      'Deep mastery of modern CSS, Tailwind CSS, Flexbox/Grid, and responsive layout patterns.',
      'Eye for visual detail, typography hierarchy, and smooth user ergonomics.',
      'Experience with version control (Git) and bundling tools (Vite/Webpack).',
    ],
  },
  {
    id: 'assoc-dev-05',
    title: 'Associate Software Engineer (Graduate / Junior)',
    department: 'Engineering',
    location: 'Pune (Hinjawadi)',
    type: 'Full-Time',
    experience: '0 - 2 Years',
    tags: ['JavaScript', 'Python or Java', 'React Basics', 'SQL', 'Git'],
    description:
      'Kickstart your engineering career working directly alongside senior architects on production systems, distributed databases, and customer-facing web platforms.',
    responsibilities: [
      'Develop modular front-end and back-end features under senior engineering mentorship.',
      'Write comprehensive unit tests, bug fixes, and documentation for ongoing product releases.',
      'Participate in daily standups, code review feedback cycles, and sprint planning sessions.',
      'Learn cloud deployment fundamentals, CI/CD, and enterprise architecture standards.',
    ],
    requirements: [
      "Bachelor's or Master's degree in Computer Science, IT, or related engineering discipline.",
      'Strong fundamental understanding of data structures, algorithms, and object-oriented concepts.',
      'Basic hands-on experience with JavaScript/TypeScript, React, or Python/Java through projects or internships.',
      'Eagerness to learn rapidly, receive constructive feedback, and build real-world software.',
    ],
  },
];
