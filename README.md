# grunt-mandrill

> Send emails though mandrill as part of your build. Created to test our email template builds.

This is being hastily deployed for internal consumption. You probably shouldn't use this yet.

## Getting Started
This plugin requires Grunt

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mandrill --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mandrill');
```

## Use case

We have a build pipeline that compiles jade and sass into inline-styled HTML pages for email msgs.

The final step is to shoot out tests of each template to make sure nothing looks wonky.

## mandrill task
_Run this task with the `grunt mandrill` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### key
Type: `String`

Your [Mandrill API key](https://mandrillapp.com/api/docs/)

#### sender
Type: `String`

The 'from' name and address. Acceptable domains may be restricted by your mandrill account settings

#### recipient
Type: `String` or `Array`

One or more email addresses to send your msg to. Multiple addresses should be
entered as an array.


#### subject
Type: `String`

The subject of your email

#### body
Type: `String`

If no files are specified in `src:`, the mandrill task will send a plaintext email
using `body` for the msg content.



## Usage

`src:` is one or more files to be used as an email body. A new email will be sent for each file.

```javascript
module.exports = function(grunt){

  grunt.initConfig({
    mandrill: {
      mailer: {
        options: {
          key: 'your-mandrill-API-key',
          sender: 'noreply@testsauce.biz',
          recipient: 'email.you.want.to.send.to@email.com'.
          subject: 'This is a test email'
        },
        src: ['templates/*.html']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-mandrill');
  });
```
