import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../../styles/common/Navbar.css';
import LogoImage from '../../assets/logo.png';
import LogoIcon from "../../assets/logoIcon.png";
import MenuIcon from "../icon/MenuIcon";


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);

  const menu = [
    {
      index: 0,
      mainMenu: "재고관리",
      path: "/items",
      subMenu: [
        {
          index: 0,
          menu: "품목 관리",
          path: "/items"
        },
        {
          index: 1,
          menu: "BOM 관리",
          path: "/boms"
        },
        {
          index: 2,
          menu: "단가 관리",
          path: "/unitprices"
        },
        {
          index: 3,
          menu: "시리얼로트 관리",
          path: "/seriallot"
        },
      ]
    },
    {
      index: 1,
      mainMenu: "생산관리",
      path: "/items",
      subMenu: [
        {
          index: 0,
          menu: "생산계획서 관리"
        },
        {
          index: 1,
          menu: "생산 관리"
        },
      ]
    },
    {
      index: 2,
      mainMenu: "발주관리",
      path: "/items",
      subMenu: [
        {
          index: 0,
          menu: "발주계획서 관리"
        },
        {
          index: 1,
          menu: "발주서 관리"
        },
      ]
    },
  ]

  // 대메뉴 클릭 시 이벤트
  const showMenuItem = (e) => {
    e.preventDefault();
  
    if(showMenu == e.currentTarget.name) {
      setShowMenu(null);
      return 
    }

    setShowMenu(e.currentTarget.name);
    setActiveMenu(0);
  }

  // 소메뉴 클릭 시 이벤트
  const clickSubMenuItem = (e) => {
    setActiveMenu(e.currentTarget.name)
  }

  return (
    <nav className="position-fixed col-md-2 d-none d-md-block bg-dark text-white vh-100 ">
      <div className="p-3">
        <h2 className="mt-2 mb-4" >
          <Link className="nav-link active fw-bold fs-5 d-flex logo" to="#">
            <div className="logo-icon">
              <img src={LogoIcon} alt="forEsther icon" />
            </div>
            <div className="logo-text">
              <img src={LogoImage} alt="forEsther" />
            </div>
          </Link>
        </h2>
        <ul className="nav flex-column">
          {
            menu.map( mainMenu => (
              <li className="nav-item" key={mainMenu.index}>
                <Link 
                  className="nav-link text-white fw-bold mt-1 mb-1" 
                  name={mainMenu.index}
                  to={mainMenu.path}
                  onClick={showMenuItem}
                >
                  {mainMenu.mainMenu}
                </Link>
                <div 
                  name={mainMenu.index} className={`collapse ${showMenu == mainMenu.index ? 'show' : ''}`}>
                  <ul className="nav flex-column">
                    {
                      mainMenu.subMenu.map( subMenu => (
                        <li className="nav-item d-flex justify-content-between" key={subMenu.index}>
                          <Link 
                            to={subMenu.path}
                            className={`nav-link text-white nav-sub-item d-flex ${activeMenu == subMenu.index ? 'active' : ''}`} 
                            name={subMenu.index}
                            onClick={clickSubMenuItem}
                          >
                            <span style={{marginRight: "8px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <MenuIcon />
                            </span>
                            {subMenu.menu}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;