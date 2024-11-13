import { Button, Flex } from 'antd';
import { useState, useEffect } from 'react';

const Countdown = ({ hidden }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isPaused]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleSetTime = (value) => {
        if (value === 'pause') {
            setIsPaused((prev) => !prev);
        } else {
            setTimeLeft(value * 60);
            setIsPaused(false);
        }
    };

    return (
        <div style={styles.countdown} hidden={hidden}>
            {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
            <Flex gap={5}>
                <Button onClick={() => handleSetTime(5)}>5m</Button>
                <Button onClick={() => handleSetTime(25)}>25m</Button>
                <Button onClick={() => handleSetTime('pause')}>{isPaused ? 'Resume' : 'Pause'}</Button>
            </Flex>
        </div>
    );
};

const styles = {
    countdown: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
    },
};

export default Countdown;
