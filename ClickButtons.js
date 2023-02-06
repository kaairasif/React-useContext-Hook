import React, { useContext, useState } from 'react';
import { ClickContext } from './ClickContext';

export const ClickButton = () => {
	const { numberOfClicks, increment, decrement } = useContext(ClickContext);
	const [incrementBy, setIncrementBy] = useState(1);

	return (
		<>
		<p>You have clicked the button {numberOfClicks} times.</p>
        {/* <h2>Use context state value check  {user}</h2> */}
		<label>
			Increment By:
			<input
				value={incrementBy}
				onChange={e => setIncrementBy(Number(e.target.value))}
				type="number" />
		</label>
		<button
			onClick={() => increment(incrementBy)}
		>Click</button>

        <button onClick={() => decrement(incrementBy)}>-</button>
		</>
	)
}