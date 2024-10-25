import {useEffect, useRef, useState} from "react";


// eslint-disable-next-line react/prop-types
const Preview = ({setPosition, zoom, MIN_ZOOM, MAX_ZOOM, position, setZoom, previewUrl}) => {

    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragStart]);

    const previewContainerRef = useRef(null);

    const handleWheel = (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY * -0.001;
            const newZoom = Math.min(Math.max(zoom + delta, MIN_ZOOM), MAX_ZOOM);

            if (previewContainerRef.current) {
                const rect = previewContainerRef.current.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const scaleChange = newZoom - zoom;
                setPosition(prev => ({
                    x: prev.x - (mouseX - rect.width / 2) * scaleChange,
                    y: prev.y - (mouseY - rect.height / 2) * scaleChange
                }));
            }

            setZoom(newZoom);
        }
    };

    const handleMouseDown = (e) => {
        if (e.button === 0) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };


    return (
        <div
            ref={previewContainerRef}
            className="w-full flex-1 overflow-hidden relative"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            style={{cursor: isDragging ? 'grabbing' : 'grab'}}
        >
            <div className="h-full w-full relative overflow-hidden">
                {previewUrl ? (
                    <div
                        className="absolute"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                            transformOrigin: 'center center',
                            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                        }}
                    >
                        <img
                            src={previewUrl}
                            alt="PlantUML Preview"
                            className="max-w-none select-none pointer-events-none"
                            style={{userSelect: 'none'}}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Preview;