import React, { useState } from 'react';
import '../App.css';

function Todolist() {
    const [activity, setActivity] = useState("");
    const [desc, setDesc] = useState("");
    const [listData, setListData] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // To track which todo item is being edited
    const [filter, setFilter] = useState("all"); // To track the filter status

    function addActivity() {
        if (!activity.trim() || !desc.trim()) {
            alert("Both task and description are required.");
            return;
        }

        setListData((listData) => {
            const updatedList = [...listData, { activity, desc, completed: false }];
            console.log(updatedList);
            setActivity('');
            setDesc('');
            return updatedList;
        });
    }

    function removeActivity(i) {
        const updatedListData = listData.filter((elem, id) => i !== id);
        setListData(updatedListData);
    }

    function editActivity(i) {
        setEditIndex(i);
        setActivity(listData[i].activity); // Populate input with existing name
        setDesc(listData[i].desc); // Populate input with existing description
    }

    function saveEdit(i) {
        // Update the todo item with the edited values
        if (!activity.trim() || !desc.trim()) {
            alert("Both task and description are required.");
            return;
        }

        const updatedList = [...listData];
        updatedList[i] = { ...updatedList[i], activity, desc };
        setListData(updatedList);
        setActivity('');
        setDesc('');
        setEditIndex(null); // Reset editIndex after saving
    }

    function toggleCompletion(i) {
        const updatedList = [...listData];
        updatedList[i] = { ...updatedList[i], completed: !updatedList[i].completed };
        setListData(updatedList);
    }

    return (
        <>
            <h3 style={{ color: "green", marginBottom: '20px', fontSize: "1.5rem" }}>My Todo</h3>
            <div className='container'>
                <input
                    type="text"
                    id="todoName"
                    className="input-box"
                    placeholder="Todo Name"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                />
                <input
                    type="text"
                    id="todoDescription"
                    className="input-box"
                    placeholder="Todo Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                {editIndex === null ? (
                    <button id="addTodo" className="btn btn-success" onClick={addActivity}>Add Todo</button>
                ) : (
                    <button id="saveEdit" className="btn btn-primary" onClick={() => saveEdit(editIndex)}>Save Edit</button>
                )}
            </div>
            <div className='containerbox'>
                <h5 style={{ fontWeight: "bold" }}>My Todos</h5>
                <div className="filter-container">
                    <label htmlFor="status-filter" style={{ fontSize: "20px", fontWeight: "bold" }}>Status Filter:</label>
                    <select
                        id="status-filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="not-completed">Not Completed</option>
                    </select>
                </div>
            </div>
            {listData.length > 0 && (
                <div className='card-wrapper mr-5' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {listData.map((data, i) => {
                        if (filter === "all" || (filter === "completed" && data.completed) || (filter === "not-completed" && !data.completed)) {
                            return (
                                <div key={i} className='task-card' style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#F2FAF1', minWidth: '300px' }}>
                                    <div className='card-header'>
                                        <strong>Name:</strong> {editIndex === i ? (
                                            <input
                                                type="text"
                                                value={activity}
                                                onChange={(e) => setActivity(e.target.value)}
                                                className="edit-input"
                                            />
                                        ) : (
                                            <span>{data.activity}</span>
                                        )}
                                    </div>
                                    <br />
                                    <div>
                                        <p><strong>Description:</strong> {editIndex === i ? (
                                            <input
                                                type="text"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                                className="edit-input"
                                            />
                                        ) : (
                                            <span>{data.desc}</span>
                                        )}</p>
                                    </div>
                                    <div className="filter-container">
                                        <label htmlFor={`status-filter-${i}`} style={{ fontSize: "20px", fontWeight: "bold" }}>Status:</label>
                                        <select
                                            id={`status-filter-${i}`}
                                            value={data.completed ? "completed" : "not-completed"}
                                            onChange={() => toggleCompletion(i)} style={{ backgroundColor: "#ec5757" }}
                                        >
                                            <option value="completed">Completed</option>
                                            <option value="not-completed">Not Completed</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {editIndex !== i && (
                                            <button id='editTodo' className='btn btn-success' style={{ marginRight: '10px' }} onClick={() => editActivity(i)}>Edit</button>
                                        )}
                                        {editIndex === i && (
                                            <button id='saveTodo' className='btn btn-primary' style={{ marginRight: '10px' }} onClick={() => saveEdit(i)}>Save</button>
                                        )}
                                        <button id='deleteTodo' className='btn btn-danger' onClick={() => removeActivity(i)}>Delete</button>
                                    </div>
                                </div>
                            );
                        } else {
                            return null; // If task doesn't match filter criteria, return null to not render it
                        }
                    })}
                </div>
            )}
        </>
    );
}

export default Todolist;

