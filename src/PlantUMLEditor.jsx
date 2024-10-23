import {useState, useEffect} from 'react';
import plantumlEncoder from 'plantuml-encoder';
import LeftCard from "./components/LeftCard.jsx";
import RightCard from "./components/RightCard";
import {usePumlStore} from "./stores/usePumCode.js";

const PlantUMLEditor = () => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {pumlCode, setPumlCode} = usePumlStore();

    const encodePlantUML = (text) => {
        try {
            return plantumlEncoder.encode(text);
        } catch (e) {
            console.error('Encoding error:', e);
            return null;
        }
    };

    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const updatePreview = debounce((code) => {
        setIsLoading(true);
        setError(null);

        try {
            const encoded = encodePlantUML(code);
            if (encoded) {
                setPreviewUrl(`https://www.plantuml.com/plantuml/svg/${encoded}`);
            }
        } catch (error) {
            console.error('Preview update error:', error);
            setError('Failed to generate preview');
        } finally {
            setIsLoading(false);
        }
    }, 1000);

    useEffect(() => {
        updatePreview(pumlCode);
    }, [pumlCode]);


    useEffect(() => {
        const handleWheelZoom = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheelZoom, {passive: false});
        return () => {
            window.removeEventListener('wheel', handleWheelZoom);
        };
    }, []);


    return (
        <div className="w-full h-screen flex flex-col p-4 bg-gray-100">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">PlantUML Editor</h1>
                {error && <div className="text-red-500">{error}</div>}
            </div>

            <div className="flex flex-1 gap-4">
                <LeftCard pumlCode={pumlCode} setPumlCode={setPumlCode}/>
                <RightCard previewUrl={previewUrl} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default PlantUMLEditor;