import {RotateCcw, ZoomIn, ZoomOut} from "lucide-react";
import {usePumlStore} from "../../stores/usePumCode.js";
import {Button} from "@/components/ui/button";
import {FileDown} from "lucide-react";


// eslint-disable-next-line react/prop-types
const Buttons = ({setZoom, setPosition, MIN_ZOOM, MAX_ZOOM, zoom}) => {

    const ZOOM_STEP = 0.1;

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
    };

    const handleResetZoom = () => {
        setZoom(1);
        setPosition({x: 0, y: 0});
    };

    const { pumlCode } = usePumlStore();

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([pumlCode], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        const randomValue = Math.random().toString(8).substring(2, 10);
        element.download = `puml-canvas-${randomValue}.puml`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="flex items-center mb-1">
            <button
                onClick={handleZoomOut}
                className="p-2 rounded hover:bg-gray-100"
                title="Zoom Out"
            >
                <ZoomOut className="w-5 h-5"/>
            </button>
            <button
                onClick={handleZoomIn}
                className="p-2 rounded hover:bg-gray-100"
                title="Zoom In"
            >
                <ZoomIn className="w-5 h-5"/>
            </button>
            <button
                onClick={handleResetZoom}
                className="p-2 rounded hover:bg-gray-100"
                title="Reset Zoom"
            >
                <RotateCcw className="w-5 h-5"/>
            </button>
            <span className="text-sm text-gray-500">
                                {Math.round(zoom * 100)}%
                            </span>
            <Button onClick={handleDownload} className="ms-auto" size="sm">
                <FileDown />
                Download
            </Button>
        </div>
    )
}

export default Buttons;