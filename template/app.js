'use strict';

const { output } = require('clrsole');
const koay = require('./server');

// 打印已配置的中间件
output.green('=============== configurable middleware ===============\n');
koay.middleware.filter(n => n.__name__).forEach(n => output.green(`\t${n.__name__}`));
output.green('\n======================================================');

// 服务启动后触发
koay.on('listening', () => {
  output.green(`The server is running at port ${koay.options.port}`);
});

koay.listen();
