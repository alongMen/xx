<template>
    <div class="search-container">
        <div :class="isMoreSearch?'search-container-notop':'search-container-top'">
            <div v-if='!justNeedAdd' class="search-container-top_basicChose">
                <el-form ref="form" :inline='true' :model="form" label-width="80px">
                    <el-form-item>
                        <el-input clearable  v-model="form[model.defaultSearchValue1.key]" :placeholder="'请输入'+model.defaultSearchValue1.label"/>
                    </el-form-item>
                    <el-form-item v-if="model.defaultSearchValue2 !=null ">
                        <el-input clearable  v-model="form[model.defaultSearchValue2.key]" :placeholder="'请输入'+model.defaultSearchValue2.label"/>
                    </el-form-item>
                    <el-form-item v-if="model.defaultSearchValue3 !=null">
                        <el-cascader clearable v-model="form[model.defaultSearchValue3.key]" :placeholder="'请输入'+model.defaultSearchValue3.label"
                                :options="model.defaultSearchValue3.options"
                                :props="{ value:'id',label:'name',emitPath: false,checkStrictly:true}"
                                :show-all-levels="false"
                                size="medium"/>
                    </el-form-item>
                    <el-form-item>
                        <el-select
                                clearable
                                v-if="model.defaultSearchValue4!=null"
                                v-model="form[model.defaultSearchValue4.key]" :placeholder="'请选择' + model.defaultSearchValue4.label">
                            <el-option
                                    v-for="list in model.defaultSearchValue4.options"
                                    :key="list.value"
                                    :label="list.label"
                                    :value="list.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if='justNeedAdd' class="search-container-top_onlybtnArea">
                <!-- <el-button class="bgcBox" icon="iconfont icondangjian_zengjia"  v-if='model.notNeedCreateNewproject!==true' size="small" @click="creatProject">新增</el-button> -->
                <el-button class="bgcBox" icon="iconfont icon-dangjian_zengjia"  v-if='model.notNeedCreateNewproject!==true' size="small" @click="creatProject">新增</el-button>
            </div>
            <div v-else class="search-container-top_btnArea">
                <el-button size="small" type="primary" class="searchBtn" icon="iconfont icon-dangjian_sousuo" @click="exeQuery">查询</el-button>
                <el-button class="moreSearchBtn" v-if='model.notNeedMoreQuery!==true' size="small" @click="moreQuery">高级筛选<i :class="isMoreSearch?'iconfont icondangjian_xiangshang':'iconfont icondangjian_xiangxia'"/></el-button>
                <el-button class="bgcBox dBlue" icon="iconfont icon-huabanbeifen"   v-if='model.Export.isneed' size="small" @click="exportEvent">{{model.Export.button}}</el-button>
                <el-button class="bgcBox oranYellow" icon="iconfont icon-xiazai"   v-if='model.Import.isneed' size="small" @click="importEvent">{{model.Import.button}}</el-button>
                <el-button class="bgcBox" icon="iconfont icon-dangjian_zengjia"  v-if='model.notNeedCreateNewproject!==true' size="small" @click="creatProject">新增</el-button>
            </div>
        </div>
        <div v-if='isMoreSearch' class="search-container-bottom">
            <el-form ref="form" inline='true' :model="form">
                    <el-form-item v-for="(item,index) in moreSearch" :key="index" label-width="80px">
                        <el-select v-show='item.needSelect' clearable  v-model="form[item.key]" :placeholder="'请选择'+item.label">
                            <el-option
                            v-for="list in item.options"
                            :key="list.code"
                            :label="list.dictName"
                            :value="list.code">
                            </el-option>
                        </el-select>
                        <el-date-picker
                            clearable
                            v-show="item.needDate"
                            v-model="form[item.key]"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :placeholder="'请选择'+item.label">
                        </el-date-picker>
                        <el-input clearable  v-show="!item.needSelect&&!item.needDate" :placeholder="'请输入'+item.label" v-model="form[item.key]"/>
                    </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form:{},
            isMoreSearch:false
        }
    },
    props: {
        model:{
            type:Object,
            default:()=>{}
        },
        moreSearch:{
            type:Array,
            default:()=>[]
        },
        justNeedAdd:{
            type:Boolean,
            default:()=>false
        }
    },
    methods:{
        creatProject(){
            this.$emit('creatProject')
        },
        moreQuery(){
            this.$emit('moreQuery')
            this.isMoreSearch = !this.isMoreSearch
        },
        exeQuery(){
            this.$emit('exeQuery',this.form)
        },
        exportEvent(){
            this.$emit('exportEvent')
        },
        importEvent(){
            this.$emit('importEvent')
        }
    }
}
</script>
<style lang="less">
.search-container{
    width: 100%;
    height: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: flex-start;
    &-top{
        width: 100%;
        height: 100%;
        display: flex;
        // align-items: center;
        justify-content: flex-start;
        line-height: 35px;
        &_onlybtnArea{
            padding-left: 15px;
            width:100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button{
                font-size: 16px;
                height: 38px;
                outline: none;
            }
            .el-button:focus{
                border: none;
            }
            .moreSearchBtn:focus{
                background-color: #ffffff;
            }
            .searchBtn{
                background-color: #2a58ad;
                border-color: #3b68bc;
                font-size: 14.5px;
                height: 38px;
                box-sizing: border-box;
                display: inline-flex;
                align-items: center;
                justify-content: space-evenly;
                padding: 0 10px;
                i{
                    font-size: 22px;
                }
            }
            .searchBtn:hover{
                background-color: #2a58ad;
                border-color:#2a58ad;
            }
            .bgcBox{
                background-color: #ffffff;
                border: 1px solid ;
                color: #3b68bc;
                border-color: #3b68bc;
                font-size: 14.5px;
                height: 38px;
                box-sizing: border-box;
                display: inline-flex;
                align-items: center;
                justify-content: space-evenly;
                padding: 0 10px;
                i{
                    font-size: 17px;
                    margin-right: 5px;
                }
            }
            .bgcBox:hover{
                background-color: rgba(35, 116, 1251, .1);
                border-color: #3b68bc;
            }
            .dBlue{
                background-color: #2374FB;
                color: #ffffff;
                border: none;
            }
            .dBlue:hover{
                background-color: #2374FB;
                border-color: #2374FB;
                opacity: .8;
            }
            .oranYellow{
                background-color: #FBAC23;
                color: #ffffff;
                border: none;
            }
            .oranYellow:hover{
                background-color: #FBAC23;
                border-color: #FBAC23;
                opacity: .8;
            }
            .moreSearchBtn{
                border: none;
                color: #bc2717;
                border: none;
                font-size: 14.5px;
                height: 38px;
                i{
                    margin-left: 5px;
                    font-size: 14px;
                }
            }
            .moreSearchBtn:hover{
                border: none;
                background-color: #fef0f0;
            }
        }
        &_btnArea{
            padding-left: 15px;
            display: flex;
            align-items: center;
            button{
                font-size: 16px;
                height: 38px;
                outline: none;
            }
            .el-button:focus{
                border: none;
            }
            .moreSearchBtn:focus{
                background-color: #ffffff;
            }
            .searchBtn{
                background-color: #2a58ad;
                border-color: #3b68bc;
                font-size: 14.5px;
                height: 38px;
                box-sizing: border-box;
                display: inline-flex;
                align-items: center;
                justify-content: space-evenly;
                padding: 0 10px;
                i{
                    font-size: 22px;
                }
            }
            .searchBtn:hover{
                background-color: #3b68bc;
                border-color:#3b68bc;
            }
            .bgcBox{
                background-color: #ffffff;
                border: 1px solid ;
                color: #3b68bc;
                border-color: #3b68bc;
                font-size: 14.5px;
                height: 38px;
                box-sizing: border-box;
                display: inline-flex;
                align-items: center;
                justify-content: space-evenly;
                padding: 0 10px;
                i{
                    font-size: 17px;
                    margin-right: 5px;
                }
            }
            .bgcBox:hover{
                background-color: rgba(35, 116, 1251, .1);
                border-color: #3b68bc;
            }
            .dBlue{
                background-color: #2374FB;
                color: #ffffff;
                border: none;
            }
            .dBlue:hover{
                background-color: #2374FB;
                border-color: #2374FB;
                opacity: .8;
            }
            .oranYellow{
                background-color: #FBAC23;
                color: #ffffff;
                border: none;
            }
            .oranYellow:hover{
                background-color: #FBAC23;
                border-color: #FBAC23;
                opacity: .8;
            }
            .moreSearchBtn{
                border: none;
                color: #3b68bc;
                border: none;
                font-size: 14.5px;
                height: 38px;
                i{
                    margin-left: 5px;
                    font-size: 14px;
                }
            }
            .moreSearchBtn:hover{
                border: none;
                background-color: rgba(35, 116, 1251, .2);
            }
        }
        &_basicChose{
            width: 50%;
            height: 100%;
            .el-form--inline{
            display: flex;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
        }
        .el-form-item:nth-child(1){
            padding-left:0;
        }
        .el-form-item{
            width: 50%;
            height: 100%;
            margin: 0;
            padding-left: 15px;
            display: flex;
            .el-form-item__label{
                width: 90px!important;
            }
            .el-form-item__content{
                flex: 1;
                .el-input{
                    width: 100%;
                    // .el-input__inner{
                    //     background-color: #f2f2f2
                    // }
                }
                .el-select{
                    width: 100%;
                }
            }
        }
        }
    }
    &-notop{
        width: 100%;
        height: 50%;
        display: flex;
        // align-items: center;
        justify-content: flex-start;
        line-height: 35px;
        &_basicChose{
            width: 50%;
            height: 100%;
            .el-form--inline{
            display: flex;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
        }
        
        .el-form-item{
            width: 50%;
            height: 100%;
            margin: 0;
            padding-left:15px;
            display: flex;
            .el-form-item__label{
                width: 90px!important;
            }
            .el-form-item__content{
                flex: 1;
                .el-input{
                    width: 100%;
                    // .el-input__inner{
                    //     background-color: #f2f2f2
                    // }
                }
                .el-select{
                    width: 100%;
                }
            }
        }
        }
    }
    &-bottom{
        width: 100%;
        height: 50%;
        display: flex;
        margin-top: 15px;
        // align-items: center;
        justify-content: flex-start;
        .el-form--inline{
            display: flex;
            width: 100%;
        }
        .el-form-item:nth-child(1){
            padding-left:0;
        }
        .el-form-item{
            width: 25%;
            margin: 0;
            padding-left: 15px;
            display: flex;
            .el-form-item__label{
                width: 90px!important;
            }
            .el-form-item__content{
                flex: 1;
                .el-input{
                    width: 100%;
                    // .el-input__inner{
                    //     background-color: #f2f2f2
                    // }
                }
                .el-select{
                    width: 100%;
                }
            }
        }
    }
}
</style>

