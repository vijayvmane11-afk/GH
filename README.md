# GirlHacks Mentor

A simple, static chatbot interface for students at the GirlHacks hackathon. It connects directly from the browser to an Azure AI Foundry Agent and can be deployed to GitHub Pages.

## Files

- `index.html` - Page structure and chat controls
- `styles.css` - Responsive visual design
- `script.js` - Chat behavior and Azure AI Foundry request

## Configure Azure AI Foundry

Open `script.js` and fill in the three configuration values at the top:

```js
const FOUNDRY_ENDPOINT = "https://your-project-endpoint";
const AGENT_ID = "your-agent-id";
const API_KEY = "your-api-key";
```

The app sends a request to the Azure AI Foundry Responses API and references the agent by name:

```text
{FOUNDRY_ENDPOINT}/openai/responses?api-version=2025-05-15-preview
```

The response parsing is intentionally kept small and is located in `getAssistantText()` in `script.js`. If your agent uses a different response shape, adjust that function there.

## Run locally

No build process is needed. Open `index.html` in a browser, or use VS Code Live Server.

## Deploy to GitHub Pages

1. Push these files to a GitHub repository.
2. Open **Settings > Pages** in the repository.
3. Choose **Deploy from a branch**, select the main branch and root folder, then save.
4. Open the generated Pages URL.

## Important security note

A browser-based GitHub Pages app cannot keep an API key secret. For a real public deployment, place a small server-side proxy or Azure Function between this page and Azure AI Foundry, then move the key out of `script.js`. The direct browser connection here is best for classroom demos or private repositories.
