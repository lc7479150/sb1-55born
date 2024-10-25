const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { setupMouseSync, setupKeyboardSync } = require('./sync');
const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  setupMouseSync();
  setupKeyboardSync();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// 处理指纹浏览器实例的创建
ipcMain.on('create-browser-instance', async (event, profileData) => {
  // 创建新的浏览器实例
  const browserWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 存储配置
  store.set(`profile-${Date.now()}`, profileData);
  
  // 加载浏览器实例
  browserWindow.loadFile('browser.html');
});