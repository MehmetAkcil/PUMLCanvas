// src/components/ProjectManager.jsx
import {useState, useEffect} from 'react';
import db from './lib/db.js';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {usePumlStore} from "./stores/usePumlCode";
import PlantUMLEditor from "./PlantUMLEditor";
import {Trash2, NotebookPen} from "lucide-react";
import {formatTimeAgo} from "./lib/format.js";

const ProjectManager = () => {
    const [name, setName] = useState('');
    const [projects, setProjects] = useState([]);
    const {setPumlCode, getPumlCodeById} = usePumlStore();
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
                <PlantUMLEditor projectId={editingProjectId} onClose={handleCancelEdit}/>
            ) : (
                <div className="p-4 w-[95%] md:w-[700px] mx-auto my-4 md:my-14">
                    <h2 className="text-xl mb-4">Project Manager</h2>
                    <div className="flex gap-2 mb-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter project name"
                        />
                        <Button onClick={addProject}>Add Project</Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {projects.map((project, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-100 ps-2 md:ps-4 p-1 md:p-2 rounded-lg">
                                <div>
                                    <div>
                                        {project.name}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {formatTimeAgo(project.createdAt)}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => handleEditProject(project.id)} className="w-8 h-8 md:w-10 md:h-10">
                                        <NotebookPen />
                                    </Button>
                                    <Button onClick={() => deleteProject(project.id)} variant="red" className="w-8 h-8 md:w-10 md:h-10 ">
                                        <Trash2/>
                                    </Button>
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
