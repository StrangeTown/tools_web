
export const questionTypes = {
	'JavaScript': {
		name: 'JavaScript',
		description: 'Core JavaScript language concepts and features'
	},
	'React': {
		name: 'React',
		description: 'React framework and ecosystem'
	},
	'Vue.js': {
		name: 'Vue.js',
		description: 'Vue.js framework and ecosystem'
	},
	'Angular': {
		name: 'Angular',
		description: 'Angular framework and ecosystem'
	},
	'CSS': {
		name: 'CSS',
		description: 'Cascading Style Sheets and styling'
	},
	'HTML': {
		name: 'HTML',
		description: 'HyperText Markup Language'
	},
	'TypeScript': {
		name: 'TypeScript',
		description: 'TypeScript language and tooling'
	},
	'Node.js': {
		name: 'Node.js',
		description: 'Node.js runtime and backend JavaScript'
	},
	'Webpack': {
		name: 'Webpack',
		description: 'Webpack build tool and configuration'
	},
	'Babel': {
		name: 'Babel',
		description: 'Babel JavaScript compiler'
	},
	'ES6+': {
		name: 'ES6+',
		description: 'Modern JavaScript (ES6 and beyond)'
	},
	'DOM': {
		name: 'DOM',
		description: 'Document Object Model manipulation'
	},
	'Browser APIs': {
		name: 'Browser APIs',
		description: 'Web browser APIs and interfaces'
	},
	'Performance': {
		name: 'Performance',
		description: 'Web performance optimization'
	},
	'Security': {
		name: 'Security',
		description: 'Web security concepts and practices'
	},
	'Testing': {
		name: 'Testing',
		description: 'Testing frameworks and methodologies'
	},
	'Build Tools': {
		name: 'Build Tools',
		description: 'Build tools and automation'
	},
	'State Management': {
		name: 'State Management',
		description: 'State management patterns and libraries'
	},
	'Routing': {
		name: 'Routing',
		description: 'Client-side routing and navigation'
	},
	'Component Libraries': {
		name: 'Component Libraries',
		description: 'UI component libraries and design systems'
	}
};

export const questions = [
	{
		id: 1,
		type: questionTypes['JavaScript'].name,
		question: "What is the difference between == and === in JavaScript?"
	},
	{
		id: 2,
		type: questionTypes['CSS'].name,
		question: "Explain the box model in CSS."
	},
	{
		id: 3,
		type: questionTypes['JavaScript'].name,
		question: "What are closures in JavaScript?"
	},
	{
		id: 4,
		type: questionTypes['DOM'].name,
		question: "How does event delegation work?"
	},
	{
		id: 5,
		type: questionTypes['React'].name,
		question: "What is the virtual DOM?"
	},
	{
		id: 6,
		type: questionTypes['JavaScript'].name,
		question: "Explain the concept of promises in JavaScript."
	},
	{
		id: 7,
		type: questionTypes['JavaScript'].name,
		question: "What is the difference between let, const, and var?"
	},
	{
		id: 8,
		type: questionTypes['Performance'].name,
		question: "How do you optimize a website's performance?"
	},
	{
		id: 9,
		type: questionTypes['CSS'].name,
		question: "What is responsive design?"
	},
	{
		id: 10,
		type: questionTypes['Browser APIs'].name,
		question: "Explain the difference between localStorage, sessionStorage, and cookies."
	},
	{
		id: 11,
		type: questionTypes['CSS'].name,
		question: "What are CSS preprocessors? Name a few."
	},
	{
		id: 12,
		type: questionTypes['CSS'].name,
		question: "How does flexbox work in CSS?"
	},
	{
		id: 13,
		type: questionTypes['Browser APIs'].name,
		question: "What is CORS and how do you handle it?"
	},
	{
		id: 14,
		type: questionTypes['JavaScript'].name,
		question: "Explain the concept of hoisting in JavaScript."
	},
	{
		id: 15,
		type: questionTypes['Browser APIs'].name,
		question: "What is a service worker?"
	},
	{
		id: 16,
		type: questionTypes['Security'].name,
		question: "How do you prevent XSS attacks?"
	},
	{
		id: 17,
		type: questionTypes['JavaScript'].name,
		question: "What is the difference between null and undefined?"
	},
	{
		id: 18,
		type: questionTypes['JavaScript'].name,
		question: "How does async/await work in JavaScript?"
	},
	{
		id: 19,
		type: questionTypes['JavaScript'].name,
		question: "What is the purpose of the 'this' keyword?"
	},
	{
		id: 20,
		type: questionTypes['Browser APIs'].name,
		question: "Explain the difference between GET and POST requests."
	}
];
