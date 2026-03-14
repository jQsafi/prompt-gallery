const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PROMPTS_DIR = path.join(__dirname, '../data/prompts');
const OUTPUT_FILE = path.join(__dirname, '../public/prompts-index.json');

function generateIndex() {
  const files = fs.readdirSync(PROMPTS_DIR);
  const prompts = [];

  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(PROMPTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      prompts.push({
        ...data,
        slug: file.replace('.md', ''),
      });
    }
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(prompts, null, 2));
  console.log(`✅ Index generated with ${prompts.length} prompts.`);
}

generateIndex();
