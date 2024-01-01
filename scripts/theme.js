async function getCurrentTheme() {
	const currentTheme = (await chrome.storage.local.get([THEME_STORE_KEY]))[THEME_STORE_KEY]
	return currentTheme === 'dark' ? 'dark' : 'light'
}

async function applyCurrentTheme() {
	const theme = await getCurrentTheme()
	elements.html.setAttribute('class', theme)

	if (theme === 'dark') {
		elements.toggleTheme.setAttribute('checked', true)
	}
}

async function toggleTheme() {
	const currentTheme = await getCurrentTheme()
	const theme = currentTheme === 'dark' ? 'light' : 'dark'

	await chrome.storage.local.set({ [THEME_STORE_KEY]: theme })
	elements.html.setAttribute('class', theme)
}
