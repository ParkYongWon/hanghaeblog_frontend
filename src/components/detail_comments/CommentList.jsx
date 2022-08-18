// eslint-disable-next-line

import { React, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../redux/modules/commentSlice";
import { useParams } from "react-router-dom";
import { deleteComment, patchComment } from "../../redux/modules/commentSlice";

const CommentList = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const comments = useSelector((state) => state.commentSlice.comments);
  //console.log(comments);

  const [isEdit, setIsEdit] = useState(false);
  const [newDesc, setnewDesc] = useState(comments);

  //console.log(newDesc);

  useEffect(() => {
    dispatch(getComments(parseInt(id)));
  }, [id, dispatch]);

  const deleteHandler = useCallback(
    (id) => {
      if (!isEdit) {
        dispatch(deleteComment(id));
        setIsEdit(false);
      } else if (isEdit) {
        // toggleActive(id);
        setIsEdit(!isEdit);
      }
    },
    [isEdit]
  );

  // const onChange = useCallback(
  //   (e) => {
  //     setnewDesc(e.target.value);
  //   },
  //   [newDesc]
  // );

  // const [isActive, setIsActive] = useState({
  //   id: 0,
  //   status: false,
  // });

  // const toggleActive = (id) => {
  //   if (!isActive.status) {
  //     setIsActive({ ...isActive, id, status: true });
  //   } else {
  //     setIsActive({ ...isActive, id: 0, status: false });
  //   }
  // };

  // const onPatch = useCallback(() => {
  //   if (isEdit) {
  //     if (newDesc !== "") {
  //       dispatch(
  //         patchComment({
  //           id,
  //           newDesc,
  //         })
  //       );
  //     }
  //     setIsEdit(false);
  //   } else {
  //     setIsEdit(true);
  //   }
  //   toggleActive(id);
  // }, [isEdit, newDesc]);

  return (
    <StCommentList>
      {/* CommentList */}
      {comments &&
        comments.map((comment) => {
          return (
            <div key={comment.id}>
              <StCommentsBody>
                <div>
                  ID#: {comment.id}
                  작성자: {comment.author}
                  댓글: {comment.commentText}
                </div>
                {/* <div>
                  {isEdit ? (
                    <input
                      className="isEditInput"
                      type="text"
                      onChange={onChange}
                      defaultValue={newDesc}
                    />
                  ) : (
                    <p>{comment.commentText}</p>
                  )}
                </div> */}
                <StCommentButtons>
                  {/* <button onClick={onPatch}>수정</button> */}
                  <StCommentBtn
                    onClick={(event) => {
                      event.stopPropagation();
                      const result = window.confirm("진짜로 삭제하시겠습니까?");
                      if (result) {
                        return deleteHandler(comment.id);
                      } else {
                        return;
                      }
                    }}>
                    {isEdit ? "취소" : "삭제"}
                  </StCommentBtn>
                </StCommentButtons>
              </StCommentsBody>
            </div>
          );
        })}
    </StCommentList>
  );
};

export default CommentList;

const StCommentList = styled.div`
  width: 450px;
  height: 250px;
  border-radius: 10px;
  border: 2px solid #eee;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  align-content: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const StCommentsBody = styled.div`
  width: 430px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #eee;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-direction: row;
`;

const StCommentButtons = styled.div`
  width: 50px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-end;
`;

const StCommentBtn = styled.button`
  width: 50px;
  height: 30px;
  border: 1px solid #eee;
  border-radius: 5px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
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