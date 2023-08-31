const FormGroup = ({type, children}) => {
  let className = '';

  switch(type) {
    case "text":
      className = 'form-group';
      break;
    case "checkbox":
      className = 'form-check';
      break;
    default:
      className = 'form-group';
      break;
  }


  return (
    <div class={className}>
      {children}
    </div>
  )
}

export default FormGroup;