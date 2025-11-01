# **App Name**: Firewall Insights

## Core Features:

- Ruleset Parsing: Parses iptables-save and nft list ruleset inputs into a normalized AST representation. Converts iptables raw lines to AST on a best-effort basis.
- Ruleset Summarization: Generates human-readable summaries of rulesets, including rule counts, common destinations/ports, and protocol breakdowns.
- Ruleset Analysis: Detects duplicate rules, shadowed/overlapping rules, unused chains, and overly permissive rules. Generates a risk score per rule and ruleset.
- Ruleset Diffing: Computes semantic diffs between two rulesets, highlighting changes and additions/deletions. Stores revisions with timestamps in Firestore.
- Ruleset Search & Filter: Allows filtering rulesets by IP/CIDR, port, protocol, action, chain, and text. Supports saved queries.
- Ruleset Visualization: Provides topology views (zones/IP groups), rule heatmaps, and charts for visualizing ruleset data.
- LLM-Powered Summarization (Optional): Offers an optional tool that calls an external LLM to produce enhanced natural-language summaries (API key required).

## Style Guidelines:

- Primary color: Deep blue (#2962FF), representing security, trust, and clarity.
- Background color: Light grey (#F0F2F7), providing a clean and unobtrusive backdrop for complex information.
- Accent color: Electric purple (#C042FF), highlighting key interactive elements.
- Headline font: 'Space Grotesk', a sans-serif font lending a modern techy feel.
- Body font: 'Inter', a sans-serif font that will complement the display with a clean modern feel.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use a set of crisp, modern icons representing concepts like network topology, security protocols, and risk levels.
- Design a modular layout using Tailwind CSS grid and flexbox to accommodate the complex display requirements of firewall rulesets.
- Incorporate subtle animations (e.g., transitions, loading states) to enhance the user experience without being distracting.