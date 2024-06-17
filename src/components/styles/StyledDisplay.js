import styled from "styled-components";

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;  
    margin: 0 0 20px 0;
    padding: 20px;
    border: 4px solid #333;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    color: ${props => props.gameOver ? 'red' : '#fff'};  
    background: linear-gradient(145deg, #000, #333); 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); 
    font-family: 'Pixel', Arial, Helvetica, sans-serif;
    font-size: 1rem; 
    text-align: center;
    transition: color 0.3s ease, background 0.3s ease;  
`;
