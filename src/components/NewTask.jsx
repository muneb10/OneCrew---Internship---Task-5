import React, { useState } from "react"

export default function NewTasks ({onAdd}) {
    
    const [task,setTask] = useState('');
    const handleChange = (e) => {
        setTask(e.target.value);

    }
    const handleClick = () => {
        onAdd(task);
        setTask('');
    }
    return(
        <div className="flex items-center gap-4">
            <input type="text" className="w-64 px-2 py-2 rounded-sm bg-stone-200" value={task} onChange={handleChange}/>
            <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
        </div>
    )
}