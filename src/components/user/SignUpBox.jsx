// eslint-disable-next-line

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import { registerUser } from "../../redux/modules/userActions";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../elements/Button";

const SignUpBox = () => {
  const [customError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to home
    if (userInfo) navigate("/");
    //console.log(userInfo);
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
    //console.log(success);
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.passwordConfirm) {
      alert("Password mismatch");
      return;
    }
    // transform id string to lowercase to avoid case sensitivity issues during login
    data.loginId = data.loginId.toLowerCase();

    dispatch(registerUser(data));
  };

  return (
    <SignUpBoxContainer>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* render error message with Error component, if any */}
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}

        <SignUpInputGroup>
          <label htmlFor="아이디">아이디</label>
          <SignUpInput
            type="loginId"
            className="form-input"
            {...register("loginId")}
            required
            minLength={4}
            maxLength={12}
            placeholder="아이디를 입력하세요"
          />
        </SignUpInputGroup>
        <SignUpInputGroup>
          <label htmlFor="password">비밀번호</label>
          <SignUpInput
            type="password"
            className="form-input"
            {...register("password")}
            required
            minLength={4}
            maxLength={32}
            placeholder="비밀번호를 입력하세요"
          />
        </SignUpInputGroup>
        <SignUpInputGroup>
          <label htmlFor="비밀번호 확인">비밀번호 확인</label>
          <SignUpInput
            type="password"
            className="form-input"
            {...register("passwordConfirm")}
            required
            minLength={4}
            maxLength={32}
            placeholder="비밀번호 확인하세요"
          />
        </SignUpInputGroup>
        <Button
          type="submit"
          className="button"
          disabled={loading}
          size="medium"
          style={{ textAlign: "center", margin: "0 auto" }}>
          회원가입
        </Button>
      </form>
    </SignUpBoxContainer>
  );
};

const SignUpBoxContainer = styled.div`
  display: block;
  width: 400px;
  margin: 20px auto;
  border: 1px solid #eee;
  padding: 20px;
`;

const SignUpInputGroup = styled.div`
  position: relative;
  margin: 20px 0;
`;

const SignUpInput = styled.input`
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

export default SignUpBox;
