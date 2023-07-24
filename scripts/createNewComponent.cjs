const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function createComponent(componentName) {
  const componentFolder = `./src/components/${componentName}`;

  
  if (fs.existsSync(componentFolder)) {
    console.log(`Error: Component '${componentName}' already exists.`);
    return;
  }


  fs.mkdirSync(componentFolder);


  const componentContent = `import React from 'react';\n\nfunction ${componentName}() {\n  return (\n    <div>\n      {/* Your component code here */}\n    </div>\n  );\n}\n\nexport default ${componentName};\n`;
  fs.writeFileSync(`${componentFolder}/${componentName}.tsx`, componentContent);


  const cssContent = `/* Your component styles here */\n`;
  fs.writeFileSync(`${componentFolder}/${componentName}.css`, cssContent);

  console.log(`Component '${componentName}' created successfully.`);
}

readline.question('Enter the component name: ', (componentName) => {
  createComponent(componentName);
  readline.close();
});
