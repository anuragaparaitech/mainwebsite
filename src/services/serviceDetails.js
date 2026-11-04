export const services = [
  {
    slug: 'cloud-solutions',
    icon: 'cloud',
    category: 'Infrastructure',
    cardTitle: 'Cloud Solutions',
    title: 'Cloud Solutions',
    shortDescription:
      'Resilient multi-cloud architectures, auto-scaling and migration. Kubernetes orchestration, zero-downtime database failovers, and cost telemetry.',
    heroDescription:
      'Build a cloud foundation that is resilient, secure, and ready to scale. We help teams modernize infrastructure and operate it with confidence.',
    overview:
      'From cloud adoption through day-to-day operations, we design infrastructure around your workloads, security requirements, and business goals. Our engineers help you migrate carefully, automate repeatable operations, and make reliability and cost visible.',
    features: [
      'Cloud readiness assessments and migration roadmaps',
      'Multi-cloud and hybrid architecture design',
      'Container platforms and Kubernetes orchestration',
      'Infrastructure as code, observability, and cost controls',
    ],
    process: [
      ['Discover', 'Review workloads, dependencies, security needs, and operational priorities.'],
      ['Design', 'Agree on a target architecture, migration sequence, and measurable service objectives.'],
      ['Migrate', 'Move workloads in controlled increments with validation and rollback plans.'],
      ['Optimize', 'Automate operations and continuously improve performance, resilience, and spend.'],
    ],
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    benefits: [
      ['Resilience by design', 'Reduce single points of failure with tested recovery and availability patterns.'],
      ['Faster delivery', 'Give engineering teams repeatable environments and safer release workflows.'],
      ['Clearer cloud spend', 'Use monitoring and cost telemetry to make infrastructure decisions with better data.'],
      ['A practical migration', 'Modernize in manageable phases instead of risking a disruptive all-at-once move.'],
    ],
    useCases: [
      'Migrating business-critical applications from on-premises infrastructure',
      'Building scalable environments for SaaS and customer-facing platforms',
      'Improving availability, disaster recovery, and deployment consistency',
    ],
    faqs: [
      ['Can you work with our current cloud provider?', 'Yes. We assess your existing provider and architecture first, then recommend changes only where they support your goals.'],
      ['Do you support cloud migration as well as new builds?', 'Yes. Engagements can cover planning, phased migration, modernization, or a new cloud-native foundation.'],
      ['How do you help control cloud costs?', 'We use workload sizing, usage visibility, automation, and cost telemetry to identify practical optimization opportunities.'],
    ],
  },
  {
    slug: 'custom-software-development',
    icon: 'terminal',
    category: 'Full-cycle development',
    cardTitle: 'Custom Software',
    title: 'Custom Software Development',
    shortDescription:
      'Tailored enterprise applications engineered for massive scale. Event-driven backend backbones, robust micro-frontends, and strict domain isolation.',
    heroDescription:
      'Turn complex business requirements into dependable software. We design and build tailored applications that fit your workflows and can evolve with your organization.',
    overview:
      'When off-the-shelf tools do not fit, we partner with your team to shape the right product, architecture, and delivery plan. From the first technical discovery through production support, we focus on clear ownership, maintainable systems, and measurable outcomes.',
    features: [
      'Product discovery, architecture, and technical planning',
      'Enterprise web applications and tailored business platforms',
      'API-first, event-driven, and modular system design',
      'Quality engineering, delivery automation, and ongoing support',
    ],
    process: [
      ['Align', 'Understand users, workflows, constraints, and the business outcome to deliver.'],
      ['Architect', 'Define a maintainable solution, integration boundaries, and a delivery roadmap.'],
      ['Build', 'Deliver in short, reviewable increments with quality checks throughout.'],
      ['Evolve', 'Launch confidently, measure real usage, and improve the product as needs change.'],
    ],
    technologies: ['React', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'REST APIs', 'Cloud-native services'],
    benefits: [
      ['Fits your workflows', 'Build around the way your teams and customers actually work.'],
      ['Scales with demand', 'Choose architecture and infrastructure that can grow without needless complexity.'],
      ['Maintainable ownership', 'Keep systems understandable with clear boundaries, documentation, and testing.'],
      ['Predictable progress', 'Use iterative delivery to surface decisions and value early.'],
    ],
    useCases: [
      'Replacing manual or spreadsheet-based business processes',
      'Creating a customer or partner portal connected to internal systems',
      'Modernizing a legacy application or building a new SaaS product',
    ],
    faqs: [
      ['Can you work with our in-house engineering team?', 'Yes. We can own a defined workstream or collaborate with your team using your preferred delivery practices.'],
      ['Do you provide support after launch?', 'Yes. We can help with knowledge transfer, reliability improvements, and ongoing product development.'],
      ['How do you define the project scope?', 'We begin with discovery to clarify users, requirements, integrations, risks, and a practical first release.'],
    ],
  },
  {
    slug: 'ai-automation',
    icon: 'auto_awesome',
    category: 'Intelligence',
    cardTitle: 'AI & Automation',
    title: 'AI & Automation',
    shortDescription:
      'Deploy specialized LLM workflows, conversational bots and data pipelines. Privacy-first local inference, vector RAG pipelines, and automated ingestion.',
    heroDescription:
      'Apply AI where it can make work simpler and decisions faster. We build focused AI and automation capabilities around your data, workflows, and privacy needs.',
    overview:
      'Successful AI starts with a useful problem and dependable data—not a model for its own sake. We help identify the right opportunities, connect relevant information, and integrate AI or automation into workflows with appropriate human oversight.',
    features: [
      'AI opportunity assessment and solution prototyping',
      'LLM-powered assistants and workflow integrations',
      'Retrieval-augmented generation and knowledge search',
      'Data ingestion, evaluation, privacy, and deployment controls',
    ],
    process: [
      ['Identify', 'Select a focused use case, define success measures, and assess data readiness.'],
      ['Prototype', 'Test the experience and technical approach against representative scenarios.'],
      ['Integrate', 'Connect approved data sources and embed the solution into existing workflows.'],
      ['Evaluate', 'Monitor quality, safety, and adoption; refine the system as requirements evolve.'],
    ],
    technologies: ['Large language models', 'Vector search', 'RAG pipelines', 'Python', 'APIs', 'Workflow automation', 'Cloud or local inference'],
    benefits: [
      ['Less repetitive work', 'Automate routine steps so people can focus on higher-value decisions.'],
      ['More useful knowledge', 'Make approved organizational information easier to search and apply.'],
      ['Designed for your context', 'Choose hosted or privacy-conscious deployment patterns to match your needs.'],
      ['Measured outcomes', 'Evaluate quality and operational impact before expanding an AI workflow.'],
    ],
    useCases: [
      'Finding answers across approved internal documentation',
      'Automating document intake, classification, or routine processing',
      'Adding conversational assistance to existing products and operations',
    ],
    faqs: [
      ['Do you build custom AI solutions?', 'Yes. We tailor models, retrieval, integrations, and workflow design to the use case and its constraints.'],
      ['Can data stay within our environment?', 'We can evaluate privacy-conscious deployment options, including local inference, based on your requirements.'],
      ['How do you measure whether an AI solution is working?', 'We define representative evaluation scenarios and business measures during discovery, then monitor them as the solution is used.'],
    ],
  },
  {
    slug: 'devops-ci-cd',
    icon: 'sync_alt',
    category: 'Delivery & operations',
    cardTitle: 'DevOps & CI/CD',
    title: 'DevOps & CI/CD',
    shortDescription:
      'Streamline software delivery with automated build, test, and release pipelines, infrastructure as code, and reliable operational practices.',
    heroDescription:
      'Help your teams ship changes with confidence. We bring development and operations together through automation, repeatable environments, and feedback from production.',
    overview:
      'A dependable delivery pipeline reduces manual handoffs and makes releases easier to understand and repeat. We work with your team to improve the path from code to production, right-size automation, and build operational practices that fit your applications and team.',
    features: [
      'CI/CD pipeline design and implementation',
      'Automated build, test, and deployment workflows',
      'Infrastructure as code and environment management',
      'Observability, release controls, and operational readiness',
    ],
    process: [
      ['Assess', 'Map your current delivery flow, pain points, and operational requirements.'],
      ['Prioritize', 'Select improvements that reduce delivery risk without adding unnecessary tooling.'],
      ['Automate', 'Implement and document pipelines, environments, and safe release practices.'],
      ['Improve', 'Use delivery and service feedback to refine reliability and team workflows.'],
    ],
    technologies: ['GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes', 'Terraform', 'Monitoring', 'Cloud platforms'],
    benefits: [
      ['Consistent releases', 'Replace fragile manual steps with repeatable, documented workflows.'],
      ['Earlier feedback', 'Run checks throughout development to identify issues sooner.'],
      ['Safer changes', 'Use controlled rollout and recovery practices to reduce deployment risk.'],
      ['Better team flow', 'Make delivery responsibilities and operational signals clearer across teams.'],
    ],
    useCases: [
      'Automating build, test, and deployment for an existing application',
      'Standardizing development, staging, and production environments',
      'Improving release confidence and application observability',
    ],
    faqs: [
      ['Can you improve our existing CI/CD setup?', 'Yes. We can assess and improve your current pipeline and retain tools that already work well for your team.'],
      ['Do we need to move to Kubernetes?', 'Not necessarily. We recommend platforms and automation based on your workload and operational needs.'],
      ['Can you help after the pipelines are live?', 'Yes. We can document the workflows, enable your team, and support ongoing operational improvements.'],
    ],
  },
  {
    slug: 'cybersecurity-solutions',
    icon: 'shield',
    category: 'Security & resilience',
    cardTitle: 'Cybersecurity Solutions',
    title: 'Cybersecurity Solutions',
    shortDescription:
      'Strengthen application and cloud security with practical risk reviews, secure engineering practices, access controls, and remediation planning.',
    heroDescription:
      'Build security into the systems you depend on. We help teams identify risks and improve application and infrastructure safeguards throughout delivery.',
    overview:
      'Security is most effective when it is part of everyday engineering. We work with stakeholders to understand the systems and data that matter, review relevant controls, and prioritize actionable improvements that support your operating environment.',
    features: [
      'Application and cloud security reviews',
      'Threat modeling and secure architecture guidance',
      'Identity, access, and secrets-management improvements',
      'Security checks integrated into development workflows',
    ],
    process: [
      ['Understand', 'Identify critical systems, data, trust boundaries, and security priorities.'],
      ['Assess', 'Review architecture and controls to surface and prioritize relevant risks.'],
      ['Strengthen', 'Plan and implement practical safeguards with the responsible teams.'],
      ['Maintain', 'Document decisions and integrate security checks into ongoing delivery.'],
    ],
    technologies: ['Threat modeling', 'OWASP guidance', 'Identity and access controls', 'Secrets management', 'Cloud security controls', 'Dependency scanning'],
    benefits: [
      ['Clearer risk priorities', 'Focus effort on the systems, data, and issues that matter most.'],
      ['Security in delivery', 'Identify problems earlier by including checks in the engineering workflow.'],
      ['Stronger access control', 'Improve how identities, permissions, and sensitive credentials are managed.'],
      ['Actionable remediation', 'Give teams practical, documented steps to address security gaps.'],
    ],
    useCases: [
      'Reviewing the security posture of a cloud-hosted application',
      'Improving secure development practices and release checks',
      'Clarifying identity, permissions, and secrets handling across environments',
    ],
    faqs: [
      ['What is included in a security review?', 'The scope is agreed in advance and may cover architecture, application or cloud controls, access practices, and prioritized recommendations.'],
      ['Do you perform penetration testing?', 'This service focuses on engineering reviews and security improvements; any testing scope is agreed explicitly before work begins.'],
      ['Can you help implement recommended changes?', 'Yes. We can work with your engineering team on a remediation plan and help implement agreed improvements.'],
    ],
  },
  {
    slug: 'mobile-app-development',
    icon: 'smartphone',
    category: 'Mobile experiences',
    cardTitle: 'Mobile App Development',
    title: 'Mobile App Development',
    shortDescription:
      'Create reliable mobile experiences with thoughtful product design, secure API integrations, and maintainable iOS and Android delivery.',
    heroDescription:
      'Bring your product closer to customers and teams. We design and build mobile applications that make essential tasks feel clear, fast, and dependable.',
    overview:
      'A successful mobile product balances user needs, device capabilities, and the systems behind the experience. We help shape the product, build its application and integrations, and prepare a maintainable path for release and continued improvement.',
    features: [
      'Mobile product discovery and experience design',
      'iOS and Android application development',
      'Secure API, identity, and backend integrations',
      'Device testing, release preparation, and ongoing improvements',
    ],
    process: [
      ['Discover', 'Define target users, core journeys, platforms, and product outcomes.'],
      ['Design', 'Prototype key experiences and agree on the application architecture.'],
      ['Develop', 'Build and validate the application in focused, testable increments.'],
      ['Launch', 'Prepare releases, monitor real-world feedback, and plan ongoing improvements.'],
    ],
    technologies: ['React Native', 'iOS', 'Android', 'REST APIs', 'Push notifications', 'Mobile analytics', 'Automated testing'],
    benefits: [
      ['A focused user experience', 'Design around the tasks that matter most to your customers or staff.'],
      ['Connected workflows', 'Integrate mobile journeys with the platforms and services you already use.'],
      ['Quality across devices', 'Validate essential experiences across supported devices and operating conditions.'],
      ['Room to evolve', 'Use maintainable foundations that support new features after launch.'],
    ],
    useCases: [
      'Launching a customer-facing companion app for an existing platform',
      'Giving field or operations teams secure access to work on the move',
      'Replacing a mobile web workflow with an app experience',
    ],
    faqs: [
      ['Do you develop for both iOS and Android?', 'Yes. Platform scope and implementation approach are selected during discovery based on user and product needs.'],
      ['Can the app connect to our existing backend?', 'Yes. We can assess your APIs and plan secure integration with existing services.'],
      ['Do you support app releases?', 'Yes. Release preparation and post-launch improvements can be included in the engagement scope.'],
    ],
  },
];
