<template>
    <div class="blankbox">
        <div class="leftImg"></div>
        <div class="describ">
            <div class="chides">对不起，</div>
            <div class="chides">您需要先找管理员申领权限！</div>
            <div class="engTit">SORRY<span>，</span></div>
            <div class="engDes">YOU NEED TO ASK</div>
            <div class="engDes">THE ADMINISTRATOR</div>
            <div class="engDes">FOR PERMISSION FIRST!</div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.blankbox{
    width: 100%;
    height: 100%;
    background: #ffd6d6 url('../assets/empity_background.png') no-repeat center center;
    background-size: cover;
    .leftImg{
        width: 50%;
        height: 27%;
        background: url('../assets/empity_qi.png') no-repeat center center;
        background-size: cover;
        
    }
    .describ{
        width: 37%;
        height: 24%;
        margin-left: 50%;
        .chides{
            font-family: '微软雅黑';
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 42px;
            letter-spacing: 2px;
            color: #282828;
        }
        .engTit{
            font-family:arial;
            font-size: 48px;
            font-weight: 600;
            letter-spacing: 2px;
            color: #333333;
            line-height: 30px;
            margin-top: 40px;
            margin-bottom: 15px;
            span{
               font-size: 40px; 
            }
        }
        .engDes{
            font-family: arial;
            font-size: 32px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 48px;
            letter-spacing: 2px;
            color: #333333;
        }
    }
}
</style>
