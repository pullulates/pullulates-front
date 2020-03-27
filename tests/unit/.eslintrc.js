/**
 *
 * 规则说明见 https://cn.eslint.org/docs/rules/
 * eslint-plugin-import 规则见 https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
 * eslint-plugin-vue 规则见 https://github.com/vuejs/eslint-plugin-vue
 *
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 *
 */

module.exports = {
  extends: [
    // 'eslint:recommended',
    "airbnb-base", // airbnb lint规范
    "plugin:vue/essential", // eslint-plugin-vue
    "plugin:prettier/recommended" // eslint-config-prettier
  ]
}