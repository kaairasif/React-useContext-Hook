import React, { useEffect, useState } from 'react';
import { ClickContext } from './ClickContext';


export const ClickProvider = ({ children }) => {
    
	const [numberOfClicks, setNumberOfClicks] = useState(0);
    // const [user, setUser] = useState('');

	const increment = incrementBy => {
		setNumberOfClicks(numberOfClicks + incrementBy);        
	}
    
    const decrement = (incrementBy)  => {
        setNumberOfClicks(numberOfClicks - incrementBy)
    }
    // console.log(user)


	return (
		<ClickContext.Provider value={{ numberOfClicks, increment, decrement }}>
			{children}
		</ClickContext.Provider>
	)
}