import React, { KeyboardEventHandler, useCallback, useContext, useEffect, useState } from "react";
import SocketContext from "../../contexts/Socket/Context";
import { useRef } from "react";
import { Pong } from "./Pong";
import { Socket } from "socket.io-client";
import Matter from "matter-js";
import { StyledChat, StyledGame } from "./Game.styles";

const Game: React.FunctionComponent = () => {
	const { socket, users, uid } = useContext(SocketContext).SocketState;
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const canvasRef = useRef(null);
	let pong: Pong;
  
  useEffect(() => {
	pong = new Pong(canvasRef.current!, socket as Socket);
    // socket?.emit("position", pong.leftPaddlePosition());
    console.log(position);
	pong.run();
	pong.paddleController();
	setPosition(pong.leftPaddlePosition());
	redraw();
  }, []);

  // useEffect(() => {
  socket?.on("new_position", (pos: { x: number; y: number }) => {
    setPosition({ x: pos.x, y: pos.y });
	if (pong)
		pong.movePaddle(pos);
	// console.log(`Receiving new position - [${pos.x}, ${pos.y}]`);
  });

  socket?.on('ball_position', (position: Matter.Vector) => {
	console.log(`BALL POS - [${position.x}, ${position.y}]`);
	pong.Body.setPosition(pong.ball, position);
  })
  // }, [])


//   function move(event: React.KeyboardEvent<HTMLCanvasElement>) {
// 	console.info(`KEY [${event.key}] pressed`)
// 	keyState.set(event.key, true);
// 	}
//     // const tmp_pos: IPosition = { x: position.x + 10, y: position.y + 10 };
//     // socket?.emit("position", tmp_pos);

//   function stopMoving(event: React.KeyboardEvent<HTMLCanvasElement>) {
// 	console.info(`KEY [${event.key}] released`);
// 	keyState.set(event.key, false);
//   }

  function redraw() {
	const canvas: HTMLCanvasElement = canvasRef.current!;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
  }


  return (
	// <StyledGame>
	// <div style={{
	// 	display: 'flex',
	// 	flexFlow: 'column',
	// 	height: '100%',
	// }}>
		<div className="box-container" style={{
			display: 'contents',
			// height: '100%',
			margin: '0px',
			padding: '0px',
		}}>
			<div>
			<p>User uid: {uid}</p>
			<p>Users: {users.length}</p>
			<p>positionX: {position.x}</p>
			<p>positionY: {position.y}</p>
			<canvas ref={canvasRef} /*onKeyDown={move} onKeyUp={stopMoving}*/ tabIndex={1} style={{
				width: '100%',
				maxWidth: '600px',
				height: '100%', 
				marginLeft: 'auto',
				marginRight: 'auto',
				display: 'block',
				// flex: '0 1 100%',
				}}>
				canvas
			</canvas>
			</div>
			{/* <StyledChat> */}
			<div style={{
				backgroundColor: 'grey',
				flex: '1 1 auto',
				// flexGrow: '1',
			}}>
				Chat<br/>
				Chat<br/>
				Chat<br/>
				Chat<br/>
				Chat<br/>
				Chat<br/>
				Chat<br/>
				Chat<br/>
			</div>
			<div>
				Test
			</div>
			{/* </StyledChat> */}
		</div>
	// </div>
	// </StyledGame>
  );
};

export default Game;
