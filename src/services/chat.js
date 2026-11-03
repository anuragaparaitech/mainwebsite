// Mock rule-based assistant. To connect a real AI backend later, replace the body of
// getReply() with a fetch() to YOUR server (never put an API key in frontend code).

export const SUGGESTED_QUERIES = ['Our services', 'Our platforms', 'Talk to a human'];

const RULES = [
  {
    test: /(service|cloud|software|ai\b|automation|devops)/i,
    reply:
      'We deliver three core capabilities: Cloud Solutions (resilient multi-cloud architectures, auto-scaling and migration), Custom Software (tailored enterprise applications engineered for massive scale) and AI & Automation (LLM workflows, conversational bots and data pipelines). See the Services section for details.',
  },
  {
    test: /(platform|novatax|blastbee|apna|kitchen|service hub|cet|product)/i,
    reply:
      'Our live platforms are NovaTax (enterprise tax & compliance), BlastBee (omnichannel messaging), Apna Store (retail OS), Cloud Kitchen OS and Service Hub Web. The CET Test Portal is currently in sandbox testing and marked To Be Launched.',
  },
  {
    test: /(human|talk|contact|enquiry|inquiry|call|office|address|reach)/i,
    reply:
      'I can point you to our team. Use Customer Enquiry in the menu, or visit our Pune Center of Excellence: Office 122, Gera Imperium, Opposite Wipro Circle, Hinjawadi Phase 2, Pune 411057.',
  },
  {
    test: /(cost|price|pricing|estimate|quote|budget)/i,
    reply:
      'Our team provides a 48-hour feasibility and cost estimation, with a mutual NDA signed before the first session. Book a scoping call from the announcement panel or the Customer Enquiry option.',
  },
  {
    test: /(career|job|hiring|role|opening|vacanc)/i,
    reply:
      'We are hiring a Staff Distributed Systems Architect (Go, Rust, Kafka, Pune / Hybrid) and a Lead AI/ML Research Engineer (PyTorch, vLLM, on-premise LLM). Check Careers for open requisitions.',
  },
  {
    test: /(iso|secur|complian|certif|nda)/i,
    reply: 'AparaiTech is ISO 27001 and 9001 certified, MSME registered, and every engagement is covered by a mutual NDA.',
  },
];

const FALLBACK =
  'Thanks for your question. I can help with our services, our live platforms, careers or contacting the team. Which would you like to know more about?';

export async function getReply(message) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const rule = RULES.find((r) => r.test.test(message));
  return rule ? rule.reply : FALLBACK;
}
