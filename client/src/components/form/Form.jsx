const Form = ({action, method, submitEvt, children, enctype}) => {
  return (
    <form action={action} method={method} onSubmit={submitEvt} enctype={enctype}>
      {children}
    </form>
  )
}

export default Form;