importScripts("./sw-toolbox.js")

global.toolbox.router.get("/(.*)", global.toolbox.fastest, {
	cache: {
		name: "temp_cache",
		maxEntries: 20,
		maxAgeSeconds: 86400
	}
})

global.addEventListener("install", function(event) {
	return event.waitUntil(
		new Promise(function(resolve, reject) {
			if (serviceWorkerOption.assets) {
				return resolve(
					global.toolbox.precache(serviceWorkerOption.assets)
				)
			} else {
				return reject("No Assets")
			}
		}).then(function() {
			return global.skipWaiting()
		})
	)
})
