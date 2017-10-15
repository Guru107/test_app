const libArray = [
	"workbox-sw.js",
	"workbox-background-sync.js",
	"workbox-broadcast-cache-update.js",
	"workbox-cache-expiration.js",
	"workbox-cacheable-response.js",
	"workbox-google-analytics.js"
]
importScripts(...libArray)

const workboxSW = new self.WorkboxSW({ debug: true })
workboxSW.precache([])
