
const Badge = ({text, color}) => {

  const styleSheet = [
    {
      backgroundColor: "#f4cccc"
    },
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
  ];

  return (
    <span 
      className="badge" 
      style={{...styleSheet[color], 
        color: "black", 
        marginRight: "4px"
      }}
    >{text}</span>
  );
}

export default Badge;