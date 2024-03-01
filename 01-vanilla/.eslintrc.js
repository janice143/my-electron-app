module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // 添加prettier插件
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "prettier", // 使用prettier插件
  ],
  rules: {
    "prettier/prettier": "error", // 将prettier错误显示为ESLint错误
    // 你可以在这里添加更多的自定义规则
  },
};
