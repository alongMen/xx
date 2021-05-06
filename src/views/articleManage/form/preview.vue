<template>
    <div class="articleManageBox">
        <el-dialog :title="title" :visible="dialogPreviewVisible" @close="goCancel">
            <div class="articleManageBox-contentDetail">
                <h1 class="articleManageBox-contentDetail_title">{{newsContent.title}}</h1>
                <div class="articleManageBox-contentDetail_infor">
                    <span>作者：{{newsContent?newsContent.author:""}}</span>
                    <span>时间：{{newsContent?newsContent.createTime:''}}</span>
                    <span>来源：{{newsContent?newsContent.source:""||'暂无'}}</span>
                </div>
                <div class="articleManageBox-contentDetail_text" v-html="newsContent.content"></div>
            </div>
            <div class="dialog-footer" slot="footer">
                <el-button @click="goCancel">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                isShow: false,
                backgroundImg: false,
                newsContent: {},
            };
        },
        props: {
            dialogPreviewVisible: {
                type: Boolean,
                default: () => false
            },
            articleId: {
                type: String,
                default: () => ''
            },
            title: {
                type: String,
                default: () => ''
            },
        },
        watch: {
            dialogPreviewVisible: {
                handler: function (val) {
                    this.isShow = val;
                    if (val) {
                        this.getArticle();
                    }
                },
            }
        },
        methods: {
            getArticle() {
                this.$http.queryCmsArticleById(this.articleId).then(res => {
                    if (res.code === 200) {
                        this.newsContent = res.data;
                        if(this.newsContent.title.indexOf("背景")!==-1){
                            this.backgroundImg=true;
                        }
                    }
                });
            },
            goCancel() {
                this.isShow = false;
                this.backgroundImg = false;
                this.$emit("cancelModel");
            }
        }
    };
</script>
<style lang="less">
    .articleManageBox {
        width: 100%;
        height: 100%;

        &-contentDetail {
            width: 100%;
            min-height: 300px;
            height: auto;
            padding: 0 15% !important;
            box-sizing: border-box;

            &_title {
                font-family: MicrosoftYaHei-Bold;
                font-size: 22px;
                text-align: center;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 1px;
                color: #055292;
                margin-top: 20px;
                white-space: pre-wrap;
                height: auto;
            }

            &_text {
                border-bottom: 1px solid #f2f2f2;

                img {
                    max-width: 100% !important;
                    margin: 20px 0;
                }

                // font-size: 90px;
            }

            &_more {
                margin-top: 25px;

                p {
                    font-family: MicrosoftYaHei;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 35px;
                    letter-spacing: 1px;
                    color: #666666;
                }

                p:hover {
                    cursor: pointer;

                    span {
                        color: #055292;
                    }
                }
            }

            &_infor {
                height: auto;
                margin-top: 15px;
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                justify-content: center;
                text-align: center;
                flex-wrap: wrap;

                span {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #999999;
                    margin: 0 10px;
                }

                span:last-child:hover {
                    cursor: pointer;
                    color: #055292;
                }
            }
        }

        .el-radio {
            margin-bottom: 0 !important;
        }

        .el-dialog {
            width: 70%;
        }

        .el-form {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .el-form-item {
                width: 50%;
            }

            .textArea {
                width: 100%;
            }

            .file {
                width: 100%;
            }
        }
    }

</style>