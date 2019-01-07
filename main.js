"use strict";
var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

app.on('ready', function () {
  var Screen = electron.screen;
  var size = Screen.getPrimaryDisplay().size; // ディスプレイのサイズを取得する
  var mainWindow = new BrowserWindow({
    left: 0,
    top: 0,
    width: size.width,   // 最大サイズで表示する
    height: size.height, // 最大サイズで表示する
    frame: false,      // ウィンドウフレームを非表示に
    show: true,
    transparent: true, // 背景を透明に
    resizable: false
  });
  // 透明な部分のマウスのクリックを検知させない
  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.maximize();
  mainWindow.setAlwaysOnTop(true);
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
