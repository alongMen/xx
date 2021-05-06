<template>
    <div class="searchContainer">
        <label class="label4">
            <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="list in modelP"
                        :key="list.modelP"
                        :label="list.title"
                        :value="list.modelP">
                        </el-option>
            </el-select>
        </label>
        <label class="label1">
            <el-select v-if="value=='isAdmin'" v-model="inputVal" clearable placeholder="请选择">
                        <el-option
                        label="是"
                        value="0">
                        </el-option>
                        <el-option
                        label="否"
                        value="1">
                        </el-option>
            </el-select>
            <el-cascader
                     v-if="value=='roles'"
                    :options="options"
                    :props="roles"
                    @change='tagChange'
                    v-model="inputVal"
                    clearable></el-cascader>
            <el-input v-if="value!='roles'&&value!='isAdmin'" v-model="inputVal" placeholder="请输入搜索内容"></el-input> 
        </label>
        <label class="label2"><el-button type="primary" icon="el-icon-search" @click="goSearch">搜索</el-button></label>
        <label class="label3"><el-button type="primary" icon="el-icon-plus" @click="AddOne">新增</el-button></label>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '',
            inputVal:'',
            roles: {value:'id',label:'name',multiple: true }
        }
    },
    props: {
        modelP:{
            type:Array,
            default:''
        },
        options:{
            type:Object,
            default:''
        }
    },
    methods:{
        AddOne(){
            this.$emit('listChild')
        },
        goSearch(){
            this.$emit('listChild1',)
        }
    }
}
</script>
<style lang="less">
.searchContainer{
    width: 100%;
    height: 100%;
    display: flex;
    label{
            display: flex;
            height: 50px;
            align-items: center;
            justify-content: center;
            input{
                width:100%;
            }
        }
        .label1{
            width: 45%;
            div{
                width: 95%;
            }
            input{
                background-color: #f2f2f2;
                border: solid 1px #d2d2d2; 
                outline: none;
                height: 50px;
            }
        }
        .label4{
            width: 25%;
            input{
                background-color: #f2f2f2;
                border: solid 1px #d2d2d2; 
                outline: none;
                height: 50px;
            }
        }
        .label2{
            width: 15%;
            button{
                width: 80%;
                background-color:#AC342D;
                border: none;
                font-size: 18px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .label3{
            width: 15%;
            button{
                width: 80%;
                border: 1px solid #AC342D;
                background-color: #FFFFFF;
                color: #AC342D;
                font-size: 18px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
}
</style>

