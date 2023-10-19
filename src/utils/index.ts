/* eslint-disable no-unused-vars */
// 深拷贝
export function deepClone(target: any): any {
	let result
	if (typeof target === 'object') {
		if (Array.isArray(target)) {
			result = []
			for (const i in target) {
				result.push(deepClone(target[i]))
			}
		} else if (target === null) {
			result = null
		} else if (target.constructor === RegExp) {
			result = target
		} else {
			result = {}
			for (const i in target) {
				;(result[i] as unknown) = deepClone(target[i])
			}
		}
	} else {
		result = target
	}
	return result
}

// 获取地址栏参数
export const getUrlData = (url: string): { [key: string]: string } => {
	if (url.slice(url.length - 2, url.length) === '#/')
		url = url.slice(0, url.length - 2)
	const o = {}
	const params = url.split('?')[1]
	if (!params) return {}
	params.split('&').map((item) => {
		const r = item.split('=')
		o[item.split('=')[0]] = r[1]
	})
	return o
}

// 将字符串复制到剪贴板
/*
  example: 
  copyToClipboard('Lorem ipsum'); 
    'Lorem ipsum' copied to clipboard
*/
export const copyToClipboard = (str: string): void => {
	const el = document.createElement('textarea')
	el.value = str
	el.setAttribute('readonly', '')
	el.style.position = 'absolute'
	el.style.left = '-9999px'
	document.body.appendChild(el)
	const selected =
		(document.getSelection()?.rangeCount as number) > 0
			? document.getSelection()?.getRangeAt(0)
			: false
	el.select()
	document.execCommand('copy')
	document.body.removeChild(el)
	if (selected) {
		document.getSelection()?.removeAllRanges()
		document.getSelection()?.addRange(selected)
	}
}

export const decodeContent = (t) => (t ? JSON.parse(decodeURIComponent(t)) : '')

export const encodeContent = (t) =>
	t ? encodeURIComponent(JSON.stringify(t)) : ''
