import Matter = require('matter-js');
import {Events} from 'matter-js';
import {ServerGameEvents} from './events/game.events';

const Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Body = Matter.Body,
	Bodies = Matter.Bodies,
	Detector = Matter.Detector,
	World = Matter.World;

const PLAYGROUND_SIZE = {x: 800, y: 600};
const PADDLE_SIZE = {x: 20, y: 100};
const PADDLE_BORDER_SPACING = 20;
const WALL_THICKNESS = 20;
const BALL_SPEED = {x: 3, y: 3};
const BALL_SIZE = 30;
const BALL_STARTING_POSITION = {
	x: PLAYGROUND_SIZE.x / 2,
	y: PLAYGROUND_SIZE.y / 2,
};

const enum Wall {
	TOP,
	RIGHT,
	BOTTOM,
	LEFT,
}

export class Pong {
	public readonly engine: Matter.Engine = Engine.create({
		gravity: {scale: 0},
		enableSleeping: false,
	});
	public readonly world: Matter.World = this.engine.world;
	public readonly runner: Matter.Runner = Runner.create();
	public walls: Matter.Body[];
	public ball: Matter.Body;
	public paddles: Matter.Body[];
	private readonly dispatchToLobby: (event: string, data: any) => void;
	private score = [0, 0];

	constructor(dispatchToLobby: (event: string, data: any) => void) {
		this.dispatchToLobby = dispatchToLobby;
		this.createWalls();
		this.createBall();
		this.createPaddles();
	}

	// create walls starting from top in clockwise direction
	private createWalls() {
		this.walls = [
			Bodies.rectangle(
				PLAYGROUND_SIZE.x / 2,
				-(WALL_THICKNESS / 2),
				PLAYGROUND_SIZE.x,
				WALL_THICKNESS,
				{label: 'topWall', isStatic: true}
			),
			Bodies.rectangle(
				PLAYGROUND_SIZE.x + WALL_THICKNESS / 2,
				PLAYGROUND_SIZE.y / 2,
				WALL_THICKNESS,
				PLAYGROUND_SIZE.y,
				{label: 'rightWall', isStatic: true}
			),
			Bodies.rectangle(
				PLAYGROUND_SIZE.x / 2,
				PLAYGROUND_SIZE.y + WALL_THICKNESS / 2,
				PLAYGROUND_SIZE.x,
				WALL_THICKNESS,
				{label: 'bottomWall', isStatic: true}
			),
			Bodies.rectangle(
				-(WALL_THICKNESS / 2),
				PLAYGROUND_SIZE.y / 2,
				WALL_THICKNESS,
				PLAYGROUND_SIZE.y,
				{label: 'leftWall', isStatic: true}
			),
		];
		World.add(this.world, this.walls);
	}

	private createBall() {
		this.ball = Bodies.circle(
			BALL_STARTING_POSITION.x,
			BALL_STARTING_POSITION.y,
			BALL_SIZE,
			{
				label: 'ball',
				inertia: Infinity,
				friction: 0,
				frictionStatic: 0,
				frictionAir: 0,
				restitution: 1,
			}
		);
		World.add(this.world, this.ball);
	}

	private createPaddles() {
		this.paddles = [
			Bodies.rectangle(
				PADDLE_BORDER_SPACING,
				PLAYGROUND_SIZE.y / 2,
				PADDLE_SIZE.x,
				PADDLE_SIZE.y,
				{isStatic: true, label: 'leftPaddle'}
			),
			Bodies.rectangle(
				PLAYGROUND_SIZE.x - PADDLE_BORDER_SPACING,
				PLAYGROUND_SIZE.y / 2,
				PADDLE_SIZE.x,
				PADDLE_SIZE.y,
				{isStatic: true, label: 'rightPaddle'}
			),
		];
		World.add(this.world, this.paddles);
	}

	private kickoff() {
		Matter.Body.setVelocity(this.ball, BALL_SPEED);
		let prevBallPos = {x: 0, y: 0};
		Events.on(this.engine, 'beforeUpdate', () => {
			if (
				prevBallPos.x !== this.ball.position.x ||
				prevBallPos.y !== this.ball.position.y
			) {
				this.dispatchToLobby(ServerGameEvents.MoveBall, {
					id: this.ball.id,
					type: this.ball.type,
					position: this.ball.position,
					velocity: this.ball.velocity,
				});
				prevBallPos = {...this.ball.position};
			}
		});
	}

	private detectPaddleCollision() {
		Events.on(this.engine, 'collisionStart', (event) => {
			const pairs = event.pairs;
			for (let i = 0; i < pairs.length; i++) {
				const pair = pairs[i];
				if (
					pair.bodyA.label === 'leftPaddle' ||
					pair.bodyB.label === 'leftPaddle'
				) {
					console.log(`leftpaddle collision`);
					this.dispatchToLobby(ServerGameEvents.PaddleHit, {
						position: this.paddles[0].position,
					});
				} else if (
					pair.bodyA.label === 'rightPaddle' ||
					pair.bodyB.label === 'rightPaddle'
				) {
					console.log(`rightpaddle collision`);
					this.dispatchToLobby(ServerGameEvents.PaddleHit, {
						position: this.paddles[1].position,
					});
				}
			}
		});
	}

	private detectWallCollision() {
		Events.on(this.engine, 'collisionStart', (event) => {
			console.log(`wall collision`);
			const pairs = event.pairs;
			for (let i = 0; i < pairs.length; i++) {
				const pair = pairs[i];
				if (
					pair.bodyA.label === 'rightWall' ||
					pair.bodyB.label === 'rightWall'
				) {
					Matter.Body.setVelocity(this.ball, {x: 0, y: 0});
					Matter.Body.setPosition(this.ball, BALL_STARTING_POSITION);
				} else if (
					pair.bodyA.label === 'leftWall' ||
					pair.bodyB.label === 'leftWall'
				) {
					Matter.Body.setVelocity(this.ball, {x: 0, y: 0});
					Matter.Body.setPosition(this.ball, BALL_STARTING_POSITION);
				}
			}
		});
	}

	public start() {
		Runner.run(this.engine);
		Events.on(this.runner, 'afterUpdate', () => {
			console.log('afterUpdate');
		});
		this.kickoff();
		// this.detectPaddleCollision();
		// this.detectWallCollision();
	}

	public pauseGame() {
		this.engine.enabled = false;
	}
}
