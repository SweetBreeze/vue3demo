// 设置 rem 函数
function setRem() {
    // // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
    // // 1440 默认 14px 1440/14 = 100rem
    // let htmlWidth =
    //     document.documentElement.clientWidth || document.body.clientWidth;
    // //得到html的Dom元素
    // let htmlDom = document.getElementsByTagName("html")[0];
    // //设置根元素字体大小
    // htmlDom.style.fontSize = htmlWidth / 20 + "px";
    // 适配rem为100px=1rem;
    document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 0.96 + "px";
    window.onresize = function () {
        document.documentElement.style.fontSize =
            document.documentElement.clientWidth / 0.96 + "px";
    };
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem();
};
