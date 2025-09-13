import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Keyboard, HelpCircle } from "lucide-react";

const shortcuts = [
  { key: 'Spacebar', action: 'Start / Pause timer' },
  { key: 'R', action: 'Reset timer' },
  { key: 'S', action: 'Open settings' },
  { key: 'Escape', action: 'Close dialogs' },
];

export default function KeyboardShortcutsHelp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          data-testid="button-keyboard-shortcuts"
          variant="ghost"
          size="icon"
          title="Keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use these keyboard shortcuts for quick timer control:
          </p>
          <div className="space-y-2">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between py-2 px-3 bg-muted rounded-md"
              >
                <span className="text-sm">{shortcut.action}</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-background border border-border rounded">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Shortcuts work when no input fields are focused</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}