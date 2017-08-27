module.exports = isClient => {
	return {
		presets: [
			[
				"env",
				{
					targets: {
						browsers: ["> 5% in IN"],
						node: "8.4.0"
					},
					modules: false
				}
			]
		],
		plugins: [
			isClient ? "syntax-dynamic-import" : "dynamic-import-node",
			"universal-import",
			"transform-runtime",
			["transform-react-jsx", { pragma: "h" }],
			[
				"module-resolver",
				{
					root: ["./src"],
					alias: {
						react: "preact-compat",
						"react-dom": "preact-compat"
					}
				}
			]
		],
		env: {
			production: {
				plugins: ["transform-react-remove-prop-types"]
			}
		}
	}
}
