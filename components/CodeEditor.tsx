import { useState, useRef, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"

export default function CodeEditorTextarea({value, onChange}: {value: string, onChange: (value: string) => void}) {
  const [lineCount, setLineCount] = useState(1)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const lineCount = value.split('\n').length
    setLineCount(lineCount)
  }, [value])

  const handleScroll = () => {
    if (textareaRef.current) {
      const lineNumbers = document.getElementById('line-numbers')
      if (lineNumbers) {
        lineNumbers.scrollTop = textareaRef.current.scrollTop
      }
    }
  }

  return (
    <div className="relative border rounded-md overflow-hidden font-mono text-sm">
      <div 
        id="line-numbers"
        className="absolute left-0 top-0 bottom-0 w-[40px] bg-border text-gray-500 text-right pr-2 pt-2 overflow-hidden"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1}>{i + 1}</div>
        ))}
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        placeholder="// Type your code here"
        className="min-h-[600px] pl-[50px] pt-2 resize-none font-mono"
        style={{
          tabSize: 2,
          WebkitTextFillColor: 'inherit',
          caretColor: 'inherit',
        }}
      />
    </div>
  )
}