<template>
    <div class="spinner">
        <div class="spinner-inner"></div>
    </div>
</template>

<style>
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid #ccc;
    animation: spin 1s linear infinite;
}

.spinner-inner {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border-top: 3px solid #888;
    border-right: 3px solid transparent;
    animation: spin-inner 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes spin-inner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}
</style>