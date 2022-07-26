import styled from "styled-components";
import { COLORS } from "assets/util/globales";

const TextTemplate = styled.input`
   width: 100%;
   border-radius: 5px;
   padding: 5px;
   background-color:transparent;
   border: ${({primary}) => primary ? "1px solid rgba(255,255,255,0.1)": "1px solid #bbb"} ;
   color: ${({colorText}) => colorText ? colorText : COLORS.SUCCESS_SECONDARY} ;
   
   &:focus {
      outline: none;
      color: ${({colorText}) => colorText ? colorText :"rgba(0,175,255,0.8)"} ;
   }
   &::placeholder {
      color: #bbb;
   }
`

const NumberTemplate = styled.input`
   color: ${COLORS.SUCCESS_SECONDARY};
   font-weight: bold;
   outline: none;
   
   &::placeholder {
      color: ${COLORS.SUCCESS_SECONDARY};
   }
`

const RangeTemplate = styled.input`

`

export {
   TextTemplate,
   NumberTemplate,
   RangeTemplate
}