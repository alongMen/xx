<template>
    <div class="kindeditor">
        <textarea class="form-control"
                  ref="kindeditor"
                  v-model="content"
                  name="content"></textarea>
        <div style="visibility: hidden;height:0;">
            <el-upload
                    name="file"
                    :action="fileServer"
                    :headers="headers"
                    :multiple="true"
                    :data="{mid: 'article', businessType: 'RichTxtFile'}"
                    :file-list="[]"
                    :on-success="handleSuccess"
                    :on-error="handleError">
                <i id="inputFile" class="el-icon-plus"></i>
            </el-upload>
        </div>

    </div>
</template>

<script>

    import '../../node_modules/kindeditor/kindeditor-all.js'
    import '../../node_modules/kindeditor/lang/zh-CN.js'
    import '../../node_modules/kindeditor/themes/default/default.css'

    export default {
        name: 'kindeditor',
        data() {
            return {
                fileServer: this.$http.baseUrl + "file/V01/file-anon",
                headers: {
                    Authorization: "Bearer " + window.sessionStorage.getItem("token")
                },
                htmlObject: {},
                businessId: "",
                barObject: {},
                barArr: ['image', 'insertfile', 'media'],
                clickBar: '',
            }
        },
        props: {
            content: {
                type: String,
                default: () => ""
            },
            mid: {
                type: String,
                default: () => ""
            }
        },
        updated() {
            this.htmlObject.html(this.content)
            this.businessId = this.mid
        },
        mounted() {
            this.initKindeditor();
            this.barArr.forEach(bar => {
                this.barObject.bar = true;
                // 添加点击回调函数
                this.htmlObject.clickToolbar(bar, () => {
                    // 禁用自带弹窗
                    this.htmlObject.hideDialog()
                    // 打开文件
                    this.handleOpenFile(bar)
                })
            })
        },
        methods: {
            sendTips(msg, type) {
                this.$message.closeAll();
                this.$message({
                    message: msg,
                    type: type
                });
            },
            initKindeditor() {
                var _this = this
                // 默认参数
                var options = {
                    pluginsPath: "/cms-service-web/static/plugins/",
                    width: '100%',
                }
                // 调用外部参数
                if (_this.options) {
                    for (var i in _this.options) {
                        options[i] = _this.options[i]
                    }
                }
                this.htmlObject = window.KindEditor.create(_this.$refs.kindeditor, options);
            },
            setKindeditorValue(data) {
                this.htmlObject.html(data)
            },
            getHtml() {
                return this.htmlObject.html()
            },
            // 打开文件
            handleOpenFile(bar) {
                const input = document.getElementById('inputFile')
                // 解决同一个文件不能监听的问题
                input.addEventListener('click',
                    function () {
                    }, false)

                this.clickBar = bar;
                // 点击input
                input.click()
            },
            handleSuccess(response, file) {
                if (file && file.status && file.status === "success") {
                    var xHtml = "";
                    if (this.clickBar === "image") {
                        xHtml = '<img style="max-width:100%;" src="' + response.url + '">';
                    }
                    if (this.clickBar === "insertfile" || this.clickBar === 'media') {
                        xHtml = '<a class="ke-insertfile" href="' + response.url + '" data-ke-src="'
                            + response.url + '" target="_blank">' + response.name + '</a>'
                    }
                    if (xHtml !== "" && this.clickBar !== "") {
                        this.htmlObject.appendHtml(xHtml);
                        this.clickBar = "";
                    }
                }
            },
            handleError(err) {
                this.sendTips("上传失败" + err, 'error');
            },
        },
    }
</script>

<style>
</style>