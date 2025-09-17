# Web Tools Collection

A collection of simple, lightweight web applications designed to help with daily productivity and tracking. All tools are built with pure HTML, CSS, and JavaScript - no frameworks required!

## 📚 Reading Tracker

**Live Demo:** [https://www.itwork.club/tracker/](https://www.itwork.club/tracker/)

A clean and intuitive book reading progress tracker that helps you stay motivated and organized with your reading goals.

### Features
- **Reading Progress**: Track your current page and total pages for any book
- **Reading Sessions**: Log daily reading sessions with page counts and reading time
- **Visual Progress**: Beautiful progress bars and charts to visualize your reading journey
- **Reading Statistics**: View total books read, pages completed, and reading streaks
- **Local Storage**: All data is stored locally in your browser - your privacy is protected
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### How to Use
1. **Add a New Book**: Click "Add New Book" and enter the book title, author, and total pages
2. **Start Reading**: Select your current book from the dashboard
3. **Log Sessions**: Record your reading sessions by entering start/end pages and time spent
4. **Track Progress**: Watch your progress bars fill up and view your reading statistics
5. **Complete Books**: Mark books as finished when you reach the final page

---

## 📝 Temporary Notes

**Live Demo:** [https://www.itwork.club/note/](https://www.itwork.club/note/)

A lightweight note-taking app with Markdown support and auto-expiring notes - perfect for temporary thoughts, quick reminders, and draft ideas.

### Features
- **Markdown Support**: Write notes with full Markdown syntax including headers, lists, code blocks, and more
- **Syntax Highlighting**: Code blocks are automatically highlighted with Prism.js
- **Custom Highlighting**: Use `==text==` syntax to highlight important parts of your notes
- **Auto-Expiration**: Notes automatically expire after a customizable number of days (default: 3 days)
- **Random Note**: Get inspired by viewing a random note from your collection
- **Local Storage**: All notes are stored locally - no server uploads or privacy concerns
- **Responsive Design**: Optimized for all screen sizes with a clean, modern interface

### How to Use
1. **Write a Note**: Type your note in the text area using Markdown syntax
2. **Add the Note**: Click "Add Note" to save it to your collection
3. **View Notes**: All notes are displayed below with rendered Markdown formatting
4. **Set Expiration**: Adjust the "Persist Days" setting to control how long notes are kept
5. **Random Inspiration**: Click "Random Note" to view a random note from your collection
6. **Manage Notes**: Delete individual notes or clear all notes using the sidebar controls

### Markdown Support
- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**` or `__bold text__`
- **Italic**: `*italic text*` or `_italic text_`
- **Highlight**: `==highlighted text==`
- **Code**: `` `inline code` `` or `` ```language `` for code blocks
- **Lists**: `- item` for bullets, `1. item` for numbered
- **Links**: `[text](url)`
- **Quotes**: `> quote text`
- **Strikethrough**: `~~strikethrough~~`

---

## ⚖️ Weight Tracker

**Live Demo:** [https://www.itwork.club/weight/](https://www.itwork.club/weight/)

A simple and effective body weight tracking application with visual charts and goal setting features.

### Planned Features
- **Daily Weight Entry**: Quick and easy weight logging with support for kg/lbs
- **Interactive Charts**: Visual progress tracking with Chart.js integration
- **Target Weight Goals**: Set target weights with reference lines on charts
- **Progress Statistics**: View weight changes, trends, and achievements
- **Data Export**: Export your weight data as CSV files for backup or analysis
- **Privacy First**: All data stored locally in your browser
- **Mobile Optimized**: Perfect for daily use on any device

### How It Will Work
1. **Quick Entry**: Enter your daily weight with a simple, focused interface
2. **Visual Progress**: See your weight journey on interactive charts
3. **Set Goals**: Define target weights that appear as reference lines
4. **Track Trends**: Monitor your progress with detailed statistics
5. **Export Data**: Download your weight history for external analysis
6. **Stay Motivated**: Visual feedback helps maintain consistency

---

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Responsive design with gradients, animations, and flexbox/grid
- **Vanilla JavaScript**: No frameworks - pure, lightweight JavaScript
- **Chart.js**: For interactive charts and data visualization
- **Marked.js**: Markdown parsing and rendering
- **Prism.js**: Syntax highlighting for code blocks

### Features Common to All Tools
- **Privacy First**: All data is stored locally in your browser
- **No Registration**: Start using immediately without accounts or sign-ups
- **Offline Ready**: Works without an internet connection once loaded
- **Mobile Responsive**: Optimized for phones, tablets, and desktops
- **Fast Loading**: Lightweight and optimized for quick loading
- **Modern Design**: Clean, intuitive interfaces with smooth animations

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## 🚀 Getting Started

### Online Access
- **Reading Tracker**: Visit [https://www.itwork.club/tracker/](https://www.itwork.club/tracker/)
- **Temporary Notes**: Visit [https://www.itwork.club/note/](https://www.itwork.club/note/)
- **Weight Tracker**: Coming soon!

### Local Development
1. Clone this repository:
   ```bash
   git clone https://github.com/StrangeTown/tools_web.git
   cd tools_web
   ```

2. Serve the files using any local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to the specific tool:
   - Reading Tracker: `http://localhost:8000/reading_tracker/`
   - Temporary Notes: `http://localhost:8000/three_days_notes/`
   - Weight Tracker: `http://localhost:8000/weight_chart/`

---

## 📱 Mobile Experience

All applications are fully responsive and provide an excellent mobile experience:

- **Touch-friendly interfaces** with large tap targets
- **Optimized layouts** that adapt to small screens
- **Fast performance** on mobile devices
- **Offline functionality** once cached by the browser

---

## 🔒 Privacy & Data

We take your privacy seriously:

- **No tracking**: No analytics, cookies, or tracking scripts
- **Local storage only**: All data stays on your device
- **No server uploads**: Nothing is sent to external servers
- **Open source**: You can inspect all code for transparency
- **No accounts required**: Start using immediately without registration

---

## 🤝 Contributing

This project is open source and welcomes contributions! Whether you want to:

- Report bugs or suggest features
- Improve the documentation
- Add new functionality
- Enhance the design
- Optimize performance

Feel free to open issues or submit pull requests on GitHub.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 Philosophy

These tools are built with a simple philosophy:

- **Simplicity over complexity**
- **Privacy over convenience**
- **Functionality over features**
- **Speed over bloat**
- **Accessibility over exclusion**

Each tool does one thing well, loads fast, and respects your privacy. No unnecessary features, no tracking, no complications - just clean, effective tools for daily productivity.