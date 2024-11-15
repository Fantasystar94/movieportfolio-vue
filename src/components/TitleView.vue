<template>
        <div className='titleView'>
            <h1>{{ title }}</h1>
        </div>
</template>

<script>
export default {
    name:"titleView",
    props:{
        title : {
            type:String
        }
    },
    setup(props){
        return props;
    }
}
</script>

<style>
.titleView{
    margin:50px auto 100px;
    font-size:25px
}
@media (max-width: 750px) {
    .titleView{margin:25px auto 50px; font-size:1.2em;}
   
}
</style>