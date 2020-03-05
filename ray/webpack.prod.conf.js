new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        drop_debugger: true,  //去掉debugger
        drop_console: true,  // 去掉console
        pure_funcs: ['console.log']// 移除console
      }
    },
    sourceMap: config.build.productionSourceMap,
    parallel: true
  })