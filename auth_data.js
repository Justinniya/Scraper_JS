const fs = require('fs');
const { exec } = require('child_process');

async function updateAuthInDocker(name, uuid) {
    const localFile = './auth.json';
    const containerName = 'Scraper-Airbnb';
    const containerPath = `/app/auth/auth.json`;

    console.log('🔄 Updating auth.json...');

    // Step 1: Read and modify local auth.json
    let authData = {};
    try {
        const raw = fs.readFileSync(localFile, 'utf-8');
        authData = JSON.parse(raw);
    } catch (err) {
        console.error(`❌ Failed to read auth.json:`, err);
        return;
    }

    // Step 2: Replace or insert `name` and `uuid`
    authData.name = name;
    authData.uuid = uuid;

    // Step 3: Save the modified file
    try {
        fs.writeFileSync(localFile, JSON.stringify(authData, null, 2), 'utf-8');
        console.log('✅ Updated auth.json with new name and uuid.');
    } catch (err) {
        console.error(`❌ Failed to write auth.json:`, err);
        return;
    }

    // Step 4: Copy to Docker container
    const command = `docker cp ${localFile} ${containerName}:${containerPath}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Docker copy failed: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Docker stderr: ${stderr}`);
            return;
        }
        console.log(`🚀 auth.json transferred successfully to Docker.`);
    });
}

module.exports = updateAuthInDocker;