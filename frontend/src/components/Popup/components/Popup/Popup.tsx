import React, {RefObject, useRef, useState} from 'react';
import {StyledComponent} from 'styled-components';
import {H2, Text} from 'styles/font.styles';
import * as S from './Popup.styles';

interface IPopup {
	title: string;
	subtitle?: string;
	headerImage?: React.ReactElement;
	loadingBar?: React.ReactElement;
	children?: React.ReactNode;
	stopPropagation?: boolean;
	style?: React.CSSProperties;
	overlay?: boolean;
	innerRef?: RefObject<HTMLDivElement>;
	draggable?: boolean;
}

interface IOverlay {
	condition: boolean;
	wrapper: any;
	children: React.ReactNode;
}

interface IPopupAttributes {
	style: React.CSSProperties | undefined;
	onMouseDown: React.MouseEventHandler | undefined;
	onMouseMove: React.MouseEventHandler | undefined;
	onMouseUp: React.MouseEventHandler | undefined;
}

const ConditionalOverlay = ({condition, wrapper, children}: IOverlay) =>
	condition ? wrapper(children) : children;

function Popup(props: IPopup) {
	const popupRef = useRef<HTMLDivElement>(null);
	const firstPos = useRef<any>(null);
	const [isDragging, setIsDragging] = useState(false);

	const popupAttributes: IPopupAttributes = {
		style: props.style,
		onMouseDown: undefined,
		onMouseMove: undefined,
		onMouseUp: undefined,
	};

	if (props.draggable) {
		popupAttributes.onMouseDown = onDragStart;
		popupAttributes.onMouseMove = onMovePopup;
		popupAttributes.onMouseUp = onDragOver;
	}

	function onDragStart(event: React.MouseEvent) {
		firstPos.current = {
			x: event.clientX,
			y: event.clientY,
			container: popupRef.current?.getBoundingClientRect(),
		};
		setIsDragging(true);
	}

	function onMovePopup(event: React.MouseEvent) {
		if (isDragging) {
			let left =
				firstPos.current.container.left + event.clientX - firstPos.current.x;
			let top =
				firstPos.current.container.top + event.clientY - firstPos.current.y;
			if (popupRef.current) {
				Object.assign(popupRef.current.style, {
					left: `${left}px`,
					top: `${top}px`,
				});
			}
		}
	}

	function onDragOver(event: React.MouseEvent) {
		setIsDragging(false);
	}

	function stopPropagation(event: React.MouseEvent) {
		if (!props.stopPropagation) return;
		event.stopPropagation();
	}

	return (
		<ConditionalOverlay
			condition={!!props.overlay}
			wrapper={(children: React.ReactNode) => (
				<S.Overlay onMouseDown={stopPropagation}>{children}</S.Overlay>
			)}
		>
			<S.Container ref={popupRef} {...popupAttributes}>
				<S.Text>
					{props.headerImage}
					<H2>{props.title}</H2>
					{props.subtitle && <Text weight={'400'}>{props.subtitle}</Text>}
				</S.Text>
				{props.loadingBar}
				<S.Button>{props.children}</S.Button>
			</S.Container>
		</ConditionalOverlay>
	);
}

export default Popup;
