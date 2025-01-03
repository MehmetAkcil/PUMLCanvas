import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import PlantUMLEditor from './PlantUMLEditor.jsx'
import ProjectManager from "./ProjectManager.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/*<PlantUMLEditor />*/}
        <ProjectManager/>
    </StrictMode>,
)
