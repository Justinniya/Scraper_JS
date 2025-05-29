const https = require('https');
const { pipeline } = require('stream');
const { promisify } = require('util');

const streamPipeline = promisify(pipeline);
async function downloadImage(url, outputPath) {
  const response = await new Promise((resolve, reject) => {
    https.get(url, resolve).on('error', reject);
  });

  if (response.statusCode !== 200) {
    throw new Error(`Failed to get '${url}' (${response.statusCode})`);
  }
  console.log('Downloading image from:', url);
  await streamPipeline(response, fs.createWriteStream(outputPath));
}

module.exports = {downloadImage}