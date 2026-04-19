export interface Config {
  localDir: string;
  databases: {
    [path: string]: {
      id: string;
      properties: {
        name: string;
        sections: {
          [path: string]: {
            name: string;
          };
        };
      };
    };
  };
}
