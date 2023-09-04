const Label = ({id, value, className}) => {

  const styles = {
    ladel: {
      fontWeight: 'bold',
      fontSize: '13px'
    }
  }
  return (
    <label htmlFor={id} style={styles.ladel} className={`form-label ${className}`}>{value}</label>
  )
}

export default Label;