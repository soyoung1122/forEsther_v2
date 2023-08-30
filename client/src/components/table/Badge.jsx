
const Badge = ({text, color}) => {

  const styleSheet = [
    {"red" : {
      backgroundColor: "#f4cccc"
    }},
    {
      backgroundColor: "#fce5cd"
    },
    {
      backgroundColor: "#fff2cc"
    },
    {
      backgroundColor: "#d9ead3"
    },
    {
      backgroundColor: "#c9daf8"
    },
    {
      backgroundColor: "#d9d2e9"
    },
    {
      backgroundColor: "#eee"
    },
  ];

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