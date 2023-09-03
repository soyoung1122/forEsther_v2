const PageHeader = ({ children}) => {

  const styles = {
    header: {
      marginBottom: "20px",
      padding: "20px 0 10px",
      borderBottom: "1px solid #ddd"
    }
  }

  return (
    <header style={styles.header} className="d-flex justify-content-between">
      {children}
    </header>
  )
}

export default PageHeader;