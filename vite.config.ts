import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import {
	defineConfig,
	normalizePath,
	mergeConfig,
	UserConfig,
	loadEnv
} from 'vite'
import viteEslint from 'vite-plugin-eslint' // eslint
import autoprefixer from 'autoprefixer'
import pxToRem from 'postcss-pxtorem'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

import prodConfig from './config/prod.config'
import devConfig from './config/dev.config'

const transformNormalizePath = (fn, ...val) => {
	return normalizePath(fn(...val))
}

// https://vitejs.dev/config/
export default defineConfig((props) => {
	const { mode } = props
	const isProd = mode === 'production'
	const root = process.cwd()
	const env = loadEnv(mode, root)

	const baseConfig: UserConfig = {
		root,
		mode,
		base: '',
		envDir: transformNormalizePath(resolve, __dirname, './config'), // .env 文件的位置
		resolve: {
			alias: {
				'@': transformNormalizePath(join, __dirname, './src')
			},
			// 导入时想要省略的扩展名列表
			extensions: [
				'.mjs',
				'.cjs',
				'.js',
				'.ts',
				'.jsx',
				'.tsx',
				'.json',
				'.vue'
			]
		},
		publicDir: transformNormalizePath(join, __dirname, './public'),
		server: {
			port: 8000
		},
		css: {
			postcss: {
				plugins: [
					autoprefixer({
						overrideBrowserslist: ['>1%', 'not dead'],
						grid: true
					}),
					pxToRem({
						rootValue: env.VITE_PX_TO_REM,
						// 需要转换的CSS属性,转换src下全部
						propList: ['@/**'],
						mediaQuery: false, // 禁止媒体查询转换px
						minPixelValue: 0.5 // 最小转换数值
					})
				]
			}
		},
		optimizeDeps: {
			// 强制进行预构建
			include: ['vue', 'vue-router']
		},
		build: {
			target: 'esnext',
			assetsInlineLimit: 4096, //小于此阈值 kb 的导入或引用资源将内联为 base64 编码
			reportCompressedSize: false // 禁用 gzip 压缩大小报告
		},
		preview: {
			port: 8040
		},
		plugins: [
			vue(),
			viteEslint(),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]'

				/**
				 * 自定义插入位置
				 * @default: body-last
				 */
				// inject?: 'body-last' | 'body-first'

				/**
				 * custom dom id
				 * @default: __svg__icons__dom__
				 */
				// customDomId: '__svg__icons__dom__',
			}),
			Components({
				resolvers: [VantResolver({})],
				dts: true
			})
		]
	}
	return mergeConfig(
		baseConfig,
		isProd ? prodConfig(props) : devConfig(props),
		false
	)
})
