#!/usr/bin/env node
import { saveConfig } from "../src/config.mjs";
import { completePairing } from "../src/notification-client.mjs";

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] ?? null;
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const completionUrl = option("--completion-url");
const configDir = option("--config-dir");
if (completionUrl == null || configDir == null) {
  throw new Error(
    "Usage: node bin/pair.mjs --completion-url <url> --config-dir <dir>, with the pairing code on standard input.",
  );
}

const pairingCode = (await readStdin()).trim();
if (pairingCode.length === 0) {
  throw new Error("A pairing code must be provided through standard input.");
}

const pairing = await completePairing({ completionUrl, pairingCode });
await saveConfig(configDir, pairing);
process.stdout.write(`Paired Drover Notify host ${pairing.hostId}.\n`);
