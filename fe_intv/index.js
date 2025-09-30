#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Frontend Interview Questions Build Script
 * 
 * This script reads questions from items.json and injects them into index.html
 * Usage: node index.js [command] [options]
 * 
 * Commands:
 *   build     - Build the HTML file with injected data (default)
 *   list      - List all questions from items.json
 *   validate  - Validate the JSON structure
 *   help      - Show this help message
 */

const ITEMS_FILE = 'items.json';
const HTML_TEMPLATE = 'index.html';
const OUTPUT_FILE = 'index.html'; // Same file for in-place replacement
const PLACEHOLDER = '/* ITEMS_PLACEHOLDER */';

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Log with colors
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load and validate JSON file
 */
function loadItems() {
  try {
    if (!fs.existsSync(ITEMS_FILE)) {
      throw new Error(`Items file '${ITEMS_FILE}' not found`);
    }

    const data = fs.readFileSync(ITEMS_FILE, 'utf8');
    const items = JSON.parse(data);

    if (!Array.isArray(items)) {
      throw new Error('Items data must be an array');
    }

    // Validate each item structure
    items.forEach((item, index) => {
      if (!item.id || !item.title || !item.content) {
        throw new Error(`Item at index ${index} is missing required fields (id, title, content)`);
      }
    });

    return items;
  } catch (error) {
    log(`Error loading items: ${error.message}`, 'red');
    process.exit(1);
  }
}

/**
 * Load HTML template
 */
function loadHtmlTemplate() {
  try {
    if (!fs.existsSync(HTML_TEMPLATE)) {
      throw new Error(`HTML template '${HTML_TEMPLATE}' not found`);
    }

    return fs.readFileSync(HTML_TEMPLATE, 'utf8');
  } catch (error) {
    log(`Error loading HTML template: ${error.message}`, 'red');
    process.exit(1);
  }
}

/**
 * Build HTML file with injected data
 */
function buildHtml() {
  log('🔨 Building HTML file...', 'blue');

  const items = loadItems();
  let htmlContent = loadHtmlTemplate();

  // Check if placeholder exists
  if (!htmlContent.includes(PLACEHOLDER)) {
    log(`Warning: Placeholder '${PLACEHOLDER}' not found in HTML template`, 'yellow');
    return;
  }

  // Convert items to formatted JSON string
  const itemsJson = JSON.stringify(items, null, 8); // 8 spaces for indentation to match HTML

  // Replace placeholder with actual data
  htmlContent = htmlContent.replace(PLACEHOLDER, itemsJson);

  // Write output file
  fs.writeFileSync(OUTPUT_FILE, htmlContent, 'utf8');

  log(`✅ Successfully built ${OUTPUT_FILE}`, 'green');
  log(`📊 Injected ${items.length} questions`, 'cyan');
}

/**
 * List all questions
 */
function listQuestions() {
  const items = loadItems();
  
  log(`📋 Found ${items.length} questions in ${ITEMS_FILE}:`, 'blue');
  console.log();

  items.forEach((item, index) => {
    console.log(`${colors.bright}${index + 1}. ${item.title}${colors.reset}`);
    console.log(`   ID: ${colors.cyan}${item.id}${colors.reset}`);
    
    // Show first 100 characters of content
    const preview = item.content.replace(/\n/g, ' ').substring(0, 100);
    console.log(`   Preview: ${preview}${item.content.length > 100 ? '...' : ''}`);
    console.log();
  });
}

/**
 * Validate JSON structure
 */
function validateJson() {
  log('🔍 Validating JSON structure...', 'blue');
  
  try {
    const items = loadItems();
    
    log('✅ JSON structure is valid', 'green');
    log(`📊 Found ${items.length} valid questions`, 'cyan');
    
    // Additional validation checks
    const ids = new Set();
    const duplicates = [];
    
    items.forEach(item => {
      if (ids.has(item.id)) {
        duplicates.push(item.id);
      } else {
        ids.add(item.id);
      }
    });
    
    if (duplicates.length > 0) {
      log(`⚠️  Warning: Found duplicate IDs: ${duplicates.join(', ')}`, 'yellow');
    } else {
      log('✅ All question IDs are unique', 'green');
    }
    
  } catch (error) {
    log(`❌ Validation failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
${colors.bright}Frontend Interview Questions Build Script${colors.reset}

${colors.cyan}Usage:${colors.reset}
  node index.js [command] [options]

${colors.cyan}Commands:${colors.reset}
  ${colors.green}build${colors.reset}     Build the HTML file with injected data (default)
  ${colors.green}list${colors.reset}      List all questions from items.json
  ${colors.green}validate${colors.reset}  Validate the JSON structure
  ${colors.green}help${colors.reset}      Show this help message

${colors.cyan}Examples:${colors.reset}
  node index.js                # Build HTML file
  node index.js build          # Same as above
  node index.js list           # List all questions
  node index.js validate       # Validate JSON
  node index.js --help         # Show help

${colors.cyan}Files:${colors.reset}
  ${colors.yellow}${ITEMS_FILE}${colors.reset}     Source questions data
  ${colors.yellow}${HTML_TEMPLATE}${colors.reset}    HTML template file
  ${colors.yellow}${OUTPUT_FILE}${colors.reset}     Output HTML file
`);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'build';

  switch (command) {
    case 'build':
      buildHtml();
      break;
    
    case 'list':
    case '--list':
      listQuestions();
      break;
    
    case 'validate':
    case '--validate':
      validateJson();
      break;
    
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    
    default:
      log(`❌ Unknown command: ${command}`, 'red');
      log('Run "node index.js help" for usage information', 'yellow');
      process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  log(`❌ Uncaught error: ${error.message}`, 'red');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`❌ Unhandled rejection: ${reason}`, 'red');
  process.exit(1);
});

// Run main function
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}