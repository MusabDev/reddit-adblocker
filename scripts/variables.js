const AD_SELECTOR = '.promotedlink'
const TOTAL_ADS_BLOCKED_KEY = 'total-ads-blocked'
const THEME_STORE_KEY = 'current-theme'
const STATUS_STORE_KEY = 'enabled-status'

const elements = {
	html: document.querySelector('html'),
	totalBlockedAds: document.querySelector('#lifetime-adblocked'),
	statusText: document.querySelector('#status-text'),
	toggleButton: document.querySelector('#toggle-button'),
	toggleTheme: document.querySelector('#toggle-theme')
}
