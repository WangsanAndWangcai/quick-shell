import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { QuickShellConfig, ShellCommand } from './types';

export class ConfigLoader {
    private static instance: ConfigLoader;
    private config: QuickShellConfig | null = null;
    private configFilePath: string | null = null;

    private constructor() {}

    public static getInstance(): ConfigLoader {
        if (!ConfigLoader.instance) {
            ConfigLoader.instance = new ConfigLoader();
        }
        return ConfigLoader.instance;
    }

    public loadConfig(): QuickShellConfig {
        const configPath = this.getConfigFilePath();
        
        if (!configPath) {
            throw new Error('No workspace folder found');
        }

        if (!fs.existsSync(configPath)) {
            throw new Error(`Config file not found: ${configPath}`);
        }

        try {
            const configContent = fs.readFileSync(configPath, 'utf8');
            this.config = yaml.load(configContent) as QuickShellConfig;
            this.configFilePath = configPath;
            
            if (!this.config.commands || !Array.isArray(this.config.commands)) {
                throw new Error('Invalid config format: commands array is required');
            }

            return this.config;
        } catch (error) {
            throw new Error(`Failed to load config from ${configPath}: ${error}`);
        }
    }

    public reloadConfig(): QuickShellConfig {
        this.config = null;
        this.configFilePath = null;
        return this.loadConfig();
    }

    public getConfig(): QuickShellConfig | null {
        return this.config;
    }

    public getConfigFilePath(): string | null {
        if (this.configFilePath) {
            return this.configFilePath;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            return null;
        }

        const configFileName = vscode.workspace.getConfiguration('quickShell').get<string>('configPath') || 'quick-shell.yaml';
        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        
        return path.join(workspaceRoot, configFileName);
    }

    public getWorkingDirectory(): string | null {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            return null;
        }

        const customWorkingDir = vscode.workspace.getConfiguration('quickShell').get<string>('workingDirectory');
        if (customWorkingDir && customWorkingDir.trim() !== '') {
            return path.resolve(workspaceFolders[0].uri.fsPath, customWorkingDir);
        }

        return workspaceFolders[0].uri.fsPath;
    }
}