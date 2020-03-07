// components/login/login.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: '_showChange'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: true,
    title: '授权登录',
    subTitle: '智汇软件工作室小程序',
    desc: '登录信息已过期需授权登录',
    tips: '点击“授权并登陆”按钮进行微信授权并登录智汇软件工作室小程序。',
    isLogining: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭
    close: function () {
      this.setData({
        show: false
      });
      var pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack();
      }
    },
    //登录
    login: function () {
      var _this = this;
      if (_this.data.isLogining == false) {
        _this.setData({
          isLogining: true
        });
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo;
            app.globalData.userInfo = userInfo;
            wx.login({
              success: res => {
                wx.request({
                  //url: 'API接口：通过code获取用户的openid或unionid并结合用户基本信息参数创建用户信息并返回token'
                  url: 'https://www.masoft.cn/api/wechat-ComponentLogin.json',
                  //method: 'POST',
                  method: 'GET',
                  data: {
                    code: res.code,
                    nickName: userInfo.nickName,
                    gender: userInfo.gender,
                    city: userInfo.city,
                    province: userInfo.province,
                    country: userInfo.country,
                    avatarUrl: userInfo.avatarUrl
                  },
                  success(res) {
                    if (res.data.state) {
                      app.globalData.token = res.data.token;
                      _this.setData({
                        show: false
                      });
                      _this.runEvent();
                    }
                    else {
                      wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        confirmColor: '#7A00FF'
                      });
                    }
                  }
                })
              }
            })
            _this.setData({
              isLogining: false
            });
          },
          fail: function () {
            _this.setData({
              isLogining: false
            });
            wx.showModal({
              title: '提示',
              content: '未授权',
              showCancel: false,
              confirmColor: '#7A00FF'
            });
          }
        })
      }
    },
    //绑定方法
    runEvent: function (e) {
      this.triggerEvent('runEvent', e);
    }
  }
})
