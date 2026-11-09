# Fortress 🏰

> Parse, analyse, and visualise complex `iptables` firewall rulesets — available as a web UI and a CLI.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## What It Does

The raw output of `iptables-save` is dense and error-prone to read. A single misconfigured rule can open a critical hole. Fortress transforms that text into a structured, human-readable view — with automatic security flagging, protocol summaries, and rule filtering.

## Screenshot

![Fortress Web UI](https://storage.googleapis.com/studioprompt-assets/firewall-insights-screenshot.png)

## Features

| Feature | Description |
|---|---|
| **Ruleset Parser** | Paste `iptables-save` output → instantly get a structured, sortable rule table |
| **Security Flags** | Automatically highlights overly permissive rules (`0.0.0.0/0`), insecure protocols (FTP/Telnet), and weak default policies |
| **Summary Dashboard** | Rule counts by action (ACCEPT/DROP/REJECT), protocol distribution |
| **CLI Mode** | `fortress analyze <file>` — pipe-friendly terminal output for scripting and CI |
| **Docker support** | One-command containerised deployment |

## Installation

### Web UI (Docker — recommended)

```bash
git clone https://github.com/kalialucard/Fortress.git
cd Fortress
docker compose up -d
# → http://localhost:3000
```

### Web UI (Node.js)

```bash
npm install
npm run dev
# → http://localhost:3000
```

### CLI

```bash
npm install
npm run build:cli

# Analyse a ruleset file
node dist/cli.js analyze /etc/iptables/rules.v4

# Pipe from iptables-save
sudo iptables-save | node dist/cli.js analyze -
```

## Usage

**Web UI:** Paste your `iptables-save` output into the text area and click **Analyse**. Fortress parses all chains, displays every rule in a sortable table, and flags potential security issues in the sidebar.

**CLI:**

```bash
# Full report
node dist/cli.js analyze rules.v4

# JSON output for scripting
node dist/cli.js analyze rules.v4 --json

# Filter to DROP rules only
node dist/cli.js analyze rules.v4 --action DROP
```

## Project Structure

```
Fortress/
├── src/
│   ├── app/            # Next.js pages
│   ├── components/     # UI components
│   ├── lib/
│   │   └── parser.ts   # iptables-save parser core
│   └── cli/            # CLI entry point
├── docs/               # Screenshots
├── Dockerfile
└── docker-compose.yml
```

## Contributing

PRs welcome. Open an issue first for large changes.

## License

[MIT](LICENSE) © kalialucard
