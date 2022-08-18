// eslint-disable-next-line

import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContent } from "../../redux/modules/contentSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ContentCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contents = useSelector((state) => state.contentSlice.list.data);
  //console.log(contents);

  useEffect(() => {
    dispatch(getContent());
  }, [dispatch]);

  const addFormPageHandler = () => {
    const userToken = localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : null;
    if (userToken) {
      navigate("/add");
    } else {
      window.alert("로그인 해주세요");
    }
  };

  return (
    <StContentBoxs>
      {/* <StContentContainer onClick={() => navigate("/add")}> */}
      <StContentContainer onClick={addFormPageHandler}>
        {/* <h1>(●'◡'●)</h1> */}
        <h1>
          <strong>+</strong>
        </h1>
      </StContentContainer>
      {contents &&
        contents.map((content, index) => {
          return (
            <div
              onClick={() => {
                const userToken = localStorage.getItem("userToken")
                  ? localStorage.getItem("userToken")
                  : null;
                if (userToken) {
                  navigate(`/content/${content.id}`);
                } else {
                  window.alert("로그인 해주세요");
                }
              }}
              key={index}>
              <StContentContainer>
                {/* <div>{content.imageUrl}</div> */}
                <h3>{content.title}</h3>
                <h4>{content.text}</h4>
              </StContentContainer>
            </div>
          );
        })}
    </StContentBoxs>
  );
};

export default ContentCard;

const StContentContainer = styled.div`
  width: 170px;
  height: 170px;
  margin: 10px;
  /* border: 1px solid rgb(2, 19, 19); */
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:hover {
    background-color: rgba(252, 237, 239, 0.1);
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    color: #ee0000;
  }
`;

const StContentBoxs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
