import styled from "styled-components";




export const StyledCard= styled.div`
height: 100%;
margin: 0 auto;
max-width: 100% ;
text-decoration: none;
border: 2px solid #4caf50;
background-color: #4caf50;
color: #FFF;
padding: 10px;
cursor: pointer;
transition: 0.5s all ease-out;


&:hover{
    background-color: ${(props)=> props.variant!=='outline'? '#FFF' : ' #4caf50'};
color: ${(props)=> props.variant!=='outline'? '#4caf50' : '#FFF'};
}
`