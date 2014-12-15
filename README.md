## Introduction

Twenty is a blog system based on [zerojs](http://github.com/sskyy/zero). While some features were inspired by Ghost, there are also many beyond Ghost like:

 - Module system. Inherit form zero, easy to extend.
 - Angular based admin panel and standard RESTful api. No pain to customize.
 - Multiple page engine supported. Jade or Ejs, you can even use both at same time.

 
## Quick start

First, you need to use zero to install twenty.


```
npm install zero -g
zero new blog
cd blog
zero install twenty

...waiting for twenty install...

cp modules/twenty/config.sample.js modules/twenty/config.js

node app
```

Visit `http://127.0.0.1/twenty/install` to register as admin.

After registration, navigate to `http://127.0.0.1/twenty/admin` and login, then you can write your story.


## Next

A complete develop guide will be released soon.
