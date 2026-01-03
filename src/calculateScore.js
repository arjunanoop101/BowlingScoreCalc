export const calculateBowlingScore = (notation) => {
  const rolls = [];
  let i = 0;

  // Loop through each character in the notation string
  while (i < notation.length) {
    const char = notation[i].toUpperCase();

    if (char === "X") {
      rolls.push(10);
    } else if (char === "/") {
      // Spare requires a previous roll to calculate remaining pins
      if (rolls.length === 0)
        return { error: "Invalid spare - no previous roll" };
      const lastRoll = rolls[rolls.length - 1];
      rolls.push(10 - lastRoll);
    } else if (char === "-") {
      rolls.push(0);
    } else if (char >= "0" && char <= "9") {
      rolls.push(parseInt(char));
    } else if (char !== " ") {
      return { error: `Invalid character: ${char}` };
    }

    i++;
  }

  let score = 0; // Running total score
  let rollIndex = 0; // Current position in rolls array
  const frameScores = []; // Cumulative score after each frame

  for (let frame = 0; frame < 10; frame++) {
    if (rollIndex >= rolls.length) break;

    if (frame < 9) {
      // CASE 1: STRIKE (all 10 pins on first roll)
      if (rolls[rollIndex] === 10) {
        let frameScore = 10;
        if (rollIndex + 1 < rolls.length) frameScore += rolls[rollIndex + 1];
        if (rollIndex + 2 < rolls.length) frameScore += rolls[rollIndex + 2];

        score += frameScore; // Add to running total
        frameScores.push(score); // Store cumulative score
        rollIndex++; // Strike only uses 1 roll, move to next frame
      }

      // CASE 2: SPARE OR REGULAR FRAME (2 rolls)
      else {
        const firstRoll = rolls[rollIndex];
        const secondRoll = rolls[rollIndex + 1] || 0;

        if (firstRoll + secondRoll > 10) {
          return { error: `Frame ${frame + 1}: pins exceed 10` };
        }

        // spare
        if (firstRoll + secondRoll === 10) {
          let frameScore = 10;
          if (rollIndex + 2 < rolls.length) frameScore += rolls[rollIndex + 2];
          score += frameScore;
        }
        // regular frame
        else {
          score += firstRoll + secondRoll;
        }

        frameScores.push(score); // Store cumulative score
        rollIndex += 2; // Regular frame uses 2 rolls
      }
    }

    //frame 10
    else {
      const firstRoll = rolls[rollIndex];
      const secondRoll = rolls[rollIndex + 1] || 0;
      const thirdRoll = rolls[rollIndex + 2] || 0;

      if (firstRoll === 10) {
        score += firstRoll + secondRoll + thirdRoll;
      } else if (firstRoll + secondRoll === 10) {
        score += firstRoll + secondRoll + thirdRoll;
      } else {
        if (firstRoll + secondRoll > 10) {
          return { error: "Frame 10: pins exceed 10" };
        }
        score += firstRoll + secondRoll;
      }

      frameScores.push(score);
      // Move past all rolls used (3 if strike/spare, 2 otherwise)
      rollIndex += firstRoll === 10 || firstRoll + secondRoll === 10 ? 3 : 2;
    }
  }

  return {
    score,
    frameScores,
    totalRolls: rolls.length,
    rolls,
  };
};
