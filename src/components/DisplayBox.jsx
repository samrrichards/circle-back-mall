import React from 'react'; 
import styled from 'styled-components';

const DisplayWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: block;
  border: 2px lightgray solid;
`;

const SvgBox = styled.svg`
  background-image: url("https://res.cloudinary.com/comixcloud/image/upload/v1579135069/circle-mall-background_caxxbq.png");
  background-size: 100%;
  margin-left: 1%;
  margin-right: 1%;
`;

const DisplayBox = () => (
   <DisplayWrapper>
     <SvgBox viewBox='0 0 1440 866' xmlns='http://www.w3.org/2000/svg' />
   </DisplayWrapper>
);

export default DisplayBox;