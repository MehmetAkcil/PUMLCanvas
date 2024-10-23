import {RotateCcw, ZoomIn, ZoomOut} from "lucide-react";


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

    return (
        <div className="flex items-center gap-2 mb-2">
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
        </div>
    )
}

export default Buttons;