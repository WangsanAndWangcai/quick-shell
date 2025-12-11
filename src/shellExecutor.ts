import * as vscode from 'vscode';

export class ShellExecutor {
    public execute(command: string, workingDirectory?: string): void {
        const terminalName = 'quick-shell';
        
        // Try to find existing terminal
        let terminal = vscode.window.terminals.find(t => t.name === terminalName);
        
        if (terminal) {
            // Dispose existing terminal to create a fresh one
            terminal.dispose();
        }
        
        // Create new terminal
        terminal = vscode.window.createTerminal({
            name: terminalName,
            cwd: workingDirectory
        });
        
        // Show the terminal
        terminal.show();
        
        // Execute the command
        terminal.sendText(command);
    }
}