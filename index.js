const express = require("express");
const fs = require("fs"); // File System in Node

const app = express();
if (!process.env.PORT) {
  throw new Error("Please specify port number for the HTTP server with environment variable PORT");
}
  
const PORT = process.env.PORT;

app.get('/video', async (request, resource) => {
  const videoPath = "./videos/quicksand.mp4";
  const stats = await fs.promises.stat(videoPath);

  resource.writeHead(200, {
    "Content-Length": stats.size,
    "Content-Type": "video/mp4",
  });

  // Pipe the video to client
  console.log("streaming video!");
  fs.createReadStream(videoPath).pipe(resource);
})

app.listen(PORT, () => {
  console.log(`Listing on port: ${PORT}`);
});