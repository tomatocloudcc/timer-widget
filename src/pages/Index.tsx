"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps(prevLaps => [time, ...prevLaps]);
  };

  const formatTime = (time: number) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(2, '0')
    };
  };

  const formattedTime = formatTime(time);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-gray-800 text-white">
        {/* 时间显示区域 - 修复布局和抖动 */}
        <div className="text-center py-8">
          <div className="text-5xl font-mono font-light tracking-wider">
            <span className="inline-block min-w-[3ch] text-right">
              {formattedTime.hours}
            </span>
            :
            <span className="inline-block min-w-[2ch] text-right">
              {formattedTime.minutes}
            </span>
            :
            <span className="inline-block min-w-[2ch] text-right">
              {formattedTime.seconds}
            </span>
            .
            <span className="inline-block min-w-[2ch] text-right text-4xl">
              {formattedTime.milliseconds}
            </span>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-center space-x-4 mb-6">
          {!isRunning ? (
            <>
              <Button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-500 text-white rounded-full w-20 h-20"
              >
                重置
              </Button>
              <Button
                onClick={handleStart}
                className="bg-green-600 hover:bg-green-500 text-white rounded-full w-20 h-20"
              >
                开始
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLap}
                className="bg-gray-600 hover:bg-gray-500 text-white rounded-full w-20 h-20"
              >
                计次
              </Button>
              <Button
                onClick={handlePause}
                className="bg-red-600 hover:bg-red-500 text-white rounded-full w-20 h-20"
              >
                暂停
              </Button>
            </>
          )}
        </div>

        {/* 计次列表 */}
        {laps.length > 0 && (
          <div className="border-t border-gray-800 pt-4">
            <div className="text-gray-400 text-sm mb-2">计次</div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {laps.map((lapTime, index) => {
                const formattedLap = formatTime(lapTime);
                return (
                  <div key={index} className="flex justify-between items-center text-white">
                    <span>计次 {laps.length - index}</span>
                    <span className="font-mono font-medium">
                      {formattedLap.hours}:{formattedLap.minutes}:{formattedLap.seconds}.{formattedLap.milliseconds}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Timer;