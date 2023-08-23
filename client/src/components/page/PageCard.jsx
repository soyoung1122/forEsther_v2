const PageCard = ({children}) => {

  const styles = {
    container: {
      margin: "40px",
      padding: "20px",
      width: "100%",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    }
  }

  return (
    <div style={styles.container} >
      {children}
    </div>
  )
}

export default PageCard;