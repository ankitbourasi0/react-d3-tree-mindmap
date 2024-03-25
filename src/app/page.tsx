"use client"


import React, { useState, useEffect, useCallback } from "react";
import Tree from "react-d3-tree";
import { data } from "../app/utils/data";
// Note how deeper levels are defined recursively via the `children` property.
import { CustomNodeElementProps, TreeNodeDatum, RawNodeDatum } from "react-d3-tree";
import HoverDialogBox from "./utils/HoverDialogBox";
import { Box, Button, Select, } from "@radix-ui/themes";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from "@radix-ui/react-icons";

import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';
type Point = {
  x: number;
  y: number;
};

type ListProps = {
  chidren: Readonly<{
    children: React.ReactNode;
  }>;
  title: string

}

type Dimensions = { width: number; height: number } | undefined;
export default function App() {
  const [mindMapData, setMindMapData] = useState<TreeNodeDatum | null>();
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [edges, setEdges] = useState<"straight" | "step" | "diagonal" | "elbow">("straight");
  const [node, setNode] = useState<string>("");
  const [nodeName, setNodeName] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogPosition, setDialogPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<TreeNodeDatum | null>(null);
  const [newChildName, setNewChildName] = useState<string>('');
  const [siblingsSepration, setSiblingsSepration] = useState<number>(1)
const [nonSiblingsSepration, setNonSiblingsSepration] = useState<number>(2)
const [nodeXSize, setnodeXSize] = useState<number>(120)
const [nodeYSize, setnodeYSize] = useState<number>(120)
  var dialogTop = 0;


  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });


  const containerRef = useCallback((containerElem: HTMLDivElement) => {
    if (containerElem !== null) {


      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });

      setDimensions({ width, height });
    }
  }, []);
  useEffect(() => {
    // console.log(data);
    setMindMapData(data);
    // if (mindMapData.children)
    //   console.log(mindMapData.children.map((child) => child.children));
  }, []);

  const handleAddNode = () => {
    if (nodeName !== "") {

      const updatedMindMapData = deepCopy(mindMapData);
      const updatedChildren = updatedMindMapData?.children?.map((child) => {
        if (child.name === nodeName.toString()) {
          console.log("Selected Node: ", child.name);
          return {
            ...child,
            children: [...child.children!, { name: nodeName, children: [] }],
          };
        }
        return deepCopy(child);
      });
      updatedMindMapData?.children != updatedChildren;
      setMindMapData(updatedMindMapData);
      console.log(updatedMindMapData?.children);
    } else {
      alert("Please Enter Node Name");
    }

  };

  // // Helper function to create a deep copy of an object or array
  function deepCopy<T>(obj: T): T {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(deepCopy) as T;
    }
    const newObj = {} as T;
    for (const key in obj) {
      newObj[key as keyof T] = deepCopy(obj[key]);
    }
    return newObj;
  };


  const renderCustomNode = (props: CustomNodeElementProps) => {

    const handleNodeMouseOver = (node: TreeNodeDatum, evt: React.MouseEvent) => {
      // dialogTop = evt.clientY - 100;
      // setShowDialog(true);
      // setDialogPosition({ x: evt.clientX, y: evt.clientY });
      // setSelectedNode(node); // Set the selected node
      console.log("Mouse over node:", node);
      setNodeName("Ankit")
      handleAddChild
    };


    const handleNodeMouseOut = (evt: React.MouseEvent) => {
      setDialogPosition({ x: evt.clientX, y: dialogTop });
      setSelectedNode(null); // Reset the selected node
    };

    const childNode: RawNodeDatum[] = [{ name: "ankit", children: [] }]

    return (
      <g
        onMouseOver={(event: React.MouseEvent) => {
          handleNodeMouseOver(props.nodeDatum, event);
        }}
      // onMouseOut={(event:React.MouseEvent)=>handleNodeMouseOut(event)}
      >

        <foreignObject x="-30" y="-20" className="w-full max-w-[50px] h-20 "  >
          <Button variant="solid"
            className=""

            onClick={() => console.log(props.nodeDatum)}
          >


            <HoverDialogBox key={props.nodeDatum.name} nodeName={props.nodeDatum.name as string} nodeChildren={props.nodeDatum?.children} props={props} setNodeName={setNodeName} handleAddNode={handleAddNode} />

          </Button>
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
    <div className="" style={{ width: "100vw", height: "100vh", backgroundColor: "#f1faee", color: "#1d3557" }} ref={containerRef}
    >

      <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
        <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Orientation{' '}
              <CaretDownIcon
                className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
              <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[200px] sm:grid-cols-1">
                <li>
                  <NavigationMenu.Link asChild onSelect={() => setOrientation("horizontal")}>
                    <div
                      className={classNames(
                        'focus:shadow-[0_0_0_2px] focus:shadow-violet7 font-medium hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                      )}
                    >
                      <p className="text-mauve11 leading-[1.4]">Horizontal</p>
                    </div>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild onSelect={() => setOrientation("vertical")}>
                    <div
                      className={classNames(
                        'focus:shadow-[0_0_0_2px] focus:shadow-violet7 font-medium hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                      )}
                    >
                      <p className="text-mauve11 leading-[1.4]">Vertical</p>
                    </div>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3  focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Edge{' '}
              <CaretDownIcon
                className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
              <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[400px] sm:grid-flow-col sm:grid-rows-1">


                <li>
                  <NavigationMenu.Link asChild onSelect={() => setEdges("elbow")}>
                    <div
                      className={classNames(
                        'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3  font-medium block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                      )}
                    >
                      <p className="text-mauve11 leading-[1.4]">Elbow</p>
                    </div>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild onSelect={() => setEdges("diagonal")}>
                    <div
                      className={classNames(
                        'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3  font-medium block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                      )}
                    >
                      <p className="text-mauve11 leading-[1.4]">Diagonal</p>
                    </div>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild onSelect={() => setEdges("step")}>
                    <div
                      className={classNames(
                        'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 font-medium block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                      )}
                    >
                      <p className="text-mauve11 leading-[1.4]">Step</p>
                    </div>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link asChild onSelect={() => setEdges("straight")}>
                    <div
                      className={classNames(
                        'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors font-medium                        ',
                      )}
                    >
                      <p className="text-mauve11 leading-[1.4]">Straight</p>
                    </div>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>



          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Sepration{' '}
              <CaretDownIcon
                className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
              <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-1 ">

                <li >
                  <div className="flex flex-wrap items-center gap-[15px] px-5">
                    <Label.Root className="text-[15px] font-medium leading-[35px] text-blackA10" htmlFor="firstName">
                     Sibling Neighbour
                    </Label.Root>
                    <input
                      className=" shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-blackA10 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                      type="number"
                      id="sepration"
                      onChange={(e)=>setSiblingsSepration(e.target.valueAsNumber as number)}
                      defaultValue="Step number"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-[15px] px-5 mt-5">
                    <Label.Root className="text-[15px] font-medium leading-[35px] text-blackA10" htmlFor="firstName">
                     Non-Sibling Neighbour
                    </Label.Root>
                    <input
                      className=" shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-blackA10 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                      type="number"
                      id="sepration"
                      onChange={(e)=>setNonSiblingsSepration(e.target.valueAsNumber as number)}
                      defaultValue="Step number"
                    />
                  </div>

                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Node Size{' '}
              <CaretDownIcon
                className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
              <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-1 ">

                <li >
                  <div className="flex flex-wrap items-center gap-[15px] px-5">
                    <Label.Root className="text-[15px] font-medium leading-[35px] text-blackA10" htmlFor="firstName">
                     X 
                    </Label.Root>
                    <input
                      className=" shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-blackA10 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                      type="number"
                      id="x-size"
                      onChange={(e)=>setnodeXSize(e.target.valueAsNumber as number)}
                      defaultValue="Step number"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-[15px] px-5 mt-5">
                    <Label.Root className="text-[15px] font-medium leading-[35px] text-blackA10" htmlFor="firstName">
                    Y
                    </Label.Root>
                    <input
                      className=" shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-blackA10 shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                      type="number"
                      id="ysize"
                      onChange={(e)=>setnodeYSize(e.target.valueAsNumber as number)}
                      defaultValue="Step number"
                    />
                  </div>

                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="text-violet11 hover:bg-violet3 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
              href="https://github.com/ankitbourasi0"
            >
              Github
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
            <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
          <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </div>
      </NavigationMenu.Root>


      {/* //showing the Dialog at position of client mouse  */}
      {/* {showDialog && selectedNode && (
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
            {selectedNode.children?.map((e, id) => (
              <li key={id}>{e.name}</li>
            ))}
          </ul>
        </div>
      )} */}

      {/* // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`. */}
      <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
        {mindMapData && mindMapData !== undefined && (
          <Tree
            data={mindMapData}
            pathFunc={edges}
            dimensions={dimensions}
            translate={translate}
            depthFactor={150}
            separation={{
              siblings: siblingsSepration,
              nonSiblings: nonSiblingsSepration
            }}
            nodeSize={{
              x:nodeXSize,
              y:nodeYSize
            }}
            orientation={orientation}
            renderCustomNodeElement={renderCustomNode}
          />
        )}
      </div>


    </div >
  );
}
