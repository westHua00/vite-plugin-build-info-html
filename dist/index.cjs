"use strict";var t=require("fs");exports.buildInfo=async function(e={}){const{execaCommandSync:i}=await Promise.resolve().then((function(){return require("./index-dfcffb53.js")})),{extra:n=[]}=e,{env:o}=process,r={projectName:e.projectName||o.npm_package_name,version:`v${o.npm_package_version}`,buildBranch:i("git rev-parse --abbrev-ref HEAD").stdout,buildTime:(new Date).toLocaleString(),buildUser:i("git config --get user.name").stdout||o.USERNAME,buildUserEmail:i("git config --get user.email").stdout,lastCommitAuthor:i('git log -1 --pretty=format:"%an"').stdout,lastCommitAuthorEmail:i('git log -1 --pretty=format:"%ae"').stdout,lastCommitter:i('git log -1 --pretty=format:"%cn"').stdout,lastCommitterEmail:i('git log -1 --pretty=format:"%ce"').stdout,lastCommitTime:i('git log -1 --pretty=format:"%ci"').stdout,lastCommitHash:i('git log -1 --pretty=format:"%H"').stdout};n.forEach((({label:t,envKey:e,val:n,gitOrder:a})=>{n?r[t]=n:e?r[t]=o?.[e]:a&&(r[t]=i(a).stdout)}));const a=`<!DOCTYPE html>\n    <html lang="zh-CN">\n        <head>\n            <meta charset="UTF-8" />\n            <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />\n            <title>build-info</title>\n        </head>\n        <body style="display:flex;justify-content: center; align-items:center; width: 90vw;height:90vh;">\n            <noscript>\n                <strong>\n                    We're sorry but html doesn't work properly without\n                    JavaScript enabled. Please enable it to continue.\n                </strong>\n            </noscript>\n            <div>${Object.entries(r).map((([t,e])=>`<div style="display:flex;">\n                    <div style="min-width:300px;">${t}: </div>\n                    <div style="font-weight;600; max-width:500px">${e.replace(/^"|"$/g,"")}</div>\n                </div>\n                <br/> `)).join("")}</div>\n        </body>\n    </html>\n    `;let l="";return{name:"vite-plugin-build-info",apply:"build",configResolved(t){l=`${t.root}/${t.build.outDir}/info.html`},closeBundle(){t.writeFile(l,a,(t=>{}))}}};