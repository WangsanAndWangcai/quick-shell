import * as vscode from 'vscode';
import { QuickShellProvider } from './quickShellProvider';
import { ConfigLoader } from './configLoader';

export function activate(context: vscode.ExtensionContext) {
    const quickShellProvider = new QuickShellProvider();
    const configLoader = ConfigLoader.getInstance();
    
    const executeCommand = vscode.commands.registerCommand(
        'quick-shell.execute',
        () => quickShellProvider.showQuickShell()
    );
    
    const selectConfigCommand = vscode.commands.registerCommand(
        'quick-shell.selectConfig',
        () => selectConfigFile(configLoader)
    );
    
    context.subscriptions.push(executeCommand, selectConfigCommand);
}

async function selectConfigFile(configLoader: ConfigLoader): Promise<void> {
    try {
        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Select Config File',
            filters: {
                'YAML Files': ['yaml', 'yml'],
                'All Files': ['*']
            }
        };
        
        const fileUri = await vscode.window.showOpenDialog(options);
        
        if (fileUri && fileUri[0]) {
            const configPath = fileUri[0].fsPath;
            const workspaceFolders = vscode.workspace.workspaceFolders;
            
            if (workspaceFolders && workspaceFolders.length > 0) {
                const workspaceRoot = workspaceFolders[0].uri.fsPath;
                const relativePath = require('path').relative(workspaceRoot, configPath);
                
                await vscode.workspace.getConfiguration('quickShell').update('configPath', relativePath, vscode.ConfigurationTarget.Workspace);
                
                vscode.window.showInformationMessage(`Config file updated to: ${relativePath}`);
                
                configLoader.reloadConfig();
            } else {
                vscode.window.showErrorMessage('No workspace folder found');
            }
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to select config file: ${error}`);
    }
}

export function deactivate() {}