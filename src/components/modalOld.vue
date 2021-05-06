<template>
    <div class="childModalBox">
        <el-dialog :title="title" :class="moreWidth?'moreWidth':'nomalMoal'" :visible="isShowModal" @close="modalCancel">
            <el-form :disabled="formDisabled" label-position="right" ref='modalForm' label-width="125px" :model="modelForm">
                <el-form-item :rules="[{ required: item.required, message: `请${!item.type?'输入':'选择'}${item.label}`}]" :prop="item.key" v-for="(item,index) in model" :key="index" :label="item.label" >
                    <el-input
                        clearable
                        :placeholder="'请输入'+item.label"
                        :disabled="item.disabled"
                        v-if="item.type === 'text'||!item.type"
                        v-model="modelForm[item.key]"/>
                    <el-input-number
                        type="number"
                        clearable
                        :disabled="item.disabled"
                        :min="1"
                        :step="1"
                        :precision="0"
                        v-if="item.type === 'number'"
                        v-model="modelForm[item.key]"/>
                    <el-cascader
                        clearable
                        :ref="item.ref"
                        :placeholder="'请选择'+item.label"
                        v-if="item.type === 'ASelect'"
                        v-model="modelForm[item.key]"
                        :options="item.options"
                        :props="{ value:item.opKey,label:item.opLabel,emitPath: false,checkStrictly: true }"
                        :show-all-levels="false"/>
                    <el-select clearable :disabled="item.disabled" @change="selectChange($event,item.requestEvent)" :multiple='item.multiple' :ref="item.ref" v-if="item.type === 'select'" v-model="modelForm[item.key]" placeholder="请选择">
                        <el-option
                                :placeholder="'请选择'+item.label"
                                v-for="itemsub in item.options"
                                :key="itemsub.value?itemsub.value:itemsub[item.opKey]"
                                :label="itemsub.label?itemsub.label:itemsub[item.opLabel]"
                                :value="itemsub.value?itemsub.value:itemsub[item.opKey]">
                        </el-option>
                    </el-select>
                    <el-select clearable :ref="item.ref" v-if="item.type === 'subsetSelect'" v-model="modelForm[item.key]" placeholder="请选择">
                        <el-option
                                :placeholder="'请选择'+item.label"
                                v-for="item in subsetSelectOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-cascader
                            clearable
                            :ref="item.ref"
                            :placeholder="'请选择'+item.label"
                            v-if="item.type === 'BSelect'"
                            v-model="modelForm[item.key]"
                            :options="ioptions"
                            :props="{ value:'value',label:'label',emitPath: false,checkStrictly: true }"
                            :show-all-levels="false"/>
                    <el-date-picker
                            clearable=""
                            :disabled="item.disabled"
                            v-if="item.type === 'dateTime'"
                                    v-model="modelForm[item.key]"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                    </el-date-picker>
                    <el-radio-group v-if="item.type === 'radio'" v-model="modelForm[item.key]">
                    <el-radio
                        v-for="(radioItem,index) in item.radioGroup"
                        :label="radioItem.key"
                        :key="index"
                        >{{radioItem.name}}
                    </el-radio>
                    </el-radio-group>
                    <el-input
                            clearable
                            v-if="item.type === 'textarea'"
                            v-model="modelForm[item.key]"
                            :ref="item.ref"
                            :rows="3"
                            type="textarea"
                            placeholder="请输入内容"
                            >
                    </el-input>
                    <el-upload
                            v-if="item.type === 'uploadImage'"
                            list-type="picture-card"
                            name="file"
                            :action="fileServer"
                            :headers="headers"
                            :multiple="false"
                            :limit="1"
                            :accept="'image/*'"
                            :data="{mid: modelForm.id, businessType: modelForm.businessType}"
                            :file-list="modelForm.imgUrlList"
                            :on-exceed="limitWaring"
                            :on-preview="handleImagePreview"
                            :on-success="handleImageSuccess"
                            :on-error="handleImageError"
                            :on-remove="handleImageRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :modal="false" :visible.sync="dialogImageVisible">
                        <img width="100%" :src="dialogImageUrl" alt="img">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalCancel">取 消</el-button>
                <el-button type="primary" @click="modalSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fileServer: this.$http.baseUrl + "api-file/files-anon",
            headers: {
                Authorization: "Bearer " + window.sessionStorage.getItem('token')
            },
            dialogImageUrl: null,
            dialogImageVisible: false,
            subsetSelectOptions:[],
            rules:[],
            ioptions:[],
        }
    },
    props:{
        isShowModal:{
            type:Boolean,
            default:()=>false
        },
        title:{
            type:String,
            default:()=>''
        },
        formDisabled:{
            type:Boolean,
            default:()=>false
        },
        model:{
            type:Array,
            default:()=>[]
        },
        modelForm:{
            type:Object,
            default:()=>{}
        },
        //是否两列排布模态框
        moreWidth:{
            type:Boolean
        }
    },
    methods:{
        modalCancel(){
            this.$emit('modalCancel')
        },
        selectChange(e,v){
            this.$http[v](e).then(
                resp=>{
                    let mid = [];
                    resp.data.map((item,index)=>{
                        mid[index] = {
                            label:item.name,
                            value:item.id
                        }
                    });
                    if (v == 'queryMenusTree'){
                        this.ioptions = mid;
                    }
                    this.subsetSelectOptions = mid
                }
            )
        },
         modalSure(){
            this.$refs['modalForm'].validate((valid) => {
                if (valid) {
                    this.$emit('modalSure',this.modelForm)
                } else {
                    return false;
                }
                })
        },
        limitWaring(files, fileList) {
            this.sendTips("仅限上传一张图片", 'warning');
        },
        handleImagePreview(file, fileList) {
            this.dialogImageUrl = file.url;
            this.dialogImageVisible = true;
        },
        handleImageSuccess(response, file, fileList) {
            if(file && file.status && file.status === "success"){
                this.sendTips("上传图片成功", 'success');
                this.modelForm.imgUrl = response.url;
            }
        },
        handleImageError(err, file, fileList) {
            this.sendTips("上传图片失败" + err, 'error');
        },
        handleImageRemove(file, fileList) {
            this.$http.deleteFile(file.id ? file.id : file.response.id).then(res => {
                if(res.code === 200){
                    this.sendTips("删除图片成功", 'success');
                }else{
                    this.sendTips("删除图片失败", 'error');
                }
            });
        },
        sendTips(msg, type){
            this.$message({
                message: msg,
                type: type
            });
        }
    }
}
</script>
<style lang="less">
.childModalBox{
    width: 100%;
    height: 100%;
    .moreWidth{
        .el-dialog{
            width: 70%;
            .el-form{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .el-form-item{
                    width: 50%
                }
            }
        }
    }
    .nomalMoal{
        .el-dialog{
            width: 50%;
            .el-form{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .el-form-item{
                    width: 88%
                }
            }
        }
    }
    .el-cascader{
        float: left;
    }
    .el-select{
        float: left;
    }
    .el-form-item__content{
        display: flex;
        justify-content: flex-start;
    }
}

</style>

