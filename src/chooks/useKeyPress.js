import { useEffect } from "react";
import { useState } from "react";

export const useKeyPress = (targetKey, shouldPreventDefault=false) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
    // If pressed key is our target key then set to true
    function downHandler(event) {
        const {key} = event
        // if (['b', 'r'])
        console.log(key, shouldPreventDefault)
        if (shouldPreventDefault) {
            event.preventDefault()
        }
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            // setKeyPressed(false);
        }
    };
    // Add event listeners

    useEffect(() => {
        setTimeout(() => {
            setKeyPressed(false);
        }, 500)
    }, [keyPressed])

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}