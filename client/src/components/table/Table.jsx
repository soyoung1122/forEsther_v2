import React, { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";
import Button from "./Button";
import DotButton from "./DotButton";

const Table = ({ thead, tbody, isChild }) => {
  // 아코디언 상태를 관리하기 위한 상태 변수
  const [activeAccordion, setActiveAccordion] = useState(null);


  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {thead.map((th) => (
              <th key={th.key} className={th.class && th.class.join(" ")}>
                {th.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody.map((tr, index) => (
            <React.Fragment key={index}>
              <tr 
                
              >
                {thead.map((th, i) => {
                  let value = 
                      th.key === "no"
                      ? index + 1
                      : th.isCurrency
                      ? tr[th.key].toLocaleString()
                      :tr[th.key];

                  return (
                    <td
                      key={i}
                      className={
                        th.data && th.data.class ? th.data.class.join(" ") : ""
                      }
                    >
                      {
                        th.isToggle 
                        && <Button 
                            className={`accordion-toggle ${
                              activeAccordion === index ? "" : "collapsed"
                            }`}
                            status={activeAccordion === index ? true : false}
                            onClick={() => {
                              if (activeAccordion === index) {
                                setActiveAccordion(null);
                                
                              } else {
                                setActiveAccordion(index); 
                              }
                            }}
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${index}`}
                            aria-expanded={activeAccordion === index ? "true" : "false"}
                        />
                      }
                      {th.data && th.data.link ? (
                        <Link
                          to={`${th.data.link.origin}/${tr[th.data.link.id]}`}
                        >
                          {value}
                        </Link>
                      ) : (
                        th.isArray
                        ? th.isBadge 
                          ? value.map((d, i) => (
                              <Badge
                                key={i} 
                                text={d[th.data.key]} 
                                color={d['color']} 
                              />
                            ))
                          : value.map((d, i) => {
                            let text = d[th.data.key];
                            if(i !== (value.length-1)) {
                              text += ", "
                            }
                            return (
                              <label>{text}</label>
                            )})
                        : th.isBadge
                        ? <Badge
                            text={value[th.data.key]} 
                            color={value['color'] ? value['color'] : "default"} 
                          />
                        : th.key === "btn"
                        ? <DotButton btns={value} />
                        : value
                      )}
                      
                    </td>
                  );
                })}
              </tr>
              {isChild && activeAccordion === index && (
                <tr 
                  id={`collapse-${index}`} 
                  className={`collapse show`}
                >
                  <td 
                    colSpan={thead.length + 1}
                    style={{backgroundColor: "#eee"}}
                  >
                      <Table thead={thead} tbody={tbody}/></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
