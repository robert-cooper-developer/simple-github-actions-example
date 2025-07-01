// src/server.ts
import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const app = express();
const port = 3000;
const execAsync = promisify(exec);

app.post('/api/git-pull', async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync('git pull');
    res.json({
      success: true,
      stdout,
      stderr
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Git API server running at http://localhost:${port}`);
});