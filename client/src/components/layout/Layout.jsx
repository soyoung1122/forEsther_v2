import Navbar from "../navbar/Navbar";


const Layout = ({ children }) => {

  const styles = {
    mainContainer: {
      overflow: "hidden"
    },
    dummy: {
      padding: "0"
    },
    pageContainer: {
      padding: "0",
      display: "flex", 
      flex: '1',
    }
  }

  return (
    <div className="layout-container"  style={styles.mainContainer}>
      <Navbar />
      <div className="row" style={{height: "100vh", overFlowX: "hidden", overflowY: "auto"}}>
        <div className="col-md-2" style={styles.dummy}></div>
        <main className="col-md-10" style={styles.pageContainer}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout;
