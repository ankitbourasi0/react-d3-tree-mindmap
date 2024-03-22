import { TreeNodeDatum } from "react-d3-tree";

// Assuming the structure of `data` matches the `TreeNodeDatum` type
export const data: TreeNodeDatum = {
  name: "Car Manufacturing",
  children: [
    {
      name: "Research",

      children: [
        {
          name: "External",

          children: [
            {
              name: "B2C",

              children: [
                {
                  name: "Online",
                },
                {
                  name: "Interview",
                },
                {
                  name: "Public Data",
                },
                {
                  name: "Health",
                },
              ],
            },
            {
              name: "B2C",
            },
          ],
        },
        {
          name: "Internal",

          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Planning",

      children: [
        {
          name: "PRD",

          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Specs",

          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Designing",

      children: [
        {
          name: "Hardware",

          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Software",

          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Manufacturing",

      children: [
        {
          name: "Material",

          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Production",

          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Sales/Marketing",

      children: [
        {
          name: "Online",

          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Dealership",

          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};
