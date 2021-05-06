<template>
    <div class="searchlabel-container">
        <!-- {{options1}} -->
        <label class="SearchLabel1">
            <el-select
            v-model="value"
            placeholder="人员"
            filterable
            clearable
            :clear="clearValue"
            remote
            reserve-keyword
            :remote-method="getPartyMemberLeaderList">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            </label>
                    <label class="SearchLabel2">
                        <el-cascader
                        ref="cascader"
                        @change="handleChange"
                        placeholder="请选择组织"
                        :options="options1"
                        clearable
                        :props="{multiple:true,value:'uid',label:'label',emitPath: false,checkStrictly: true}"
                        v-model="value1"
                        >
                        </el-cascader>
                    </label>
                    <label class="SearchLabel3">
                        <el-date-picker
                        v-model="value2"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期">
                        </el-date-picker>
                        <span>—</span>
                        <el-date-picker
                        v-model="value3"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                        </el-date-picker>
                    </label>
                    <label class="SearchLabel4">

                        <el-select v-model="value4" clearable placeholder="请选择会议类型">

                                <el-option
                                        v-for="item in typeList"
                                        :key="item.code"
                                        :label="item.dictName"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                    </label>
                    <label class="SearchLabel5">
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
                        </label>
    </div>
</template>
<script>
export default {
    data() {
        return {
           serachValue:'',
           options: [],
            value: '',
           value1:[],
           value2: '',
           value3: '',
            value4:'',
           options2: [],
           checkedLabel:[]
        }
    },
    mounted(){
            
    },
    methods: {


        clearValue(){
            this.value=""
        },
            handleSearch() {
                if(!this.value&&!this.value1){
                    this.$message({
                        type: 'warning',
                        message: '人员和党组织必须选择一项!'
                        });
                }
                else{
                    let data = {
                    speaker:this.value,
                    branchs:this.value1,
                    beginTime:this.value2,
                    endTime:this.value3,
                    tType:this.value4
                }
                let data1 = {
                    speaker:this.value,
                    branchs:this.value1,
                    beginTime:this.value2,
                    endTime:this.value3,
                    tType:this.value4
                }
                let person = ''
                let organization = ''
                this.options.map((item)=>{
                    if(data.speaker){
                        if(item.id===data.speaker){
                        person = item.name
                    }
                    }
                })
                organization = this.checkedLabel[this.checkedLabel.length-1]
                this.$emit('handleSearch',data,data1,person,organization)
                }                
            },
            handleAdd() {
                this.$emit('handleAdd')
            },
            //负责人
            getPartyMemberLeaderList(query) {
                let data = {}
                if (query !== '') {
                    data = {
                        params: {
                            name: ''
                        }
                    }
                }

                this.$http.partyMemberNotOutList().then(res => {
                    this.options = res.data
                })
            },
            handleChange(e,form,thsAreaCode){
                this.checkedLabel = this.$refs.cascader.getCheckedNodes()[0].pathLabels
            }
        }
}
</script>
<style lang="less">
    .searchlabel-container{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        label{          .el-date-editor--daterange{
                            background-color: #d2d2d2;
                        }
                        box-sizing: border-box;
                        background-color: #f2f2f2;
                        color: #333333;
                        margin-bottom:0;
                        margin-bottom: 0;
                        div{
                            width: 100%;
                            input:-ms-input-placeholder{color:#333333;}/* Internet Explorer 10+ */ 
                            input::-webkit-input-placeholder{color:#333333;}/* WebKit browsers */
                            input::-moz-placeholder{color:#333333;}/* Mozilla Firefox 4 to 18 */ 
                            input:-moz-placeholder{color:#333333;}/* Mozilla Firefox 19+ */
                            input{
                            width: 100%;
                            background-color: #f2f2f2!important;
                            }
                        }
                    }
                    .SearchLabel1{
                        width: 12%;
                        position: relative;
                        .todoselected{
                            width: 100%;
                            height: 130px;
                            position: absolute;
                            background-color: #d2d2d2;
                            top:40px;
                            z-index: 99;
                        }
                        .todoul{
                            display: none;
                        }
                    }
                    .SearchLabel2{
                        width: 22%;
                        margin: 0 1%;
                    }
                    .SearchLabel3{
                        width: 34%;
                        height: 40px;
                        display: flex;
                        span{
                            line-height: 40px;
                        }
                        input{
                            border: none;
                        }
                        input:-ms-input-placeholder{color:#333333;}/* Internet Explorer 10+ */ 
                            input::-webkit-input-placeholder{color:#333333;}/* WebKit browsers */
                            input::-moz-placeholder{color:#333333;}/* Mozilla Firefox 4 to 18 */ 
                            input:-moz-placeholder{color:#333333;}/* Mozilla Firefox 19+ */
                    }
                    .SearchLabel4{
                        width: 16%;
                        margin: 0 1%;
                    }
                    .SearchLabel5{
                        width: 20%;
                        display: flex;
                        background-color: #fff;
                        button{
                            background-color: #d0331e;
                            border-color: #d0331e;
                        }
                    }
    }
    label {
    display: inline-block;
    margin-bottom: 0;
}
</style>

