import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useGameContext} from '../../../contexts/Game/context';

export function useSetupContext(canvas: HTMLCanvasElement | undefined) {

	useEffect(() => {
		if (canvas) {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}
	}, [canvas]);
}