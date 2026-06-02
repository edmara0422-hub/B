const fs = require('fs');
const glob = require('glob');

const files = glob.sync('app/api/icu/*/route.ts');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace timeout message and value
  content = content.replace(/timeout de 3\.5s/g, 'timeout de 25s');
  content = content.replace(/3500\)/g, '25000)');

  // Promote google/gemini-1.5-pro to the top of GATEWAY_MODELS
  if (content.includes('const GATEWAY_MODELS = [')) {
    content = content.replace(
      "const GATEWAY_MODELS = [\n  'google/gemini-1.5-flash',\n  'openai/gpt-4o-mini',\n  'openai/gpt-4o',\n  'google/gemini-1.5-pro',\n  'anthropic/claude-3-5-sonnet',",
      "const GATEWAY_MODELS = [\n  'google/gemini-1.5-pro',\n  'google/gemini-1.5-flash',\n  'openai/gpt-4o-mini',\n  'openai/gpt-4o',\n  'anthropic/claude-3-5-sonnet',"
    );
  }

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});