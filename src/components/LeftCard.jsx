import Editor from "@monaco-editor/react";
import {Card} from "@/components/ui/card";


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
        <Card className="w-1/4 overflow-hidden">
            <Editor
                height="90vh"
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
        </Card>
    );
}

export default LeftCard;