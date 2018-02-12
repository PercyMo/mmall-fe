/*
* @Author: PosyMo
* @Date:   2018-02-11 08:53:02
* @Last Modified by:   PosyMo
* @Last Modified time: 2018-02-12 16:24:08
*/
var _util = {
    // 网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            datatype: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                // 请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(err.msg);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 统一登录处理
    doLogin: function() {
        // window.location.href = 
    }
};

module.exports = _util;