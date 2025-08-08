const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'main', 'webapp', 'app');

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verifica se o arquivo importa axios diretamente
    if (content.includes("import axios from 'axios'")) {
      console.log(`Atualizando importações em: ${filePath}`);
      
      // Substitui a importação do axios pela nossa instância configurada
      content = content.replace(
        /import axios from ['"]axios['"]/g, 
        "import api from '../../services/api'"
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
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Processa apenas arquivos TypeScript/TSX
      if (processFile(fullPath)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
}

console.log('Iniciando atualização de importações do Axios...');
const totalUpdated = processDirectory(directoryPath);
console.log(`\nAtualização concluída! Total de arquivos atualizados: ${totalUpdated}`);
