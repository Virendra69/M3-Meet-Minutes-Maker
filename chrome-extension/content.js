console.log("✅ Meet Minute Maker content script running...");

// Utility to get current Meet URL
function getMeetURL() {
  return window.location.href.split("?")[0];
}

// ✅ Extract captions (just text, no usernames)
function getCaptions() {
  const captionContainers = document.querySelectorAll(
    'div[aria-label="Captions"] .nMcdL.bj4p3b'
  );
  const captions = [];

  captionContainers.forEach((container) => {
    const captionDiv = container.querySelector(".ygicle.VbkSUe");
    const caption = captionDiv ? captionDiv.innerText.trim() : "";

    if (caption) {
      captions.push(caption);
    }
  });

  return captions;
}

// ✅ Extract chat messages
function getChatMessages() {
  const chatContainers = document.querySelectorAll('div[aria-live="polite"]');
  const messages = [];

  chatContainers.forEach((container) => {
    const messageBlocks = container.querySelectorAll('[jsname="dTKtvb"]');
    messageBlocks.forEach((msgDiv) => {
      const msg = msgDiv.innerText.trim();
      if (msg) messages.push(msg);
    });
  });

  return messages;
}

// State to prevent sending duplicates
let lastSentCaptions = new Set();
let lastSentChats = new Set();

// ✅ Send data to backend
function sendDataToBackend({ captions, chat }) {
  const payload = {
    userId: "test-user-123",
    meetUrl: getMeetURL(),
    title: document.title || "Untitled Meet",
    captions,
    chat,
  };

  fetch("http://localhost:5000/api/save-meeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => console.log("✅ Backend response:", data))
    .catch((err) => console.error("❌ Error sending to backend:", err));
}

// Start polling once Meet DOM is ready
function startPollingIfReady() {
  const chatContainerExists = document.querySelector('div[aria-live="polite"]');
  const captionsExist = document.querySelector('div[aria-label="Captions"]');

  if (!chatContainerExists && !captionsExist) {
    console.log("⏳ Waiting for Meet DOM to be ready...");
    setTimeout(startPollingIfReady, 2000);
    return;
  }

  console.log("🚀 Starting polling loop...");

  setInterval(() => {
    const newCaptions = getCaptions().filter((c) => !lastSentCaptions.has(c));
    const newChats = getChatMessages().filter((m) => !lastSentChats.has(m));

    newCaptions.forEach((c) => lastSentCaptions.add(c));
    newChats.forEach((m) => lastSentChats.add(m));

    if (newCaptions.length || newChats.length) {
      sendDataToBackend({ captions: newCaptions, chat: newChats });
    }
  }, 5000);
}

startPollingIfReady();
