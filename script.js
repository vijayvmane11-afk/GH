// For local testing, API_KEY should contain an Entra access token, not an Azure resource key.
const FOUNDRY_ENDPOINT = "https://westusvijay-resource.services.ai.azure.com/api/projects/westusvijay";
const AGENT_ID = "GH-2";
//const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImRndlNEdks4QTVLeUt5cHB3MWRBd1RYRDNDQSIsImtpZCI6ImRndlNEdks4QTVLeUt5cHB3MWRBd1RYRDNDQSJ9.eyJhdWQiOiJodHRwczovL2FpLmF6dXJlLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2UwNzkzZDM5LTA5MzktNDk2ZC1iMTI5LTE5OGVkZDkxNmZlYi8iLCJpYXQiOjE3OTAxODM3MDQsIm5iZiI6MTc5MDE4MzcwNCwiZXhwIjoxNzkwMTg5MTUyLCJfY2xhaW1fbmFtZXMiOnsiZ3JvdXBzIjoic3JjMSJ9LCJfY2xhaW1fc291cmNlcyI6eyJzcmMxIjp7ImVuZHBvaW50IjoiaHR0cHM6Ly9ncmFwaC53aW5kb3dzLm5ldC9lMDc5M2QzOS0wOTM5LTQ5NmQtYjEyOS0xOThlZGQ5MTZmZWIvdXNlcnMvMTNlZTI3ZDItNzNkMy00MGFhLWIwYTQtM2RiMjNiOWNhMjI1L2dldE1lbWJlck9iamVjdHMifX0sImFjciI6IjEiLCJhaW8iOiJBYlFBUy84ZUFBQUFBS09vSExWbVloM2RsM2UwT2UvcTVJc0tjMVU3VVB1NFdsRHJDOTQvdDU5K015eHA4RDF5NnkzTkJ4dzZHZWFxakRQZkNQSlIxUjhFZ0p1aXVZbVZ2bnloQ3g1Zmx0dWhJYk1JZXNhQmNOeG5Qc1NSTDdFbVNjaHdlUTk4dHVTbWtUMmtoblR2MDZ6VHo3V3d1aGRFMkdRUzN4SVZadkJYSFlnc2M5YW9TK2kvVXo2WjhxcTRnc2l0OThyK0NtTXVGY0IyN2pFd3dMbDlnMjRuOUdPbi9SYWhERnR1NGtmSS93S0U5ZG1MeGdvPSIsImFtciI6WyJyc2EiLCJtZmEiXSwiYXBwaWQiOiIwNGIwNzc5NS04ZGRiLTQ2MWEtYmJlZS0wMmY5ZTFiZjdiNDYiLCJhcHBpZGFjciI6IjAiLCJkZXZpY2VpZCI6IjNhY2MyZmYzLWEwOTItNGQ2Mi05MGM3LTM2YmEyZmQ0NTEwNSIsImZhbWlseV9uYW1lIjoiTWFuZSIsImdpdmVuX25hbWUiOiJWaWpheSBWLiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjY3LjgxLjg0LjEwMSIsIm5hbWUiOiJNYW5lLCBWaWpheSBWLiIsIm9pZCI6IjEzZWUyN2QyLTczZDMtNDBhYS1iMGE0LTNkYjIzYjljYTIyNSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0zMjkwNjgxNTItMTQ1NDQ3MTE2NS0xNDE3MDAxMzMzLTU0MDcxNDciLCJwdWlkIjoiMTAwM0JGRkQ5QUM1RDExNiIsInB3ZF91cmwiOiJodHRwczovL2dvLm1pY3Jvc29mdC5jb20vZndsaW5rLz9saW5raWQ9MjIyNDE5OCIsInJoIjoiMS5BWHNBT1QxNTREa0piVW14S1JtTzNaRnY2MTl2cGhqZjJ4ZE1uZGNXTkhFcW5MNEFBQ0Y3QUEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lkIjoiMDA4YTk0YWEtMzNjNS1kMjc5LWZhMDgtNmJhM2E2YjAxYjM1Iiwic3ViIjoiNzdRclJBR19XRW9WS3VuZU1HR09DRUlJOFZPTGdrQkJDUmUwUnl0S1UyMCIsInRpZCI6ImUwNzkzZDM5LTA5MzktNDk2ZC1iMTI5LTE5OGVkZDkxNmZlYiIsInVuaXF1ZV9uYW1lIjoidmlqYXkudi5tYW5lQGFjY2VudHVyZS5jb20iLCJ1cG4iOiJ2aWpheS52Lm1hbmVAYWNjZW50dXJlLmNvbSIsInV0aSI6InZfcUdQSThTX1VPVHh4TTV0eFBBQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfYWN0X2ZjdCI6IjUgMyIsInhtc19hdWRfZ3VpZCI6IjE4YTY2ZjVmLWRiZGYtNGMxNy05ZGQ3LTE2MzQ3MTJhOWNiZSIsInhtc19mdGQiOiIteGVTcnpId1Z3UmdKSTZiSE5OeFp5aDAwaXp4UEZwQWdRTEhWU0VSa0NjQmRYTjNaWE4wTXkxa2MyMXoiLCJ4bXNfaWRyZWwiOiIxIDEyIiwieG1zX3N1Yl9mY3QiOiIzIDQifQ.MFx573wncz7IyH8ethj0c1zQeIulr6N2Mm4jxh36VkvZP-HMKRci7F-4qYQGejc2WsDP3ws0B2zlPO7vSeozZ7pDFJz9Z2bN80M4SFl_6noB9NU5xfkrAzEgGEW3uqQwjhYKjhMVQn3cr7BkGSXwxGoFLlQjbHvwielCqJ6c4Ki_qfuhZIj9M36UnPoANDymI_d6AlW4dZRb5jscOd4NYjxfNawwHZ0GoiBc8k5pECfpoiznAunQYEE8L6vTmXU_X5SWbzpIaC8NFPRirRY7Ezl7xOxXelsC2Q9mZb9C25DV4EI_4kkoDWL7upoZXCfuFw4QTEDfoNRKdcQdHBFt2g";
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImRndlNEdks4QTVLeUt5cHB3MWRBd1RYRDNDQSIsImtpZCI6ImRndlNEdks4QTVLeUt5cHB3MWRBd1RYRDNDQSJ9.eyJhdWQiOiJodHRwczovL2FpLmF6dXJlLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2UwNzkzZDM5LTA5MzktNDk2ZC1iMTI5LTE5OGVkZDkxNmZlYi8iLCJpYXQiOjE3OTAxOTI5MzcsIm5iZiI6MTc5MDE5MjkzNywiZXhwIjoxNzkwMTk3MDcwLCJfY2xhaW1fbmFtZXMiOnsiZ3JvdXBzIjoic3JjMSJ9LCJfY2xhaW1fc291cmNlcyI6eyJzcmMxIjp7ImVuZHBvaW50IjoiaHR0cHM6Ly9ncmFwaC53aW5kb3dzLm5ldC9lMDc5M2QzOS0wOTM5LTQ5NmQtYjEyOS0xOThlZGQ5MTZmZWIvdXNlcnMvMTNlZTI3ZDItNzNkMy00MGFhLWIwYTQtM2RiMjNiOWNhMjI1L2dldE1lbWJlck9iamVjdHMifX0sImFjciI6IjEiLCJhaW8iOiJBYlFBUy84ZUFBQUFBaklHNStUN0ZoSEdwYk9vNXlXU20xUlpWamhLTVRiR2pFOVRGQnJrbEUrbE9PeHMwSnQ4YUZ5TWlMNnVidmRHb1FBWEx3ZC9OUGZpbGlOdzFNZHpaTWJ3bWNiQnBJbFdyNGErenVDalN3VjI2TnJDaElndlpTSUllbjlGbW5HVHB0RDZVMTVHL09SLzQ1TUllc2lRMW9YaHR4bXIyajF2MWVLV3NnQ1FuRDByZ2JSYTJjRFhwakhxK0lHeG9qUFFjdjVzMFpzVUFHbllqQ0hhdXF3akduTFJuYnhOZGhmNWYvbFhSOTFCK2JzPSIsImFtciI6WyJyc2EiLCJtZmEiXSwiYXBwaWQiOiIwNGIwNzc5NS04ZGRiLTQ2MWEtYmJlZS0wMmY5ZTFiZjdiNDYiLCJhcHBpZGFjciI6IjAiLCJkZXZpY2VpZCI6IjNhY2MyZmYzLWEwOTItNGQ2Mi05MGM3LTM2YmEyZmQ0NTEwNSIsImZhbWlseV9uYW1lIjoiTWFuZSIsImdpdmVuX25hbWUiOiJWaWpheSBWLiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjY3LjgxLjg0LjEwMSIsIm5hbWUiOiJNYW5lLCBWaWpheSBWLiIsIm9pZCI6IjEzZWUyN2QyLTczZDMtNDBhYS1iMGE0LTNkYjIzYjljYTIyNSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0zMjkwNjgxNTItMTQ1NDQ3MTE2NS0xNDE3MDAxMzMzLTU0MDcxNDciLCJwdWlkIjoiMTAwM0JGRkQ5QUM1RDExNiIsInB3ZF91cmwiOiJodHRwczovL2dvLm1pY3Jvc29mdC5jb20vZndsaW5rLz9saW5raWQ9MjIyNDE5OCIsInJoIjoiMS5BWHNBT1QxNTREa0piVW14S1JtTzNaRnY2MTl2cGhqZjJ4ZE1uZGNXTkhFcW5MNEFBQ0Y3QUEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lkIjoiMDA4YTk0YWEtMzNjNS1kMjc5LWZhMDgtNmJhM2E2YjAxYjM1Iiwic3ViIjoiNzdRclJBR19XRW9WS3VuZU1HR09DRUlJOFZPTGdrQkJDUmUwUnl0S1UyMCIsInRpZCI6ImUwNzkzZDM5LTA5MzktNDk2ZC1iMTI5LTE5OGVkZDkxNmZlYiIsInVuaXF1ZV9uYW1lIjoidmlqYXkudi5tYW5lQGFjY2VudHVyZS5jb20iLCJ1cG4iOiJ2aWpheS52Lm1hbmVAYWNjZW50dXJlLmNvbSIsInV0aSI6Ik5nQUNzSHBjaTBhZTU0bWhzeE5rQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfYWN0X2ZjdCI6IjMgNSIsInhtc19mdGQiOiJqdEhKUWd0VXUtVkd0V0ZTWnM2dmt2bHk2UFkxYlNiZEw3NllIdWJjM0RRQmRYTmxZWE4wTFdSemJYTSIsInhtc19pZHJlbCI6IjEgMjQiLCJ4bXNfc3ViX2ZjdCI6IjMgMiJ9.UGitV5j94qwyc2Zu8p-quPAgaf8aVvAK71qI-c2EIIVvRkcIWJ6sbvgQj_vLlNkhNyVuWtxVBeUtBMQJt8RFL3jqHXcT5ofvyEXrO5-bf9sG0dXGTypj3Z4uRt0oMmdir3HPB_zhBrrRd0p78X9vAXiq22avxXHwfsJsMUeAxzbIX1ASNcevymkrkPCvw9_rSYl0LuNhqsgc7_RMMEY3JLcXAfTWA0DI0HvH5X-GYkaWKuX-IS6LhFSgYHO6H0f1ytJ0Zmlw8avrPT12HD2rN6xblnc4HQeJjkM9MrGB0-gjZm1q2UDtVPFj3D0v5pB-DbTA6ebkFnk140JIdjJrJg
";

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
