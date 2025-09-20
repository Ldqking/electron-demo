const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const http = require('http')

async function createWindow() {
  const win = await new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.ico')
  })

  // 自动检测 Vite 服务
  http.get('http://localhost:5173', res => {
    win.loadURL('http://localhost:5173')
  }).on('error', () => {
    win.loadFile(path.join(__dirname, 'renderer/dist/index.html'))
  })

  return win;
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 处理来自渲染进程的窗口控制请求
ipcMain.on('minimize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.on('maximize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on('close', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

const { exec, spawn } = require('child_process');

// 监听打开键盘的请求
ipcMain.handle('open-keyboard', async () => {
  return new Promise((resolve, reject) => {
    // 首先设置默认键盘布局为手写模式
    exec('reg add "HKCU\\SOFTWARE\\Microsoft\\TabletTip\\1.7" /v DefaultKeyboardLayout /t REG_DWORD /d 2 /f', (regError) => {
      if (regError) {
        console.warn('设置手写模式失败:', regError);
      }
      
      // 启动触摸键盘
      exec('tabtip.exe', (error, stdout, stderr) => {
        if (error) {
          console.warn('无法启动触摸键盘，回退到屏幕键盘:', error);
          // 回退到传统屏幕键盘
          exec('osk.exe', (oskError, oskStdout, oskStderr) => {
            if (oskError) {
              console.error('无法启动屏幕键盘:', oskError);
              reject(oskError);
              return;
            }
            resolve('屏幕键盘已启动');
          });
          return;
        }
        resolve('触摸键盘已启动（手写模式）');
      });
    });
  });
});