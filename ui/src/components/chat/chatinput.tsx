import {useState} from 'react';

import {Button, Group, Image, TextInput} from "@mantine/core";

function ChatInput({onAsk, disabled}: any) {
    const [inputValue, setInputValue] = useState("");

    // Function to handle input changes
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    // Function to handle key press events
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (inputValue.trim()) {
            onAsk(inputValue);
            setInputValue("");
        }
    };

    return (
        <Group>
            <Image src="mappy.png" alt="mappy" w={28}/>
            <TextInput
                disabled={disabled}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask Mappy..."
                style={{
                    flex: 1
                }}
            />
            <Button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                bg={!inputValue.trim() ? "gray" : undefined}
            >
                <span>&#x27A4;</span>
            </Button>
        </Group>
    );
}

export default ChatInput;
