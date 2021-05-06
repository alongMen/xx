<template>
    <div class="childModalBox">
        <el-dialog class="nomalMoal" :modal-append-to-body="false" :title="title" :visible="dialogFormVisible"
                   @close="goClose">
            <el-form :model="form" :inline="Isinline">
                <el-form-item v-for="item in modelP" :key="item.modelP" :label="item.title"
                              :label-width="LabelWidth||formLabelWidth" :required='item.isRequired'>
                    <el-input v-if="item.type===0" v-model="form[item.modelP]" autocomplete="off"/>
                    <el-input type="number" v-if="item.type===0.1" :min="item.min?item.min:''"
                              v-model="form[item.modelP]" autocomplete="off"/>
                    <el-select v-if="item.type===1" v-model="form[item.modelP]" clearable placeholder="请选择">
                        <el-option
                                v-for="list in item.val"
                                :key="list.label"
                                :label="list.label"
                                :value="list.value">
                        </el-option>
                    </el-select>
                    <el-cascader
                            v-if="item.type===6"
                            v-model="form[item.modelP]"
                            :options="rganizationList"
                            :show-all-levels="false"
                            :props="{ value:'uid',label:'label',emitPath: false,checkStrictly: true }"
                    >
                    </el-cascader>
                    <el-cascader
                            v-if="item.type===2"
                            :options="options"
                            :props="item.roles"
                            @change='tagChange'
                            v-model="form[item.modelP]"
                            clearable>
                    </el-cascader>
                    <el-upload
                            v-if="item.type===3"
                            :action="fileServer"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :data="fileBusinessId"
                            name="file"
                            multiple=false
                            :on-change="handleChange"
                            :limit="5"
                            :on-exceed="handleExceed"
                            :file-list="fileListIn">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>

                    <el-upload
                            v-if="item.type === 'uploadImage'"
                            list-type="picture-card"
                            name="file"
                            :action="fileServer"
                            :headers="headers"
                            :multiple="false"
                            :limit="1"
                            :accept="'image/*'"
                            :data="{mid: form.id, businessType: form.businessType}"
                            :file-list="form.imgUrlList"
                            :on-exceed="limitWaring"
                            :on-preview="handleImagePreview"
                            :on-success="handleImageSuccess"
                            :on-error="handleImageError"
                            :on-remove="handleImageRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <el-date-picker
                            v-if="item.type===4"
                            v-model="form[item.modelP]"
                            :align="right"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"/>
                    <el-dialog :modal="false" :visible.sync="dialogImageVisible">
                        <img width="100%" :src="dialogImageUrl" alt="img">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="goCancel">取 消</el-button>
                <el-button type="primary" @click="goSure">{{title==='党员查询'?"确定":"保存"}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formLabelWidth: '140px',
                fileServer: this.$http.baseUrl + "file/V01/file-anon",
                headers: {
                    Authorization: "Bearer " + window.sessionStorage.getItem("token")
                },
                fileBusinessId: {businessId: ""},
                fileListIn: this.fileList,
                dialogImageUrl: null,
                dialogImageVisible: false,
            }
        },
        props: {
            dialogFormVisible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            modelP: {
                type: Array,
                default: () => []
            },
            form: {
                type: Object,
                default: () => {
                    return {imgUrlList: []};
                }
            },
            options: {
                type: Array,
                default: () => []
            },
            Isinline: {
                type: Boolean,
                default: false
            },
            LabelWidth: {
                type: Number,
                default: 0
            },
            rganizationList: {
                type: Array,
                default: () => []
            },
            fileList: {
                type: Array,
                default: () => []
            }
        },
        mounted() {

        },
        methods: {
            goCancel() {
                this.$emit("ListenChild", false)
            },
            goClose() {
                this.$emit("ListenChild")
            },
            goSure() {
                this.$emit("ListenChild1", this.form)
            },
            tagChange(val) {
            },
            //下载附件
            handlePreview(file) {
                window.open(this.$fileServer + "/download/" + file.id);
            },
            //删除附件
            handleRemove(file) {
                this.$http.deleteFile(file.id).then(res => {
                    console.log("删除附件成功：", res)
                })
            },
            //删除附件的异步确认
            beforeRemove(file) {
                return this.$confirm(`确定删除 ${file.name}？`);
            },
            //附件list改变
            handleChange(file, fileList) {
                if (this.form['partyMember.businessId'] == null) {
                    this.form['partyMember.businessId'] = fileList.length > 0 ? fileList[fileList.length - 1].response != null ? fileList[fileList.length - 1].response.businessId : null : null;
                    this.fileBusinessId.businessId = this.form['partyMember.businessId'];
                }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },

            handleImagePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageVisible = true;
            },
            handleImageSuccess(response, file) {
                if (file && file.status && file.status === "success") {
                    this.sendTips("上传成功", 'success');
                    this.form.imgUrl = response.url;
                }
            },
            handleImageError(err) {
                this.sendTips("上传失败" + err, 'error');
            },
            handleImageRemove(file) {
                let data = {
                    url: file.url,
                    businessType: this.form.businessType,
                }
                this.$http.deleteFileByUrlAndBusinessType(data).then(res => {
                    if (res.code === 200) {
                        this.sendTips("删除成功", 'success');
                    } else {
                        this.sendTips("删除失败", 'error');
                    }
                });
            },
            limitWaring() {
                this.sendTips("仅限上传一张图片", 'warning');
            },
            sendTips(msg, type) {
                this.$message({
                    message: msg,
                    type: type
                });
            },
        }

    }
</script>
<style lang="less">
    .childModalBox {
        width: 100%;
        height: 100%;

        .moreWidth {
            .el-dialog {
                width: 70%;

                .el-form {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    .el-form-item {
                        width: 50%;

                    }
                }
            }
        }

        .nomalMoal {
            .el-dialog {
                width: 50%;

                .el-form {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    .el-form-item {
                        width: 88%;
                        margin-bottom: 20px;
                    }

                    .switchBox {
                        margin-bottom: 5px;

                        .el-form-item__content {
                            margin-top: 10px;
                        }
                    }

                    .moreTipsInput {
                        .el-form-item__content {
                            border: 1px solid #dedede;
                            background-color: #F5F7FA;

                            .innerLabel {
                                padding: 0 16px;
                                border-right: none;
                                background-color: #F5F7FA;
                            }

                            .moreTipsInput {
                                width: 80px;

                                .el-input__inner {
                                    border: none;
                                }
                            }
                        }
                    }

                    .tipsSelectBox {
                        .el-form-item__content {
                            .innerLabel {
                                border: 1px solid #dedede;
                                padding: 0 16px;
                                border-right: none;
                                background-color: #F5F7FA;
                            }

                            .el-select {
                                border: 1px solid #dedede;

                                input {
                                    border: none;
                                }
                            }

                            .el-input__suffix {
                                border: none;
                                background-color: #ffffff;
                            }
                        }
                    }

                }
            }
        }

        .el-cascader {
            float: left;
        }

        .el-select {
            float: left;
        }

        .el-form-item__content {
            display: flex;
            justify-content: flex-start;
        }
    }

</style>
