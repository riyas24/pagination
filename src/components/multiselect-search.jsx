import React, { useState, useRef, useEffect } from 'react';

export default function MultiselectSearch({ selected, setSelected, showSuggestion, setShowSuggestion }) {
    const [input, setInput] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const inputContainerRef = useRef(null);

    const removeSuggestion = (value) => {
        if (suggestion.includes(value))
            setSuggestion(suggestion.filter(item => item !== value));
        if (selected.includes(value))
            setSelected(selected.filter(item => item !== value));
    };

    const handleSelected = (value) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(item => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    const handleEnter = (e) => {
        if (e.code === "Enter") {
            if (input) {
                setSuggestion([...suggestion, input]);
                setInput("");
            }
        }
    };

    const isExist = (value) => {
        if (selected.includes(value))
            return {
                color: "white",
                backgroundColor: 'green'
            };
        else
            return {};
    };

    const handleClickOutside = (event) => {
        if (inputContainerRef.current && !inputContainerRef.current.contains(event.target)) {
            setShowSuggestion(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='input-container' ref={inputContainerRef}>
            <input
                className='input'
                value={input}
                onChange={(e) => setInput(e?.target?.value)}
                onFocus={() => setShowSuggestion(true)}
                onKeyDown={handleEnter}
                placeholder='Search Products'
            />
            {showSuggestion && (
                <div className='suggestion-container'>
                    {suggestion.map((item, i) => (
                        <span
                            key={i}
                            className='chip'
                            style={isExist(item)}
                            onClick={() => handleSelected(item)}
                        >
                            {item}
                            <span onClick={() => removeSuggestion(item)}>❌</span>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
