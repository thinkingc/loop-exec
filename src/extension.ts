// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "autorunjs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
  let timer: NodeJS.Timeout | null = null;
	let disposable = vscode.commands.registerCommand('autorunjs.startRunJs', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Start Run JS  🚀');

    const exec = require("child_process").exec;
    const currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.fileName;
    // console.log('currentlyOpenTabfilePath', currentlyOpenTabfilePath);

    if(timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      exec(`node ${currentlyOpenTabfilePath}`, (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`path: ${currentlyOpenTabfilePath} \n${stdout}`);
      });
    }, 3000);
	});

  let posable = vscode.commands.registerCommand('autorunjs.stopRunJs', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('stop run js');

    if(timer) {
      clearInterval(timer);
    }
	});

	context.subscriptions.push(disposable);
  context.subscriptions.push(posable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
