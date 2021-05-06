<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted(){

  }
}
</script>

<style lang="less">
//重置样式
html,body{
  width: 100%;
  height: 100%;
  font-family: Microsoft YaHei;
}
#app{
  width: 100%;
  height: 100%;
}
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none;color: #e6bbb8 }
a:hover{
  text-decoration:none
}
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }
.el-tabs__item.is-active {
    color: #2a58ad;
}
.el-tabs__active-bar{
  background-color: #2a58ad;
}
.el-tabs__item:hover{
  color: #2a58ad;
}
.el-menu-item-group__title{
  display: none
}
.el-message__icon{
  font-size: 0.4rem !important;
}
</style>
