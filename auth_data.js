const fs = require('fs');
const { exec } = require('child_process');

async function updateAuthInDocker(name, uuid) {
    const localFile = './auth.json';
    const containerName = 'Scraper-Airbnb';
    const containerPath = `/app/auth/auth.json`;

    console.log('🔄 Updating auth.json...');

    let authData = [];

    // Step 1: Read auth.json if it exists and is not empty
    try {
        if (fs.existsSync(localFile)) {
            const raw = fs.readFileSync(localFile, 'utf-8');
            if (raw.trim()) {
                authData = JSON.parse(raw);
            }
        }
    } catch (err) {
        console.error(`❌ Failed to read auth.json:`, err);
        return;
    }

    // Step 2: Update existing or push new entry
    const newEntry = { name, uuid };
    const index = authData.findIndex(entry => entry.name === name);

    if (index !== -1) {
        authData[index] = newEntry;
        console.log(`♻️ Replaced existing entry for: ${name}`);
    } else {
        authData.push(newEntry);
        console.log(`➕ Added new entry for: ${name}`);
    }

    // Step 3: Save the updated file
    try {
        fs.writeFileSync(localFile, JSON.stringify(authData, null, 2), 'utf-8');
        console.log('✅ auth.json updated successfully.');
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
