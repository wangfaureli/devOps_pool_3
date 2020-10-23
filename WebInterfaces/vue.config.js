const webpack = require('webpack');
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({maxChunks: 6}),
            new webpack.ProvidePlugin({jQuery: 'jquery'})
        ],
    },
    devServer: {
        proxy: {
            "/api" : {
                target : " http://localhost:4000",
                ws : true,
                changeOrigin : true
            }
        },
        disableHostCheck : true
    },
};