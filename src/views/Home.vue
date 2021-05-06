<template>

</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',

  components: {
    
  },
    mounted(){
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  .menuitem{
    width: 23.2%;
    height: 200px;
    box-sizing: border-box;
    margin: 0.8%;
    float: left;
    background-color: #fff;
    cursor: pointer;
    .centericonbox{
      width:90px;
      height:90px;
      margin:0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-top: 5px;
      i{
        font-size: 60px;
      }
    }
    .centerdesbox{
      width:90px;
      height:30px;
      margin:0 auto;
      margin-top: 20px;
      text-align: center;
      font-size: 20px;
    }
    .leftpic{
      width: 0;
      height: 0;
      border-right:30px solid transparent;
	    border-left:30px solid transparent;
      border-bottom:30px solid red;
      margin-top: -4px;
      margin-left: -19px;
      transform:rotate(-45deg);
      -ms-transform:rotate(-45deg); 	/* IE 9 */
      -moz-transform:rotate(-45deg); 	/* Firefox */
      -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
      -o-transform:rotate(-45deg); 	/* Opera */
      overflow: hidden;
    }
  }
  .menuitem:nth-child(1) .centericonbox{
     color:#86e3ce;
     border: 2px solid #86e3ce;
  }
  .menuitem:nth-child(2) .centericonbox{
     color:#b4d575;
     border: 2px solid #b4d575;
  }
  .menuitem:nth-child(3) .centericonbox{
     color:#dfbf7c;
     border: 2px solid #dfbf7c;
  }
  .menuitem:nth-child(4) .centericonbox{
     color:#fa897b;
     border: 2px solid #fa897b;
  }
  .menuitem:nth-child(5) .centericonbox{
     color:#c091d7;
     border: 2px solid #c091d7;
  }
  .menuitem:nth-child(6) .centericonbox{
     color:#89bbe2;
     border: 2px solid #89bbe2;
  }
  .menuitem:nth-child(7) .centericonbox{
     color:#8de3e4;
     border: 2px solid #8de3e4;
  }
  .menuitem:nth-child(8) .centericonbox{
     color:#8de49d;
     border: 2px solid #8de49d;
  }
}
</style>
