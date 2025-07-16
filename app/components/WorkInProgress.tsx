import { AlertTriangle, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface WorkInProgressProps {
  isDark: boolean
  onClose: () => void
}

export function WorkInProgress({ isDark, onClose }: WorkInProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-2">
      <Alert className={`mx-auto max-w-4xl ${isDark ? 'bg-yellow-900/20 border-yellow-700/50' : 'bg-yellow-50 border-yellow-200'} relative`}>
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'} pr-8`}>
          🚧 This website is currently under construction! I'm still working on improvements and new features.
        </AlertDescription>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-1/2 right-2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-yellow-200/20 flex items-center justify-center"
        >
          <X className="h-4 w-4 text-yellow-600" />
        </Button>
      </Alert>
    </div>
  )
} 