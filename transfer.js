const { exec } = require('child_process');


async function move_to_docker(name_of_file){
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
    });
}


module.exports = move_to_docker;