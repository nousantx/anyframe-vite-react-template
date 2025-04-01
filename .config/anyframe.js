export default {
  include: ['index.html', 'src/**/*.jsx'],
  preflight: true,
  variants: {
    dark: "[data-theme='dark'] &",
    hvd: '[data-theme=dark] &:hover'
  }
}
