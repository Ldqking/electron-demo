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
    //打开控制台
    win.webContents.openDevTools()
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
    // 1. 使用系统原生命令打开触摸键盘（osk.exe）
    const { exec } = require('child_process');
    exec('osk.exe', (error, stdout, stderr) => {
      if (error) {
        console.error('启动触摸键盘失败:', error);
        // 回退方案：提示用户手动操作
        reject(new Error('触摸键盘启动失败，请检查系统已安装手写输入组件'));
        return;
      }
      
      // 2. 重要提示：系统不会自动切换到手写模式
      resolve('触摸键盘已启动，请手动点击键盘左上角的笔图标切换到手写模式');
    });
  });
});

// 监听打开键盘的请求
// ipcMain.handle('open-keyboard', async () => {
//   return new Promise((resolve, reject) => {
//     // 1. 先尝试打开指定输入法
//     const { exec } = require('child_process');
    
//     const imePath = 'D:\\XYB\\XYBSky.exe';
    
//     exec(`"${imePath}"`, (imeError, stdout, stderr) => {
//       if (imeError) {
//         console.warn('启动指定输入法失败，回退到系统触摸键盘:', imeError);
        
//         // 2. 回退到系统触摸键盘 osk.exe
//         exec('osk.exe', (oskError, oskStdout, oskStderr) => {
//           if (oskError) {
//             console.error('启动触摸键盘失败:', oskError);
//             // 回退方案：提示用户手动操作
//             reject(new Error('触摸键盘启动失败，请检查系统已安装手写输入组件'));
//             return;
//           }
          
//           // 系统触摸键盘启动成功
//           resolve('触摸键盘已启动，请手动点击键盘左上角的笔图标切换到手写模式');
//         });
//         return;
//       }
      
//       // 指定输入法启动成功
//       resolve('指定输入法已启动，请切换到手写模式');
//     });
//   });
// });
// ipcMain.handle('open-keyboard', async () => {
//   // 将 'tabtip.exe' 替换为绝对路径
//   const tabtipPath = 'C:\\Program Files\\Common Files\\microsoft shared\\ink\\tabtip.exe';
//   return new Promise((resolve, reject) => {
//     // 首先设置默认键盘布局为手写模式
//     exec('reg add "HKCU\\SOFTWARE\\Microsoft\\TabletTip\\1.7" /v DefaultKeyboardLayout /t REG_DWORD /d 2 /f', (regError) => {
//       if (regError) {
//         console.warn('设置手写模式失败:', regError);
//       }
      
//       // 启动触摸键盘
//       exec(tabtipPath, (error, stdout, stderr) => {
//         if (error) {
//           console.warn('无法启动触摸键盘，回退到屏幕键盘:', error);
//           // 回退到传统屏幕键盘
//           exec('osk.exe', (oskError, oskStdout, oskStderr) => {
//             if (oskError) {
//               console.error('无法启动屏幕键盘:', oskError);
//               reject(oskError);
//               return;
//             }
//             resolve('屏幕键盘已启动');
//           });
//           return;
//         }
//         resolve('触摸键盘已启动（手写模式）');
//       });
//     });
//   });
// });