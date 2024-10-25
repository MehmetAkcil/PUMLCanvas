import Editor from "@monaco-editor/react";


// eslint-disable-next-line react/prop-types
const LeftCard = ({ setPumlCode, pumlCode }) => {

    const editorOptions = {
        minimap: {enabled: false},
        fontSize: 13,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: 'vs-light',
        wordWrap: 'on',
        automaticLayout: true,
    };


    return (
        <div className="overflow-hidden bg-white">
            <Editor
                height="95vh"
                defaultLanguage="plantuml"
                value={pumlCode}
                onChange={(value) => setPumlCode(value)}
                options={editorOptions}
                beforeMount={(monaco) => {
                    monaco.languages.register({id: 'plantuml'});
                    monaco.languages.setMonarchTokensProvider('plantuml', {
                        tokenizer: {
                            root: [
                                [/@\w+/, 'keyword'],
                                [/!.*$/, 'comment'],
                                [/'.*$/, 'comment'],
                                [/".*?"/, 'string'],
                                [/\b(actor|database|cloud|rectangle|usecase|class|interface)\b/, 'type'],
                                [/\b(as|to|from)\b/, 'keyword'],
                                [/-+>|\.+>|=+>|<-+|<\.+|<=+/, 'operator'],
                                [/[{}()\[\]]/, 'delimiter'],
                            ]
                        }
                    });
                }}
            />
        </div>
    );
}

export default LeftCard;