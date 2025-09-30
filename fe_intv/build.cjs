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
  
  // 设置语言属性
  $('html').attr('lang', translations.lang || 'zh-CN');
  
  // 设置语言切换器的初始值
  const currentLangText = translations.lang === 'en' ? 'English' : '中文';
  $('#currentLang').text(currentLangText);
  
  // 查找所有带有 data-i18n* 属性的元素
  $('[data-i18n], [data-i18n-title], [data-i18n-content], [data-i18n-description]').each(function() {
    const element = $(this);
    const attrs = element.attr();
    
    for (const attr in attrs) {
      if (attr.startsWith('data-i18n')) {
        const key = attrs[attr];
        const translation = getTranslation(translations, key);
        
        if (translation) {
          if (attr === 'data-i18n') {
            // 保存原始翻译文本，用于JavaScript动态替换
            if (key === 'nav.totalCount') {
              element.attr('data-original-text', translation);
            }
            // 替换文本内容
            element.html(translation);
            element.removeAttr('data-i18n');
          } else {
            // 替换属性，如 data-i18n-title -> title, data-i18n-content -> content
            const realAttr = attr.replace('data-i18n-', '');
            element.attr(realAttr, translation);
            element.removeAttr(attr);
          }
        }
      }
    }
  });
  
  // 处理 script 中的硬编码字符串
  $('script').each(function() {
    let scriptContent = $(this).html();
    // 替换硬编码的字符串为翻译
    const messages = translations.messages || {};
    scriptContent = scriptContent.replace(/'复制失败，请手动复制'/g, `'${messages.copyFailed || 'Copy failed, please copy manually'}'`);
    scriptContent = scriptContent.replace(/`题目总数: \$\{items\.length\}`/g, `\`${messages.totalCountPrefix || 'Total Questions: '}\${items.length}\``);
    // 可以添加更多替换规则
    $(this).html(scriptContent);
  });
  
  // 处理 JSON-LD Structured Data
  $('script[type="application/ld+json"]').each(function() {
    let jsonContent = $(this).html();
    try {
      const structuredData = JSON.parse(jsonContent);
      const translatedData = replaceJsonLdStrings(structuredData, translations);
      $(this).html(JSON.stringify(translatedData, null, 2));
    } catch (e) {
      console.warn('Failed to parse JSON-LD:', e);
    }
  });
  
  return $.html();
}

