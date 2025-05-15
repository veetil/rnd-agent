const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// Read the existing package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Dependencies to add
const newDependencies = {
  'framer-motion': '^10.16.4',
};

// Add new dependencies
packageJson.dependencies = {
  ...packageJson.dependencies,
  ...newDependencies,
};

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Dependencies updated successfully!');
console.log('Added dependencies:');
Object.entries(newDependencies).forEach(([name, version]) => {
  console.log(`- ${name}: ${version}`);
});
console.log('\nRun "npm install" or "yarn" to install the new dependencies.');