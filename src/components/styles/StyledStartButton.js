import styled from "styled-components";

export const StyledStartButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    border: none;
    color: white;
    background: linear-gradient(145deg, #333, #555);
    font-family: 'Pixel', Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease; 
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3); 

    &:hover {
        background: linear-gradient(145deg, #555, #777);
        transform: translateY(-2px); 
    }

    &:active {
        background: linear-gradient(145deg, #222, #444);
        transform: translateY(2px); 
    }
`;
