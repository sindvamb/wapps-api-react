const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'main', 'webapp', 'app');

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verifica se o arquivo importa a API com caminho relativo
    const relativeImportRegex = /import\s+api\s+from\s+['"](?:\.\.\/)+services\/api['"]/g;
    
    if (relativeImportRegex.test(content)) {
      console.log(`Atualizando importação em: ${filePath}`);
      
      // Substitui a importação relativa pelo alias 'app'
      content = content.replace(
        relativeImportRegex, 
        "import api from 'app/services/api'"
      );
      
      // Salva o arquivo com as correções
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Arquivo atualizado: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Erro ao processar o arquivo ${filePath}:`, error);
    return false;
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  let updatedCount = 0;
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Processa subdiretórios recursivamente
      updatedCount += processDirectory(fullPath);
    } else if ((file.endsWith('.tsx') || file.endsWith('.ts')) && !file.endsWith('.d.ts')) {
      // Processa apenas arquivos TypeScript/TSX que não são arquivos de declaração
      if (processFile(fullPath)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
}

console.log('Iniciando atualização de importações da API...');
const totalUpdated = processDirectory(directoryPath);
console.log(`\nAtualização concluída! Total de arquivos atualizados: ${totalUpdated}`);
