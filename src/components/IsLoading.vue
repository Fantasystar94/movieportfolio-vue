<template>
          <div class='loading'>
            <span class='spinner'></span>
            <h3 class='notice'>로딩중입니다. </h3>
        </div>
</template>

<script>
export default {
    name:'IsLoading'
}
</script>

<style>
.loading{
    margin:50px auto;
}
.loading .spinner {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: #B00712;  
    border-radius: 50%;
    width: 50px; 
    height: 50px; 
    animation: spin 1s linear infinite;
    display:block;
    margin:0 auto;
}
.loading .notice{
    font-size:30px;
    margin:20px auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg)
    }
    100% {
        transform: rotate(360deg)
    }
}
</style>