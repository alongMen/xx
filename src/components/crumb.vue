<template>
    <div class="crumb">
        <!--        <h2>{{router.meta.title}}</h2>-->
        <div v-if="showRouter">当前位置&nbsp;&nbsp;:&nbsp;&nbsp;<span><router-link
                to="/">{{router.matched[0].meta.title}}</router-link></span>&nbsp;&nbsp;-<span>&nbsp;&nbsp;
            <router-link :to="router.matched[1].path">{{router.matched[1].meta.title}}&nbsp;&nbsp;</router-link></span>&nbsp;&nbsp;-&nbsp;&nbsp;
            <span style="color:#2a58ad">{{router.matched[2].meta.title}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                router: {meta: '', matched: []},
                showRouter:false
            }
        },
        props: {
            title: {
                type: String,
                default: '首页'
            },
        },
        mounted() {
            this.router = this.$router.currentRoute;
            this.showRouter=true;
        }
    }
</script>
<style lang="less" scoped>
    .crumb {
        width: 100%;
        height: 100%;
        background-color: #F2F2F2;

        h2 {
            float: left;
            font-size: 24px;
            line-height: 25px;
        }

        div {
            float: right;
            height: 16px;
            border-left: 2px solid #2a58ad;
            font-size: 15px;
            padding-left: 8px;
            line-height: 14px;
            margin-top: 3px;
            color: #999999;

            a {
                color: #999999;
            }
        }
    }
</style>