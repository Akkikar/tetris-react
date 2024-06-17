import styled from "styled-components";
import bgImage from "../../img/bg.png";

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${bgImage}) no-repeat center center fixed;
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 20px;
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
`;
