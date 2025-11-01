# Firewall Insights

Firewall Insights is a powerful tool designed to make complex firewall rulesets easy to understand. It parses, analyzes, and visualizes `iptables-save` output, helping network administrators, security analysts, and developers quickly identify potential security risks and understand network policies.

The tool comes in two flavors:
1.  **A rich web interface** for interactive analysis, visualization, and reporting.
2.  **A command-line interface (CLI)** for quick terminal-based analysis and easy integration into automated scripts.

![Firewall Insights Screenshot](https://storage.googleapis.com/studioprompt-assets/firewall-insights-screenshot.png)

## What is `iptables` and Why is This Tool Useful?

`iptables` is a command-line utility for Linux that allows a system administrator to configure the IP packet filter rules of the Linux kernel firewall. The raw output of `iptables-save` can be very dense and difficult to read, especially for large, complex rulesets. A single misconfigured rule can create a significant security vulnerability.

**Firewall Insights solves this problem** by transforming that complex text into a human-readable format. It gives you a clear, structured view of your rules, automatically flags common security issues, and provides high-level summaries, so you can see the big picture at a glance.

## Who is it for?

*   **System Administrators**: To verify and audit firewall configurations on servers.
*   **Security Analysts**: To quickly assess the security posture of a network and identify potential threats.
*   **Developers**: To ensure the services they build are correctly protected by the firewall.
*   **Students & Hobbyists**: To learn how firewall rules work in a visual, interactive way.

## Features

-   **Dual Interface**: Use the intuitive **Web UI** for deep dives or the fast **CLI** for scripting and quick checks.
-   **Ruleset Parsing**: Paste your `iptables-save` output and instantly get a structured, sortable, and filterable view.
-   **Summary Dashboard**: Get a high-level overview, including total rules, rule counts by action (ACCEPT, DROP, etc.), and protocol distribution.
-   **Automated Security Analysis**: The tool automatically flags common issues like overly permissive rules (`0.0.0.0/0`), use of insecure protocols (FTP, Telnet), and risky default policies.
-   **Data Visualization**: Interactive charts show the breakdown of rule actions and protocols.
-   **AI-Powered Summary**: (Optional) Generate a concise, natural language explanation of your ruleset's purpose using Google's Gemini model.
-   **Export to JSON**: Download the parsed ruleset in a structured JSON format for use in other scripts or tools.

---

## Getting Started

Follow these instructions to get the project running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   [Docker](https://www.docker.com/products/docker-desktop/) (optional, but recommended for easiest setup)

### Option 1: Running the Web App with Docker (Recommended)

This is the simplest way to run the web application on any OS (Windows, macOS, Linux).

1.  **Build the Docker image:**
    ```sh
    docker build -t firewall-insights .
    ```

2.  **Run the Docker container:**
    ```sh
    docker run -p 9002:3000 --env-file .env -d firewall-insights
    ```
    The application will be accessible at [http://localhost:9002](http://localhost:9002).

### Option 2: Running the Web App Locally (Without Docker)

1.  **Clone the repository and install dependencies:**
    ```sh
    git clone <repository-url>
    cd firewall-insights
    npm install
    ```

2.  **Run the development server:**
    ```sh
    npm run dev
    ```

3.  Open your browser and navigate to [http://localhost:9002](http://localhost:9002).

### Option 3: Using the Command-Line (CLI) Version

The CLI version is perfect for quick analysis or use in automated scripts. It runs entirely in your terminal, no GUI needed.

1.  **Install dependencies and build the project:**
    ```sh
    npm install
    npm run build
    ```
2.  **Run the CLI tool:**
    You can analyze a ruleset by providing a file path or by piping content directly.

    *   **Analyze a file:**
        ```sh
        npx firewall-insights-cli ./path/to/your/rules.txt
        ```

    *   **Analyze from standard input (e.g., using `cat`):**
        ```sh
        cat ./path/to/your/rules.txt | npx firewall-insights-cli
        ```
    *   **Output results as JSON:**
        ```sh
        npx firewall-insights-cli ./rules.txt --json > analysis.json
        ```

---

## Using the AI Summary Feature (Optional)

The AI summarization feature uses Google's Gemini model via Genkit. To enable it in either the web app or the CLI, you need to provide a Google AI API key.

1.  **Get an API Key:** Obtain your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

2.  **Set up environment variables:**
    Create a `.env` file in the root of the project directory and add your API key:
    ```
    GOOGLE_API_KEY=your_api_key_here
    ```

3.  Restart the application. The "AI Summary" tab in the web app and the `--ai-summary` flag in the CLI will now be functional.

    *   **CLI with AI Summary:**
        ```sh
        npx firewall-insights-cli ./rules.txt --ai-summary
        ```
