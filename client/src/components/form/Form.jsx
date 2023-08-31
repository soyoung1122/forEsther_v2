const Form = ({action, method, submitEvt, children}) => {
  return (
    <form action={action} method={method} onSubmit={submitEvt}>
      {children}
    </form>
  )
}

export default Form;