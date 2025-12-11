import * as vscode from 'vscode';
import { ConfigLoader } from './configLoader';
import { ShellCommand, QuickShellQuickPickItem } from './types';
import { ShellExecutor } from './shellExecutor';

export class QuickShellProvider {
    private configLoader: ConfigLoader;
    private shellExecutor: ShellExecutor;

    constructor() {
        this.configLoader = ConfigLoader.getInstance();
        this.shellExecutor = new ShellExecutor();
    }

    public showQuickShell(): void {
        try {
            const config = this.configLoader.loadConfig();
            const quickPickItems = this.createQuickPickItems(config.commands);
            
            const quickPick = vscode.window.createQuickPick<QuickShellQuickPickItem>();
            quickPick.placeholder = 'Select a shell command to execute';
            quickPick.items = quickPickItems;
            
            quickPick.onDidAccept(() => {
                const selectedItem = quickPick.selectedItems[0];
                if (selectedItem) {
                    this.executeCommand(selectedItem.data);
                }
                quickPick.hide();
            });

            quickPick.onDidHide(() => {
                quickPick.dispose();
            });

            quickPick.show();
        } catch (error) {
            vscode.window.showErrorMessage(`Quick Shell Error: ${error}`);
        }
    }

    private createQuickPickItems(commands: ShellCommand[]): QuickShellQuickPickItem[] {
        return commands.map(command => ({
            label: command.label,
            description: command.description || command.command,
            data: command
        }));
    }

    private executeCommand(command: ShellCommand): void {
        try {
            let workingDirectory = this.configLoader.getWorkingDirectory();
            
            if (command.path) {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (workspaceFolders && workspaceFolders.length > 0) {
                    workingDirectory = require('path').resolve(workspaceFolders[0].uri.fsPath, command.path);
                }
            }
            
            this.shellExecutor.execute(command.command, workingDirectory);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to execute command "${command.label}": ${error}`);
        }
    }
}