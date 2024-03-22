"use client"


import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import { data } from "../app/utils/data";
// Note how deeper levels are defined recursively via the `children` property.
import { CustomNodeElementProps, TreeNodeDatum, RawNodeDatum } from "react-d3-tree";
import { useCenteredTree } from "../app/utils/helpers"
export default function App() {
  const [mindMapData, setMindMapData] = useState<TreeNodeDatum | null>();
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [edges, setEdges] = useState<"straight" | "step" | "diagonal" | "elbow">("straight");
  const [open, setOpen] = useState<boolean>(false);
  const [node, setNode] = useState<string>("");
  const [nodeName, setNodeName] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<TreeNodeDatum | null>(null);
  const [newChildName, setNewChildName] = useState<string>('');
  const [dimensions, translate, containerRef] = useCenteredTree();
  useEffect(() => {
    // console.log(data);
    setMindMapData(data);
    // if (mindMapData.children)
    //   console.log(mindMapData.children.map((child) => child.children));
  }, []);

  // const handleAddNode = () => {
  //   if (nodeName !== null) {
  //     const updatedMindMapData = deepCopy(mindMapData);
  //     const updatedChildren = updatedMindMapData.children.map((child) => {
  //       if (child.name === node.toString()) {
  //         console.log("Selected Node: ", child.name);
  //         return {
  //           ...child,
  //           children: [...child.children, { name: nodeName, children: [] }],
  //         };
  //       }
  //       return deepCopy(child);
  //     });
  //     updatedMindMapData.children = updatedChildren;
  //     setMindMapData(updatedMindMapData);
  //     console.log(updatedMindMapData.children);
  //   } else {
  //     alert("Please Enter Node Name");
  //   }
  //   setOpen((prev) => !prev);
  // };

  // // Helper function to create a deep copy of an object or array
  // const deepCopy = (obj) => {
  //   if (typeof obj !== "object" || obj === null) {
  //     return obj;
  //   }
  //   if (Array.isArray(obj)) {
  //     return obj.map(deepCopy);
  //   }
  //   const newObj = {};
  //   for (const key in obj) {
  //     newObj[key] = deepCopy(obj[key]);
  //   }
  //   return newObj;
  // };

  const renderCustomNode = (props: CustomNodeElementProps) => {
    const handleNodeMouseOver = (node: TreeNodeDatum, evt: React.MouseEvent) => {
      setShowDialog(true);
      setDialogPosition({ x: evt.clientX, y: evt.clientY });
      setSelectedNode(node); // Set the selected node
      console.log("Mouse over node:", node);
    };

    const handleNodeMouseOut = () => {
      setShowDialog(false);
      setSelectedNode(null); // Reset the selected node
    };



    return (
      <g
        onMouseOver={(event: React.MouseEvent) => {
          handleNodeMouseOver(props.nodeDatum, event);
        }}
        onMouseOut={handleNodeMouseOut}
      >
        <foreignObject x="-30" y="-20" className="w-32 h-16 "  >
          <button
            className="px-2 py-1 rounded-md bg-[#1d3557] text-white"

            onClick={props.toggleNode}
          >
            {props.nodeDatum.name}
          </button>
        </foreignObject>
      </g>
    );
  };

  const handleAddChild = (newChildName: string) => {
    if (selectedNode) {
      const newChild = { name: newChildName, children: [] };
      // props.addChildren([newChild]);
      setNewChildName(''); // Reset the input field
    }
  };
  return (
    <div className="" style={{ width: "100vw", height: "100vh", backgroundColor: "#f1faee", color: "#1d3557" }} ref={containerRef}>
      <nav
        id="topNavBar"
        className="w-full h-[10vh] bg-[#457b9d] flex justify-around items-center fixed z-10"
      >
        <ul
          className="list-none flex justify-around items-center max-w-2xl w-full"
          id="nav"

        >
          <li className="md:space-x-2 ">
            <label htmlFor="orientation" style={{ color: "white" }}>
              Orientation
            </label>

            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as "vertical" | "horizontal")}
              name="orientation"
              className="bg-[#f1faee] rounded-sm px-[2px]"
              id="orientation"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </li>
          <li className="md:space-x-2 ">
            <label htmlFor="edges" style={{ color: "white" }}>
              Edges
            </label>

            <select
              value={edges}
              onChange={(e) => setEdges(e.target.value as "straight" | "step" | "diagonal" | "elbow")}
              name="edges"
              className="bg-[#f1faee] rounded-sm px-[2px]"
              id="edges"
            >
              <option value="straight">Straight </option>
              <option value="step">Step</option>
              <option value="diagonal">Diagonal</option>
              <option value="elbow">Elbow</option>
            </select>
          </li>
        </ul>
      </nav>

      {/* //showing the Dialog at position of client mouse  */}
      {showDialog && selectedNode && (
        <div
          style={{
            position: "fixed",
            left: dialogPosition.x,
            top: dialogPosition.y,
            backgroundColor: "whitesmoke",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 3,
          }}
        >
          {selectedNode.attributes && (
            <div>
              {Object.entries(selectedNode.attributes).map(([key, value]) => (
                <div key={key}>
                  <strong>{(key as string).toUpperCase()}:</strong> {value}
                </div>
              ))}
            </div>
          )}

          <div>
            <h3>Add Child Node:</h3>
            <input
              type="text"
              placeholder="Enter child node name"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
            />
            <button onClick={() => handleAddChild(newChildName)}>
              Add Child
            </button>
          </div>
          <p>All Phases</p>
          <ul>
            {selectedNode.children?.map((e,id) => (
              <li key={id}>{e.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`. */}
      <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
        {mindMapData && mindMapData !== undefined && (
          <Tree
            data={mindMapData}
            pathFunc={edges}
            dimensions={dimensions}
            translate={translate}
          
            // collapsible={false}
            // enableLegacyTransitions={true}
            orientation={orientation}
            renderCustomNodeElement={renderCustomNode}
          />
        )}
      </div>
      {/* // Dialog Box */}
      {open && (
        <div
          id="modal"
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20"

        >
          <div
            id="modal-content"
            className="max-w-[400px] w-full bg-white p-5 rounded-md flex flex-col"

          >
            <div
              className=""
              style={{ width: "100%", textAlign: "right", margin: "10px" }}
            >
              <button
                onClick={() => setOpen((prev) => !prev)}
                className=""
                style={{ float: "right" }}
              >
                Back
              </button>
            </div>
            <select value={node} onChange={(e) => setNode(e.target.value)}>
              {data.children?.map((child,id) => (
                <option key={id}>{child.name}</option>
              ))}
            </select>
            {/* //add node name */}
            <div>
              <label htmlFor="node-name">Node Name:</label>
              <input
                type="text"
                id="node-name"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
              />
            </div>
            {/* <button
              id="add-node"
              onClick={handleAddNode}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "coral",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add Node
            </button> */}
          </div>
        </div>
      )}
      <nav
        id="bottom-nav-bar"
        className="w-full h-[10vh] flex justify-around items-center fixed bottom-0 z-10 bg-[#457b9d]"

      >
        <button
          className="bg-[#e63946] border-none rounded-md px-2 py-3 text-white "

          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          Add node
        </button>
      </nav>
    </div>
  );
}
