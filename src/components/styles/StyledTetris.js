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
    justify-content: space-around; /* Adjusts spacing between game area and side content */
    align-items: flex-start;
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px; /* Limit maximum width of the Tetris container */
    width: 100%;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);

    aside {
        flex: 0 0 auto; /* Prevents aside from growing */
        width: 200px; /* Fixed width for aside content */
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 1200px) {
        flex-direction: column; /* Stack content vertically on smaller screens */
        align-items: center; /* Center items horizontally */
    }

    @media (max-width: 768px) {
        padding: 15px;
        aside {
            width: 100%; /* Full width for aside on smaller screens */
            margin-top: 20px; /* Add margin top for spacing */
        }
    }

    @media (max-width: 480px) {
        padding: 10px;
        aside {
            padding: 10px;
        }
    }
`;
