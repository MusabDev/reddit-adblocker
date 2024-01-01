async function isEnabled() {
	// Check if adblocker is enabled 
	const status = (await chrome.storage.local.get([STATUS_STORE_KEY]))[STATUS_STORE_KEY]
	return status === 'disabled' ? false : true // default is enabled
}

async function toggleStatus() {
	const isCurrentlyEnabled = await isEnabled()
	const newStatus = isCurrentlyEnabled ? 'disabled' : 'enabled'

	await chrome.storage.local.set({ [STATUS_STORE_KEY]: newStatus })
	return newStatus
}
