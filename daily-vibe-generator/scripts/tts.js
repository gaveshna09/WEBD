const speakBtn = document.getElementById('speakBtn');

speakBtn.addEventListener('click', () => {
    const text = document.getElementById('adviceText').textContent;

    // Prevent overlapping speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
});
