type WorldMapReducer = {
  loading: boolean;
  global: {
    world: WorldMapGlobal;
    ukraine: WorldMapGlobal;
  };
  confirmed: Array<WorldMapConfirmed> | null;
  dataForUkraineFromRNBO: Array<dataFromRNBO> | null;
};

type WorldMapGlobal = {
  confirmed: CountForGlobal | null;
  deaths: CountForGlobal | null;
  recovered: CountForGlobal | null;
  lastUpdate: string | Date;
};

type CountForGlobal = {
  [key: string]: number;
};

type WorldMapConfirmed = {
  countryRegion: string;
  lastUpdate: number | Date;
  confirmed: number | null;
  recovered: number | null;
  deaths: number | null;
  id: string;
  iso3: string;
  value?: string | undefined;
};

type dataFromRNBO = {
  [key: string]: [
    {
      [key: string]: number;
      label: {
        [key: string]: string;
      };
    },
  ];
};

type WorldMapResponse = {
  global: WorldMapGlobal;
  confirmed: Array<WorldMapConfirmed>;
  confirmedUSA: WorldMapConfirmed;
  dataForUkraineFromRNBO: Array<dataFromRNBO>;
};
