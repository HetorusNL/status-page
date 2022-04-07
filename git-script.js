const { exec } = require("child_process");
const packageJson = require("./package.json");

const gitVersion = "v" + packageJson.version;

doExec = async (command) => {
  await exec(command, (error, stdout, stderr) => {
    console.log(command);
    if (error) {
      console.log(`error: ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    stdout && console.log(`${stdout}`);
  });
};

doGitStuff = async () => {
  await doExec(`git add .`);
  await doExec(`git commit -m "${gitVersion}"`);
  await doExec(`git tag -a ${gitVersion} -m "${gitVersion}"`);
  await doExec(`git push --tags`);
  await doExec(`git push`);
};

doGitStuff();
