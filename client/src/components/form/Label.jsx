const Label = ({id, value, className}) => {

  const styles = {
    ladel: {
      fontWeight: 'bold',
      fontSize: '13px'
    }
  }

  return (
    <label htmlFor={id} class="form-label" style={styles.ladel} className={className}>{value}</label>
  )
}

export default Label;