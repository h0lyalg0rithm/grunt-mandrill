var mandrill = require('mandrill-api'),
    _        = require('lodash');



module.exports = function(grunt){
  grunt.registerMultiTask('mandrill','Send email using mandrill', function(){
    var done = this.async();
    var options = _.pick(this.data.options,['sender', 'recipient', 'subject', 'body','async']);
    // Setup node-mandrill with the api
    mandrill = new mandrill.Mandrill(this.data.options.key);
    var to = [];
    if(typeof options.recipient === "string"){
      to = [options.recipient];
    }else{
      to = options.recipient;
    }
    options.async = typeof options.async !== 'undefined' ? options.async: true;
    var ip_pool = "Main Pool";

    // If file is present
    if(this.filesSrc.length > 0){
      _.each(this.filesSrc,function(path){
          options.body = grunt.file.read(path);
          send_to_many(grunt,mandrill,to,options);
      });
    }else{
      send_to_many(grunt,mandrill,to,options);
    }
  });
}

function send_to_many(grunt,client,recipients,options){
  _.each(recipients, function(recipient){
    send_email(grunt,client,recipient,options);
  });
}
function send_email(grunt,client,recipient,options){
  var message = {
    "html": options.body,
    "subject": options.subject,
    "from_email": options.sender,
    "to": [{
            "email": recipient,
            "type": "to"
        }],
    "headers": {
      "Reply-To": options.sender
    }
  };
  client.messages.send({"message": message, "async": options.async}, function(result) {
      grunt.log.writeln('Sent email msg to ' + result[0].email);
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      grunt.log.writeln('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
}