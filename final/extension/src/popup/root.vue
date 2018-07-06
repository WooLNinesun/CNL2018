<template>
    <div id="popup">
        <button @click="tab">Find Teammate</button>
    </div>
</template>
<script>
    export default {
        data: () => ( { } ),
        methods: {
            tab () {
                chrome.tabs.create({ url: 'pages/tab.html' })
            }
        }
    }
</script>
<style lang="scss">
    * {
        padding: 0;
    }
    #popup {
        width: 300px; height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  $green: #1ECD97;
    button {
        display: block;
        height: 100%; width: 100%;
        text-align: center;
        background: #fff;
        border: 2px solid $green;
        color:$green;
        letter-spacing: 1px;
        text-shadow: 0;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.25s ease;
        &:hover {
            color:white;
            background: $green;
        }
    }
</style>
