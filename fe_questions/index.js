import { questions } from './questions.js';

function generateQuestion() {
	const idx = Math.floor(Math.random() * questions.length);
	document.getElementById('question').textContent = questions[idx].question;
}

// Make the function globally available for HTML onclick
window.generateQuestion = generateQuestion;
