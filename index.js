window.onload = function () {
    document.getElementsByTagName("mdui-card")[0].style.visibility = "unset"
    document.querySelector("body > mdui-layout > mdui-top-app-bar > mdui-top-app-bar-title").innerText = "该站点用于测试"
}

// 禁止右键菜单
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    return false;
});

// 禁止文字选择
document.addEventListener('selectstart', function (event) {
    event.preventDefault();
    return false;
});

// 禁止复制
document.addEventListener('copy', function (event) {
    event.preventDefault();
    return false;
});

// 禁止剪切
document.addEventListener('cut', function (event) {
    event.preventDefault();
    return false;
});

// 禁止粘贴
document.addEventListener('paste', function (event) {
    event.preventDefault();
    return false;
}); 


if (localStorage.getItem("wzzdy_userFooledCount") == null) {
    localStorage.setItem("wzzdy_userFooledCount", "0")
}

function getFooledTimes() {
    return parseInt(localStorage.getItem("wzzdy_userFooledCount"))
}

function addFooledTimes() {
    let count = getFooledTimes() + 1
    localStorage.setItem("wzzdy_userFooledCount", count.toString())
}

function getRandomString(len) {
    let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
        min = 0,
        max = _charStr.length - 1,
        _str = '';                    //定义随机字符串 变量
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for (var i = 0, index; i < len; i++) {
        index = (function (randomIndexFunc, i) {
            return randomIndexFunc(min, max, i, randomIndexFunc);
        })(function (min, max, i, _self) {
            let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
                numStart = _charStr.length - 10;
            if (i == 0 && indexTemp >= numStart) {
                indexTemp = _self(min, max, i, _self);
            }
            return indexTemp;
        }, i);
        _str += _charStr[index];
    }
    return _str;
}

// 创建<span>元素  
var span = document.createElement('span');
// 设置<span>元素的文本内容  
span.innerHTML = '<span slot="description">使用网页前请仔细阅读并理解以下免责声明内容<br>本网页仅为玩家提供创建游戏房间的功能，不涉及游戏内部运行机制及游戏结果的影响。任何游戏内部问题及纠纷均由王者荣耀游戏官方客户端解决。<br>您在使用本网站创建游戏房间时，需自行承担游戏过程中可能出现的风险。本网站不对游戏过程中的任何损失、纠纷或问题承担责任。<br>本网页所提供的功能仅为玩家提供便利，但不保证游戏内部运行机制的稳定性及完整性。因此，本网站不对游戏内部运行机制的任何问题负责。<br>对于因使用本网站服务而导致的任何直接、间接、特殊或结果性损失，本网站均不承担责任。<br>本网站保留随时更改、修订免责声明的权利。您在使用本网站服务前应定期查看免责声明的更新内容。<br>请您在使用本网站服务前，仔细阅读并理解以上免责声明内容。若您选择使用本网站服务，则视为您已经同意并接受本免责声明的全部内容。</span>';

function showalert(str) {
    mdui.alert({
        headline: "提示",
        description: str,
        confirmText: "我知道了",
    });
}

function showdia() {

    if (getFooledTimes() > 0) {
        showalert("哈哈 被骗了吧老弟" + " 你已被骗" + getFooledTimes() + "次(可叠加😀)")
        return
    }

    let editview = false
    let panstr = getRandomString(5)

    let dia = mdui.dialog({
        headline: "提示",
        description: span,
        onOpen: () => {
            setTimeout(function () {
                var p = document.createElement('p');
                p.innerHTML = '请输入 我已同意' + panstr + ' 来确认';
                // 创建<mdui-text-field>元素
                var textField = document.createElement('mdui-text-field');
                // 设置class
                textField.class = 'textedit';
                // 设置样式
                textField.style.paddingTop = '10px';
                dia.insertBefore(p, dia.getElementsByTagName("mdui-button")[0]);
                dia.insertBefore(textField, dia.getElementsByTagName("mdui-button")[0]);
                editview = textField
            }, 10000);
        },
        actions: [
            {
                text: "我不同意",
                onClick: () => {
                    alert("不同意 即无法使用本网页功能")
                    window.location.reload()
                    return false;
                },
            },
            {
                text: "同意",
                onClick: () => {
                    if (editview == false) {
                        showalert("你必须查看至少10秒")
                        return false;
                    } else {
                        if (editview.value != '我已同意' + panstr) {
                            showalert("你并没有填写正确网页最底部的验证码")
                            return false
                        } else {
                            showalert("验证通过")
                        }
                    }
                    return true;
                },
            }
        ],
    });
}

showdia()

