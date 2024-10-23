import {useState} from "react";
import {Card} from "@/components/ui/card";
import Buttons from "./Buttons.jsx";
import Preview from "./Preview.jsx";

// eslint-disable-next-line react/prop-types
const RightCard = ({previewUrl}) => {

    const [position, setPosition] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);

    const MIN_ZOOM = 0.1;
    const MAX_ZOOM = 5;

    return (

        <Card className="w-3/4 p-4">
            <div className="flex flex-col h-full">
                <Buttons
                    setZoom={setZoom}
                    setPosition={setPosition}
                    MIN_ZOOM={MIN_ZOOM}
                    MAX_ZOOM={MAX_ZOOM}
                    zoom={zoom}
                />
                <Preview
                    previewUrl={previewUrl}
                    position={position}
                    zoom={zoom}
                    MIN_ZOOM={MIN_ZOOM}
                    MAX_ZOOM={MAX_ZOOM}
                    setPosition={setPosition}
                    setZoom={setZoom}
                />
            </div>
        </Card>
    )
}

export default RightCard;