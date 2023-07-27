/*
 * @FileDescription:
 * @Author: weipeng11132@navinfo.com
 * @Date: 2023-07-25 15:01:41
 * @LastEditors: weipeng11132@navinfo.com
 * @LastEditTime: 2023-07-27 15:10:48
 * @FilePath: \vite-plugin-build-info-html\src\index.js
 */
import fs from "fs";

async function buildInfo(options = {}) {
  const { execaCommandSync } = await import("execa");
  const { extra = [] } = options;

  const { env } = process;
  const buildInfoObj = {
    projectName: options.projectName || env.npm_package_name,
    version: `v${env.npm_package_version}`,
    buildBranch: execaCommandSync("git rev-parse --abbrev-ref HEAD").stdout,
    buildTime: new Date().toLocaleString(),
    buildUser:
      execaCommandSync("git config --get user.name").stdout || env.USERNAME,
    buildUserEmail: execaCommandSync("git config --get user.email").stdout,
    lastCommitAuthor: execaCommandSync('git log -1 --pretty=format:"%an"')
      .stdout,
    lastCommitAuthorEmail: execaCommandSync('git log -1 --pretty=format:"%ae"')
      .stdout,
    lastCommitter: execaCommandSync('git log -1 --pretty=format:"%cn"').stdout,
    lastCommitterEmail: execaCommandSync('git log -1 --pretty=format:"%ce"')
      .stdout,
    lastCommitTime: execaCommandSync('git log -1 --pretty=format:"%ci"').stdout,
    lastCommitHash: execaCommandSync('git log -1 --pretty=format:"%H"').stdout,
  };

  extra.forEach(({ label, envKey, val, gitOrder }) => {
    if (val) {
      buildInfoObj[label] = val;
      return;
    }
    if (envKey) {
      buildInfoObj[label] = env?.[envKey];
      return;
    }
    if (gitOrder) {
      buildInfoObj[label] = execaCommandSync(gitOrder).stdout;
    }
  });

  const buildInfoString = Object.entries(buildInfoObj)
    .map(
      ([key, value]) =>
        `<div style="display:flex;">
                    <div style="min-width:300px;">${key}: </div>
                    <div style="font-weight;600; max-width:500px">${value.replace(
                      /^"|"$/g,
                      ""
                    )}</div>
                </div>
                <br/> `
    )
    .join("");

  const htmlContent = `<!DOCTYPE html>
    <html lang="zh-CN">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
            <title>build-info</title>
        </head>
        <body style="display:flex;justify-content: center; align-items:center; width: 90vw; padding: 20px;">
            <noscript>
                <strong>
                    We're sorry but html doesn't work properly without
                    JavaScript enabled. Please enable it to continue.
                </strong>
            </noscript>
            <div>${buildInfoString}</div>
        </body>
    </html>
    `;

  let infoPath = "";
  return {
    name: "vite-plugin-build-info-html",
    apply: "build",
    configResolved(config) {
      infoPath = `${config.root}/${config.build.outDir}/info.html`;
    },
    closeBundle() {
      fs.writeFile(infoPath, htmlContent, (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return;
        }
        console.log("\x1b[32m%s\x1b[0m", "info.html generate successfully！");
      });
    },
  };
}

export { buildInfo };
