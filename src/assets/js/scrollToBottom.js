export default ({ $el: { lastChild: pre } }) => {
  pre.scrollTop = pre.scrollHeight
}
