// src/components/ProjectManager.jsx
import { useState, useEffect } from 'react';
import db from './lib/db.js';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {usePumlStore} from "./stores/usePumlCode.js";
import PlantUMLEditor from "./PlantUMLEditor.jsx";

const ProjectManager = () => {
    const [name, setName] = useState('');
    const [projects, setProjects] = useState([]);
    const { setPumlCode, getPumlCodeById } = usePumlStore();
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const allProjects = await db.projects.toArray();
        setProjects(allProjects);
    };

    const addProject = async () => {
        if (name.trim() === '') return;
        const newProject = {
            name,
            content: '',
            createdAt: new Date().toISOString(),
        };
        await db.projects.add(newProject);
        setName('');
        fetchProjects();
    };

    const deleteProject = async (id) => {
        await db.projects.delete(id);
        fetchProjects();
    };

    const handleEditProject = (id) => {
        // Bu id ile ilgili pumlCode'u al ve set et
        const pumlCode = getPumlCodeById(id);
        setPumlCode(pumlCode);
        setEditingProjectId(id);
        setIsEditing(true); // Düzenleme moduna geç
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingProjectId(null);
    };

    return (
        <>
            {isEditing ? (
                <PlantUMLEditor projectId={editingProjectId} onClose={handleCancelEdit} />
            ) : (
                <div className="p-4">
                    <h2 className="text-xl mb-4">Project Manager</h2>
                    <div className="flex gap-2 mb-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter project name"
                        />
                        <Button onClick={addProject}>Add Project</Button>
                    </div>
                    <div>
                        {projects.map((project) => (
                            <div key={project.id} className="flex justify-between items-center">
                                <span>{project.name}</span>
                                <div className="flex gap-2">
                                    <Button onClick={() => handleEditProject(project.id)}>Edit</Button>
                                    <Button onClick={() => deleteProject(project.id)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectManager;
