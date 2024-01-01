
async function updateTotalBlockedAds() {
	const storageData = (await chrome.storage.local.get([TOTAL_ADS_BLOCKED_KEY]))[TOTAL_ADS_BLOCKED_KEY]
	if (!storageData) return elements.totalBlockedAds.textContent = 0

	const totalBlockedAds = parseInt(storageData) === NaN ? 0 : parseInt(storageData)
	return elements.totalBlockedAds.textContent = new Intl.NumberFormat().format(
		totalBlockedAds,
	)
}

async function updateStatusText() {
	const enabled = await isEnabled()

	// Update status text
	elements.statusText.textContent = enabled ? 'enabled' : 'disabled'
	elements.statusText.setAttribute('class', enabled ? 'text-green' : 'text-red')

	// Update button text
	elements.toggleButton.innerText = !enabled ? 'Enable AdBlocker' : 'Disable AdBlocker'
}

// Toggle enable status
elements.toggleButton.addEventListener('click', async function() {
	const newStatus = await toggleStatus()
	this.innerText = newStatus == 'disabled' ? 'Enable AdBlocker' : 'Disable AdBlocker'

	updateStatusText()
	chrome.tabs.reload()
})


// Toggle theme
elements.toggleTheme.addEventListener('click', function() {
	toggleTheme()
})

applyCurrentTheme()
updateTotalBlockedAds()
updateStatusText()
