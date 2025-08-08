const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'main', 'webapp');

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verifica se há importações incorretas
    if (content.includes("from 'react-router'") || content.includes('from "react-router"')) {
      console.log(`Corrigindo importações em: ${filePath}`);
      
      // Substitui as importações incorretas
      content = content.replace(
        /from ['"]react-router['"]/g, 
        "from 'react-router-dom'"
      );
      
      // Salva o arquivo com as correções
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Arquivo corrigido: ${filePath}`);
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
  let fixedCount = 0;
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Processa subdiretórios recursivamente
      fixedCount += processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
      // Processa apenas arquivos JavaScript/TypeScript
      if (processFile(fullPath)) {
        fixedCount++;
      }
    }
  });
  
  return fixedCount;
}

console.log('Iniciando correção de importações...');
const totalFixed = processDirectory(directoryPath);
console.log(`\nCorreção concluída! Total de arquivos corrigidos: ${totalFixed}`);
