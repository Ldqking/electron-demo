const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const http = require('http')

async function createWindow() {
  const win = await new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // 去掉默认的顶部栏和边框
    // maximized: true,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icon.ico')
  })

  // win.maximize(); // 以在创建时最大化窗口

  // 自动检测 Vite 服务
  http.get('http://localhost:5173', res => {
    win.loadURL('http://localhost:5173')
    // win.webContents.openDevTools()
  }).on('error', () => {
    win.loadFile(path.join(__dirname, 'renderer/dist/index.html'))
    // win.webContents.openDevTools()
  })

  // 暴露窗口控制方法给渲染进程
  win?.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      window.electron = {
        minimize: () => { require('electron').ipcRenderer.send('minimize') },
        maximize: () => { require('electron').ipcRenderer.send('maximize') },
        close: () => { require('electron').ipcRenderer.send('close') }
      }
    `);
  });

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