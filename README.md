# Firewall Insights

Firewall Insights is a web-based tool designed to help network administrators and security analysts parse, analyze, and visualize firewall rulesets. It supports standard `iptables-save` formats, providing a user-friendly interface to quickly understand complex rule configurations, identify potential security risks, and gain insights into network traffic policies.

The tool also features an optional AI-powered summary, which uses Generative AI to provide a natural language explanation of the ruleset.

![Firewall Insights Screenshot](https://storage.googleapis.com/studioprompt-assets/firewall-insights-screenshot.png)

## Features

-   **Ruleset Parsing**: Paste your `iptables-save` output and instantly get a structured view.
-   **Summary Dashboard**: Get a high-level overview, including total rules, rule counts by action (ACCEPT, DROP, etc.), and protocol distribution.
-   **Detailed Rule List**: View all parsed rules in a sortable and filterable table.
-   **Automated Analysis**: The tool automatically flags common issues like overly permissive rules and potentially unreachable rules.
-   **Data Visualization**: Interactive charts show the breakdown of rule actions and protocols.
-   **AI-Powered Summary**: (Optional) Generate a concise, natural language summary of your ruleset's purpose and configuration.
-   **Export to JSON**: Download the parsed ruleset in a structured JSON format for use in other scripts or tools.
-   **Dark Mode**: A sleek dark theme for comfortable viewing in low-light environments.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   [Docker](https://www.docker.com/products/docker-desktop/) (optional, for containerized deployment)

### Installation & Running Locally

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd firewall-insights
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

4.  Open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application.

### Using the AI Summary Feature (Optional)

The AI summarization feature uses the Google Gemini model via Genkit. To enable it, you need to provide a Google AI API key.

1.  **Get an API Key:** Obtain your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

2.  **Set up environment variables:**
    Create a `.env` file in the root of the project directory and add your API key:
    ```
    GOOGLE_API_KEY=your_api_key_here
    ```

3.  Restart the development server if it's already running. The "AI Summary" tab will now be able to generate summaries.

## How to Use the Tool

1.  **Paste Ruleset**: Copy the output of `iptables-save` and paste it into the input text area on the main page. A default ruleset is provided for demonstration.
2.  **Analyze**: Click the "Analyze" button.
3.  **View Results**: The tool will process the rules and display the results in several tabs:
    *   **Summary**: High-level statistics and metrics about your ruleset.
    *   **Rules**: A detailed, filterable, and sortable list of every rule. You can click on a rule to expand it and see the raw text. Use the "Export JSON" button here to download the data.
    *   **Analysis**: A list of potential issues, categorized by severity (High, Medium, Low).
    *   **Visualize**: Charts for rule actions and protocols.
    *   **AI Summary**: If configured, you can generate an AI-powered summary here.
4.  **Toggle Theme**: Use the sun/moon icon in the header to switch between light and dark themes.

## Running with Docker

You can easily build and run the application using Docker, which ensures a consistent environment.

1.  **Build the Docker image:**
    From the project root, run:
    ```sh
    npm run docker:build
    ```
    Alternatively, you can use the `docker` command directly:
    ```sh
    docker build -t firewall-insights .
    ```

2.  **Run the Docker container:**
    ```sh
    npm run docker:run
    ```
    Or with the `docker` command (and to include your API key):
    ```sh
    docker run -p 9002:3000 --env-file .env -d firewall-insights
    ```
    The application will be accessible at [http://localhost:9002](http://localhost:9002).

### Using Docker Compose

For a more declarative approach, you can use the provided `docker-compose.yml` file.

1.  **Start the service:**
    ```sh
    docker-compose up
    ```
    To run in detached mode, use:
    ```sh
    docker-compose up -d
    ```

2.  **Stop the service:**
    ```sh
    docker-compose down
    ```

This setup simplifies running the container and automatically handles port mapping and environment variables from your `.env` file.
