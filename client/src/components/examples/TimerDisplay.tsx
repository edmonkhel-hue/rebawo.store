import TimerDisplay from '../TimerDisplay';

export default function TimerDisplayExample() {
  return (
    <div className="p-8 bg-background min-h-screen flex items-center justify-center">
      <TimerDisplay 
        timeLeft={1547} // 25:47
        totalTime={1800} // 30:00
        isRunning={true}
      />
    </div>
  );
}