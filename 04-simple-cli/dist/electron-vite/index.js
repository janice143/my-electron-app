"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDownload = void 0;
var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));
var _ora = _interopRequireDefault(require("ora"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 模板下载地址
const templateUrl = 'janice143/electron-vite-template';
const handleDownload = async projectName => {
  if (!projectName) {
    console.error('project name is required');
    return;
  }
  downloadGitRepo({
    repo: templateUrl,
    path: _path.default.join(process.cwd(), projectName)
  });
  await loading('downloading template, please wait', () => downloadGitRepo({
    repo: templateUrl,
    path: _path.default.join(process.cwd(), projectName)
  }));
};
exports.handleDownload = handleDownload;
const downloadGitRepo = ({
  repo,
  path
}) => {
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo.default)(repo, path, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
async function loading(message, cb) {
  const spinner = (0, _ora.default)(message);
  spinner.start(); // 开启加载
  let executeRes = await cb();
  spinner.succeed();
  return executeRes;
}