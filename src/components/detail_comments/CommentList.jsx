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
  console.log(comments);

  useEffect(() => {
    dispatch(getComments(parseInt(id)));
  }, [id, dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteComment(id));
  };

  // const [isEdit, setIsEdit] = useState(false);
  // const [newDesc, setnewDesc] = useState(comments.commentText);
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
      CommentList
      <StCommentsBody>
        {comments &&
          comments.map((comment, i) => {
            return (
              <div key={comment.id}>
                <div>
                  ID#: {comment.id}
                  작성자: {comment.author}
                  댓글: {comment.commentText}
                </div>
                <div></div>
                {/* <div>
                    {isEdit ? (
                      <input
                        className="isEditInput"
                        type="text"
                        onChange={onChange}
                        initValue={newDesc}
                      />
                    ) : (
                      <p>{comment.commentText}</p>
                    )}
                  </div>
                  <button onClick={onPatch}>{isEdit ? "취소" : "수정"}</button> */}
                <StCommentButtons>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      const result = window.confirm("진짜로 삭제하시겠습니까?");
                      if (result) {
                        return deleteHandler(comment.id);
                      } else {
                        return;
                      }
                    }}>
                    삭제
                  </button>
                </StCommentButtons>
              </div>
            );
          })}
      </StCommentsBody>
    </StCommentList>
  );
};

export default CommentList;

const StCommentList = styled.div`
  width: 450px;
  height: 250px;
  border-radius: 10px;
  border: 4px solid rgb(2, 19, 19);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow-y: scroll;
`;

const StCommentsBody = styled.div`
  width: 430px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid rgb(2, 19, 19);
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

const StCommentButtons = styled.div`
  width: 96px;
  height: 30px;
  display: flex;
`;
