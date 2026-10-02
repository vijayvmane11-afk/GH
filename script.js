// For local testing, API_KEY should contain an Entra access token, not an Azure resource key.
const FOUNDRY_ENDPOINT = "https://westusvijay-resource.services.ai.azure.com/api/projects/westusvijay";
const AGENT_ID = "GH-2";
const API_KEY = "5BcDXSMo4tLMnfLbFAxHIAYQMnVlCtKykPqeIuTfk850n6wsFZGSJQQJ99CIAC4f1cMXJ3w3AAAAACOGBne2";
const API_VERSION = "2025-05-15-preview";

const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-button");
const promptButtons = document.querySelectorAll(".prompt-button");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}-message`;
  message.innerHTML = `
    <div class="message-avatar" aria-hidden="true">${sender === "user" ? "YOU" : "GH"}</div>
    <div class="message-bubble"><p></p></div>
  `;
  message.querySelector("p").textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoading() {
  const loadingMessage = document.createElement("div");
  loadingMessage.className = "message assistant-message";
  loadingMessage.id = "loading-message";
  loadingMessage.innerHTML = `
    <div class="message-avatar" aria-hidden="true">GH</div>
    <div class="message-bubble" role="status" aria-label="Mentor is typing">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>
  `;
  chatMessages.appendChild(loadingMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideLoading() {
  document.querySelector("#loading-message")?.remove();
}

async function sendMessage(message) {
  // Foundry agents use the Responses API and reference the agent by name.
  const response = await fetch(`${FOUNDRY_ENDPOINT}/openai/responses?api-version=${API_VERSION}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      agent: { type: "agent_reference", name: AGENT_ID },
      input: message
    })
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Azure request failed with status ${response.status}: ${errorDetails || response.statusText}`);
  }

  const run = await response.json();
  return getAssistantText(run);
}

function getAssistantText(run) {
  // The answer is the output_text inside the assistant message in the output array.
  const assistantMessage = run.output?.find((item) => item.type === "message");
  const textPart = assistantMessage?.content?.find((part) => part.type === "output_text");
  const answer = textPart?.text;

  if (!answer) {
    throw new Error("The agent returned an empty response.");
  }
  return answer;
}

async function handleSubmit(event) {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (!message || sendButton.disabled) return;

  addMessage(message, "user");
  messageInput.value = "";
  messageInput.style.height = "auto";
  sendButton.disabled = true;
  showLoading();

  try {
    if (!FOUNDRY_ENDPOINT || !AGENT_ID || !API_KEY) {
      throw new Error("Azure AI Foundry is not configured yet.");
    }
    const answer = await sendMessage(message);
    hideLoading();
    addMessage(answer, "assistant");
  } catch (error) {
    hideLoading();
    const errorMessage = error instanceof Error ? error.message : String(error);
    addMessage(`Error: ${errorMessage}`, "assistant");
  } finally {
    sendButton.disabled = false;
    messageInput.focus();
  }
}

chatForm.addEventListener("submit", handleSubmit);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

messageInput.addEventListener("input", () => {
  messageInput.style.height = "auto";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 120)}px`;
});

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    messageInput.value = button.textContent;
    messageInput.focus();
    messageInput.dispatchEvent(new Event("input"));
  });
});
