#  Bowling Score Calculator

A real-time ten-pin bowling score calculator built with React. Enter bowling notation and see your score calculated instantly according to official bowling rules.

##  Table of Contents


- [Demo](#demo)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Algorithm Explanation](#algorithm-explanation)
- [Test Cases](#test-cases)
- [Technical Details](#technical-details)



##  Demo

Try these examples:
- `XXXXXXXXXXXX` - Perfect game (300 points)
- `5/5/5/5/5/5/5/5/5/5/5` - All spares (150 points)
- `9-9-9-9-9-9-9-9-9-9-` - All 9s with gutters (90 points)

##  How It Works

The calculator processes bowling notation in two main phases:

### Phase 1: Parse Notation → Numbers
Converts bowling symbols into numeric pin counts:
```
Input:  "X7/9-"
Output: [10, 7, 3, 9, 0]
```

### Phase 2: Calculate Score
Applies official bowling rules to calculate the total score with proper bonuses for strikes and spares.

##  Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd bowling-score-calculator

# Install dependencies
npm install

# Start development server
npm start
```



##  Algorithm Explanation

### Scoring Rules

#### Frames 1-9: Standard Frames

**Strike (X)**
- All 10 pins knocked down on first roll
- **Score**: 10 + next 2 rolls
- Example: `X, 7, 2` = 10 + 7 + 2 = **19 points**

**Spare (number + /)**
- All 10 pins knocked down using both rolls
- **Score**: 10 + next 1 roll
- Example: `7/, 5` = 10 + 5 = **15 points**

**Open Frame**
- Less than 10 pins total
- **Score**: Sum of both rolls
- Example: `7, 2` = **9 points**

#### Frame 10: Special Rules

The 10th frame can have up to **3 rolls** if you get a strike or spare:

- **Strike on 1st roll**: Get 2 bonus rolls
  - `X X X` = 30 points
- **Spare on 1st + 2nd rolls**: Get 1 bonus roll
  - `7 / 5` = 15 points
- **Open frame**: Only 2 rolls
  - `7 2` = 9 points

### Algorithm Steps

#### Step 1: Parse Input
```javascript
// Convert notation to numbers
"X7/9-" → [10, 7, 3, 9, 0]

// X = 10
// 7 = 7
// / = 10 - 7 = 3
// 9 = 9
// - = 0
```

#### Step 2: Process Frames
```javascript
// Use rollIndex pointer to track position
rolls = [10, 7, 3, 9, 0]
         ↑
      rollIndex

// For strikes: move 1 position
// For regular frames: move 2 positions
```

#### Step 3: Calculate with Look-Ahead
```javascript
// Strike bonus needs next 2 rolls
if (rolls[rollIndex] === 10) {
  score = 10 + rolls[rollIndex+1] + rolls[rollIndex+2]
}

// Spare bonus needs next 1 roll
if (rolls[rollIndex] + rolls[rollIndex+1] === 10) {
  score = 10 + rolls[rollIndex+2]
}
```

#### Step 4: Accumulate Scores
```javascript
// Bowling uses cumulative scoring
Frame 1: 10 points → Display: 10
Frame 2: 15 points → Display: 25 (10+15)
Frame 3: 9 points  → Display: 34 (10+15+9)
```


## 🧪 Test Cases

The application includes built-in test cases:

### Test 1: Perfect Game
```
Input: XXXXXXXXXXXX
Expected: 300
Description: 12 consecutive strikes
```

### Test 2: All Open Frames
```
Input: 9-9-9-9-9-9-9-9-9-9-
Expected: 90
Description: 9 pins per frame, no bonuses
```

### Test 3: All Spares
```
Input: 5/5/5/5/5/5/5/5/5/5/5
Expected: 150
Description: Consecutive spares with 5 pins
```

### Test 4: Mixed Game
```
Input: 9-9-9-9-9-9-9-9-9-XXX
Expected: 120
Description: Open frames followed by strikes in 10th
```