// 递归替换 JSON-LD 中的字符串
function replaceJsonLdStrings(obj, translations) {
  if (typeof obj === 'string') {
    // WebApplication schema 翻译
    if (obj === '前端面试题练习平台') return translations.structuredData?.webApp?.name || obj;
    if (obj === 'Frontend Interview Questions Practice Platform') return translations.structuredData?.webApp?.alternateName || obj;
    if (obj === '免费在线前端面试题练习平台，包含JavaScript、React、TypeScript、CSS等技术栈面试题。支持随机练习、详细解析、代码示例。') return translations.structuredData?.webApp?.description || obj;
    if (obj === 'JavaScript面试题练习') return translations.structuredData?.webApp?.featureList?.[0] || obj;
    if (obj === 'React面试题库') return translations.structuredData?.webApp?.featureList?.[1] || obj;
    if (obj === 'TypeScript面试准备') return translations.structuredData?.webApp?.featureList?.[2] || obj;
    if (obj === 'CSS前端面试') return translations.structuredData?.webApp?.featureList?.[3] || obj;
    if (obj === '随机题目练习') return translations.structuredData?.webApp?.featureList?.[4] || obj;
    if (obj === '详细答案解析') return translations.structuredData?.webApp?.featureList?.[5] || obj;
    if (obj === '代码示例展示') return translations.structuredData?.webApp?.featureList?.[6] || obj;
    if (obj === '键盘快捷操作') return translations.structuredData?.webApp?.featureList?.[7] || obj;
    if (obj === '免费在线使用') return translations.structuredData?.webApp?.featureList?.[8] || obj;
    if (obj === '移动端适配') return translations.structuredData?.webApp?.featureList?.[9] || obj;
    if (obj === '面试准备') return translations.structuredData?.webApp?.educationalUse || obj;
    if (obj === '面试题库') return translations.structuredData?.webApp?.learningResourceType || obj;
    if (obj === '前端开发者') return translations.structuredData?.webApp?.audience?.educationalRole || obj;
    if (obj === 'JavaScript') return translations.structuredData?.webApp?.about?.[0]?.name || obj;
    if (obj === 'JavaScript编程语言面试题') return translations.structuredData?.webApp?.about?.[0]?.description || obj;
    if (obj === 'React') return translations.structuredData?.webApp?.about?.[1]?.name || obj;
    if (obj === 'React框架面试题') return translations.structuredData?.webApp?.about?.[1]?.description || obj;
    if (obj === 'TypeScript') return translations.structuredData?.webApp?.about?.[2]?.name || obj;
    if (obj === 'TypeScript语言面试题') return translations.structuredData?.webApp?.about?.[2]?.description || obj;
    if (obj === 'CSS') return translations.structuredData?.webApp?.about?.[3]?.name || obj;
    if (obj === 'CSS样式面试题') return translations.structuredData?.webApp?.about?.[3]?.description || obj;
    if (obj === '前端开发') return translations.structuredData?.webApp?.about?.[4]?.name || obj;
    if (obj === '前端开发技术面试') return translations.structuredData?.webApp?.about?.[4]?.description || obj;
    if (obj === '前端面试题') return translations.structuredData?.webApp?.keywords?.[0] || obj;
    if (obj === 'JavaScript面试题') return translations.structuredData?.webApp?.keywords?.[1] || obj;
    if (obj === 'React面试题') return translations.structuredData?.webApp?.keywords?.[2] || obj;
    if (obj === 'TypeScript面试题') return translations.structuredData?.webApp?.keywords?.[3] || obj;
    if (obj === 'CSS面试题') return translations.structuredData?.webApp?.keywords?.[4] || obj;
    if (obj === '前端开发面试') return translations.structuredData?.webApp?.keywords?.[5] || obj;
    if (obj === '技术面试') return translations.structuredData?.webApp?.keywords?.[6] || obj;
    if (obj === '面试练习') return translations.structuredData?.webApp?.keywords?.[7] || obj;
    if (obj === '在线练习') return translations.structuredData?.webApp?.keywords?.[8] || obj;
    if (obj === '免费面试题库') return translations.structuredData?.webApp?.keywords?.[9] || obj;
    if (obj === '前端技术栈') return translations.structuredData?.webApp?.keywords?.[10] || obj;
    if (obj === 'Web开发面试') return translations.structuredData?.webApp?.keywords?.[11] || obj;
    if (obj === 'zh-CN') return translations.structuredData?.webApp?.inLanguage || obj;
    
    // FAQ schema 翻译
    if (obj === '这个前端面试题练习平台是免费的吗？') return translations.structuredData?.faq?.questions?.[0]?.name || obj;
    if (obj === '是的，这个前端面试题练习平台完全免费使用。包含JavaScript、React、TypeScript、CSS等技术栈的面试题，支持随机练习和详细解析，无需注册或付费。') return translations.structuredData?.faq?.questions?.[0]?.acceptedAnswer?.text || obj;
    if (obj === '包含哪些技术栈的面试题？') return translations.structuredData?.faq?.questions?.[1]?.name || obj;
    if (obj === '平台包含多种前端技术栈的面试题：JavaScript基础和进阶、React组件和Hooks、TypeScript类型系统、CSS样式和布局、前端工程化、性能优化、浏览器原理等主流前端技术。') return translations.structuredData?.faq?.questions?.[1]?.acceptedAnswer?.text || obj;
    if (obj === '如何开始练习面试题？') return translations.structuredData?.faq?.questions?.[2]?.name || obj;
    if (obj === '点击页面上的\'开始练习\'按钮即可进入练习模式。系统会随机显示面试题，每题都包含详细的答案解析和代码示例。可以使用空格键快速切换到下一题。') return translations.structuredData?.faq?.questions?.[2]?.acceptedAnswer?.text || obj;
    if (obj === '支持哪些操作方式？') return translations.structuredData?.faq?.questions?.[3]?.name || obj;
    if (obj === '支持鼠标点击和键盘快捷键操作。按空格键可以随机切换下一题，点击复制按钮可以复制题目内容。界面简洁直观，专注于高效的练习体验。') return translations.structuredData?.faq?.questions?.[3]?.acceptedAnswer?.text || obj;
    if (obj === '面试题的质量如何？') return translations.structuredData?.faq?.questions?.[4]?.name || obj;
    if (obj === '所有面试题都经过精心筛选，涵盖前端开发的核心知识点。每题都提供详细的解答和代码示例，帮助深入理解概念。题目难度适中，适合各个水平的前端开发者。') return translations.structuredData?.faq?.questions?.[4]?.acceptedAnswer?.text || obj;
    
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(item => replaceJsonLdStrings(item, translations));
  } else if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const key in obj) {
      result[key] = replaceJsonLdStrings(obj[key], translations);
    }
    return result;
  }
  return obj;
}// 生成中文版本
const zhHtml = replaceI18n(template, zhTranslations);
fs.mkdirSync('zh_dist', { recursive: true });
fs.writeFileSync(path.join('zh_dist', 'index.html'), zhHtml);

// 生成英文版本
const enHtml = replaceI18n(template, enTranslations);
fs.mkdirSync('en_dist', { recursive: true });
fs.writeFileSync(path.join('en_dist', 'index.html'), enHtml);

console.log('Build completed! Generated zh_dist/index.html and en_dist/index.html');