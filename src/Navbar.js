import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const Body_nav = styled.div`
    padding: 10px 5px;
    height: 35px;
    background: #9bde59;
  `;

  const Name_nav = styled.div`
    font-size: 24px;
    color: #fff;
    margin-left: 20px;
    position: relative;
  `;

  return (
    <Body_nav>
      <Name_nav>
        <nav className="navbar_name">
          <NavLink
            to="/"
            exact
            style={{ color: "#fff", textDecoration: "none", float: "left" }}
          >
            Pokeapi
          </NavLink>

          <NavLink
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              float: "right",
              marginRight: "20px",
            }}
          >
            Search
          </NavLink>
        </nav>
      </Name_nav>
    </Body_nav>
  );
};

export default Navbar;
