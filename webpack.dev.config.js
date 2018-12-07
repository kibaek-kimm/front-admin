var path = require("path")
var webpack = require("webpack")

module.exports = {
    entry: {
        main: ["./src/main.js"]
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist")
    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        // 웹팩의 상태값에 색상을 부여한다.
        stats: {
            colors: true
        },
        // hot 프로퍼티를 true로 설정!
        hot: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    // Hot 모듈과 HTML웹팩 플러그인을 추가한다.
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}