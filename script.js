const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const decodeBtn = document.getElementById('decodeBtn');
const encodeBtn = document.getElementById('encodeBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const notification = document.getElementById('notification');

// Decode Base64
decodeBtn.addEventListener('click', () => {
    const input = inputText.value.trim();
    
    if (!input) {
        showNotification('Please enter some text to decode', 'error');
        return;
    }

    try {
        const decoded = atob(input);
        outputText.value = decoded;
        showNotification('Successfully decoded!', 'success');
    } catch (error) {
        showNotification('Invalid Base64 format', 'error');
    }
});

// Encode to Base64
encodeBtn.addEventListener('click', () => {
    const input = inputText.value.trim();
    
    if (!input) {
        showNotification('Please enter some text to encode', 'error');
        return;
    }

    try {
        const encoded = btoa(input);
        outputText.value = encoded;
        showNotification('Successfully encoded!', 'success');
    } catch (error) {
        showNotification('Failed to encode text', 'error');
    }
});

// Clear all fields
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    notification.classList.remove('show', 'success', 'error');
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
    const output = outputText.value;
    
    if (!output) {
        showNotification('Nothing to copy', 'error');
        return;
    }

    navigator.clipboard.writeText(output).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
});

// Show notification message
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Allow Enter key in input (but Tab+Enter for new line)
inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        decodeBtn.click();
    }
});
