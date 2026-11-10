/** Navigation model: areas overlap; counted inventory remains in the shared catalog. */
export const homeAreas = [
  {
    "id": "foundations",
    "name": "home-map.areas.0.name",
    "hint": "home-map.areas.0.hint",
    "question": "home-map.areas.0.question",
    "description": "home-map.areas.0.description",
    "groups": [
      [
        {
          "name": "home-map.areas.0.groups.0.0.name",
          "route": "/read/stability",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.0.groups.0.1.name",
          "route": "/time-integration",
          "kind": "interactive"
        }
      ],
      [
        {
          "name": "home-map.areas.0.groups.1.0.name",
          "route": "/read/stability",
          "kind": "reading"
        },
        {
          "name": "ui.a-l-stability-error-norms.9e1533",
          "route": "/read/accuracy-stability",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.0.groups.2.0.name",
          "route": "/experiments",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.0.groups.2.1.name",
          "route": "/convergence",
          "kind": "interactive"
        }
      ]
    ],
    "entry": "/experiments"
  },
  {
    "id": "waves",
    "name": "home-map.areas.1.name",
    "hint": "home-map.areas.1.hint",
    "question": "home-map.areas.1.question",
    "description": "home-map.areas.1.description",
    "groups": [
      [
        {
          "name": "home-map.areas.1.groups.0.0.name",
          "route": "/equations",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.1.groups.0.1.name",
          "route": "/read/benchmarks",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.1.groups.1.0.name",
          "route": "/read/advanced",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.1.groups.1.1.name",
          "route": "/reconstruction",
          "kind": "interactive"
        }
      ],
      [
        {
          "name": "home-map.areas.1.groups.2.0.name",
          "route": "/shock-robustness",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.1.groups.2.1.name",
          "route": "/read/nasa-2d",
          "kind": "reading"
        }
      ]
    ],
    "entry": "/equations"
  },
  {
    "id": "diffusion",
    "name": "home-map.areas.2.name",
    "hint": "home-map.areas.2.hint",
    "question": "home-map.areas.2.question",
    "description": "home-map.areas.2.description",
    "groups": [
      [
        {
          "name": "home-map.areas.2.groups.0.0.name",
          "route": "/read/elliptic",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.2.groups.0.1.name",
          "route": "/read/hyperbolic-diffusion",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.2.groups.1.0.name",
          "route": "/read/elliptic",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.2.groups.1.1.name",
          "route": "/read/sparse-nonlinear",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.2.groups.2.0.name",
          "route": "/poisson-comparison",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.2.groups.2.1.name",
          "route": "/exact-solutions",
          "kind": "interactive"
        }
      ]
    ],
    "entry": "/poisson-comparison"
  },
  {
    "id": "approximation",
    "name": "home-map.areas.3.name",
    "hint": "home-map.areas.3.hint",
    "question": "home-map.areas.3.question",
    "description": "home-map.areas.3.description",
    "groups": [
      [
        {
          "name": "home-map.areas.3.groups.0.0.name",
          "route": "/meshes",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.3.groups.0.1.name",
          "route": "/read/geophysical-grids",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.3.groups.1.0.name",
          "route": "/read/fem",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.3.groups.1.1.name",
          "route": "/read/history",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.3.groups.2.0.name",
          "route": "/basis",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.3.groups.2.1.name",
          "route": "/cip",
          "kind": "interactive"
        }
      ]
    ],
    "entry": "/basis"
  },
  {
    "id": "particles",
    "name": "home-map.areas.4.name",
    "hint": "home-map.areas.4.hint",
    "question": "home-map.areas.4.question",
    "description": "home-map.areas.4.description",
    "groups": [
      [
        {
          "name": "home-map.areas.4.groups.0.0.name",
          "route": "/read/particle-gravity",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.4.groups.0.1.name",
          "route": "/read/lattice-boltzmann",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.4.groups.1.0.name",
          "route": "/read/gsph",
          "kind": "reading"
        },
        {
          "name": "term.concept.chapman-enskog",
          "route": "/read/chapman-enskog",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.4.groups.2.0.name",
          "route": "/hamiltonian",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.4.groups.2.1.name",
          "route": "/read/gravity-boundaries",
          "kind": "reading"
        }
      ]
    ],
    "entry": "/hamiltonian"
  },
  {
    "id": "coupled",
    "name": "home-map.areas.5.name",
    "hint": "home-map.areas.5.hint",
    "question": "home-map.areas.5.question",
    "description": "home-map.areas.5.description",
    "groups": [
      [
        {
          "name": "home-map.areas.5.groups.0.0.name",
          "route": "/read/mhd",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.5.groups.0.1.name",
          "route": "/read/biological-models",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.5.groups.1.0.name",
          "route": "/read/mhd",
          "kind": "reading"
        },
        {
          "name": "home-map.areas.5.groups.1.1.name",
          "route": "/read/incompressible",
          "kind": "reading"
        }
      ],
      [
        {
          "name": "home-map.areas.5.groups.2.0.name",
          "route": "/mhd-tests",
          "kind": "interactive"
        },
        {
          "name": "home-map.areas.5.groups.2.1.name",
          "route": "/read/relativistic-hydrodynamics",
          "kind": "reading"
        }
      ]
    ],
    "entry": "/mhd-tests"
  }
];
export const homeCopy = {
  "eyebrow": "home-map.eyebrow",
  "title": "home-map.title",
  "title-em": "home-map.title-em",
  "description": "home-map.description",
  "coverage": "home-map.coverage",
  "models": "ui.equation-model-entries.520a2a",
  "methods": "ui.methods-building-blocks.608614",
  "papers": "ui.journal-conference-papers.104ddb",
  "counting": "home-map.counting",
  "equation": "home-map.equation",
  "discretize": "home-map.discretize",
  "solve": "home-map.solve",
  "verify": "home-map.verify",
  "map-title": "home-map.map-title",
  "map-description": "home-map.map-description",
  "map-label": "home-map.map-label",
  "models-label": "home-map.models-label",
  "methods-label": "ui.methods.869662",
  "verify-label": "home-map.verify-label",
  "reading": "home-map.reading",
  "interactive": "home-map.interactive",
  "scope": "home-map.scope",
  "start-area": "home-map.start-area",
  "inspect-scope": "home-map.inspect-scope",
  "selected": "home-map.selected",
  "start-title": "home-map.start-title",
  "start-description": "home-map.start-description",
  "first-tag": "home-map.first-tag",
  "first-title": "home-map.first-title",
  "first-description": "home-map.first-description",
  "first-wave": "home-map.first-wave",
  "first-step": "home-map.first-step",
  "first-read": "home-map.first-read",
  "compare-tag": "home-map.compare-tag",
  "compare-title": "home-map.compare-title",
  "compare-description": "home-map.compare-description",
  "compare-shocks": "home-map.compare-shocks",
  "compare-poisson": "home-map.compare-poisson",
  "compare-time": "home-map.compare-time",
  "sources-tag": "home-map.sources-tag",
  "sources-title": "home-map.sources-title",
  "sources-description": "home-map.sources-description",
  "sources-history": "ui.historical-atlas.a36c4b",
  "sources-bibliography": "home-map.sources-bibliography",
  "sources-books": "home-map.sources-books",
  "evidence-title": "home-map.evidence-title",
  "evidence-description": "home-map.evidence-description",
  "inventory": "home-map.inventory",
  "gallery": "home-map.gallery",
  "glossary": "home-map.glossary",
  "future": "home-map.future",
  "roadmap": "home-map.roadmap",
  "sod-summary": "home-map.sod-summary",
  "sod-description": "home-map.sod-description"
};
export const homePaths = [
  {
    "tag": "home-map.first-tag",
    "title": "home-map.first-title",
    "description": "home-map.first-description",
    "links": [
      [
        "/equations",
        "home-map.first-wave"
      ],
      [
        "/experiments",
        "home-map.first-step"
      ],
      [
        "/read/accuracy-stability",
        "home-map.first-read"
      ]
    ]
  },
  {
    "tag": "home-map.compare-tag",
    "title": "home-map.compare-title",
    "description": "home-map.compare-description",
    "links": [
      [
        "/reconstruction",
        "home-map.compare-shocks"
      ],
      [
        "/poisson-comparison",
        "home-map.compare-poisson"
      ],
      [
        "/time-integration",
        "home-map.compare-time"
      ]
    ]
  },
  {
    "tag": "home-map.sources-tag",
    "title": "home-map.sources-title",
    "description": "home-map.sources-description",
    "links": [
      [
        "/atlas",
        "ui.historical-atlas.a36c4b"
      ],
      [
        "/references",
        "home-map.sources-bibliography"
      ],
      [
        "/read/textbooks",
        "home-map.sources-books"
      ]
    ]
  }
];
