import React, { useState, useMemo } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { calculateBowlingScore } from "./calculateScore";

const BowlingScoreCalculator = () => {
  const [notation, setNotation] = useState("");

  const result = useMemo(() => {
    if (!notation.trim()) return null;
    return calculateBowlingScore(notation);
  }, [notation]);

  const testCases = [
    { input: "XXXXXXXXXXXX", expected: 300, desc: "Perfect game" },
    { input: "9-9-9-9-9-9-9-9-9-9-", expected: 90, desc: "All 9s, no spares" },
    { input: "5/5/5/5/5/5/5/5/5/5/5", expected: 150, desc: "All spares (5)" },
    { input: "X7/9-X088/06XXX81", expected: 167, desc: "Mixed game" },
  ];

  return (
    <div className="min-h-screen  p-8 bg-gray-700">
      <div className="max-w-4xl mx-auto">
        {/* Input section */}
        <div className="bg-gray-400 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Bowling Score Calculator
          </h1>
          <p className="text-gray-600 mb-6">
            Enter bowling notation in real-time. Use X (strike), / (spare), -
            (gutter), or digits 0-9.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter bowling score as a string
            </label>
            <input
              type="text"
              value={notation}
              onChange={(e) => setNotation(e.target.value)}
              placeholder="e.g., X7/9-X088/6/XXX81"
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors font-mono"
            />
          </div>

          {/* Result display section */}
          {result && (
            <div className="mt-6">
              {result.error ? (
                <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-red-800">Error</p>
                    <p className="text-red-700">{result.error}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-green-800">Valid Game</p>
                      <p className="text-green-700">
                        Total rolls: {result.totalRolls}
                      </p>
                    </div>
                  </div>

                  {/* Score display section  */}
                  <div className="p-6 bg-blue-500 rounded-xl text-white">
                    <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
                      Total Score
                    </p>
                    <p className="text-6xl font-bold">{result.score}</p>
                  </div>

                  {/* Frame score section  */}
                  {result.frameScores.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Frame-by-Frame Scores
                      </p>
                      <div className="grid grid-cols-10 gap-2">
                        {result.frameScores.map((frameScore, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-2 rounded text-center border border-gray-200"
                          >
                            <p className="text-xs text-gray-500 font-medium">
                              F{idx + 1}
                            </p>
                            <p className="text-lg font-bold text-gray-800">
                              {frameScore}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pin counts - roll values  */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Roll Values
                    </p>
                    {/* Display as comma-separated list */}
                    <p className="text-gray-600 font-mono text-sm">
                      {result.rolls.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Test cases section  */}
        <div className="bg-gray-400 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Cases</h2>
          <p className="text-gray-600 mb-4">Click test cases to run it</p>

          <div className="space-y-3">
            {testCases.map((test, idx) => {
              // Calculate result for this test case to show if it passes
              const testResult = calculateBowlingScore(test.input);
              const isCorrect =
                !testResult.error && testResult.score === test.expected;

              return (
                <button
                  key={idx}
                  onClick={() => setNotation(test.input)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">
                        {test.desc}
                      </p>
                      <p className="text-sm font-mono text-gray-600 mb-2">
                        {test.input}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expected: {test.expected} | Actual:{" "}
                        {testResult.error ? "Error" : testResult.score}
                      </p>
                    </div>
                    {isCorrect ? (
                      <CheckCircle
                        className="text-green-500 flex-shrink-0"
                        size={24}
                      />
                    ) : (
                      <AlertCircle
                        className="text-red-500 flex-shrink-0"
                        size={24}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BowlingScoreCalculator;
