<template>
    <div class="modal-box">
        <b-modal v-model="modal_show" ref="modal-center" centered button-size="lg">
            <template #modal-header>
                <slot name="modal-header">Header</slot>
            </template>
            <slot name="default">
                Content
            </slot>
        </b-modal>
    </div>
</template>
<script>
    export default {
        name: 'Modal',
        data() {
            return {
                modal_show: false,
            }
        },
        methods: {
            toggle_modal() {
                this.modal_show = !this.modal_show;
            },
        },
        mounted() {
            this.$bus.on('modal_show', () => {
                this.toggle_modal();
            });
            this.$emit('modal_show', this.modal_show);
        },
        watch: {
            modal_show() {
                this.$emit('modal_show', this.modal_show);
            }
        },
    }
</script>

<style lang="scss" scoped>
    * {
        font-size: 1.6rem;
        text-transform: capitalize;
        text-align: center;
    }
</style>