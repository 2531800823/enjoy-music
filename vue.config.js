module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.xlpai.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        open: true
    },
}