const { app, BrowserWindow, session, desktopCapturer } = require('electron');
const path = require('path');

// Loads the live hosted Studio so it stays up to date.
// To bundle an OFFLINE copy instead: copy the site's /studio folder into ./app
// and replace win.loadURL(...) with win.loadFile(path.join(__dirname,'app','index.html')).
const STUDIO_URL = process.env.NB_STUDIO_URL || 'https://numberbender.com/studio/';

function createWindow () {
  const win = new BrowserWindow({
    width: 1280, height: 800, backgroundColor: '#0b0f14',
    title: 'Numberbender Studio',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true }
  });

  // Allow camera + microphone permission prompts.
  session.defaultSession.setPermissionRequestHandler((_wc, _perm, cb) => cb(true));

  // Enable screen / window capture (getDisplayMedia) inside Electron.
  // useSystemPicker uses the native OS picker where available (macOS 15+/Windows);
  // otherwise it falls back to granting the first screen source.
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen', 'window'] }).then((sources) => {
      callback({ video: sources[0], audio: 'loopback' });
    });
  }, { useSystemPicker: true });

  win.loadURL(STUDIO_URL);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
