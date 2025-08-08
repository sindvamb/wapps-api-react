const fs = require('fs');
const path = require('path');

// Diretório raiz para busca
const rootDir = path.join(__dirname, 'src', 'main', 'webapp', 'app');

// Padrões para substituir chamadas ao axios
const patterns = [
  // Substitui axios.get('/api/...') por api.get('/api/...')
  {
    regex: /axios\.get\(['"]([^'"]+)['"]/g,
    replacement: 'api.get("$1"',
  },
  // Substitui axios.post('/api/...', data) por api.post('/api/...', data)
  {
    regex: /axios\.post\(['"]([^'"]+)['"]/g,
    replacement: 'api.post("$1"',
  },
  // Substitui axios.put('/api/...', data) por api.put('/api/...', data)
  {
    regex: /axios\.put\(['"]([^'"]+)['"]/g,
    replacement: 'api.put("$1"',
  },
  // Substitui axios.delete('/api/...') por api.delete('/api/...')
  {
    regex: /axios\.delete\(['"]([^'"]+)['"]/g,
    replacement: 'api.delete("$1"',
  },
  // Remove importações desnecessárias do axios
  {
    regex: /import\s+axios\s+from\s+['"]axios['"];?\n?/g,
    replacement: '',
  },
  // Adiciona importação do api se ainda não existir
  {
    regex: /(import\s+[\s\S]*?)(?=import|$)/g,
    replacement: (match, group1) => {
      if (!match.includes('import api from') && !match.includes('import { api } from')) {
        return `import api from 'app/services/api';\n${group1}`;
      }
      return match;
    },
  },
];

// Função para processar um arquivo
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Aplica todas as substituições
    patterns.forEach(({ regex, replacement }) => {
      if (regex.test(content)) {
        const newContent = content.replace(regex, replacement);
        if (newContent !== content) {
          content = newContent;
          modified = true;
        }
      }
    });

    // Se o arquivo foi modificado, salva as alterações
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Arquivo atualizado: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`Erro ao processar o arquivo ${filePath}:`, error);
  }
  return false;
}

// Função para percorrer diretórios recursivamente
function processDirectory(directory) {
  let updatedCount = 0;
  
  try {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        updatedCount += processDirectory(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (processFile(fullPath)) {
          updatedCount++;
        }
      }
    });
  } catch (error) {
    console.error(`Erro ao processar o diretório ${directory}:`, error);
  }
  
  return updatedCount;
}

// Executa a substituição
console.log('Iniciando substituição de chamadas do Axios...');
const updatedFiles = processDirectory(rootDir);
console.log(`\nSubstituição concluída. Total de arquivos atualizados: ${updatedFiles}`);
