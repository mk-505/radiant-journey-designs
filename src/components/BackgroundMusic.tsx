import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/Enchanted Waterfall.mp3"));

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.log("Audio playback error:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20"
      onClick={togglePlay}
    >
      {isPlaying ? (
        <Volume2 className="h-6 w-6" />
      ) : (
        <VolumeX className="h-6 w-6" />
      )}
    </Button>
  );
}
