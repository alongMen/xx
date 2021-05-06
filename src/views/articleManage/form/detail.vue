<template>
    <div class="articleManageBox">
        <el-dialog :title="title" :visible="dialogFormVisible" @close="goCancel" class="dialogbox">
            <el-form :model="form" label-width="100px">
                <el-form-item label="栏目:">
                    <el-cascader
                            :options="options"
                            :props="{ value:'id',label:'name',emitPath: false,checkStrictly:true}"
                            :show-all-levels="false"
                            size="medium"
                            v-model="form.columnInfoId"
                    />
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="form.tag">添加到首页动态新闻</el-checkbox>
                </el-form-item>
                <el-form-item label="作者:">
                    <el-input v-model="form.author"/>
                </el-form-item>
                <el-form-item label="智慧环保类型:">
                    <el-radio-group @change="handleChange" v-model="form.type">
                        <el-radio :label="0">内容智慧环保</el-radio>
                        <el-radio :label="1">外链智慧环保</el-radio>
                        <el-radio :label="2">外链图片</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题:">
                    <el-input v-model="form.title"/>
                </el-form-item>
                <el-form-item label="外链:" v-if="isShow">
                    <el-input v-model="form.href"/>
                </el-form-item>
                <el-form-item label="管理时间:">
                    <el-date-picker
                            v-model="form.publicationDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择管理时间"/>
                </el-form-item>
                <el-form-item label="摘要:">
                    <el-input v-model="form.summary"/>
                </el-form-item>
                <el-form-item label="发生时间:">
                    <el-date-picker
                            v-model="form.occurrenceTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择发生时间"/>
                </el-form-item>
                <el-form-item label="来源:">
                    <el-input v-model="form.source"/>
                </el-form-item>
                <el-form-item label="排序" v-if="isShow">
                    <el-input-number v-model="form.orderNo"/>
                </el-form-item>
                <el-form-item label="图片:" class="file">
                    <el-upload
                            :action="fileServer"
                            :data="{mid:this.form.id,businessType:'article'}"
                            :file-list="filePreviewList"
                            :headers="headers"
                            :limit="1"
                            :multiple="false"
                            :on-preview="handleheadImgPreview"
                            :on-remove="handleRemove"
                            :on-success="handlePreviewSuccess"
                            accept="image/png, image/jpeg"
                            list-type="picture-card"
                            name="file"
                    >
                        <i class="el-icon-plus"/>
                    </el-upload>
                    <el-dialog :visible.sync="dialogheadImgVisible" append-to-body>
                        <img :src="dialogheadImgImageUrl" alt width="100%"/>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="内容:" class="textArea" v-if="!isShow">
                    <kindeditor :content="form.content" :mid="form.id" ref="kindeditorref"
                                v-model="contentValue"/>
                </el-form-item>
            </el-form>

            <div class="dialog-footer" slot="footer">
                <el-button @click="goCancel">取 消</el-button>
                <el-button @click="goSure" type="primary">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import kindeditor from "@/components/kindeditor.vue";

    export default {
        data() {
            return {
                isShow: false,
                id: "",
                fileServer: this.$http.baseUrl + "file/V01/file-anon",
                headers: {
                    Authorization: "Bearer " + window.sessionStorage.getItem("token")
                },
                formLabelWidth: "100px",
                contentValue: "",
                dialogheadImgImageUrl: "",
                dialogheadImgVisible: false,
            };
        },
        props: {
            dialogFormVisible: {
                type: Boolean,
                default: () => false
            },
            title: {
                type: String,
                default: () => ""
            },
            fileList: {
                type: Array,
                default: () => []
            },
            filePreviewList: {
                type: Array,
                default: () => []
            },
            form: {
                type: Object,
                default: () => {
                }
            },
            templateTypes: {
                type: Array,
                default: () => []
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        components: {
            kindeditor,
        },
        updated() {
            if (this.form.id == undefined) {
                this.form.id = this.guid()
            }
        },
        watch: {
            dialogFormVisible: {
                handler: function (val) {
                    if (val) {
                        this.handleChange(this.form.type);
                    }
                },
            }
        },
        methods: {
            S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            },
            guid() {
                return (this.S4() + this.S4() + "" + this.S4() + "" + this.S4() + "" + this.S4() + "" + this.S4() + this.S4() + this.S4());
            },
            sendTips(msg, type) {
                this.$message.closeAll();
                this.$message({
                    message: msg,
                    type: type
                });
            },
            goCancel() {
                this.isShow = false;
                if (this.$refs.kindeditorref != null) {
                    this.$refs.kindeditorref.setKindeditorValue("");
                }
                this.$emit("cancelModel");
            },
            goSure() {
                if (this.$refs.kindeditorref != null && this.$refs.kindeditorref.getHtml() != null) {
                    this.contentValue = this.$refs.kindeditorref.getHtml();
                }
                this.form.content = this.contentValue;

                if (!this.form.columnInfoId) {
                    this.sendTips("请选择栏目", "info")
                    return;
                }
                if (!this.form.publicationDate) {
                    this.sendTips("请选择管理时间", "info")
                    return;
                }
                if (!this.form.occurrenceTime) {
                    this.sendTips("请选择发生时间", "info")
                    return;
                }

                this.$emit("save", this.form);
                if (this.$refs.kindeditorref != null) {
                    this.$refs.kindeditorref.setKindeditorValue("");
                }

            },
            handleheadImgPreview(file) {
                this.dialogheadImgImageUrl = file.url;
                this.dialogheadImgVisible = true;
            },
            handleRemove(file, fileList) {
                this.$http.deleteFile(file.id != null ? file.id : file.response.id).then(res => {
                });
            },
            handleChange(e) {
                if (e == "1" || e == "2") {
                    this.isShow = true;
                } else {
                    this.isShow = false;
                }
            },
            handlePreviewSuccess(response, file, fileList) {
                this.form.coverImageUrl = response.url;
            },
            setContentValue(data) {
                this.$refs.kindeditorref.setKindeditorValue(data);
            }
        }
    };
</script>
<style lang="less">
    .articleManageBox {
        width: 100%;
        height: 100%;

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
