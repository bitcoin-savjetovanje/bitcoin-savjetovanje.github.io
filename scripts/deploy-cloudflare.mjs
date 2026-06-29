import { spawnSync } from "node:child_process";

const projectName = "bitcoin-savjetovanje";
const branch = "main";
const allowDirty = process.argv.includes("--allow-dirty");

function run(command, args, options = {}) {
  console.log(`\n$ ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function runNpm(args) {
  if (process.env.npm_execpath) {
    run(process.execPath, [process.env.npm_execpath, ...args]);
    return;
  }

  run("npm", args);
}

function read(command, args) {
  return spawnSync(command, args, {
    encoding: "utf8",
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

const gitStatus = read("git", ["status", "--porcelain"]);

if (!allowDirty && gitStatus.status === 0 && gitStatus.stdout.trim()) {
  console.error("\nRefusing to deploy with uncommitted local changes:\n");
  console.error(gitStatus.stdout.trim());
  console.error(
    "\nCommit or stash those changes first, or deploy the current local state intentionally with:\n" +
      "npm run deploy:cloudflare:dirty",
  );
  process.exit(1);
}

runNpm(["run", "build"]);
runNpm(["run", "verify:dist"]);
runNpm([
  "exec",
  "wrangler",
  "--",
  "pages",
  "deploy",
  "dist",
  "--project-name",
  projectName,
  "--branch",
  branch,
]);
