import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WorkInProgressProps {
  isDark: boolean
}

export function WorkInProgress({ isDark }: WorkInProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-2">
      <Alert className={`mx-auto max-w-4xl ${isDark ? 'bg-yellow-900/20 border-yellow-700/50' : 'bg-yellow-50 border-yellow-200'}`}>
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
          🚧 This website is currently under construction! I'm still working on improvements and new features.
        </AlertDescription>
      </Alert>
    </div>
  )
} 