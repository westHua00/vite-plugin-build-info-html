<!--
 * @FileDescription: 
 * @Author: weipeng11132@navinfo.com
 * @Date: 2023-07-26 14:02:50
 * @LastEditors: weipeng11132@navinfo.com
 * @LastEditTime: 2023-07-27 15:11:43
 * @FilePath: \vite-plugin-build-info-html\README.md
-->
# 快速开始

``` js
// vite.config.js
import { buildInfo } from 'vite-plugin-build-info-html';
   plugins: [
            buildInfo({
            // 非必传
            projectName,
            // 额外属性
            extra:[
                {
                    // label必传 以下三项传一项即可 优先级 为 val envKey gitOrder
                    label:'',
                    // 读取process.env的key
                    envKey:'', 
                    // 手动设值
                    val:'',
                    // git命令
                    gitOrder:''
                }
            ]
        })]

```
