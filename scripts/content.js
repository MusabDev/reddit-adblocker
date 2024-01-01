async function initializeAdBlocker() {
	const enabled = await isEnabled()
	// Set enabled status to html using data attributes. So, we can use it in the css to hide or show the .promotedlink
	if (enabled) {
		document.body.removeAttribute('data-adblock-disabled')
	} else {
		document.body.setAttribute('data-adblock-disabled', true)
		return
	}

	// Remove ads when the document is loaded.
	document.onloadeddata = function() {
		removeAds()

		// Remove ads after 1 second again, because they populate ads after removing it.
		setTimeout(() => { removeAds() }, 1000)
	}

	window.addEventListener('scrollend', function() {
		removeAds()
	})
}

// Function to remove the ads
function removeAds() {
	const promotedLinks = document.querySelectorAll(AD_SELECTOR)
	promotedLinks.forEach(element => {
		element.remove()
	})

	saveTotalBlockedAds(promotedLinks.length)
}

// Function to store total ad blocked
async function saveTotalBlockedAds(adsBlocked = 0) {
	let totalBlockedAds = adsBlocked
	const storageData = (await chrome.storage.local.get([TOTAL_ADS_BLOCKED_KEY]))[TOTAL_ADS_BLOCKED_KEY]
	if (storageData) {
		totalBlockedAds += parseInt(storageData) === NaN ? 0 : parseInt(storageData)
	}

	await chrome.storage.local.set({ [TOTAL_ADS_BLOCKED_KEY]: totalBlockedAds })

	return totalBlockedAds
}

// Function calls
initializeAdBlocker()
