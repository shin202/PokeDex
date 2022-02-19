<template>
    <div id="error" class="d-flex justify-content-center align-items-center flex-column">
        <h1>
            <span aria-hidden="true">404</span>
            404
            <span aria-hidden="true">404</span>
        </h1>
        <h3>OOPS...</h3>
        <h3>Something Went Wrong</h3>
        <h3>Try reload this page</h3>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    #error {
        width: 100%;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        background-color: var(--dark);
        position: fixed;
        top: 0;
        left: 0;
        color: var(--white);

        h1 {
            position: relative;
            font-size: 12rem;
            font-weight: bold;
            letter-spacing: 0.5rem;
            text-transform: uppercase;
            text-shadow: 0.25rem 0 0 rgba(255, 0, 0, 0.75),
                        -0.25rem -0.15rem 0 rgba(0, 255, 0, 0.75),
                        -0.15rem 0.25rem 0 rgba(0, 0, 255, 0.75);

            animation: glitch 500ms infinite;

            & > span {
                position: absolute;
                top: 0;
                left: 0;

                &:first-child {
                    animation: glitch 650ms infinite;
                    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
                    transform: translate(-0.15rem, -0.105rem);
                    opacity: 0.8;
                }
                &:last-child {
                    animation: glitch 455ms infinite;
                    clip-path: polygon(0 62%, 100% 62%, 100% 100%, 0 100%);
                    transform: translate(0.15rem, 0.05rem);
                    opacity: 0.8;
                }
            }
        }

        h3 {
            font-size: 3rem;
            text-shadow: 0.1rem 0 0 rgba(255, 0, 0, 0.75),
                        -0.1rem -0.05rem 0 rgba(0, 255, 0, 0.75),
                        -0.05rem 0.1rem 0 rgba(0, 0, 255, 0.75);
        }

        @keyframes glitch {
            0% {
                text-shadow: 0.25rem 0 0 rgba(255, 0, 0, 0.75),
                        -0.25rem -0.15rem 0 rgba(0, 255, 0, 0.75),
                        -0.25rem 0.25rem 0 rgba(0, 0, 255, 0.75);
            }
            24% {
                text-shadow: 0.25rem 0 0 rgba(255, 0, 0, 0.75),
                        -0.25rem -0.15rem 0 rgba(0, 255, 0, 0.75),
                        -0.15rem 0.25rem 0 rgba(0, 0, 255, 0.75);
            }
            25% {
                text-shadow: -0.25rem -0.15rem 0 rgba(255, 0, 0, 0.75),
                        0.15rem 0.15rem 0 rgba(0, 255, 0, 0.75),
                        -0.25rem -0.25rem 0 rgba(0, 0, 255, 0.75);
            }
            49% {
                text-shadow: -0.25rem -0.15rem 0 rgba(255, 0, 0, 0.75),
                        0.15rem 0.15rem 0 rgba(0, 255, 0, 0.75),
                        -0.25rem -0.25rem 0 rgba(0, 0, 255, 0.75);
            }
            50% {
                text-shadow: 0.15rem 0.25rem 0 rgba(255, 0, 0, 0.75),
                        0.15rem 0 0 rgba(0, 255, 0, 0.75),
                        0 -0.15rem 0 rgba(0, 0, 255, 0.75);
            }
            99% {
                text-shadow: 0.15rem 0.25rem 0 rgba(255, 0, 0, 0.75),
                        0.15rem 0 0 rgba(0, 255, 0, 0.75),
                        0 -0.15rem 0 rgba(0, 0, 255, 0.75);
            }
            100% {
                text-shadow: -0.15rem 0 0 rgba(255, 0, 0, 0.75),
                        -0.15rem -0.15rem 0 rgba(0, 255, 0, 0.75),
                        0.25rem 0.15rem 0 rgba(0, 0, 255, 0.75);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *, ::before, ::after {
                animation-delay: -1ms !important;
                animation-duration: 1ms !important;
                animation-iteration-count: 1 !important;
                background-attachment: initial !important;
                scroll-behavior: auto !important;
                transition-duration: 0s !important;
                transition-delay: 0s !important;
        }
}
    }
</style>