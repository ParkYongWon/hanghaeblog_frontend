import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate, useParams } from "react-router-dom";
import { deleteContent, updateContent } from "../../redux/modules/contentSlice";
import { useState, useEffect } from "react";
import { getSingleContent } from "../../redux/modules/contentSlice";

const ContentDetailContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const content = useSelector((state) => state.contentSlice.singleContent);
  // //console.log(content.author);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleContent(parseInt(id)));
  }, [id, dispatch]);

  const [isEdit, setIsEdit] = useState(false);

  const [newBody, setNewBody] = useState({
    imageUrl: "",
    title: "",
    text: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewBody({
      ...newBody,
      [name]: value,
    });
  };

  const onEditHandler = () => {
    const loginId = localStorage.getItem("loginId")
      ? localStorage.getItem("loginId")
      : null;
    if (loginId === content.author) {
      if (isEdit) {
        dispatch(
          updateContent({
            id: parseInt(id),
            ...newBody,
          })
        );
      }
      setIsEdit(!isEdit);
      setNewBody({
        imageUrl: "",
        title: "",
        text: "",
      });
    } else {
      window.alert("다른 사용자에 게시글입니다");
    }
  };

  const onCancelButtonHandler = () => {
    setIsEdit(false);
  };

  const deleteHandler = () => {
    const loginId = localStorage.getItem("loginId")
      ? localStorage.getItem("loginId")
      : null;
    if (loginId === content.author) {
      dispatch(deleteContent(parseInt(id)));
      navigate("/");
    } else {
      window.alert("This Post is not belong to you!");
    }
  };

  // //console.log(newBody);

  return (
    <>
      <StContentDetailContainerBox>
        {isEdit === false ? (
          <>
            {/* <StImageUrlBox>
              <div>{content.imageUrl}</div>
            </StImageUrlBox> */}
            <div>
              <h3>제목 : {content.title}</h3>
              <h4>내용 : {content.text}</h4>
            </div>
            <div>
              <StDetailButtons
                onClick={(event) => {
                  event.stopPropagation();
                  const result = window.confirm("진짜로 삭제하시겠습니까?");
                  if (result) {
                    return deleteHandler();
                  } else {
                    return;
                  }
                }}>
                삭제하기
              </StDetailButtons>
            </div>
          </>
        ) : (
          <>
            {/* <StImageUrlBox>
              <input type="file" />
            </StImageUrlBox> */}
            <input
              type="text"
              name="title"
              value={newBody.title}
              onChange={onChangeHandler}
            />
            <br />
            <input
              value={newBody.text}
              name="text"
              type="text"
              onChange={onChangeHandler}
            />
            <StDetailButtons onClick={onCancelButtonHandler}>
              취소하기
            </StDetailButtons>
          </>
        )}
        <div>
          <StDetailButtons2 onClick={onEditHandler}>
            {isEdit === false ? "수정하기" : " 저장하기"}
          </StDetailButtons2>
        </div>
      </StContentDetailContainerBox>
    </>
  );
};

export default ContentDetailContainer;

const StContentDetailContainerBox = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;
  /* border: 1px solid rgb(2, 19, 19); */
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StImageUrlBox = styled.div`
  width: 450px;
  height: 250px;
  border: 1px solid rgb(2, 19, 19);
  margin-top: 15px;
  /* margin: auto; */
  display: flex;
  flex-direction: column;
`;

const StDetailButtons = styled.button`
  width: 100px;
  height: 25px;
  border: 1px solid #eee;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:hover {
    background-color: rgba(252, 237, 239, 0.3);
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    color: #ee0000;
  }
`;

const StDetailButtons2 = styled.button`
  width: 100px;
  height: 25px;
  border: 1px solid #eee;
  border-radius: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:hover {
    background-color: rgba(210, 253, 222, 0.3);
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    color: #ee0000;
  }
  /* flex-direction: column;  */
`;
