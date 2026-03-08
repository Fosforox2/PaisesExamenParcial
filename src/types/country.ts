export type Country = {
  flag: string;
  name: {
    common: string;
    official: string;
    nativeName: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };
};