const PageTitle = ({value}) => {

  const styles = {
    title: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#212529"
    }
  }

  return (
    <h2 style={styles.title}>{value}</h2>
  )
}

export default PageTitle;