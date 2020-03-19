<template>
    <div class="star" :class="starType">
        <span v-for="(s,i) in scoreArr" :key="i" class="star-item" :class="s"></span>
    </div>
</template>

<script>
    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'

    export default {
        name: "Star",
        props: {
            score: Number,
            size: String
        },
        computed: {
            starType() {
                return 'star-' + this.size
            },
            scoreArr() {
                let val = Math.floor(this.score * 2) / 2
                // 3.5  0 1 2 3
                let arr = []

                for (let i = 0; i < LENGTH; i++) {
                    if (i < val && i + 1 <= val) {
                        arr.push(CLS_ON)
                    } else if (i < val && i + 1 > val) {
                        arr.push(CLS_HALF)
                    } else {
                        arr.push(CLS_OFF)
                    }
                }

                return arr
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/mixin";

    .star {
        font-size: 0;
        display: inline-block;

        .star-item {
            display: inline-block;
        }

        &.star-48 {
            .star-item {
                width: 24px;
                height: 24px;
                margin-right: 22px;

                &:last-child {
                    margin-right: 0;
                }

                &.on {
                    @include bg-img('star48_on', 24px 24px)
                }

                &.half {
                    @include bg-img('star48_half', 24px 24px)
                }

                &.off {
                    @include bg-img('star48_off', 24px 24px)
                }
            }
        }

        &.star-36 {
            .star-item {
                width: 15px;
                height: 15px;
                margin-right: 6px;

                &:last-child {
                    margin-right: 0;
                }

                &.on {
                    @include bg-img('star36_on', 15px 15px)
                }

                &.half {
                    @include bg-img('star36_half', 15px 15px)
                }

                &.off {
                    @include bg-img('star36_off', 15px 15px)
                }
            }
        }

        &.star-24 {
            .star-item {
                width: 10px;
                height: 10px;
                margin-right: 3px;

                &:last-child {
                    margin-right: 0;
                }

                &.on {
                    @include bg-img('star24_on', 10px 10px)
                }

                &.half {
                    @include bg-img('star24_half', 10px 10px)
                }

                &.off {
                    @include bg-img('star24_off', 10px 10px)
                }
            }
        }
    }
</style>