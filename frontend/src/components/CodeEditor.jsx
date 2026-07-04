import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { sql } from '@codemirror/lang-sql';

export default function CodeEditor({ code, setCode, language }) {
  
  const getLanguageExtension = () => {
    switch (language) {
      case 'JavaScript': return javascript({ jsx: true });
      case 'Java': return java();
      case 'Python': return python();
      case 'C':
      case 'C++': return cpp();
      case 'SQL': return sql();
      default: return javascript();
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl h-[500px] w-full">
      <CodeMirror
        value={code}
        height="500px"
        theme={dracula}
        extensions={[getLanguageExtension()]}
        onChange={(val) => setCode(val)}
        className="text-sm font-mono"
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
        }}
      />
    </div>
  );
}
