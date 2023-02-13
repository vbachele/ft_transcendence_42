import styled from "styled-components";
import Game from "./Game";

export const StyledGame = styled.div`
    display: flex;
    flex-flow: column;
    margin: 32px auto;
    gap: 16px;
    text-align: center;

    p, li, button {
        padding: 8px;
        font-size: 1.5rem;
        letter-spacing: 1px;
        border: solid 2px;
        border-radius: 8px;
        list-style: none;
    }
`