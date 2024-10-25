'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getStoredPumlCode = () => {
    if (typeof window !== 'undefined') {
        const storedCode = localStorage.getItem('pumlCode');
        return storedCode ? storedCode : `@startuml\n    Bob -> Alice : hello\n@enduml`;
    }
    return `@startuml\n    Bob -> Alice : hello\n@enduml`;
};

export const usePumlStore = create(
    persist(
        (set) => ({
            pumlCode: getStoredPumlCode(),
            setPumlCode: (newCode) => {
                set(() => {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('pumlCode', newCode);
                    }
                    return { pumlCode: newCode };
                });
            },
            updatePumlCodeById: (id, newCode) => {
                set(() => {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(`pumlCode_${id}`, newCode);
                    }
                    return { pumlCode: newCode };
                });
            },
            getPumlCodeById: (id) => {
                if (typeof window !== 'undefined') {
                    const storedCode = localStorage.getItem(`pumlCode_${id}`);
                    return storedCode ? storedCode : `@startuml\n    Bob -> Alice : hello\n@enduml`;
                }
                return `@startuml\n    Bob -> Alice : hello\n@enduml`;
            },
        }),
        {
            name: 'puml-storage',
            getStorage: () => localStorage,
        }
    )
);
