// eslint-disable-next-line

import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/modules/userActions";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import Button from "../../elements/Button";
import Kakao from "./Kakao";

const LoginBox = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user);
  // //console.log(error);

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to home screen
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
    setTimeout(() => {
      window.location.replace("/");
    }, 300);
  };

  return (
    <LoginBoxContainer>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}

        <LoginInputGroup>
          <label htmlFor="아이디">아이디</label>
          <LoginInput
            required={true}
            minLength={3}
            type="loginId"
            className="form-input"
            {...register("loginId")}
            placeholder="아이디를 입력하세요"
          />
        </LoginInputGroup>
        <LoginInputGroup>
          <label htmlFor="password">비밀번호</label>
          <LoginInput
            required={true}
            minLength={3}
            type="password"
            className="form-input"
            {...register("password")}
            placeholder="비밀번호를 입력하세요"
          />
        </LoginInputGroup>
        <Button
          style={{ textAlign: "center", margin: "0 auto", width: "284px" }}
          type="submit"
          className="button"
          // disabled={loading}
          size="medium">
          로그인
        </Button>
        {/* <Kakao /> */}
      </form>
    </LoginBoxContainer>
  );
};

const LoginBoxContainer = styled.div`
  display: block;
  width: 400px;
  margin: 20px auto;
  border: 1px solid #eee;
  padding: 20px;
`;
const LoginInputGroup = styled.div`
  position: relative;
  margin: 20px 0;
`;
const LoginInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 11pt;
  width: 100%;
  :placeholder-shown + label {
    font-size: 10px;
    top: 15px;
  }
  :focus + label,
  label {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }
  :focus,
  input:not(:placeholder-shown) {
    border-bottom: solid 1px #8aa1a1;
    outline: none;
  }
`;

export default LoginBox;
