import download from 'download-git-repo';
import ora from 'ora';
import path from 'path';

// 模板下载地址
const templateUrl = 'janice143/electron-vite-template';

export const handleDownload = async (projectName) => {
  if (!projectName) {
    console.error('project name is required');
    return;
  }

  downloadGitRepo({
    repo: templateUrl,
    path: path.join(process.cwd(), projectName)
  });

  await loading('downloading template, please wait', () =>
    downloadGitRepo({
      repo: templateUrl,
      path: path.join(process.cwd(), projectName)
    })
  );
};

const downloadGitRepo = ({ repo, path }) => {
  return new Promise((resolve, reject) => {
    download(repo, path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

async function loading(message, cb) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  let executeRes = await cb();
  spinner.succeed();
  return executeRes;
}
