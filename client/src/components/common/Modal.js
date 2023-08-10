import { useState, forwardRef, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	return (
		<>
			{Open && (
				<aside className='modal' ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
					<div className='close' onClick={() => setOpen(false)} data-name='close'>
						<FontAwesomeIcon icon={faXmark} />
					</div>
					<div className='con'>{props.children}</div>
				</aside>
			)}
		</>
	);
});

export default Modal;
