<template>
  <div>
    <div id="singer">
      <div id="singer_classify">
        <ul>
          <li>全部</li>
          <li>大陆</li>
          <li>港台</li>
          <li>欧美</li>
          <li>日韩</li>
          <li>其他</li>
        </ul>
        <ul>
          <li>全部</li>
          <li>男</li>
          <li>女</li>
          <li>组合</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  
</script>
<style scoped>
#singer{
  width: 100%;
  height: 100%;
  margin-top: 3.7rem;
}
#singer_classify ul{
  width: 100%;
  display: flex;
  flex-flow: row row;
  justify-content: space-around;
  align-items: flex-end;
  border-bottom: 2px solid brown;
}
#singer_classify ul:nth-of-type(1) li{
  width: 16.5%;
  height:30px;
  text-align: center;
}
#singer_classify ul:nth-of-type(2) li{
  width: 25%;
  height: 100%;
  margin-left: 4%
}
#singer_classify ul li:hover{
  background:#795548;
  color: #fff;
}
</style>
