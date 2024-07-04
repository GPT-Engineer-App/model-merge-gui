import { exec } from "child_process";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { model1, model2 } = req.body;

    // Replace this with the actual command to merge models
    const command = `python merge_models.py --model1 ${model1} --model2 ${model2}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error merging models: ${error.message}`);
        return res.status(500).json({ error: "Error merging models" });
      }

      if (stderr) {
        console.error(`Error merging models: ${stderr}`);
        return res.status(500).json({ error: "Error merging models" });
      }

      res.status(200).json({ result: stdout });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}