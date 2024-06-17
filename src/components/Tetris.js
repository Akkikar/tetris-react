import React, { useState, useEffect } from 'react';

import { createStage, didCollide } from '../gameHelpers';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

    // Move player left or right
    const movePlayer = (dir) => {
        if (!didCollide(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    // Start game function
    const startGame = () => {
        // Reset everything
        setStage(createStage());
        setDropTime(1000); // 1 sec
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    };

    // Drop function
    const drop = () => {
        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel((prev) => prev + 1);
            // Also increase the speed
            setDropTime(1000 / (level + 1) + 100);
        }

        if (didCollide(player, stage, { x: 0, y: 1 })) {
            if (player.pos.y < 1) {
                console.log('Game Over');
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        } else {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        }
    };

    // Key up event handler
    const keyUp = ({ keyCode }) => {
        if (gameOver) return;

        if (keyCode === 40) {
            setDropTime(1000 / (level + 1) + 100); // 1 sec
        }
    };

    // Drop player function
    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    // Move function based on keyCode
    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                // left arrow key
                movePlayer(-1);
            } else if (keyCode === 39) {
                // right arrow key
                movePlayer(1);
            } else if (keyCode === 40) {
                // down arrow key
                dropPlayer();
            } else if (keyCode === 38) {
                // up arrow key
                playerRotate(stage, 1);
            }
        }
    };

    // Touch start event handler
    const handleTouchStart = (e) => {
        e.preventDefault(); // Prevent default behavior like scrolling

        const touchStartX = e.touches[0].clientX;
        const touchStartY = e.touches[0].clientY;

        const handleTouchMove = (e) => {
            e.preventDefault(); // Prevent default behavior like scrolling

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    movePlayer(1); // Move right
                } else {
                    movePlayer(-1); // Move left
                }
            } else {
                if (deltaY > 0) {
                    dropPlayer(); // Drop down
                } else {
                    playerRotate(stage, 1); // Rotate
                }
            }
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchend', handleTouchEnd);
    };

    // Interval hook for dropping pieces
    useInterval(() => {
        drop();
    }, dropTime);

    // Effect hook for touch start event
    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart, { passive: false });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    // Render the Tetris game interface
    return (
        <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={move}
            onKeyUp={keyUp}
            onTouchStart={handleTouchStart} // Add onTouchStart for direct touch interaction
        >
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
