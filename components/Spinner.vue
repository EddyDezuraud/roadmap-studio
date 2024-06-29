<template>
    <div class="spinner">
        <div class="spinner-inner"></div>
    </div>
</template>

<style>
.spinner {
    position: relative;
    margin: 40px 0;
    text-align: center;
    font-weight: 600;
}

.spinner-inner {
    width: 25px;
    height: 25px;
    margin: 0 auto;
    display: block;
    position: relative;
}

.spinner-inner:after{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border: solid 2px #EBEEF1;
    border-right: solid 2px currentColor;
    border-radius: 50%;
    left: 0;
    top: 0;
    animation: load_spinner 1.8s ease infinite;
}

@keyframes load_spinner {
  100% {
    transform: rotate(720deg);
  }
}
</style>