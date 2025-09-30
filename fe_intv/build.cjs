const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// 读取模板 HTML
const template = fs.readFileSync('index.html', 'utf8');

// 读取翻译文件
const zhTranslations = JSON.parse(fs.readFileSync('lang/zh.json', 'utf8'));
const enTranslations = JSON.parse(fs.readFileSync('lang/en.json', 'utf8'));

// 获取翻译的辅助函数（处理嵌套键，如 nav.title）
function getTranslation(translations, key) {
  const keys = key.split('.');
  let current = translations;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return null;
    }
  }
  return current;
}

// 替换 HTML 中的 i18n 占位符
function replaceI18n(html, translations) {
  const $ = cheerio.load(html);

  // 查找所有带有 data-i18n* 属性的元素
  $('[data-i18n], [data-i18n-title]').each(function() {
    const element = $(this);
    const attrs = element.attr();

    for (const attr in attrs) {
      if (attr.startsWith('data-i18n')) {
        const key = attrs[attr];
        const translation = getTranslation(translations, key);

        if (translation) {
          if (attr === 'data-i18n') {
            // 替换文本内容，支持 HTML 标签
            element.html(translation);
            element.removeAttr('data-i18n');
          } else {
            // 替换属性，如 data-i18n-title -> title
            const realAttr = attr.replace('data-i18n-', '');
            element.attr(realAttr, translation);
            element.removeAttr(attr);
          }
        }
      }
    }
  });

  return $.html();
}

// 生成中文版本
const zhHtml = replaceI18n(template, zhTranslations);
fs.mkdirSync('zh_dist', { recursive: true });
fs.writeFileSync(path.join('zh_dist', 'index.html'), zhHtml);

// 生成英文版本
const enHtml = replaceI18n(template, enTranslations);
fs.mkdirSync('en_dist', { recursive: true });
fs.writeFileSync(path.join('en_dist', 'index.html'), enHtml);

console.log('Build completed! Generated zh_dist/index.html and en_dist/index.html');