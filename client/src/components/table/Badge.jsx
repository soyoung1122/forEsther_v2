
const Badge = ({text, color}) => {

  const styleSheet = {
    "red" : {
      backgroundColor: "#f4cccc"
    },
    "orange" : {
      backgroundColor: "#fce5cd"
    },
    "yellow" : {
      backgroundColor: "#fff2cc"
    },
    "green" : {
      backgroundColor: "#d9ead3"
    },
    "blue" : {
      backgroundColor: "#c9daf8"
    },
    "purple" : {
      backgroundColor: "#d9d2e9"
    },
    "default" : {
      backgroundColor: "#eee"
    },
  };

  return (
    <span 
      className="badge" 
      style={{...styleSheet[color], 
        color: "black", 
        marginRight: "4px",
        fontSize: "13px"
      }}
    >{text}</span>
  );
}

export default Badge;