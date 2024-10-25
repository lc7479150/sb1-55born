const robot = require('robotjs');
const { ipcMain } = require('electron');

// 处理鼠标事件同步
function setupMouseSync() {
  ipcMain.on('mouse-move', (event, { x, y }) => {
    robot.moveMouse(x, y);
  });

  ipcMain.on('mouse-click', (event, { button, double }) => {
    if (double) {
      robot.mouseClick(button, true);
    } else {
      robot.mouseClick(button);
    }
  });
}

// 处理键盘事件同步
function setupKeyboardSync() {
  ipcMain.on('key-press', (event, { key, modifier }) => {
    if (modifier) {
      robot.keyToggle(key, 'down', [modifier]);
    } else {
      robot.keyTap(key);
    }
  });
}

module.exports = {
  setupMouseSync,
  setupKeyboardSync
};