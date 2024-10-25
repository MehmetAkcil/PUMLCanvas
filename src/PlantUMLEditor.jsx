import { useState, useEffect } from 'react';
import plantumlEncoder from 'plantuml-encoder';
import LeftCard from "./components/LeftCard.jsx";
import RightCard from "./components/RightCard";
import { usePumlStore } from "./stores/usePumlCode";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Undo2 } from "lucide-react";

// eslint-disable-next-line react/prop-types
const PlantUMLEditor = ({ projectId, onClose }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { pumlCode, setPumlCode, updatePumlCodeById, getPumlCodeById } = usePumlStore();

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
    }, 500);

    useEffect(() => {
        const code = getPumlCodeById(projectId);
        setPumlCode(code);
    }, [projectId, getPumlCodeById, setPumlCode]);

    useEffect(() => {
        updatePreview(pumlCode);
    }, [pumlCode]);

    useEffect(() => {
        const handleWheelZoom = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheelZoom, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheelZoom);
        };
    }, []);

    const handlePumlCodeChange = (newCode) => {
        setPumlCode(newCode);
        updatePumlCodeById(projectId, newCode);
    };

    return (
        <div className="w-full h-screen flex flex-col p-2 bg-gray-100">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 ps-4">
                    <button onClick={onClose}>
                        <Undo2 size={20} />
                    </button>
                    <h1 className="text-xl font-bold">PlantUML Editor</h1>
                </div>
                {error && <div className="text-red-500">{error}</div>}
            </div>

            <ResizablePanelGroup direction="horizontal" className="rounded-xl overflow-hidden shadow-inner">
                <ResizablePanel defaultSize={20}>
                    <LeftCard pumlCode={pumlCode} setPumlCode={handlePumlCodeChange} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <RightCard previewUrl={previewUrl} isLoading={isLoading} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default PlantUMLEditor;
