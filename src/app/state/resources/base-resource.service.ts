export class BaseResources {
  entity: string;
  domains: string;
  search: string;
};

export interface BaseResourceService {
  getResources(): BaseResources;
}
