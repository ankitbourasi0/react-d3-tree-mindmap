"use client"
import React, { SetStateAction, useEffect, useState } from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { CustomNodeElementProps, TreeNodeDatum, } from "react-d3-tree";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon,PlusIcon } from '@radix-ui/react-icons';
import { Button, Strong, Text } from '@radix-ui/themes';

type Props = {
  nodeName: string,
  nodeChildren: TreeNodeDatum[] | undefined
  props: CustomNodeElementProps
  setNodeName: React.Dispatch<SetStateAction<string>>;
  handleAddNode: () => void

}

type RawNodeDatum = {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  children?: RawNodeDatum[];
  mindMapData: TreeNodeDatum;
}


function HoverDialogBox(nodeProps: Props,) {
  const [open, setOpen] = useState<boolean>(false);
  const [newNodeName, setNewNodeName] = useState<string>("")
  const [mindData, setMindMapData] = useState<TreeNodeDatum | null>();
  const [update, setUpdate] = useState<boolean>(false)
  useEffect(() => {

    nodeProps.setNodeName(newNodeName)
  }, [newNodeName])










  return (
    <div>
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <p className=''>{nodeProps.nodeName }</p>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
            sideOffset={5}
          >
            <div className="flex flex-col gap-[7px]">
              <p
                className="block text-[15px]  font-semibold rounded-full text-black"

              >
                 Phase: <Strong> {nodeProps.nodeName}</Strong>
              
              </p>
              <div className="flex flex-col gap-[15px]">
                <p  className='text-mauve12 text-[15px] '>Next processes:</p>
                {nodeProps.nodeChildren?.map((e,index) => <li key={e.name} className="text-mauve12 m-0 text-[15px] leading-[0.5]">
                   {e.name}
                </li>)}


                <div className="flex gap-[15px]">
                  <div className="flex gap-[5px]">
                 
                    <div className="flex gap-[5px]">
                      <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">{nodeProps.nodeChildren?.length}</div>{' '}
                      <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">Processes</div>
                    </div>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        
                        <Button variant="solid" asChild 
                        >
                            <PlusIcon  />
                          
                        </Button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            Add New
                          </Dialog.Title>
                          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                            Type node name
                          </Dialog.Description>
                          <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                              Name
                            </label>
                            <input
                              onChange={(e) => setNewNodeName(e.target.value as string)}
                              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                              id="newNode"
                              value={newNodeName!}
                              defaultValue=""
                            />
                          </fieldset>

                          <div className="mt-[25px] flex justify-end">
                            <Dialog.Close asChild>
                              <button onClick={nodeProps.handleAddNode} className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                Save
                              </button>
                            </Dialog.Close>
                          </div>
                          <Dialog.Close asChild>
                            <button
                              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                              aria-label="Close"
                            >
                              <Cross2Icon />
                            </button>
                          </Dialog.Close>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>
                </div>
              </div>
            </div>

            <HoverCard.Arrow className="fill-white" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>





    </div>
  );
}

export default HoverDialogBox;


{/* // Dialog Box */ }
//  {open && (
//   <div
//     id="modal"
//     className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20"

//   >
//     <div
//       id="modal-content"
//       className="max-w-[400px] w-full bg-white p-5 rounded-md flex flex-col"

//     >
//       <div
//         className=""
//         style={{ width: "100%", textAlign: "right", margin: "10px" }}
//       >
//         <button
//           onClick={() => setOpen((prev) => !prev)}
//           className=""
//           style={{ float: "right" }}
//         >
//           Back
//         </button>
//       </div>
//       <select value={node} onChange={(e) => setNode(e.target.value)}>
//         {data.children?.map((child,id) => (
//           <option key={id}>{child.name}</option>
//         ))}
//       </select>
//       {/* //add node name */}
//       <div>
//         <label htmlFor="node-name">Node Name:</label>
//         <input
//           type="text"
//           id="node-name"
//           value={nodeName}
//           onChange={(e) => setNodeName(e.target.value)}
//         />
//       </div>
//       {/* <button
//         id="add-node"
//         onClick={handleAddNode}
//         style={{
//           marginTop: "10px",
//           padding: "10px 20px",
//           borderRadius: "5px",
//           backgroundColor: "coral",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Add Node
//       </button> */}
//     </div>
//   </div>
// )}