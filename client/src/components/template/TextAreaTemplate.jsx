import { COLORS } from "assets/util/globales";
import styled from "styled-components";

const TextAreaTemplate = styled.textarea`
   resize: none;
   width: 100%;
   padding: 5px;
   background-color:transparent;
   border: 1px solid rgba(255,255,255,0.1);
   color: ${COLORS.SUCCESS_SECONDARY};
   border-radius: 5px;

   &:focus {
      outline: none;
      color: rgba(0,175,255,0.8);
   }
   &::placeholder {
      color: rgba(255,255,255,0.5);
   }
`

export default TextAreaTemplate;