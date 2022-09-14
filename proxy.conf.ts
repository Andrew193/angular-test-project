const proxy = [
  {
    "context": [
      "/items",
      "/images"
    ],
    "target": "http://localhost:3000"
  },
  {
    "context": ["/api"],
    "target": "https://checklist.vm.flex-solution.com",
    "changeOrigin": true,
    "logLevel": "debug"
  }
]

module.exports = proxy;
