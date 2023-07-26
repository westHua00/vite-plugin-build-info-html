<!--
 * @FileDescription: 
 * @Author: weipeng11132@navinfo.com
 * @Date: 2023-07-26 14:02:50
 * @LastEditors: weipeng11132@navinfo.com
 * @LastEditTime: 2023-07-26 14:12:36
 * @FilePath: \vite-plugin-build-info\README.md
-->
# 快速开始

``` js
// vite.config.js
import { buildInfo } from './build-info.js';
   plugins: [
            buildInfo({
            projectName,
            // 额外属性
            extra:[
                {
                    // label必传 以下三项传一项即可
                    label:'',
                    // 读取process.env的key
                    envKey:'', 
                    // 手动设值 优先级最高
                    val:'',
                    // git命令
                    gitOrder:''
                }
            ]
        })]

```
