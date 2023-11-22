

import { useState } from "react";
import NewProjects from "./components/NewProjects";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";



function App() {

  
  const [projectState, setProjectState] = useState({

    selectedProjectId: undefined,
    projects: [],
    tasks:[],

  });

  function handleAddTask (text) {
    setProjectState(
      prevState => {
        const newTasks = {
          text:text,
          projectId:prevState.selectedProjectId,
          id: Math.random().toFixed(3)
  
        }
        return {
          ...prevState,
          tasks:[...prevState.tasks,newTasks]
        }
      }
    )
  }
  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task)=>task.id !== id)
  
      };
    }); 
  }

  const projectStartHandle = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:null

      };
    });
  }
  const projectCancelHandle = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:undefined

      };
    });
  }
  const projectSelectHandle = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:id

      };
    });
  }

function addProjectHandle (projectData) {
  setProjectState(
    prevState => {
      const newProjects = {
        ...projectData,
        id: Math.random().toFixed(3)

      }
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProjects]
      }
    }
  )
}
const handleProjectDelete = () => {
  setProjectState(prevState => {
    return {
      ...prevState,
      selectedProjectId:undefined,
      projects: prevState.projects.filter((project)=>project.id !== prevState.selectedProjectId)

    };
  }); 
}
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleProjectDelete}
    onAddTask={handleAddTask}
    onDeleteTask = {handleDeleteTask}
    tasks={projectState.tasks}
  />;

  if (projectState.selectedProjectId === null) {
    content =<NewProjects onSaveData={addProjectHandle} onCancel ={projectCancelHandle}/>
  }
  else if (projectState.selectedProjectId === undefined)
  {
    content =<NoProjectSelected onStartAddProject={projectStartHandle}/>
  }

  
  return (
    <main className="h-screen my-2 flex gap-8">
      <Sidebar 
      onSelectProject={projectSelectHandle} 
      onStartAddProject={projectStartHandle} 
      selectedProjectId={projectState.selectedProjectId}
      project={projectState.projects}/>
      {content}
    </main>
  )
}

export default App;