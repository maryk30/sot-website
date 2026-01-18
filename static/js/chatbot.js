function toggleChatbot() {
    const box = document.getElementById("chatbot");
    box.style.display = box.style.display === "flex" ? "none" : "flex";

    if (box.style.display === "flex") {
        document.getElementById("chatbot-input").focus();
    }
}

function sendMessage() {
    const input = document.getElementById("chatbot-input");
    const messages = document.getElementById("chatbot-messages");
    const message = input.value.trim();

    if (!message) return;

    // User bubble
    messages.innerHTML += `
        <div class="message user">${message}</div>
    `;
    input.value = "";

    fetch("/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        messages.innerHTML += `
            <div class="message bot">${data.response}</div>
        `;
        messages.scrollTop = messages.scrollHeight;
    });
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("chatbot-input");
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });
});