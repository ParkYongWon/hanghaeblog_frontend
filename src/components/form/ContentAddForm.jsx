// eslint-disable-next-line

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { postContent } from "../../redux/modules/contentSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [content, setContent] = useState({
    imageUrl: "",
    title: "",
    text: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      // content.imageUrl.trim() === "" ||
      content.title.trim() === "" ||
      content.text.trim() === ""
    ) {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(postContent(content));
    navigate(-1);
    setContent({ imageUrl: "", title: "", text: "" });
  };

  //console.log(content);
  return (
    <StContentAddBox>
      <form>
        {/* <div>
          <StContentAddFormInput
            name="imageUrl"
            onChange={onChangeHandler}
            placeholder="url 주소를 입력해 주세요."
            value={content.imageUrl}></StContentAddFormInput>
        </div> */}

        <div>
          <StContentAddFormInput
            name="title"
            onChange={onChangeHandler}
            placeholder="제목을 입력해 주세요."
            value={content.title}></StContentAddFormInput>
        </div>

        <div>
          <StContentAddFormInput3
            name="text"
            onChange={onChangeHandler}
            placeholder="내용을 입력해 주세요."
            value={content.text}></StContentAddFormInput3>
        </div>

        <StContentAddButtons>
          <StContentAddFormButton onClick={onSubmitHandler}>
            저장하기
          </StContentAddFormButton>
          <StContentAddFormButton onClick={() => navigate("/")}>
            취소
          </StContentAddFormButton>
        </StContentAddButtons>
      </form>
    </StContentAddBox>
  );
};

export default ContentAddForm;

const StContentAddBox = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const StContentAddFormInput = styled.input`
  width: 450px;
  height: 90px;
  border-radius: 10px;
  margin: auto auto 5px auto;
  border: 3px solid #eee;
  display: flex;
`;
const StContentAddFormInput3 = styled.input`
  width: 450px;
  height: 250px;
  margin: auto;
  border-radius: 10px;
  border: 3px solid #eee;
`;

const StContentAddFormButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #eee;
  cursor: pointer;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:hover {
    background-color: rgba(252, 237, 239, 0.1);
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    color: #ee0000;
  }
`;
const StContentAddButtons = styled.div`
  width: 458px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin: 20px auto;
`;
