const Label = ({id, value}) => {

  const styles = {
    ladel: {
      fontWeight: 'bold',
      fontSize: '13px'
    }
  }

  return (
    <label htmlFor={id} class="form-label" style={styles.ladel}>{value}</label>
  )
}

export default Label;