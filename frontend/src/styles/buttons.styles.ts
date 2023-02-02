import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 1em 2em;
  border-radius: 37px;
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  transition: all 0.25s;

  a {
    text-decoration: none;
    color: black;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// prettier-ignore
export const PrimaryButton = styled(Button)`
	background-color: #DC4F19;
	border: none;
	align-items: center;

	&, a {
		color: #fff;
	}

	&:hover {
		background-color: #ce2437;
	}
	`;

// prettier-ignore
export const SecondaryButton = styled(Button)`
	background-color: #fff;
	border: 2px solid #DC4F19;

	&, a {
		color: #DC4F19;;
	}

	&:hover {
		background-color: #DC4F19;
		&, a {
			color: #fff;
		}
	}
`;

// prettier-ignore
export const SecondaryButtonSmall = styled(Button)`
	background-color: #fff;
	font-size: small;
	padding: 0.5em 1em;
	border: 2px solid #DC4F19;

	&, a {
		color: #DC4F19;
	}

	&:hover {
		background-color: #DC4F19;
		&, a {
			color: #fff;
		}
	}
`;

interface Iprops {
  backgroundColor?: string;
  border?: string;
  width?: string;
}

export const PopupButton = styled(Button)<Iprops>`
  background-color: ${(p) => p.backgroundColor || "transparent"};
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  border: ${(p) => p.border || "none"};
  align-items: center;
  align-content: center;
  margin: auto;
  border-radius: 48px;
  width: ${(p) => p.width || " clamp(50px, 35vw, 10rem)"};
  &,
  a {
    color: white;
  }
  :hover {
    transform: scaleY(1.08);
    border: 1.5px solid #e5e7eb;
  }
`;
