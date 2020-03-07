const app = getApp()

Page({
  data: {
    showLogin: false
  },
  onLoad: function() {

  },
  tryLogin: function() {
    var _this = this;
    _this.setData({
      showLogin: true
    });
  },
  doSomething:function(){
    wx.showToast({
      title: '登录成功后运行的方法',
      icon: 'none',
      duration: 2000
    });
  }
})