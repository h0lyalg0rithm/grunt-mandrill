'use strict';

module.exports = function(grunt) {
  //Default config
  grunt.initConfig({
    mandrill: {
      mailer: {
        options: {
          key: '', // Enter your Mailgun API key here
          sender: 'surajshirvankar@gmail.com', // Change this
          recipient: 'surajshirvankar@gmail.com', // Change this
          subject: 'This is a test email'//,
          // body: 'More data' Use if you want to send text
        },
        src: []//Location of file to use as html template
      }
    }
  })
  //
  grunt.loadTasks('tasks');
};