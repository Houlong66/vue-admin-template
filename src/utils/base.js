let objClone = (obj) => {
  let newObj = JSON.stringify(obj)
  newObj = JSON.parse(newObj)
  return newObj
}

let native = () => {
  var u = navigator.userAgent
  var ua = navigator.userAgent.toLocaleLowerCase()
  // var app = navigator.appVersion
  var result = {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
    android: u.indexOf('Android') > -1, // 安卓终端
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iphone或QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否为iPad
    webApp: u.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部
    QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
    weiXin: u.indexOf('MicroMessenger') > -1, // 微信
    alipay: u.indexOf('AlipayClient') > -1, // 支付宝
    QQ: ua.match(/QQ/i) == 'qq', // QQ
    weiBo: ua.match(/WeiBo/i) == 'weibo', // 微博
    ucLowEnd: u.indexOf('UCWEB7.') > -1, //
    ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
    webview: !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) && u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    ucweb: function () {
      try {
        return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
      } catch (e) {
        if (u.indexOf('UC') > -1) {
          return true
        }
        return false
      }
    }(),
    Symbian: u.indexOf('Symbian') > -1,
    ucSB: u.indexOf('Firofox/1.') > -1
  }
  return result
}
export default {
  install(Vue) {
    Vue.prototype.$objClone = objClone
    Vue.prototype.$native = native
  },
  objClone,
  native
}