# Quick Shell

![Quick Shell Logo](HugeiconsBash.svg)

一个强大的 VS Code 扩展，让你能够快速执行预定义的 Shell 命令，支持自定义工作目录和配置文件管理。

## 🚀 功能特性

- **快速命令执行**：通过快捷键或命令面板快速执行预定义的 Shell 命令
- **自定义工作目录**：每个命令可以指定独立的工作目录，执行前自动切换
- **灵活配置文件**：支持选择不同的 YAML 配置文件，项目间轻松切换
- **智能终端管理**：自动创建和管理终端，避免命令混乱
- **简洁配置**：使用简单的 YAML 格式定义命令，易于维护

## 📦 安装

1. 打开 VS Code 扩展面板 (`Ctrl+Shift+X`)
2. 搜索 "Quick Shell"
3. 点击安装

## 🛠️ 使用方法

### 基本配置

在工作区根目录创建 `quick-shell.yaml` 文件：

```yaml
commands:
  - label: "运行测试"
    command: "npm test"
    path: "./"
    
  - label: "构建项目"
    command: "npm run build"
    path: "./"
    
  - label: "启动服务"
    command: "python app.py"
    path: "./server"
```

### 执行命令

1. 使用快捷键 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Quick Shell" 或使用默认快捷键
3. 从列表中选择要执行的命令

### 自定义配置文件

1. 使用命令面板搜索 "Quick Shell: Select Config File"
2. 选择你的自定义配置文件
3. 配置会自动保存到工作区设置

## ⚙️ 扩展设置

此扩展提供以下设置选项：

- `quickShell.configPath`: 配置文件路径（相对于工作区根目录，默认：quick-shell.yaml）
- `quickShell.workingDirectory`: 默认工作目录（相对于工作区根目录）

## 📝 配置文件格式

```yaml
commands:
  - label: "命令名称"        # 必需：显示在命令列表中的名称
    command: "要执行的命令"   # 必需：实际的 Shell 命令
    path: "工作目录"         # 可选：命令执行的工作目录
    description: "描述信息"   # 可选：命令的描述信息
```

## 🎯 典型使用场景

- **前端开发**：快速运行 npm scripts、构建、测试命令
- **后端开发**：启动服务、运行数据库迁移、执行测试
- **DevOps**：部署脚本、环境检查、日志查看
- **自动化测试**：运行不同类型的测试套件
- **多环境管理**：为不同环境（开发、测试、生产）配置不同命令

## 🔄 版本历史

### 0.0.1
- 初始版本发布
- 支持基本命令执行
- 支持自定义工作目录
- 支持配置文件选择

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个扩展！

## 📄 许可证

MIT License

---

**享受高效的命令行体验！** 🎉



---

> 本插件全部由 AI 生成🤖

