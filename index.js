 // Dependencies
 const readline = require('readline');
const wordprocessor = require('./src/managers/commandprocessor');


// Start the interface
 const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
    terminal: false
  });

 
 // Instantiate the cli module object
 const cli = {};

 
 // Init script
 cli.init = function(){
    console.log('\x1b[34m%s\x1b[0m','The CLI is running');
   _interface.prompt();  // Create an initial prompt
 
   // Handle each line of input separately
   _interface.on('line', str=>{
     const args = str.split(" ").filter(e=>e!="");
     if( args.length > 0){
      args.length===1 ? (args[0]!="./dict" ? wordprocessor.processInput('','play',args[0]):wordprocessor.processInput(args[0],'',args[2])):wordprocessor.processInput(args[0],args[1],args[2]);
     }
     _interface.prompt();
   });
 
   // If the user stops the CLI, kill the associated process
   _interface.on('close', function(){
     process.exit(0);
   });
 
 };
 
 
 cli.init();