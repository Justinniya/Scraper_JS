const { exec } = require('child_process');
const fs = require('fs');

async function move_to_docker(name_of_file) {
    console.log("transferring json to docker");
    const localFile = `./${name_of_file}.json`;
    const containerName = 'Scraper-Airbnb';
    const containerPath = `/app/auth/${name_of_file}.json`;

    const command = `docker cp ${localFile} ${containerName}:${containerPath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`); 
            return;
        }
        if (stderr) {
            console.error(`⚠️ Stderr: ${stderr}`);
            return;
        }
        console.log(`✅ Output: ${stdout}`);

        // ✅ Remove the local JSON file after successful copy
        try {
            fs.unlinkSync(localFile);
            console.log(`🗑️ Deleted local file: ${localFile}`);
        } catch (err) {
            console.error(`❌ Failed to delete local file: ${err.message}`);
        }
    });
}

module.exports = move_to_docker;
