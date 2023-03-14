import styled from "styled-components";
import PlusSign from 'assets/new_discussion.svg'

export const LateralBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px 0 0 0;
  @media only screen and (min-width: 768px) {
    border-right: lightgray 1px solid;
    width: 380px;
  }
`

export const Channels = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  min-width: 0;
  flex: 1 0 25%;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Header = styled.div`
  display: none;
  @media only screen and (min-height: 480px) {
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .buttons {
        transition: all 0.3s linear;
        
        :hover {
        transform: scale(1.1);
        background-color: ${(p) =>
	p.theme.name === 'light' ? '#e5e7eb' : '#bfc1c4'};
        }
    }
`;


export const NewDiscussion = styled.button`
	border: none;
	color: ${(props) => props.theme.colors.main};
	background-color: transparent;
  background-image: url(${PlusSign});
  background-position: center;
  background-size: cover;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
	transform: scale(1.1);
  }
`

export const Button = styled.button`
  margin: 0;
  padding: 16px 8px;
  border: none;
  text-overflow: ellipsis;
  font-size: 1.3em;
  overflow: auto;
  background-color: transparent;
  min-height: 80px;
  flex: 0 1 25%;

  &:hover {
    background-color: lightgray;
  }
`
