"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class TerminalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error for debugging
    console.error('Terminal Error Boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="fixed inset-0 bg-black text-green-400 font-mono flex items-center justify-center p-4">
          <Card className="bg-gray-900 border-red-500/50 max-w-lg w-full">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-red-400 flex items-center gap-2 font-mono">
                <AlertTriangle className="h-5 w-5" />
                Terminal Error
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-black p-4 rounded border border-red-500/30">
                <div className="text-red-400 text-sm mb-2">Error:</div>
                <div className="text-green-400 text-xs font-mono break-all">
                  {this.state.error?.message || 'Unknown error occurred'}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-black rounded transition-colors font-mono text-sm"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Terminal
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-green-400 border border-green-500/30 rounded transition-colors font-mono text-sm"
                >
                  Reload Page
                </button>
              </div>

              <div className="text-xs text-gray-500">
                If this error persists, please refresh the page or contact support.
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}