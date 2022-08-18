// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../elements/Button";
import axios from "axios";

const GlobalHeadder = ({ children }) => {
  const logoutServer = process.env.REACT_APP_LOGOUT;

  const { userInfo } = useSelector((state) => state.user);
  // //console.log(userInfo);

  const loginId = localStorage.getItem("loginId");

  // 로그아웃
  const logout = async () => {
    const confirm = window.confirm("Are you Sure?");
    if (confirm === true) {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${userToken}`,
        refreshToken: `${refreshToken}`,
      };
      axios.post(
        logoutServer,
        {},
        {
          headers: headers,
        }
      );
      window.localStorage.clear();
      window.location.replace("/");
    } else if (confirm === false) {
      return;
    }
  };

  return (
    <StGlobalHeader>
      {children}
      <Link to="/">
        <LogoContainer></LogoContainer>
      </Link>

      <LoginContainer>
        <div>{userInfo ? `${loginId}님께서 로그인중` : "로그인하세요!"}</div>
        <div className="cta">
          {userInfo ? (
            <StGlobalHeaderButton
              className="button"
              onClick={logout}
              size="medium">
              <span style={{ color: "white" }}>로그아웃</span>
            </StGlobalHeaderButton>
          ) : (
            <NavHeaderUser>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}>
                로그인 /
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}>
                &nbsp;회원가입
              </Link>
            </NavHeaderUser>
          )}
        </div>
      </LoginContainer>
    </StGlobalHeader>
  );
};

export default GlobalHeadder;

const StGlobalHeader = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin: auto;
  padding: 20px;
`;

const LogoContainer = styled.div`
  background-image: url(/logo.png);
  background-size: cover;
  background-position: center;
  width: 109px;
  padding: 17.5px 0;
  cursor: pointer;
  margin: 0;
`;

const NavHeaderUser = styled.div`
  display: flex;
`;

const LoginContainer = styled.div`
  display: block;
`;

const StGlobalHeaderButton = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #eee;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 5px; */
  cursor: pointer;
  background-color: #ee0000;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

