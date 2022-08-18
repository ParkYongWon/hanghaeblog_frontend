// eslint-disable-next-line

import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postComments } from "../../redux/modules/commentSlice";

const CommentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  //console.log(comment);

  const onChangeHandler = (event) => {
    if (comment.commentText === "") {
      return alert("내용을 입력해 주세요.");
    }
    setComment(event.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (comment === "") {
      return alert("내용을 입력해 주세요.");
    }
    dispatch(
      postComments({
        contentId: parseInt(id),
        commentText: comment,
      })
    );
    setComment(""); // 작동안함
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <StComentMakeBox>
        <StCommentInPut
          name="commentText"
          onChange={onChangeHandler}
          placeholder="댓글 작성"
          value={comment}></StCommentInPut>

        <StCommentFormButton>댓글 달기</StCommentFormButton>
      </StComentMakeBox>
    </form>
  );
};

export default CommentForm;

const StComentMakeBox = styled.div`
  width: 450px;
  height: 60px;
  border-radius: 10px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StCommentInPut = styled.input`
  width: 320px;
  height: 30px;
  border: 3px solid #eee;
  border-radius: 10px;
  margin: auto;
  display: flex;
`;

const StCommentFormButton = styled.button`
  width: 80px;
  height: 30px;
  border: 1px solid #eee;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  cursor: pointer;
  background-color : white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:hover{  
    background-color: rgba(252, 237, 239, 0.3);
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    color : #ee0000
  }
`;
