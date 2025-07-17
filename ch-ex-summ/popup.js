document.getElementById('summarize-btn').addEventListener('click', () => {
    const inputText = document.getElementById('text-input').value;

    if (!inputText) {
        alert('Please paste some text to summarize.');
        return;
    }

    const summary = summarizeText(inputText);
    displaySummary(summary);
});

function summarizeText(text) {
    const sentences = text.split('.').map(s => s.trim()).filter(Boolean);
    
    const words = text.toLowerCase().split(/\W+/);
    const wordCount = {};
    words.forEach(word => {
        if (word) {
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });

    const sentenceScores = sentences.map(sentence => {
        const score = sentence.split(' ').reduce((acc, word) => {
            return acc + (wordCount[word.toLowerCase()] || 0);
        }, 0);
        return { sentence, score };
    });

    const summarySentences = sentenceScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 3) 
        .map(s => s.sentence);

    return summarySentences; 
}

function displaySummary(summary) {
    const summaryContainer = document.getElementById('summary');
    summaryContainer.innerHTML = ''; 

    const ul = document.createElement('ul'); 
    summary.forEach(sentence => {
        const listItem = document.createElement('li');
        listItem.textContent = sentence;
        ul.appendChild(listItem);
    });
    summaryContainer.appendChild(ul); 
};
