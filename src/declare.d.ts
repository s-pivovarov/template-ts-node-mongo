declare type Id = string | number;

declare type Distinct<C> = {
  [key: string]: C;
};
