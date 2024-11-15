<template>
  <div class="Top">
    <div class="logo">
        <img src="https://d33wubrfki0l68.cloudfront.net/718c6e48956249121cf3cca1a22a99f8372a3f0d/5f689/_nuxt/img/c2a605f.png" alt="">
    </div>
    <p class="title">moviePortfolio</p>
  </div>
</template>

<script>
export default {
    name:"TopView"
}
</script>

<style>
.Top {
    background-color: black;
    padding: 20px;
    text-align: center;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    gap:0 20px;
}

.Top> .logo{
    width:80px;
    height:auto;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;

}
.Top> .logo>img{
    width:100%;
    height:auto;
}
.Top>.title {
    color: white;
    font-family: 'YourUniqueFont', sans-serif; /* 원하는 독특한 폰트로 변경 */
    font-size: 2.5em; /* 폰트 크기 조절 */
    line-height:2.5em;
    margin: 0;
}

@media (max-width:749px) {
    .Top>.title{font-size:1.8em;line-height:1.8em;}
    .Top> .logo{
    width:50px;
}
}
</style>