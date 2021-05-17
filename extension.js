// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jupyterserver" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jupyterserver.connection', function () {
		// The code you place here will be executed every time your command is executed
		let todo = {
			"username": process.env.CHE_WORKSPACE_NAMESPACE,
			"password": "ibm"
		  };
		  const fs = require('fs')
		  const fetch = require('node-fetch');
		  fetch('http://169.60.204.172/hub/api/authorizations/token', {
			method: 'POST',
			body: JSON.stringify(todo),
		  }).then(res => res.json())
		  .then(json => {const a = `{"python.dataScience.jupyterServerURI": "http://169.60.204.172/user/${process.env.CHE_WORKSPACE_NAMESPACE}/?token=${json["token"]}"}`
		  fs.writeFile('/home/theia/.theia/settings.json', a, err => {
			if (err) {
			  console.error(err)
			  return
			}
			//console.log(x)
			//console.log(process.env.CHE_WORKSPACE_NAMESPACE)
			const { exec} = require('child_process');
			const a = `curl -X POST -H "Authorization: token ${json["token"]}" "http://169.60.204.172/hub/api/users/${process.env.CHE_WORKSPACE_NAMESPACE}/server"`
			console.log(a);
			exec(`${a}`, (error, stdout, stderr) => {
			  if (error) {
				  console.log(`error: ${error.message}`);
				  return;
			  }
			  if (stderr) {
				  console.log(`stderr: ${stderr}`);
				  return;
			  }
			  console.log(`stdout: ${stdout}`);
		  });
		  })
		  })
		  
		// Display a message box to the user
		vscode.window.showInformationMessage('jupyterServer connection done!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
