module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true },
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
		// prettier的eslint插件
		'prettier',
		'plugin:prettier/recommended'
	],
	globals: {
		// 全局变量声明
		// '': false
		/*
      "writable"或者 true，表示变量可重写；
      "readonly"或者false，表示变量不可重写；
      "off"，表示禁用该全局变量。
     */
	},
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', '@typescript-eslint', 'prettier'],
	rules: {
		'vue/no-multiple-template-root': 'off', // 根节点解除限制，可以有多个节点
		'vue/script-setup-uses-vars': 'warn',
		"vue/multi-word-component-names":"off", // 关闭命名校验

		'@typescript-eslint/no-explicit-any': 'off', // 使用any类型
		'prettier/prettier': 'error', // 开启 prettier 自动修复的功能
		quotes: ['error', 'single'], // 单引号
		semi: ['error', 'never'], // 结尾不追加分号
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-var-requires': 0, // 解决require部分没有通过import引入
		'no-unused-vars': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn'
	}
}
