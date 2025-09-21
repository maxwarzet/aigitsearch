const path = require('path');
const fs = require('fs-extra');
const { glob } = require('glob');
const JavaScriptObfuscator = require('javascript-obfuscator');

(async () => {
  const buildJsDir = path.join(__dirname, '..', 'build', 'static', 'js');
  if (!fs.existsSync(buildJsDir)) {
    console.error('Build JS directory not found:', buildJsDir);
    process.exit(1);
  }
  const files = await glob('**/*.js', { cwd: buildJsDir, nodir: true });
  console.log('Obfuscating files:', files);
  for (const file of files) {
    const filePath = path.join(buildJsDir, file);
    const code = await fs.readFile(filePath, 'utf8');
    const result = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      numbersToExpressions: true,
      simplify: true,
      stringArray: true,
      stringArrayEncoding: ['rc4'],
      stringArrayThreshold: 0.75,
      splitStrings: true,
      splitStringsChunkLength: 6,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      renameGlobals: true,
      selfDefending: true,
      disableConsoleOutput: false,
      target: 'browser',
      transformObjectKeys: true,
      unicodeEscapeSequence: true,
    });
    await fs.writeFile(filePath, result.getObfuscatedCode(), 'utf8');
  }
  console.log('Obfuscation complete.');
})();
