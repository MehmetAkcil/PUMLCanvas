'use client';
import {create} from 'zustand';
import db from '../lib/db';

const getStoredPumlCode = async (id) => {
    const project = await db.projects.get(id);
    return project && project.content ? project.content : `@startuml\n    Bob -> Alice : hello\n@enduml`;
};

const getProject = async (id) => {
    return await db.projects.get(id)
};

export const usePumlStore = create(
    set => ({
        pumlCode: '',
        setPumlCode: async (id, newCode) => {
            await db.projects.update(id, {content: newCode});
            set(() => ({pumlCode: newCode}));
        },
        updatePumlCodeById: async (id, newCode) => {
            await db.projects.update(id, {content: newCode});
            set(() => ({pumlCode: newCode}));
        },
        getPumlCodeById: async (id) => {
            const code = await getStoredPumlCode(id);
            set(() => ({pumlCode: code}));
            return code;
        },
        getById: async (id) => {
            const code = await getProject(id);
            set(() => code);
            return code;
        },
    })
);
