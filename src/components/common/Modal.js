import { useState, forwardRef, useImperativeHandle } from 'react';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	return (
		<>
			{Open && (
				<aside className='modal' ref={ref}>
					<div className='con'>{props.children}</div>
					<span className='close' onClick={() => setOpen(false)}>
						close
					</span>
				</aside>
			)}
		</>
	);
});

export default Modal;
