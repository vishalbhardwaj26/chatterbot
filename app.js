var restify = require('restify');
var builder = require('botbuilder');
var builder_cognitiveservices = require("botbuilder-cognitiveservices");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '1d492eaa-c078-4193-b9ba-10ee9f6ea746',
    appPassword: 'Rpm0b9ixbcSos0s53fD7kEZ'
});

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector);
// , function (session) {
//     session.send("Vishal said: %s", session.message.text);
// });

// Listen for messages from users 
server.post('/api/messages', connector.listen());


//qnamaker
var recognizer = new builder_cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: 'c4ce13e1-da8c-4274-9256-69d576a4e13d', 
	subscriptionKey: 'aeb10de84b154c1895080e099add9149'});
	
var basicQnAMakerDialog = new builder_cognitiveservices.QnAMakerDialog({
	recognizers: [recognizer],
	defaultMessage: 'No match! Try changing the query terms!',
	qnaThreshold: 0.35
});

bot.dialog('/', basicQnAMakerDialog);

server.get('/', restify.plugins.serveStatic({  
 directory: __dirname,  
 default: '/index.html'  
}));  
  
  

