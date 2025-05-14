export type DomainName = 'boroughs' | 'community-districts';

export type DomainDepenencies = Array<DomainName>;

export type DomainDependents = Array<DomainName>;

export type DomainTree = Partial<Record<DomainName, { dependencies: DomainDepenencies, dependents: DomainDependents }>>
