<template>
    <div class="user_container-box">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>
        <div class="table-box">
            <el-form :model="form" label-width="100px">
                <el-form-item label="基本信息:">
                    <el-input v-model="form.basicInfo"/>
                </el-form-item>
                <el-form-item label="copyright:">
                    <el-input v-model="form.copyright"/>
                </el-form-item>
                <el-form-item label="备案号:">
                    <el-input v-model="form.recordNum"/>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="save" type="primary">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Crumb from '@/components/crumb.vue'

    export default {
        data() {
            return {
                form: {basicInfo:'',copyright:'',recordNum:''}
            }
        },
        components: {
            Crumb
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                let data = {}
                this.$http.getFooterInfoList(data).then(res => {
                    if (res.code === 200 && res.data!==null) {
                        this.form = res.data
                    }
                })
            },
            save() {
                if (this.form.basicInfo == null || this.form.basicInfo ==='') {
                    this.$message({
                        type: 'info',
                        message: '请填写基本信息!'
                    });
                    return;
                }
                if (this.form.copyright == null  || this.form.copyright ==='') {
                    this.$message({
                        type: 'info',
                        message: '请填写copyright!'
                    });
                    return;
                }
                if (this.form.recordNum == null || this.form.recordNum ==='') {
                    this.$message({
                        type: 'info',
                        message: '请填写备案号!'
                    });
                    return;
                }
                this.$http.saveFooterInfo(this.form)
                    .then(res => {
                        if (res.code === 200) {
                            this.getData();
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'info'
                            });
                        }
                    })
            }
        },
    }
</script>
<style lang="less">
    .user_container-box {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;

        .Crumb {
            width: 100%;
            height: 50px;
            box-sizing: border-box;
        }

        .table-box {
            width: 100%;
            min-height: 93%;
            padding: 65px 20px 0;
            box-sizing: border-box;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
            border-radius: 4px 4px 0px 0px;
            border: solid 1px #dcdcdc;

            .dialog-footer{
                float: right;
            }
        }
    }
</style>
