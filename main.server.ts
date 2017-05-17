import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import { AppServerModuleNgFactory } from './src/app.server.module.ngfactory'
import * as fs from 'fs';
import * as path from 'path';

/* workaround */
import { MdSidenav } from '@angular/material';
MdSidenav.prototype.ngAfterContentInit = function () {}
/* /workaround */

enableProdMode();
const args = process.argv.slice(2);
if (args.length != 3) {
    process.stdout.write("Usage: node dist/main.js <document> <distDir> <url>\n");
    process.exit();
}
const indexFileContent = fs.readFileSync(args[0], 'utf8');
renderModuleFactory(AppServerModuleNgFactory, {
    document: indexFileContent,
    url: args[2]
}).then(string => {
    let destUrl = args[2];
    if (destUrl == '/')
        destUrl = 'index.html'
    const targetDir = args[1] + '/' + destUrl;
    targetDir.split('/').forEach((dir, index, splits) => {
        if (index !== splits.length - 1) {
            const parent = splits.slice(0, index).join('/');
            const dirPath = path.resolve(parent, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
        }
    });
    fs.writeFileSync(targetDir, string);
    console.log(targetDir);
});