function showfooldia() {
    let panstr = getRandomString(60)

    mdui.prompt({
        headline: "提示",
        description: "为了防止滥用 请输入验证码 " + panstr,
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: (value) => {
            if (value != panstr) {
                alert("验证码输入错误!")
                window.location.reload()
            } else {
                addFooledTimes()
                alert("验证码输入正确 正在跳转中")
                window.location.href = "https://txmov2.a.kwimgs.com/upic/2022/09/04/13/BMjAyMjA5MDQxMzEyNTJfMjM5MTA1OTAzMV84MzQ1MjA1MzQ3MV8xXzM=_b_B1423395fe60f25c849edc48f82794465.mp4?tag=1-1714455306-std-1-8j2ebypurg-49fa12e833312012&clientCacheKey=3xcthqksg9hc7ri_b.mp4&tt=b&di=7cdee4c6&bp=12681&ali_redirect_ex_hot=66666800&ali_redirect_ex_beacon=1"
            }
        },
        onCancel: () => console.log("canceled"),
    });
}

var allbutton = document.querySelectorAll(".mybutton")

allbutton[0].onclick = function () {
    var mode = document.getElementsByTagName("mdui-segmented-button-group")[0].value
    if (mode == "") {
        mdui_snackbar({
            message: "你必须选择一个游戏",
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return false
    }

    var modename = document.querySelectorAll(".myedit")[0].value

    if (modename == "") {
        mdui_snackbar({
            message: "你必须选择一个模式",
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return false
    }

    if (getFooledTimes() > 0) {

        mdui.confirm({
            headline: "提示",
            description: "是否想要继续被骗啊",
            confirmText: "被骗爽了😋",
            cancelText: "滚😠",
            onConfirm: () => {
                showfooldia()
            },
            onCancel: () => {
                alert("好的😘")
                window.location.replace("about:blank")
            },
        });

        return
    }

    showfooldia()



}

function getHexBackgroundColor(element) {
    // 获取元素的 background-color
    var computedStyles = window.getComputedStyle(element);
    var backgroundColor = computedStyles.getPropertyValue('background-color');

    // 检查是否为 RGB 或 RGBA 格式，如果是，转换为十六进制
    if (backgroundColor.match(/^rgb/) || backgroundColor.match(/^rgba/)) {
        // 提取 RGB 值
        var rgbValues = backgroundColor.match(/\d+/g).map(Number);
        // 转换为十六进制
        var hexColor = rgbValues.map(function (value) {
            return ('0' + value.toString(16)).slice(-2);
        }).join('');
        backgroundColor = '#' + hexColor;
    }

    return backgroundColor;
}

var colordoc = document.getElementsByClassName("color-preset")[0].childNodes

colordoc.forEach(element => {
    element.onclick = function () {

        if (color_message != "null") {
            mdui_snackbar({
                message: color_message,
                action: "我知道了",
                onActionClick: () => console.log("click action button")
            });
            return
        }

        color = getHexBackgroundColor(this)
        localStorage.setItem("wzzdy_mythemecolor", color)
        mdui.setColorScheme(color)
    }
});

document.getElementsByClassName('color-custom')[0].addEventListener('click', function (event) {
    if (color_message != "null") {
        mdui_snackbar({
            message: color_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        event.preventDefault()
    }
});

document.getElementsByClassName("color-custom")[0].addEventListener('input', function () {
    color = this.value;
    localStorage.setItem("wzzdy_mycustomthemecolor", color)
    localStorage.setItem("wzzdy_mythemecolor", color)
    mdui.setColorScheme(color)
});

color_message = "null"

document.getElementsByClassName('color-img')[0].addEventListener('click', function (event) {
    if (color_message != "null") {
        mdui_snackbar({
            message: color_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        event.preventDefault()
        return
    }
});

document.getElementsByClassName('color-img')[0].addEventListener('input', function () {

    if (this.files && this.files[0]) {
        color_message = "正在从壁纸提取颜色中 请耐心等待"
        const file = this.files[0];

        const reader = new FileReader();

        reader.onloadend = function () {
            const image = new Image();
            const blobUrl = URL.createObjectURL(file);
            image.src = blobUrl;
            mdui.getColorFromImage(image).then(color => {
                //清理blob
                URL.revokeObjectURL(blobUrl);
                //清空选择 防止重复选择不触发
                document.getElementsByClassName('color-img')[0].value = ""
                localStorage.setItem("wzzdy_mythemecolor", color)
                mdui.setColorScheme(color)
                color_message = "null"
                mdui_snackbar({
                    message: "从壁纸设置主题成功",
                    action: "我知道了",
                    onActionClick: () => console.log("click action button")
                });
            });

        };

        reader.readAsDataURL(file); // 开始读取文件内容
    }
})

document.getElementsByClassName("colorbutton")[0].onclick = function () {

    if (color_message != "null") {
        mdui_snackbar({
            message: color_message,
            action: "我知道了",
            onActionClick: () => console.log("click action button")
        });
        return
    }

    localStorage.setItem("wzzdy_mythemecolor", "null")
    mdui.removeColorScheme()
}

var mysnackbar = false;
function mdui_snackbar(args) {
    if (mysnackbar && mysnackbar.style.display != "none") {
        mysnackbar.remove()
    }
    mysnackbar = mdui.snackbar(args);
}
