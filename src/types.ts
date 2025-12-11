import * as vscode from 'vscode';

export interface ShellCommand {
    label: string;
    command: string;
    description?: string;
    path?: string;
}

export interface QuickShellConfig {
    commands: ShellCommand[];
}

export interface QuickShellQuickPickItem extends vscode.QuickPickItem {
    data: ShellCommand;
}