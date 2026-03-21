const { exec } = require("child_process");
const util = require("util");
const packageJson = require("./package.json");

const execAsync = util.promisify(exec);

const gitVersion = "v" + packageJson.version;

const doExec = async (command) => {
  console.log(command);
  try {
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    if (stdout) {
      console.log(stdout);
    }
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

const doGitStuff = async () => {
  await doExec(`git add .`);
  await doExec(`git commit --amend --no-edit`);
  await doExec(`git tag -d ${gitVersion}`);
  await doExec(`git tag -a ${gitVersion} -m "${gitVersion}"`);

  console.log(`to push the tags, run: "git push --tags"`);
  console.log(`to push the commit, run: "git push"`);
};

doGitStuff();
