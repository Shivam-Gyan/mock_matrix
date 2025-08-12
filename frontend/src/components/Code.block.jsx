import { useState } from "react";
import AceEditor from "react-ace";

// IMPORTANT: import the noconflict builds
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeEditor({setCode,code}) {
   
    return (
        <div className="w-full max-w-md z-30 h-76 border border-gray-500 rounded-md overflow-hidden">
            <AceEditor
                mode="javascript"
                theme="github_dark"
                name="mock-matrix"
                value={code}
                onChange={setCode}
                width="100%"
                height="100%"
                fontSize={15}
                showPrintMargin={false}
                setOptions={{
                    useWorker: false, // <-- avoid worker loading issues in Vite
                    tabSize: 4,
                    showLineNumbers: true,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    );
}
