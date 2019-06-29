'use strict';

const { join } = require('path');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');
const { copy } = require('fs-extra');
const { prompt } = require('inquirer');

const templatePath = join(__dirname, 'template');

module.exports = function (projectName, dir, needMkdir) {
  return prompt([{
    name: 'name',
    type: 'input',
    message: 'package name:',
    default() {
      return projectName;
    }
  }, {
    name: 'version',
    type: 'input',
    message: 'version:',
    default() {
      return '1.0.0';
    }
  }, {
    name: 'description',
    type: 'input',
    message: 'description:',
    default() {
      return 'A nodejs project with Koa';
    }
  }]).then(({ name, version, description }) => {
    if (needMkdir) {
      mkdirSync(dir);
    }
    const ignore = new RegExp(`${templatePath}/node_modules|coverage`);
    return copy(templatePath, dir, {
      filter(src) {
        return !ignore.test(src);
      }
    }).then(() => {
      const pkg = JSON.parse(
        readFileSync(
          join(templatePath, 'package.json'), { encoding: 'utf8' }
        )
      );
      pkg.name = name;
      pkg.version = version;
      pkg.description = description;
      writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg, null, 2));
      return pkg;
    });
  });
};

// module.exports('hello', join(__dirname, 'hello'));
