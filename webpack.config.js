//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {//注意这里是exports不是export
    devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map
    entry:{
        devServer:'webpack/hot/dev-server',
        entryOne:__dirname + '/app/main.js',//入口1
        entryTwo: __dirname + '/app/admSet.js',//入口2
        vendors:['react','react-router']//抽成公用的可以减少重复打包，当你是多个入库页面时就能体会到其作用
    },
    output: {//输出目录
        path: __dirname + "/build",//打包后的js文件存放的地方
        filename: "[name].bundle.js"//打包后的js文件名
    },
    module: {
        //loaders加载器
        loaders: [
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader'//loader的名称（必须）
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//热模块替换插件
        new HtmlWebpackPlugin({
            filename:'./build/indexOne.html',//生成的html存放路径，相对于 path
            template:'./build/index.html', //html模板路径
            chunks:['vendors','entryOne'],//区分你想要加载的js，名字要跟entry入口定义的保存一直
            inject:true, //允许插件修改哪些内容，包括head与body
            hash:true,//为静态资源生成hash值，可以实现缓存
            minify:{
                removeComments:true,//移除HTML中的注释
                collapseWhitespace:true //删除空白符与换行符
            }
        }),
        //压缩入口2的html
        new HtmlWebpackPlugin({
            filename:'./build/indexTwo.html',//生成的html存放路径，相对于 path
            template:'./build/index.html', //html模板路径
            chunks:['vendors','entryTwo'],//区分你想要加载的js，名字要跟entry入口定义的保存一直
            inject:true, //允许插件修改哪些内容，包括head与body
            hash:true,//为静态资源生成hash值，可以实现缓存
            minify:{
                removeComments:true,//移除HTML中的注释
                collapseWhitespace:true //删除空白符与换行符
            }
        })
    ],
    //webpack-dev-server配置
    devServer: {
        contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        port: 8080//设置默认监听端口，如果省略，默认为"8080"
    }
};
